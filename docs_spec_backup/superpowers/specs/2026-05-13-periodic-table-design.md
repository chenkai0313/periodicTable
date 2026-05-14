# Periodic Table Website - Design Spec

**Date:** 2026-05-13  
**Status:** Draft

## Overview

A periodic table website for middle/high school students and general public. Fast element lookup with learning aids. Web3 dark visual style with playful interactivity.

## Tech Stack

- **Framework:** Astro (static site generation)
- **Styling:** CSS (glassmorphism, neon glow, dark theme)
- **Interactivity:** Vanilla JS / lightweight framework where needed
- **Deployment:** Static hosting, AdSense-ready

## Target Users

- Middle and high school chemistry students
- General public needing quick element reference
- Chinese-speaking users with bilingual support (default: English)

## Visual Style

- **Theme:** Web3 dark — deep blue-black / purple-black background
- **Tiles:** Rounded cards with glassmorphism neon glow borders, gradient backgrounds per element family
- **Typography:** Monospace/tech font for atomic numbers and symbols
- **Motion:** Staggered entrance animation, hover glow-lift, smooth page transitions
- **Background:** Subtle particle/stars effect

## Pages & Modules

### 1. Homepage — Periodic Table Grid

- **Layout:** Standard IUPAC 18-column × 9-row layout using CSS Grid (not HTML `<table>`). Lanthanides and actinides in separate rows below.
- **Each tile displays:** Atomic number, symbol, Chinese name, English name.
- **Color coding:** ~10 element families via gradient backgrounds:
  - Alkali metals, Alkaline earth metals, Transition metals, Post-transition metals, Metalloids, Nonmetals, Halogens, Noble gases, Lanthanides, Actinides.
- **Search bar** at top: fuzzy search by symbol / English name / Chinese name.
- **Category filter buttons** at top: clicking a category dims non-matching elements.
- **Responsive:** Full grid on desktop, horizontal scroll on mobile.
- **Interactions:**
  - Staggered tile entrance animation on page load.
  - Hover: tile scales up + glow intensifies.
  - Click: navigate to element detail page.
  - Category filter: non-matching elements dim (don't disappear).

### 2. Element Detail Page

- **Route:** `/element/[symbol]` or `/element/[atomic-number]`
- **Sections:**

**Properties Panel:**
  - Atomic number, atomic weight, symbol, Chinese name, English name
  - Electron configuration, oxidation states (valences)
  - Physical state (solid/liquid/gas), melting point, boiling point, density
  - Electronegativity, atomic radius, ionic radius
  - Period, group, block (s/p/d/f)
  - Crystal structure

**Visual Aids:**
  - Electron shell / orbital diagram (animated concentric rings)
  - Element appearance image or representative illustration

**Learning Section:**
  - Common uses with life-application images
  - Memory mnemonic / rhyme (Chinese + English)
  - Discovery history: discoverer, year, country

**Actions:**
  - "Add to Compare" button
  - Previous / Next element navigation arrows
  - Back to table button

**Styling:** Frosted glass (glassmorphism) data cards, smooth transitions between elements.

### 3. Element Comparison

- Selector to pick 2–4 elements (from search or from compare queue).
- Side-by-side comparison table of key properties.
- Highlight differences to make comparison intuitive.

### 4. Learning Tools

**4a. Chemical Equation Balancer**
  - Input: reactants and products (e.g. `H2 + O2 → H2O`)
  - Output: balanced coefficients
  - Handles common school-level equations

**4b. Quick Reference Tables**
  - Common valences table (searchable by element)
  - Acid/base/salt solubility table (grid with color-coded soluble/insoluble/precipitate)
  - Metal activity series (K → Au) with water/acid reaction notes

**4c. Element Flashcards**
  - Card front: symbol + atomic number
  - Card back: Chinese name + mnemonic + common uses
  - Filter by family or period
  - Random flip mode for memorization practice
  - Flip animation, progress tracking

## Data Source

- Element property data stored as static JSON/CSV files within the project (118 elements).
- Metadata compiled from public domain chemistry references (PubChem, periodic-table-api).
- No external API dependency at runtime — all data bundled statically.

## SEO & AdSense

- Static HTML pages for all 118 element detail pages.
- Semantic HTML, structured data (schema.org).
- Fast page load (Astro static generation).
- Ad-friendly content pages (learning tools, reference tables).

## Out of Scope

- User accounts / login
- Backend / database
- Real-time collaboration
- 3D molecule rendering (keeping it lightweight)
