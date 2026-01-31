import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BootSequence } from '@/components/os/BootSequence';
import { MenuBar } from '@/components/os/MenuBar';
import { Desktop } from '@/components/os/Desktop';
import { Window } from '@/components/os/Window';
import { About } from '@/components/apps/About';
import { Services } from '@/components/apps/Services';
import { CaseStudies } from '@/components/apps/CaseStudies';
import { Testimonials } from '@/components/apps/Testimonials';
import { Contact } from '@/components/apps/Contact';
import { BookACall } from '@/components/apps/BookACall';
import { Terminal } from '@/components/apps/Terminal';
import { Calculator } from '@/components/apps/Calculator';
import { Notepad } from '@/components/apps/Notepad';
import { useWindows } from '@/hooks/useWindows';
import type { Application, DesktopIcon } from '@/types/os';

const applications: Application[] = [
  {
    id: 'about',
    name: 'About Seconds of Work',
    icon: 'rocket',
    component: About,
    defaultWidth: 550,
    defaultHeight: 600,
    canOpenMultiple: false
  },
  {
    id: 'services',
    name: 'Services',
    icon: 'briefcase',
    component: Services,
    defaultWidth: 600,
    defaultHeight: 550,
    canOpenMultiple: false
  },
  {
    id: 'case-studies',
    name: 'Case Studies',
    icon: 'folder-open',
    component: CaseStudies,
    defaultWidth: 650,
    defaultHeight: 500,
    canOpenMultiple: false
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    icon: 'quote',
    component: Testimonials,
    defaultWidth: 500,
    defaultHeight: 550,
    canOpenMultiple: false
  },
  {
    id: 'contact',
    name: 'Contact',
    icon: 'mail',
    component: Contact,
    defaultWidth: 480,
    defaultHeight: 580,
    canOpenMultiple: false
  },
  {
    id: 'book-call',
    name: 'Book a Free Call',
    icon: 'calendar',
    component: BookACall,
    defaultWidth: 500,
    defaultHeight: 550,
    canOpenMultiple: false
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: 'terminal',
    component: Terminal,
    defaultWidth: 600,
    defaultHeight: 400,
    canOpenMultiple: true
  },
  {
    id: 'calculator',
    name: 'Calculator',
    icon: 'calculator',
    component: Calculator,
    defaultWidth: 300,
    defaultHeight: 380,
    canOpenMultiple: false
  },
  {
    id: 'notepad',
    name: 'SimpleText',
    icon: 'file-text',
    component: Notepad,
    defaultWidth: 500,
    defaultHeight: 400,
    canOpenMultiple: true
  }
];

