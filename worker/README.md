# Cloudflare Worker - Contact Form Handler

This Cloudflare Worker handles contact form submissions from your Seconds of Work website and sends them via email using Resend.

## Setup Instructions

### 1. Sign up for Resend

1. Go to [resend.com](https://resend.com) and create a free account
2. Verify your domain (secondsofwork.com) by adding the DNS records they provide
3. Generate an API key from the dashboard

### 2. Install Wrangler

```bash
npm install -g wrangler
```

### 3. Configure the Worker

1. Navigate to the worker directory:
```bash
cd /Users/adityas/Developer/SecondsofWork/macos-classic/worker
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Set your secrets:
```bash
wrangler secret put RESEND_API_KEY
# Enter your Resend API key when prompted
```

4. Update the wrangler.toml if needed:
- Change `FROM_EMAIL` to your verified domain email
- Change `TO_EMAIL` to where you want to receive emails

### 4. Deploy the Worker

```bash
wrangler deploy
```

After deployment, you'll get a URL like:
`https://contact-form.secondsofwork.workers.dev`

### 5. Update Your Frontend

Update the Contact component in your React app with the worker URL:

```typescript
const response = await fetch('https://contact-form.secondsofwork.workers.dev', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
});
```

## Free Tier Limits

- **Cloudflare Workers**: 100,000 requests/day
- **Resend**: 3,000 emails/month

This is more than enough for a contact form!

## Testing

You can test the worker locally:

```bash
wrangler dev
```

Then send a test request:

```bash
curl -X POST http://localhost:8787 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message"
  }'
```

## Troubleshooting

1. **CORS errors**: The worker includes CORS headers, but make sure your frontend URL is allowed
2. **Email not sending**: Check that your domain is verified in Resend
3. **Rate limiting**: If you hit limits, check your usage in the Cloudflare dashboard

## Security Notes

- Never commit your RESEND_API_KEY to git
- The worker validates email format to prevent spam
- HTML is escaped to prevent XSS attacks
- Consider adding rate limiting for production use
- Consider adding a honeypot field to prevent spam bots

## Custom Domain (Optional)

You can use a custom subdomain for your worker:

```bash
wrangler route add api.secondsofwork.com/contact
```

Then update your frontend to use:
`https://api.secondsofwork.com/contact`
