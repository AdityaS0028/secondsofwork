import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [text, setText] = useState<string[]>([]);

  const bootText = [
    "Seconds of Work OS v1.0",
    "Copyright Seconds of Work, Inc. 2024",
    "",
    "Initializing AI Core...",
    "Loading Neural Networks: OK",
    "Loading Automation Modules...",
    "  • Conversational AI Engine",
    "  • Business Process Automation",
    "  • Social Media Integrations",
    "  • Healthcare Compliance Systems",
    "  • Analytics Dashboard",
    "",
    "Connecting to Cloudflare Edge...",
    "Global CDN: Connected",
    "",
    "Loading Client Success Stories...",
    "  • Radiance Dental: No-shows reduced 68%",
    "  • DS&P: Campaign efficiency +92%",
    "  • DigitalDynamo: Close rates +64%",
    "  • SocialSphere: Content output +300%",
    "",
    "Systems Ready.",
    "Welcome to Seconds of Work.",
    "",
    "Initializing Desktop Environment...",
    "Loading complete.",
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootText.length) {
        setText(prev => [...prev, bootText[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setPhase(1);
          setTimeout(() => {
            setPhase(2);
            setTimeout(() => {
              setPhase(3);
              setTimeout(() => onComplete(), 1000);
            }, 2000);
          }, 1000);
        }, 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Progress bar animation
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (phase >= 2) {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          return p + 2;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [phase]);

  if (phase === 0) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center font-mono text-sm">
        <motion.div 
          className="text-green-500 w-full max-w-2xl p-8 crt-effect"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {text.map((line, i) => (
            <motion.div 
              key={i} 
              className="whitespace-pre-wrap"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1 }}
            >
              {line}
            </motion.div>
          ))}
          <motion.span 
            className="blink"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            _
          </motion.span>
        </motion.div>
      </div>
    );
  }

  if (phase === 1) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <motion.div 
            className="w-24 h-24 mb-4 relative"
            animate={{ 
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <rect x="20" y="20" width="60" height="60" fill="none" stroke="url(#logoGrad)" strokeWidth="3" rx="10"/>
              <text x="50" y="58" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">
                S
              </text>
            </svg>
          </motion.div>
          <motion.div 
            className="text-white font-bold text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Seconds of Work
          </motion.div>
          <motion.div 
            className="text-gray-400 text-sm mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            AI-Powered Business Automation
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (phase === 2 || phase === 3) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 flex items-center justify-center">
        <motion.div 
          className="mac-dialog w-96 bg-white/95 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="flex items-center mb-4">
            <motion.div 
              className="w-10 h-10 mr-3"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <defs>
                  <linearGradient id="smallLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <rect x="8" y="8" width="24" height="24" fill="none" stroke="url(#smallLogoGrad)" strokeWidth="2" rx="5"/>
                <text x="20" y="26" textAnchor="middle" fill="#404040" fontSize="14" fontWeight="bold">S</text>
              </svg>
            </motion.div>
            <div>
              <div className="font-bold text-sm">Welcome to Seconds of Work</div>
              <div className="text-xs text-gray-600">Business Automation OS v1.0</div>
            </div>
          </div>
          
          <div className="mac-separator" />
          
          <div className="my-4">
            <motion.div 
              className="text-xs mb-1 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
              Starting up...
            </motion.div>
            <div className="mac-progress h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="mac-progress-bar h-full bg-gradient-to-r from-blue-500 to-purple-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <motion.div 
              className="text-xs text-gray-500 mt-1 text-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {progress}%
            </motion.div>
          </div>
          
          <div className="mac-separator" />
          
          <motion.div 
            className="text-xs text-gray-600 mt-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            © 2024 Seconds of Work. All rights reserved.
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return null;
};
