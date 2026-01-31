# Retro Mac OS Assets - Seconds of Work

This folder contains authentic retro Mac OS style icons and wallpaper patterns for the Seconds of Work website.

## Icons (/public/icons/)

All icons are hand-crafted SVG files in the classic System 7 style:

- **folder.svg** - Classic beige folder with tab
- **document.svg** - Document with folded corner and text lines
- **application.svg** - Generic application icon with "A" symbol
- **mail.svg** - Envelope with stamp area
- **trash.svg** - Trash can with rim, lid, and vertical lines
- **info.svg** - Blue circular info button with "i"
- **harddrive.svg** - SCSI hard drive with slot and LED
- **controlpanel.svg** - Control panel with sliders and buttons
- **calculator.svg** - Calculator with display and buttons
- **calendar.svg** - Calendar page with date
- **terminal.svg** - Terminal window with command prompt

### Icon Design Features:
- 32x32 pixel grid design
- System 7 color palette (beige, gray, blue, yellow)
- Pixel-perfect rendering with `image-rendering: pixelated`
- Classic drop shadows and 3D effects
- Traditional Mac OS styling with gradients and highlights

## Wallpapers (/public/wallpapers/)

Classic Mac OS System 7 desktop patterns (8x8 pixel repeating tiles):

- **pattern-dots.svg** - Classic dot pattern
- **pattern-diamonds.svg** - Diamond shapes
- **pattern-grid.svg** - Grid lines
- **pattern-checker.svg** - Checkerboard pattern
- **pattern-noise.svg** - Noise/dither pattern
- **pattern-diagonal.svg** - Diagonal lines

### To Change Wallpaper:

Edit `/src/components/os/Desktop.tsx` and change the backgroundImage URL:

```tsx
<div 
  className="absolute inset-0 mac-classic-wallpaper"
  style={{
    backgroundImage: 'url(/wallpapers/pattern-dots.svg)', // Change this
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto',
    imageRendering: 'pixelated'
  }}
/>
```

Available options:
- `pattern-dots.svg` (default - most classic)
- `pattern-diamonds.svg`
- `pattern-grid.svg`
- `pattern-checker.svg`
- `pattern-noise.svg`
- `pattern-diagonal.svg`

## CSS Classes

### Wallpaper Classes
Add to any element for instant retro wallpaper:

```css
.wallpaper-dots       /* Classic dots */
.wallpaper-diamonds   /* Diamond pattern */
.wallpaper-grid       /* Grid lines */
.wallpaper-checker    /* Checkerboard */
.wallpaper-noise      /* Noise/dither */
.wallpaper-diagonal   /* Diagonal lines */
```

### Icon Classes

```css
.retro-icon-shadow    /* Classic drop shadow for icons */
.retro-pixelated      /* Pixel-perfect rendering */
```

## Color Palette

Classic Mac OS System 7 colors used:

- **Desktop Blue**: `#6382A0` (default desktop background)
- **Platinum Gray**: `#E8E8E8` (window chrome)
- **Folder Yellow**: `#F5E6A3` (folder icons)
- **Info Blue**: `#6B9BD1` (info/caution icons)
- **Trash Gray**: `#C0C0C0` (trash can)
- **Dark Gray**: `#808080` (borders and shadows)

## Credits & Inspiration

These icons and patterns are inspired by:
- Apple System 7 (1991)
- Apple Mac OS 8 (1997)
- Susan Kare's original Macintosh icons
- Classic Mac OS Control Panel patterns

## Technical Details

- All icons are SVG format for scalability
- Patterns are 16x16 SVG with 8x8 repeating tiles
- Pixel-perfect rendering enabled via CSS
- Retro styling applied through image-rendering: pixelated
- Build automatically includes all assets in /dist folder

## Usage Example

To use a different icon in the app, update the iconMap in `/src/components/os/Icon.tsx`:

```typescript
const iconMap: Record<string, string> = {
  'folder': '/icons/folder.svg',
  'mail': '/icons/mail.svg',
  'trash': '/icons/trash.svg',
  // Add new mappings here
};
```
