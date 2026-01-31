import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Icon } from './Icon';
import type { DesktopIcon } from '@/types/os';

interface DesktopProps {
  icons: DesktopIcon[];
  onOpenApp: (appId: string, x?: number, y?: number) => void;
  onSelectIcon: (id: string) => void;
  onDeselectAll: () => void;
  children: React.ReactNode;
}

export const Desktop: React.FC<DesktopProps> = ({
  icons,
  onOpenApp,
  onSelectIcon,
  onDeselectAll,
  children
}) => {
  const handleBackgroundClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onDeselectAll();
    }
  }, [onDeselectAll]);

  const handleOpenIcon = useCallback((id: string) => {
    const icon = icons.find(i => i.id === id);
    if (icon && icon.appId !== 'trash') {
      onOpenApp(icon.appId, icon.x, icon.y);
    }
  }, [icons, onOpenApp]);

  return (
    <motion.div 
      className="fixed inset-0 overflow-hidden mac-desktop"
      onClick={handleBackgroundClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Classic Mac OS Wallpaper - System 7 Style */}
      <div 
        className="absolute inset-0 mac-classic-wallpaper"
        style={{
          backgroundImage: 'url(/wallpapers/pattern-dots.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
          imageRendering: 'pixelated'
        }}
      />
      
      {/* Classic gradient overlay like System 7.5 */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(99, 130, 160, 0.3) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(80, 110, 140, 0.3) 0%, transparent 50%)'
        }}
      />

      {/* Desktop Icons */}
      <div className="absolute inset-0 pt-12">
        {icons.map((icon, index) => (
          <motion.div
            key={icon.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            <Icon
              icon={icon}
              onOpen={handleOpenIcon}
              onSelect={onSelectIcon}
            />
          </motion.div>
        ))}
      </div>

      {/* Windows */}
      {children}
    </motion.div>
  );
};
