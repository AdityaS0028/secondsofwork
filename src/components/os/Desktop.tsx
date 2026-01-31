import React, { useCallback, useEffect, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Filter out trash icon for mobile dock
  const dockIcons = icons.filter(icon => icon.appId !== 'trash');
  const trashIcon = icons.find(icon => icon.appId === 'trash');

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

      {/* Desktop Icons - Desktop Layout */}
      {!isMobile && (
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
      )}

      {/* Mobile Dock */}
      {isMobile && (
        <>
          {/* App Grid for Mobile */}
          <div className="absolute inset-0 pt-16 pb-24 px-4 overflow-y-auto">
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {dockIcons.map((icon, index) => (
                <motion.div
                  key={icon.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className="flex flex-col items-center"
                >
                  <button
                    onClick={() => handleOpenIcon(icon.id)}
                    className="flex flex-col items-center p-2 rounded-lg active:bg-[#316AC5]/30 transition-colors"
                  >
                    <div className="w-14 h-14 retro-icon-shadow">
                      <img 
                        src={`/icons/${getIconFilename(icon.icon)}.svg`}
                        alt={icon.name}
                        className="w-full h-full object-contain"
                        style={{ 
                          imageRendering: 'pixelated',
                          filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.3))'
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-center mt-1 px-1 text-white font-medium bg-black/30 rounded">
                      {icon.name}
                    </span>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Dock Bar */}
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E8E8E8]/90 backdrop-blur-sm border border-[#808080] rounded-xl px-4 py-2 shadow-lg flex items-center gap-3">
            {dockIcons.slice(0, 4).map((icon) => (
              <button
                key={icon.id}
                onClick={() => handleOpenIcon(icon.id)}
                className="w-12 h-12 flex items-center justify-center active:scale-95 transition-transform"
              >
                <img 
                  src={`/icons/${getIconFilename(icon.icon)}.svg`}
                  alt={icon.name}
                  className="w-10 h-10 object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </button>
            ))}
            {trashIcon && (
              <button
                onClick={() => handleOpenIcon(trashIcon.id)}
                className="w-12 h-12 flex items-center justify-center active:scale-95 transition-transform ml-2 border-l border-[#808080] pl-3"
              >
                <img 
                  src="/icons/trash.svg"
                  alt="Trash"
                  className="w-10 h-10 object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </button>
            )}
          </div>
        </>
      )}

      {/* Windows */}
      {children}
    </motion.div>
  );
};

// Helper function to map icon types to filenames
function getIconFilename(iconType: string): string {
  const iconMap: Record<string, string> = {
    'folder': 'folder',
    'folder-open': 'folder',
    'file-text': 'document',
    'mail': 'mail',
    'terminal': 'terminal',
    'calculator': 'calculator',
    'help-circle': 'info',
    'trash-2': 'trash',
    'info': 'info',
    'briefcase': 'application',
    'quote': 'info',
    'calendar': 'calendar',
    'sparkles': 'controlpanel',
    'rocket': 'application',
    'user': 'info',
  };
  return iconMap[iconType] || 'folder';
}
