# Docs Specifications

Technical specifications for the interactive visualization of "The Thinking Machine That Doesn't Think".

**Live**: https://proteusiq.github.io/unthinking/

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| D3.js v7 | Force-directed graph visualization |
| Vanilla JS | No framework, single `graph.js` file |
| CSS3 | Glass-morphic design, CSS variables for theming |
| Prettier | Code formatting (`npm run format`) |

---

## File Structure

```
docs/
├── index.html          # Main HTML (header, panels, graph container)
├── css/
│   ├── variables.css   # Theme tokens, colors, spacing, z-index
│   ├── layout.css      # Base styles, header, graph container, controls
│   ├── components.css  # Panels, cards, tooltips, legend, graph nodes
│   └── responsive.css  # Mobile/tablet breakpoints
├── js/
│   ├── data.js         # Paper nodes and links data
│   └── graph.js        # D3 force simulation, interactions, dialogue system
├── package.json        # npm scripts for Prettier
├── .prettierrc         # Prettier config
└── SPECS.md            # This file
```

---

## Design System

### CSS Variables (defined in `variables.css`)

```css
/* Spacing */
--space-xs: 0.25rem   /* 4px */
--space-sm: 0.5rem    /* 8px */
--space-md: 1rem      /* 16px */
--space-lg: 1.5rem    /* 24px */
--space-xl: 2rem      /* 32px */

/* Z-index layers */
--z-graph: 1
--z-controls: 10
--z-tooltip: 100
--z-panel: 200
--z-header: 50

/* Accent colors (stance) */
--accent-supports: #10b981    /* Green */
--accent-challenges: #f43f5e  /* Red */
--accent-balanced: #f59e0b    /* Amber */

/* Edge colors */
--edge-supports: #34d399
--edge-rebuts: #fb7185
--edge-extends: #a78bfa
```

### Themes

- Light theme: Default
- Dark theme: `[data-theme="dark"]` on `<html>`
- Toggle via JS: `document.documentElement.dataset.theme`

### Glass Effect

```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
}
```

---

## Component Layout

### Positioning (Desktop)

| Component | Position | Notes |
|-----------|----------|-------|
| Header | `top: 0`, full width | Collapsible, 56px compact height |
| Thesis Card | `top: 105px`, `left: space-sm` | Below header, 360px width |
| Dialogue Panel | Dynamic via JS | 12px below thesis card |
| Legend | `bottom: space-xl`, `left: space-sm` | Compact, side-by-side |
| Zoom Controls | `bottom: space-xl`, `right: space-xl` | 3 buttons |
| Side Panel | `right: 0`, 420px width | Slides in on node click |

### Positioning (Mobile ≤768px)

- Header: Stacked layout, smaller title
- Thesis: Full width, `left/right: space-md`
- Dialogue: Bottom of screen, full width
- Legend: Hidden
- Side Panel: Full width, slides up from bottom

---

## Graph System

### Node Data Structure (`data.js`)

```javascript
{
  id: '2410.05229',           // arXiv ID
  title: 'GSM-Symbolic...',   // Full title
  shortTitle: 'GSM-Symbolic', // Display name
  stance: 'supports',         // supports | challenges | balanced
  coreArgument: '...',        // One-liner thesis
  keyEvidence: ['...'],       // Array of evidence points
  arxivUrl: 'https://...'     // Link to paper
}
```

### Link Data Structure

```javascript
{
  source: '2410.05229',  // Source node ID
  target: '2501.12948',  // Target node ID
  type: 'rebuts'         // supports | rebuts | extends
}
```

### Force Simulation

```javascript
d3.forceSimulation(nodes)
  .force('link', d3.forceLink(links).id(d => d.id).distance(100))
  .force('charge', d3.forceManyBody().strength(-300))
  .force('center', d3.forceCenter(width/2, height/2))
  .force('collision', d3.forceCollide().radius(30))
```

### Idle Animation ("Alive" mode)

- Nodes drift by stance: supports→left, challenges→right, balanced→center
- Breathing animation when idle (scale pulse)
- Activates after 5 seconds of no interaction
- Pauses on hover/click

---

## Dialogue System

### Dialogue Data Structure

```javascript
{
  sourceId: '2410.05229',
  targetId: '2501.12948',
  type: 'rebuts',           // rebuts | supports | extends
  message: '...'            // What the paper "says"
}
```

### Behavior

- Cycles through dialogues every 6 seconds (4s when triggered by node click)
- Speaking node gets `.speaking` class (pulsing glow)
- Click node → shows dialogues involving that node
- Papers without dialogues show their `coreArgument`
- Double-click panel to hide, button to show

---

## Interactions

| Action | Result |
|--------|--------|
| Hover node | Tooltip, highlight connections |
| Click node | Open side panel, start related dialogues |
| Double-click node | Zoom to connected nodes |
| Drag node | Move node, pause simulation |
| Click background | Close panel, clear highlights |
| Double-click header | Collapse header |
| Double-click thesis/dialogue | Hide panel |
| Filter buttons | Show/hide nodes by stance |
| Search | Filter nodes by title |

---

## Responsive Breakpoints

```css
@media (max-width: 768px) {
  /* Mobile styles */
}
```

Key mobile changes:
- Header stacks vertically
- Filter buttons wrap, smaller padding
- Thesis card full-width
- Dialogue panel at bottom
- Side panel slides up (70vh max)
- Legend hidden

---

## Development

### Local Server

```bash
cd docs
python3 -m http.server 8000
# Open http://localhost:8000
```

### Format Code

```bash
cd docs
npm install        # First time only
npm run format     # Format all CSS/JS/HTML
npm run format:check  # Check without writing
```

### Adding a New Paper

1. Add node to `js/data.js` → `nodes` array
2. Add links to `js/data.js` → `links` array
3. Optionally add dialogue to `js/graph.js` → `dialogues` array
4. Run `npm run format`

### Adding a Dialogue

In `js/graph.js`, add to `dialogues` array:

```javascript
{
  sourceId: 'ARXIV_ID',
  targetId: 'OTHER_ARXIV_ID',
  type: 'rebuts',  // or 'supports' or 'extends'
  message: 'What this paper says to the other...'
}
```

---

## Deployment

- GitHub Pages from `docs/` folder
- Auto-deploys on push via `.github/workflows/deploy-pages.yml`
- Live at: https://proteusiq.github.io/unthinking/
