import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Minus, Square, Folder, FileText, Mail, Terminal, Calculator, HelpCircle, 
  Trash2, Info, Briefcase, Quote, Calendar, Sparkles, Rocket, User, FolderOpen 
} from 'lucide-react';
import { useDrag } from '@/hooks/useDrag';
import type { WindowState, Application } from '@/types/os';

interface WindowProps {
  window: WindowState;
  app: Application;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onActivate: () => void;
  onMove: (deltaX: number, deltaY: number) => void;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  window: win,
  app,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onActivate,
  onMove,
  children
}) => {
  const { handlers } = useDrag(onMove);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onActivate();
  }, [onActivate]);

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  }, [onClose]);

  const handleMinimize = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onMinimize();
  }, [onMinimize]);

  const handleMaximize = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onMaximize();
  }, [onMaximize]);

  const getIconComponent = () => {
    const props = { className: "w-3 h-3" };
    switch (app.icon) {
      case 'folder': return <Folder {...props} className="w-3 h-3 text-yellow-600" />;
      case 'folder-open': return <FolderOpen {...props} className="w-3 h-3 text-yellow-600" />;
      case 'file-text': return <FileText {...props} className="w-3 h-3 text-blue-600" />;
      case 'mail': return <Mail {...props} className="w-3 h-3 text-red-500" />;
      case 'terminal': return <Terminal {...props} />;
      case 'calculator': return <Calculator {...props} />;
      case 'help-circle': return <HelpCircle {...props} />;
      case 'trash-2': return <Trash2 {...props} />;
      case 'info': return <Info {...props} className="w-3 h-3 text-blue-500" />;
      case 'briefcase': return <Briefcase {...props} className="w-3 h-3 text-blue-600" />;
      case 'quote': return <Quote {...props} className="w-3 h-3 text-green-500" />;
      case 'calendar': return <Calendar {...props} className="w-3 h-3 text-orange-500" />;
      case 'sparkles': return <Sparkles {...props} className="w-3 h-3 text-purple-500" />;
      case 'rocket': return <Rocket {...props} className="w-3 h-3 text-indigo-500" />;
      case 'user': return <User {...props} className="w-3 h-3 text-teal-500" />;
      default: return <Folder {...props} />;
    }
  };

  if (win.isMinimized) return null;

  return (
    <motion.div
      className={`mac-window ${isActive ? 'active' : ''}`}
      style={{
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
      }}
      onMouseDown={handleMouseDown}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      drag={false}
    >
      {/* Title Bar */}
      <div
        className="mac-title-bar cursor-move"
        {...handlers}
      >
        <div className="flex items-center gap-1">
          <motion.button 
            onClick={handleClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mac-window-control close"
          >
            <X className="w-2 h-2" />
          </motion.button>
          <motion.button 
            onClick={handleMinimize}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mac-window-control minimize"
          >
            <Minus className="w-2 h-2" />
          </motion.button>
          <motion.button 
            onClick={handleMaximize}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mac-window-control maximize"
          >
            <Square className="w-2 h-2" />
          </motion.button>
        </div>
        
        <div className="mac-title-bar-text flex items-center justify-center gap-2">
          {getIconComponent()}
          <span className="text-xs font-bold">{win.title}</span>
        </div>
        
        <div className="w-12" />
      </div>
      
      {/* Window Content */}
      <motion.div 
        className="mac-window-content bg-white overflow-auto mac-scrollbar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={win.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
