// OS Types for Mac Classic Simulation

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isActive: boolean;
  zIndex: number;
  content?: React.ReactNode;
}

export interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
  appId: string;
  isSelected: boolean;
}

export interface Application {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType<any>;
  defaultWidth: number;
  defaultHeight: number;
  canOpenMultiple: boolean;
}

export interface MenuItem {
  label: string;
  action?: () => void;
  disabled?: boolean;
  separator?: boolean;
  submenu?: MenuItem[];
}

export interface MenuBarMenu {
  label: string;
  items: MenuItem[];
}

export type OSTheme = 'platinum' | 'blue' | 'graphite';

export interface SystemState {
  isBooting: boolean;
  isLoggedIn: boolean;
  theme: OSTheme;
  desktopIcons: DesktopIcon[];
  windows: WindowState[];
  activeWindowId: string | null;
  nextZIndex: number;
}
