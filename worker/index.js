/**
 * Cloudflare Worker for handling contact form submissions
 * Sends emails via Resend API
 * 
 * Security features:
 * - CORS restricted to specific origins
 * - Rate limiting (5 requests per IP per 10 minutes)
 * - Input validation and sanitization
 * - XSS protection via HTML escaping
 * 
 * To deploy:
 * 1. Install Wrangler: npm install -g wrangler
 * 2. Login: wrangler login
 * 3. Deploy: wrangler deploy
 */

// Configuration - UPDATE THESE VALUES
const RESEND_API_KEY = 'YOUR_RESEND_API_KEY'; // Replace with your actual API key
const FROM_EMAIL = 'aditya@secondsofwork.com'; // Must be verified in Resend
const TO_EMAIL = 'aditya@secondsofwork.com'; // Your receiving email

// Allowed origins - UPDATE THIS with your domain
const ALLOWED_ORIGINS = [
  'https://secondsofwork.com',
  'https://www.secondsofwork.com',
  'https://secondsofwork.pages.dev', // Cloudflare Pages preview
  'http://localhost:5173', // Local development
  'http://localhost:3000',
];

// Rate limiting store (in production, use Cloudflare KV or Durable Objects)
const ipRequestCounts = new Map();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes in milliseconds
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 requests per window

// CORS headers with restricted origin
const getCorsHeaders = (origin) => {
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
};

// Rate limiting check
const checkRateLimit = (ip) => {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  
  // Clean old entries
  for (const [key, data] of ipRequestCounts.entries()) {
    if (data.timestamp < windowStart) {
      ipRequestCounts.delete(key);
    }
  }
  
  // Check current IP
  const currentData = ipRequestCounts.get(ip);
  if (currentData) {
    if (currentData.count >= RATE_LIMIT_MAX_REQUESTS && currentData.timestamp > windowStart) {
      return false; // Rate limit exceeded
    }
    // Increment count
    currentData.count++;
  } else {
    // First request from this IP
    ipRequestCounts.set(ip, { count: 1, timestamp: now });
  }
  
  return true;
};

// Input validation
const validateInput = (data) => {
  const { name, email, subject, message } = data;
  
  // Check required fields
  if (!name || !email || !subject || !message) {
    return { valid: false, error: 'Missing required fields' };
  }
  
  // Length limits
  if (name.length > 100) return { valid: false, error: 'Name too long (max 100 chars)' };
  if (email.length > 100) return { valid: false, error: 'Email too long (max 100 chars)' };
  if (subject.length > 200) return { valid: false, error: 'Subject too long (max 200 chars)' };
  if (message.length > 5000) return { valid: false, error: 'Message too long (max 5000 chars)' };
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  // Block HTML/script tags in input
  const htmlRegex = /<[^>]*>/;
  if (htmlRegex.test(name) || htmlRegex.test(subject) || htmlRegex.test(message)) {
    return { valid: false, error: 'HTML tags not allowed' };
  }
  
  return { valid: true };
};

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '';
    const corsHeaders = getCorsHeaders(origin);
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    // Only accept POST requests
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }
    
    // Rate limiting check
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
            'Retry-After': '600',
          },
        }
      );
    }

    try {
      // Parse the request body
      const body = await request.json();
      
      // Validate input
      const validation = validateInput(body);
      if (!validation.valid) {
        return new Response(
          JSON.stringify({ error: validation.error }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        );
      }
      
      const { name, email, subject, message } = body;

      // Use Resend API to send email
      const apiKey = env.RESEND_API_KEY || RESEND_API_KEY;
      
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: env.FROM_EMAIL || FROM_EMAIL,
          to: [env.TO_EMAIL || TO_EMAIL],
          reply_to: email,
          subject: `[Contact Form] ${escapeHtml(subject)}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
            <hr>
            <p style="color: #666; font-size: 12px;">
              Submitted via Seconds of Work contact form<br>
              Timestamp: ${new Date().toISOString()}<br>
              IP: ${clientIP}
            </p>
          `,
          text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Submitted via Seconds of Work contact form
Timestamp: ${new Date().toISOString()}
IP: ${clientIP}
          `,
        }),
      });

      if (!resendResponse.ok) {
        const error = await resendResponse.text();
        console.error('Resend API error:', error);
        throw new Error('Failed to send email via Resend');
      }

      const result = await resendResponse.json();

      // Return success response
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Message sent successfully',
          id: result.id 
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );

    } catch (error) {
      console.error('Error processing contact form:', error);
      
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send message. Please try again later.' 
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }
  },
};

// Utility function to escape HTML to prevent XSS
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
