# Mac OS Classic - Vintage Operating System Simulation

## Project Overview

A fully functional vintage Mac OS System 7/8 style operating system simulation built as a single-page web application. Features multiple working applications, windowing system, and authentic retro UI.

## Design Vision

Inspired by krazam.tv, this project recreates the nostalgic experience of classic Mac OS:
- **Platinum UI Theme**: Classic grey window chrome, pixel-perfect controls
- **System 7 Aesthetic**: Chicago/Monaco fonts, 1-bit icons, textured backgrounds  
- **Functional OS**: Real draggable windows, working apps, file system simulation
- **Retro Boot Sequence**: BIOS-style startup with authentic loading experience

## Tech Stack

- **React 18 + TypeScript**: Component architecture
- **Vite**: Development and building
- **Tailwind CSS**: Styling with custom retro theme
- **Parcel**: Single-file bundling for distribution
- **Lucide React**: Modern icons styled to look retro
- **Custom Window Manager**: Pure React implementation

## Project Structure

```
macos-classic/
├── src/
│   ├── components/
│   │   ├── os/              # OS-level components
│   │   │   ├── Desktop.tsx      # Desktop environment
│   │   │   ├── MenuBar.tsx      # Top menu bar
│   │   │   ├── Window.tsx       # Draggable window component
│   │   │   ├── Icon.tsx         # Desktop icons
│   │   │   └── BootSequence.tsx # Startup screen
│   │   ├── apps/            # Application windows
│   │   │   ├── About.tsx        # About this computer
│   │   │   ├── Projects.tsx     # Portfolio/projects
│   │   │   ├── Contact.tsx      # Contact form
│   │   │   ├── Terminal.tsx     # Terminal app
│   │   │   ├── Calculator.tsx   # Calculator
│   │   │   └── Notepad.tsx      # Simple text editor
│   │   └── ui/              # shadcn/ui components
│   ├── hooks/
│   │   ├── useWindows.ts        # Window state management
│   │   ├── useDrag.ts           # Drag functionality
│   │   └── useSystem.ts         # System-level state
│   ├── types/
│   │   └── os.ts                # TypeScript types
│   ├── styles/
│   │   └── retro.css            # Custom retro styling
│   ├── lib/
│   │   └── utils.ts
│   └── App.tsx
├── public/                  # Static assets
├── index.html
├── package.json
└── AGENTS.md               # This file
```

## Available Scripts

```bash
# Development
cd macos-classic && pnpm dev

# Build for production
cd macos-classic && pnpm build

# Bundle to single HTML file
cd macos-classic && bash /Users/adityas/.config/opencode/skills/web-artifacts-builder/scripts/bundle-artifact.sh
```

## Key Features

### Window Management System
- Drag windows by title bar
- Click to bring to front (z-index management)
- Minimize/Maximize/Close buttons
- Window state persistence

### Applications
1. **About This Computer**: System info and credits
2. **Projects**: Portfolio showcase with retro file browser
3. **Contact**: Working contact form in classic dialog style
4. **Terminal**: Simulated bash terminal with commands
5. **Calculator**: Functional calculator app
6. **Notepad**: Simple text editor

### System Features
- Desktop icons with double-click to open
- Top menu bar with dropdown menus
- Right-click context menus
- Authentic retro fonts and sounds
- Date/time display
- Trash/recycle bin functionality

## Styling Guidelines

### Color Palette
```
--platinum: #E8E8E8           # Main window color
--platinum-dark: #D0D0D0      # Window shadow/border
--platinum-light: #F5F5F5     # Window highlight
--apple-menu: #6366F1         # Apple menu blue
--selected: #316AC5           # Selection blue
--text: #000000               # Primary text
--text-disabled: #808080      # Disabled text
```

### Typography
- **Display**: "Chicago" or monospace fallback
- **Body**: System monospace stack
- **Icons**: 1-bit black and white style

### UI Patterns
- Raised/etched borders for depth
- 2px drop shadows
- 1px borders with highlight/shadow
- Pixelated icons (32x32)
- Window title bar with stripes pattern

## Development Notes

- All windows are draggable within desktop bounds
- Z-index managed automatically on focus
- State persisted in React Context
- Boot sequence shows for 3-5 seconds on load
- Sound effects can be added via Web Audio API

## Future Enhancements

- [ ] Add more applications (Paint, Games, etc.)
- [ ] File system simulation with localStorage
- [ ] Network/Internet app simulation
- [ ] Customizable desktop wallpaper
- [ ] Sound effects and startup chime
- [ ] Easter eggs and hidden features
