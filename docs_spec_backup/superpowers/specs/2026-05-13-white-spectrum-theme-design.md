# White Spectrum Theme Redesign

**Date**: 2026-05-13
**Status**: Approved

## Summary
Redesign the periodic table website from purple-accent to a clean white theme with vibrant prism/spectrum colorful accents. The dominant color is white, with lively, rich colors used for interactive elements, borders, glows, and accents.

## Color System

### Backgrounds
- `--bg-root`: `#ffffff` (pure white)
- `--bg-surface`: `#f8f7f4` (warm paper white)
- `--bg-card`: `rgba(255, 255, 255, 0.95)`
- `--bg-card-hover`: `#ffffff`

### Text
- `--text-primary`: `#1a1a1a` (deep charcoal)
- `--text-secondary`: `#787878` (warm gray)
- `--text-dim`: `#b0b0b0` (light gray)

### Accent (Spectrum)
- Red: `#ff5e5b`, Orange: `#ff8e3c`, Yellow: `#ffc048`
- Green: `#4ecb71`, Teal: `#2ec4b6`, Blue: `#4a9eff`, Purple: `#7c6ff7`

### Borders
- `--border-glass`: `rgba(0, 0, 0, 0.05)`
- `--border-glow`: `rgba(0, 0, 0, 0.10)`

## Component Changes

### Global: Remove purple from text-gradient, scrollbar, selection
### Navbar: Clean white, colorful hover accents, badge uses spectrum
### ParticleBg: Dramatically reduced opacity for clean white feel
### ElementTile: White cards, category-color borders, subtle hover lifts
### SearchBar: Clean white input, spectrum focus, colorful chips
### ElementDetail: Reduced glow, clean prop cards, colorful buttons
### All Buttons: White base + colorful text/borders, gradient fills on primary
### FlashcardDeck: Spectrum symbol gradient
### EquationBalancer: Colorful balance button
### ReferenceTables: Colorful active tabs
### TrendControls: Colorful range sliders, clean panels
