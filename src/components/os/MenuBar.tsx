import React from 'react';
import { motion } from 'framer-motion';
import { Apple, Wifi, Battery } from 'lucide-react';

interface MenuBarProps {
  activeAppName: string;
  onAppleClick: () => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({ activeAppName, onAppleClick }) => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const dateString = currentTime.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <motion.div 
      className="mac-menu-bar fixed top-0 left-0 right-0 z-[9999]"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="flex items-center w-full px-2">
        <motion.button 
          onClick={onAppleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mac-apple-logo flex items-center justify-center p-1 rounded hover:bg-white/20"
        >
          <Apple className="w-4 h-4 fill-current" />
        </motion.button>
        
        <motion.div 
          className="mac-menu-item font-bold px-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {activeAppName || 'Finder'}
        </motion.div>
        
        <motion.div 
          className="mac-menu-item hidden sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          File
        </motion.div>
        <motion.div 
          className="mac-menu-item hidden sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          Edit
        </motion.div>
        <motion.div 
          className="mac-menu-item hidden sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          View
        </motion.div>
        <motion.div 
          className="mac-menu-item hidden sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          Window
        </motion.div>
        <motion.div 
          className="mac-menu-item hidden sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Help
        </motion.div>
        
        <div className="flex-1" />
        
        <motion.div 
          className="flex items-center gap-3 pr-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.1 }} className="p-1 rounded hover:bg-white/20 cursor-pointer">
            <Wifi className="w-4 h-4" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="p-1 rounded hover:bg-white/20 cursor-pointer">
            <Battery className="w-4 h-4" />
          </motion.div>
          <motion.div 
            className="mac-menu-item text-xs"
            whileHover={{ scale: 1.05 }}
          >
            {dateString}
          </motion.div>
          <motion.div 
            className="mac-menu-item text-xs font-mono"
            whileHover={{ scale: 1.05 }}
          >
            {timeString}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
