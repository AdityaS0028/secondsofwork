import { useState, useCallback, useRef } from 'react';
import type { WindowState, Application } from '@/types/os';

export function useWindows() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const nextZIndexRef = useRef(100);

  const openWindow = useCallback((app: Application, iconX?: number, iconY?: number) => {
    const id = `${app.id}-${Date.now()}`;
    
    // Check if mobile
    const isMobile = window.innerWidth <= 768;
    
    // Mobile: full screen, Desktop: positioned
    const x = isMobile ? 0 : (iconX !== undefined ? iconX + 20 : 100 + windows.length * 30);
    const y = isMobile ? 32 : (iconY !== undefined ? iconY + 20 : 100 + windows.length * 30);
    
    // Adjust size for mobile
    const width = isMobile ? window.innerWidth : Math.min(app.defaultWidth, window.innerWidth - 100);
    const height = isMobile ? (window.innerHeight - 32) : Math.min(app.defaultHeight, window.innerHeight - 100);
    
    const newWindow: WindowState = {
      id,
      appId: app.id,
      title: app.name,
      x: Math.max(0, Math.min(x, window.innerWidth - width - 20)),
      y: Math.max(32, Math.min(y, window.innerHeight - height - 20)),
      width,
      height,
      isMinimized: false,
      isMaximized: isMobile, // Auto-maximize on mobile
      isActive: true,
      zIndex: nextZIndexRef.current++
    };

    setWindows(prev => 
      prev.map(w => ({ ...w, isActive: false })).concat(newWindow)
    );
    setActiveWindowId(id);
    
    return id;
  }, [windows.length]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) {
      const remaining = windows.filter(w => w.id !== id);
      if (remaining.length > 0) {
        const lastWindow = remaining[remaining.length - 1];
        setActiveWindowId(lastWindow.id);
        setWindows(prev => 
          prev.map(w => ({ ...w, isActive: w.id === lastWindow.id }))
        );
      } else {
        setActiveWindowId(null);
      }
    }
  }, [activeWindowId, windows]);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => 
      prev.map(w => w.id === id ? { ...w, isMinimized: true, isActive: false } : w)
    );
    if (activeWindowId === id) {
      const remaining = windows.filter(w => w.id !== id && !w.isMinimized);
      if (remaining.length > 0) {
        const lastWindow = remaining[remaining.length - 1];
        activateWindow(lastWindow.id);
      } else {
        setActiveWindowId(null);
      }
    }
  }, [activeWindowId, windows]);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => 
      prev.map(w => {
        if (w.id !== id) return w;
        return {
          ...w,
          isMaximized: !w.isMaximized,
          x: w.isMaximized ? 100 : 0,
          y: w.isMaximized ? 100 : 40,
          width: w.isMaximized ? w.width : window.innerWidth,
          height: w.isMaximized ? w.height : window.innerHeight - 40
        };
      })
    );
  }, []);

  const activateWindow = useCallback((id: string) => {
    setWindows(prev => 
      prev.map(w => ({
        ...w,
        isActive: w.id === id,
        zIndex: w.id === id ? nextZIndexRef.current++ : w.zIndex,
        isMinimized: w.id === id ? false : w.isMinimized
      }))
    );
    setActiveWindowId(id);
  }, []);

  const moveWindow = useCallback((id: string, deltaX: number, deltaY: number) => {
    setWindows(prev => 
      prev.map(w => {
        if (w.id !== id || w.isMaximized) return w;
        return {
          ...w,
          x: Math.max(0, Math.min(window.innerWidth - w.width, w.x + deltaX)),
          y: Math.max(40, Math.min(window.innerHeight - w.height, w.y + deltaY))
        };
      })
    );
  }, []);

  return {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    activateWindow,
    moveWindow
  };
}