const initialIcons: DesktopIcon[] = [
  { id: 'icon-about', name: 'About', icon: 'rocket', x: 30, y: 60, appId: 'about', isSelected: false },
  { id: 'icon-services', name: 'Services', icon: 'briefcase', x: 30, y: 170, appId: 'services', isSelected: false },
  { id: 'icon-case-studies', name: 'Case Studies', icon: 'folder-open', x: 30, y: 280, appId: 'case-studies', isSelected: false },
  { id: 'icon-testimonials', name: 'Testimonials', icon: 'quote', x: 30, y: 390, appId: 'testimonials', isSelected: false },
  { id: 'icon-book-call', name: 'Book a Call', icon: 'calendar', x: 30, y: 500, appId: 'book-call', isSelected: false },
  { id: 'icon-contact', name: 'Contact', icon: 'mail', x: 30, y: 610, appId: 'contact', isSelected: false },
  { id: 'icon-terminal', name: 'Terminal', icon: 'terminal', x: 150, y: 60, appId: 'terminal', isSelected: false },
  { id: 'icon-calculator', name: 'Calculator', icon: 'calculator', x: 150, y: 170, appId: 'calculator', isSelected: false },
  { id: 'icon-notepad', name: 'SimpleText', icon: 'file-text', x: 150, y: 280, appId: 'notepad', isSelected: false },
  { id: 'icon-trash', name: 'Trash', icon: 'trash-2', x: window.innerWidth - 100, y: window.innerHeight - 120, appId: 'trash', isSelected: false },
];

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [icons, setIcons] = useState<DesktopIcon[]>(initialIcons);
  const [showAppleMenu, setShowAppleMenu] = useState(false);
  
  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    activateWindow,
    moveWindow
  } = useWindows();

  const activeApp = useMemo(() => {
    if (!activeWindowId) return null;
    const win = windows.find(w => w.id === activeWindowId);
    if (!win) return null;
    return applications.find(app => app.id === win.appId);
  }, [activeWindowId, windows]);

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
    // Auto-open About window after boot
    setTimeout(() => {
      const aboutIcon = initialIcons.find(i => i.appId === 'about');
      if (aboutIcon) {
        openWindow(applications[0], aboutIcon.x, aboutIcon.y);
      }
    }, 500);
  }, [openWindow]);

  const handleOpenApp = useCallback((appId: string, iconX?: number, iconY?: number) => {
    const app = applications.find(a => a.id === appId);
    if (!app) return;

    // Check if single-instance app is already open
    if (!app.canOpenMultiple) {
      const existingWindow = windows.find(w => w.appId === appId && !w.isMinimized);
      if (existingWindow) {
        activateWindow(existingWindow.id);
        return;
      }
    }

    openWindow(app, iconX, iconY);
  }, [applications, windows, openWindow, activateWindow]);

  const handleSelectIcon = useCallback((id: string) => {
    setIcons(prev => prev.map(icon => ({
      ...icon,
      isSelected: icon.id === id
    })));
  }, []);

  const handleDeselectAll = useCallback(() => {
    setIcons(prev => prev.map(icon => ({ ...icon, isSelected: false })));
    setShowAppleMenu(false);
  }, []);

  const handleAppleClick = useCallback(() => {
    setShowAppleMenu(prev => !prev);
  }, []);

  if (isBooting) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  return (
    <div className="h-screen w-screen overflow-hidden">
      <MenuBar 
        activeAppName={activeApp?.name || 'Finder'}
        onAppleClick={handleAppleClick}
      />

      {/* Apple Menu Dropdown */}
      <AnimatePresence>
        {showAppleMenu && (
          <motion.div 
            className="fixed top-6 left-0 bg-white/95 backdrop-blur-sm border border-gray-300 shadow-2xl z-[10000] min-w-56 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <div className="py-1">
              <motion.button 
                onClick={() => {
                  handleOpenApp('about');
                  setShowAppleMenu(false);
                }}
                whileHover={{ backgroundColor: '#316AC5', color: '#fff' }}
                className="w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2"
              >
                <span className="w-4 h-4 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">S</span>
                About Seconds of Work
              </motion.button>
              <div className="h-px bg-gray-200 my-1" />
              <motion.button 
                onClick={() => {
                  handleOpenApp('services');
                  setShowAppleMenu(false);
                }}
                whileHover={{ backgroundColor: '#316AC5', color: '#fff' }}
                className="w-full text-left px-4 py-2 text-sm transition-colors"
              >
                Services...
              </motion.button>
              <motion.button 
                onClick={() => {
                  handleOpenApp('case-studies');
                  setShowAppleMenu(false);
                }}
                whileHover={{ backgroundColor: '#316AC5', color: '#fff' }}
                className="w-full text-left px-4 py-2 text-sm transition-colors"
              >
                Case Studies...
              </motion.button>
              <motion.button 
                onClick={() => {
                  handleOpenApp('book-call');
                  setShowAppleMenu(false);
                }}
                whileHover={{ backgroundColor: '#316AC5', color: '#fff' }}
                className="w-full text-left px-4 py-2 text-sm transition-colors"
              >
                Book a Call...
              </motion.button>
              <div className="h-px bg-gray-200 my-1" />
              <motion.button 
                onClick={() => window.location.reload()}
                whileHover={{ backgroundColor: '#316AC5', color: '#fff' }}
                className="w-full text-left px-4 py-2 text-sm transition-colors"
              >
                Restart...
              </motion.button>
              <motion.button 
                onClick={() => window.close()}
                whileHover={{ backgroundColor: '#316AC5', color: '#fff' }}
                className="w-full text-left px-4 py-2 text-sm transition-colors"
              >
                Shut Down...
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Desktop
        icons={icons}
        onOpenApp={handleOpenApp}
        onSelectIcon={handleSelectIcon}
        onDeselectAll={handleDeselectAll}
      >
        <AnimatePresence>
          {windows.map(win => {
            const app = applications.find(a => a.id === win.appId);
            if (!app) return null;

            const AppComponent = app.component;
            const isActive = win.id === activeWindowId;

            return (
              <Window
                key={win.id}
                window={win}
                app={app}
                isActive={isActive}
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                onMaximize={() => maximizeWindow(win.id)}
                onActivate={() => activateWindow(win.id)}
                onMove={(dx, dy) => moveWindow(win.id, dx, dy)}
              >
                <AppComponent />
              </Window>
            );
          })}
        </AnimatePresence>
      </Desktop>

      {/* Click outside to close Apple menu */}
      <AnimatePresence>
        {showAppleMenu && (
          <motion.div 
            className="fixed inset-0 z-[9998]"
            onClick={() => setShowAppleMenu(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
