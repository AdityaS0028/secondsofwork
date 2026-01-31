import { useCallback } from 'react';
import type { DesktopIcon } from '@/types/os';
import { motion } from 'framer-motion';

interface IconProps {
  icon: DesktopIcon;
  onOpen: (id: string) => void;
  onSelect: (id: string) => void;
}

// Map icon types to their SVG paths
const iconMap: Record<string, string> = {
  'folder': '/icons/folder.svg',
  'folder-open': '/icons/folder.svg', // Use same folder icon
  'file-text': '/icons/document.svg',
  'mail': '/icons/mail.svg',
  'terminal': '/icons/terminal.svg',
  'calculator': '/icons/calculator.svg',
  'help-circle': '/icons/info.svg',
  'trash-2': '/icons/trash.svg',
  'info': '/icons/info.svg',
  'briefcase': '/icons/application.svg',
  'quote': '/icons/info.svg',
  'calendar': '/icons/calendar.svg',
  'sparkles': '/icons/controlpanel.svg',
  'rocket': '/icons/application.svg',
  'user': '/icons/info.svg',
};

export const Icon: React.FC<IconProps> = ({ icon, onOpen, onSelect }) => {
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(icon.id);
  }, [icon.id, onSelect]);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen(icon.id);
  }, [icon.id, onOpen]);

  const iconPath = iconMap[icon.icon] || '/icons/folder.svg';

  return (
    <motion.div
      className={`mac-desktop-icon ${icon.isSelected ? 'selected' : ''}`}
      style={{ left: icon.x, top: icon.y }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="w-12 h-12 retro-icon-shadow">
        <img 
          src={iconPath} 
          alt={icon.name}
          className="w-full h-full object-contain"
          style={{ 
            imageRendering: 'pixelated',
            filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.3))'
          }}
        />
      </div>
      <span className="mac-icon-label">{icon.name}</span>
    </motion.div>
  );
};
