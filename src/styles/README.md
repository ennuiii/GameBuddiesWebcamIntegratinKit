# Webcam Integration Kit - Styles

This directory contains CSS stylesheets for the webcam components.

## Files

### `webcam.css` (Tailwind CSS)
**For projects using Tailwind CSS**

- Uses Tailwind utility classes (`@apply`)
- Requires Tailwind CSS to be configured in your project
- Smaller file size (classes compiled by Tailwind)
- Best for projects already using Tailwind

**Usage:**
```typescript
import 'webcam-integration-kit/src/styles/webcam.css';
```

### `webcam-plain.css` (Plain CSS)
**For projects NOT using Tailwind CSS**

- Pure CSS with no dependencies
- Uses CSS custom properties (variables) for theming
- Larger file size but fully self-contained
- Works with any CSS setup

**Usage:**
```typescript
import 'webcam-integration-kit/src/styles/webcam-plain.css';
```

## Customization

### Using Tailwind CSS
If using `webcam.css`, customize via Tailwind config:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Override default colors
        slate: { ... },
        blue: { ... },
      }
    }
  }
}
```

### Using Plain CSS
If using `webcam-plain.css`, customize via CSS variables:

```css
/* In your global CSS */
:root {
  --webcam-primary: #your-primary-color;
  --webcam-success: #your-success-color;
  --webcam-bg-dark: #your-dark-bg;
  /* ... more variables */
}
```

### Available CSS Variables (Plain CSS only)

```css
:root {
  /* Colors */
  --webcam-primary: #3b82f6;        /* Primary blue */
  --webcam-success: #10b981;        /* Success green */
  --webcam-warning: #f59e0b;        /* Warning yellow */
  --webcam-danger: #ef4444;         /* Danger red */

  /* Backgrounds */
  --webcam-bg-dark: #0f172a;        /* Darkest background */
  --webcam-bg-medium: #1e293b;      /* Medium background */
  --webcam-bg-light: #334155;       /* Light background */

  /* Text */
  --webcam-text-primary: #e2e8f0;   /* Primary text */
  --webcam-text-secondary: #94a3b8; /* Secondary text */
  --webcam-text-muted: #64748b;     /* Muted text */

  /* Borders */
  --webcam-border: #475569;         /* Border color */

  /* Border Radius */
  --webcam-radius: 0.75rem;         /* Default radius */
  --webcam-radius-sm: 0.5rem;       /* Small radius */
  --webcam-radius-lg: 1rem;         /* Large radius */

  /* Shadows */
  --webcam-shadow: ...;             /* Default shadow */
  --webcam-shadow-lg: ...;          /* Large shadow */
}
```

## CSS Class Reference

### Container Classes
- `.webcam-display` - Main container
- `.webcam-container` - Styled wrapper
- `.webcam-header` - Header section
- `.webcam-title` - Title text
- `.webcam-controls` - Control buttons container

### Grid Classes
- `.webcam-grid` - Base grid
- `.webcam-grid-1` through `.webcam-grid-5plus` - Responsive grids
- `.webcam-mobile-grid` - Mobile-optimized grid
- `.webcam-grid-compact` / `.webcam-grid-expanded` - Size variants

### Video Feed Classes
- `.webcam-feed` - Individual video feed
- `.webcam-feed-active` - Active player highlight
- `.webcam-feed-answering` - Player taking turn (pulsing yellow)
- `.webcam-feed-next` - Next player indicator (purple)
- `.webcam-feed-inactive` - Inactive/eliminated (dimmed)
- `.webcam-video` - Video element
- `.webcam-video-mirrored` - Mirrored video (for self view)

### Overlay Classes
- `.webcam-overlay` - Overlay container
- `.webcam-player-info` - Player name/info bar
- `.webcam-player-name` - Player name text
- `.webcam-lives` - Lives/hearts container
- `.webcam-heart` / `.webcam-heart-full` / `.webcam-heart-empty` - Heart icons

### Status Classes
- `.webcam-status` - Status badges container
- `.webcam-status-badge` - Individual badge
- `.webcam-status-mic-on` / `.webcam-status-mic-off` - Mic status colors
- `.webcam-turn-indicator` - Current turn badge
- `.webcam-next-indicator` - Next turn badge

### Button Classes
- `.webcam-control-btn` - Base button
- `.webcam-control-btn-active` / `.webcam-control-btn-inactive` - Button states
- `.webcam-vote-btn` - Vote button
- `.webcam-header-btn` - Header action buttons

### Modal Classes (Prepare Video Chat)
- `.webcam-modal-backdrop` - Modal overlay (backdrop blur)
- `.webcam-modal` - Modal container (90vw max-width 600px, 85vh max-height)
- `.webcam-modal-header` - Header with title and close button
- `.webcam-modal-title` - Modal title text
- `.webcam-modal-close` - Close button (X)
- `.webcam-modal-preview` - Preview section (camera preview area)
- `.webcam-modal-preview-title` - Preview section title
- `.webcam-modal-preview-container` - Flex container for video
- `.webcam-modal-preview-video-wrapper` - Video wrapper (16:9 aspect ratio, 320px)
- `.webcam-modal-preview-badge` - "Preview" badge overlay
- `.webcam-modal-preview-info` - Info box below preview
- `.webcam-modal-preview-info-text` - Info text styling
- `.webcam-modal-tabs` - Tab navigation bar
- `.webcam-modal-tab` - Individual tab button
- `.webcam-modal-tab-active` - Active tab (blue border)
- `.webcam-modal-tab-inactive` - Inactive tab
- `.webcam-modal-body` - Scrollable content area (flex-1)
- `.webcam-modal-footer` - Footer with action buttons
- `.webcam-modal-button-primary` - Primary button (blue)
- `.webcam-modal-button-secondary` - Secondary button (gray)

### Form Classes
- `.webcam-form-group` - Form field wrapper
- `.webcam-form-label` - Field label
- `.webcam-form-select` / `.webcam-form-input` - Input fields
- `.webcam-form-checkbox` - Checkbox
- `.webcam-form-slider` - Range slider
- `.webcam-form-help` - Help text

### Grid Selection Classes
- `.webcam-background-grid` - Background selection grid
- `.webcam-background-option` - Background option
- `.webcam-avatar-grid` - Avatar selection grid
- `.webcam-avatar-option` - Avatar option

### Utility Classes
- `.webcam-fade-in` - Fade in animation
- `.webcam-slide-in` - Slide in animation
- `.webcam-loading` - Loading state
- `.webcam-spinner` - Loading spinner
- `.webcam-info-box` - Info message box (blue)
- `.webcam-info-box-text` - Info text styling
- `.webcam-success-box` - Success message box (green)
- `.webcam-success-box-text` - Success text styling

## Responsive Design

Both stylesheets are fully responsive:

- **Desktop (1024px+)**: 3-column grid for 3+ participants
- **Tablet (768px-1023px)**: 2-column grid
- **Mobile (<768px)**: 1-column grid, compact controls

## Browser Support

- Chrome/Edge 94+ (full support)
- Firefox 90+ (full support)
- Safari 15.4+ (full support)
- Mobile browsers (optimized)

## Dark/Light Mode

By default, the styles use a dark theme. To add light mode support:

```css
/* In your global CSS */
@media (prefers-color-scheme: light) {
  :root {
    --webcam-bg-dark: #ffffff;
    --webcam-bg-medium: #f8fafc;
    --webcam-bg-light: #e2e8f0;
    --webcam-text-primary: #1e293b;
    --webcam-text-secondary: #475569;
    /* ... more overrides */
  }
}
```

## Accessibility

The styles include:
- High contrast ratios for text
- Focus states for keyboard navigation
- Screen reader-friendly hidden content
- Reduced motion support (can be added)

## Performance

- Uses CSS custom properties for easy theming
- Hardware-accelerated animations
- Optimized for 60fps
- Minimal repaints/reflows

## Migration from Tailwind to Plain CSS

If you're switching from Tailwind to plain CSS:

1. Remove `webcam.css` import
2. Add `webcam-plain.css` import
3. Remove Tailwind CSS dependency (optional)
4. Customize via CSS variables instead of Tailwind config

## Need Help?

- All class names are prefixed with `webcam-` to avoid conflicts
- Styles are scoped and won't affect other parts of your app
- Use browser DevTools to inspect and customize further
- Check the main README.md for integration examples
