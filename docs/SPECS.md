# Docs Specifications

Technical specifications for the interactive visualization of "The Thinking Machine That Doesn't Think".

**Live**: https://proteusiq.github.io/unthinking/

---

## What This Is

This is an **interactive literature review visualization** for the thesis:

> LLM reasoning is practical but fundamentally **predictive** (pattern matching from training distributions), not genuinely **generative**. RL and test-time compute **surface** pre-existing capabilities rather than creating new reasoning abilities.

The visualization shows **215 research papers** as nodes in a force-directed graph, with edges showing how papers relate to each other (support, rebut, extend). Users can explore the academic debate visually.

---

## Design Philosophy

### Why a Graph?

Academic papers don't exist in isolation—they respond to, build on, and challenge each other. A graph visualization makes these relationships visible and explorable. Users can:

- See clusters of related work
- Trace chains of rebuttals
- Identify which papers are central to the debate
- Discover papers through connections rather than lists

### Why Glass-Morphic Design?

1. **Modern aesthetic** - Feels contemporary without being distracting
2. **Layered depth** - Panels float above the graph, creating visual hierarchy
3. **Works in both themes** - Translucent panels adapt to light/dark mode
4. **Focus on content** - Subtle UI keeps attention on the graph

### Why "Paper Conversations"?

Academic debate is often dry. The dialogue panel humanizes it by having papers "talk" to each other:

- "Your 'emergent reasoning' shows 65% accuracy drops with irrelevant info. That's pattern matching, not reasoning." (GSM-Symbolic → DeepSeek-R1)

This makes the debate accessible and engaging.

### Why Vanilla JS?

1. **Simplicity** - No build step, no framework overhead
2. **D3 integration** - D3 works best with direct DOM manipulation
3. **Portability** - Just HTML/CSS/JS files, host anywhere
4. **Longevity** - No framework churn, will work in 10 years

---

## Data Pipeline

### File Structure (Split for Maintainability)

As of 2026-02-09, the data is split into three files:
- `js/nodes.js` - Paper node definitions (~3,500 lines)
- `js/links.js` - Relationship link definitions (~3,200 lines)  
- `js/data.js` - Meta info and combines nodes/links (~20 lines)

All three must be loaded in order: `nodes.js`, `links.js`, then `data.js`.

### Where Node Data Comes From

The node and link files are generated from paper analyses in `/analysis/explored/`. Each paper analysis (e.g., `05_deepseek_r1.md`) contains structured metadata that gets extracted into node format.

### Generating Nodes from Paper Analyses

When you analyze a new paper following the methodology in `/AGENTS.md`, extract:

1. **arXiv ID** → `id`
2. **Title** → `title`
3. **Short name** → `shortTitle` (for graph labels)
4. **Date** → `date` (publication month and year)
5. **Stance** → `stance` (supports/challenges/balanced relative to thesis)
6. **Cluster** → `cluster` (thematic cluster)
7. **Core argument** → `coreArgument` (one sentence, paper's own claim)
8. **Key evidence** → `keyEvidence` (3-4 findings with specific numbers)
9. **Key quotes** → `keyQuotes` (1-2 direct quotes from paper)
10. **Analysis URL** → `analysisUrl` (link to analysis file on GitHub)

Example extraction from `analysis/explored/00-09/01_gsm_symbolic.md`:

```javascript
{
  id: '2410.05229',
  title: 'GSM-Symbolic: Understanding the Limitations of Mathematical Reasoning in Large Language Models',
  shortTitle: 'GSM-Symbolic',
  date: 'Oct 2024',
  stance: 'supports',
  cluster: 'compositional',
  coreArgument: 'LLMs show up to 65% accuracy drops with superficial changes, suggesting pattern matching over true reasoning.',
  keyEvidence: [
    'Up to 65% drop (NoOp)',
    'Performance degrades with increased complexity',
    'Models fail on simple symbolic variations'
  ],
  keyQuotes: [
    'The fragility of mathematical reasoning in these models raises questions about the reliability of their performance.'
  ],
  analysisUrl: 'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/00-09/01_gsm_symbolic.md'
}
```

### Generating Links from Paper Relationships

Links come from the "Relationship to Other Papers" section in each analysis and from `/analysis/paper_graph.md` (lowercase). For each relationship:

1. **Source** → paper making the claim (citing, usually newer)
2. **Target** → paper being referenced (cited, usually older)
3. **Type** → `supports` | `extends` | `rebuts` | `challenges`
4. **Description** → specific finding/mechanism connecting the two papers

Example:
```javascript
{
  source: '2410.05229',
  target: '2501.12948',
  type: 'rebuts',
  description: 'GSM-Symbolic shows 65% drop; pattern matching not emergent reasoning'
}
```

### Automation Opportunity

A future script could parse `/analysis/explored/**/*.md` files and auto-generate `nodes.js` and `links.js`. The markdown structure is consistent enough for extraction.

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
├── index.html              # Main HTML (header, panels, graph container)
├── pages/                  # Deep-dive standalone pages
│   ├── data.html           # Pre-training Data Pipeline
│   ├── tokenization.html   # Tokenization Pipeline
│   ├── architecture.html   # LLM Architecture Evolution
│   └── training.html       # Full Training Pipeline (Pre/Mid/Post)
├── css/
│   ├── variables.css       # Theme tokens, colors, spacing, z-index
│   ├── layout.css          # Base styles, header, graph container, controls
│   ├── components.css      # Panels, cards, tooltips, legend, graph nodes
│   └── responsive.css      # Mobile/tablet breakpoints
├── js/
│   ├── nodes.js            # Paper node definitions
│   ├── links.js            # Relationship link definitions
│   ├── data.js             # Meta info + combines nodes/links
│   └── graph.js            # D3 force simulation, interactions, dialogue system
├── package.json            # npm scripts for Prettier
├── .prettierrc             # Prettier config
└── SPECS.md                # This file
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
- Zoom Controls: Hidden
- Side Panel: Full width, slides up from bottom

---

## Graph System

### Node Data Structure (`nodes.js`)

```javascript
{
  id: '2410.05229',           // arXiv ID
  title: 'GSM-Symbolic...',   // Full title
  shortTitle: 'GSM-Symbolic', // Display name (graph labels)
  date: 'Oct 2024',           // Publication date
  stance: 'supports',         // supports | challenges | balanced
  cluster: 'compositional',   // Thematic cluster
  coreArgument: '...',        // One sentence, paper's own claim
  keyEvidence: ['...'],       // 3-4 findings with specific numbers
  keyQuotes: ['...'],         // 1-2 direct quotes from paper
  analysisUrl: 'https://...'  // Link to analysis file on GitHub
}
```

### Link Data Structure (`links.js`)

```javascript
{
  source: '2410.05229',  // Source node ID (citing paper)
  target: '2501.12948',  // Target node ID (cited paper)
  type: 'rebuts',        // supports | extends | rebuts | challenges
  description: 'GSM-Symbolic shows 65% drop; pattern matching not reasoning'
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
- Zoom controls hidden

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

1. Add node to `js/nodes.js` (see Node Data Structure above)
2. Add links to `js/links.js` (3-5 outgoing links, each with unique description)
3. Update `meta.totalAnalyzed` count in `js/data.js`
4. Optionally add dialogue to `js/graph.js` → `dialogues` array
5. Run `npm run format`

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

---

## Future Improvements

Potential enhancements (not yet implemented):

1. **Auto-generate data.js** - Script to parse `/analysis/explored/*.md` and generate nodes/links
2. **More dialogues** - Currently only ~10 dialogues, could add more from paper rebuttals
3. **Timeline view** - Show papers by publication date
4. **Cluster labels** - Auto-label clusters (e.g., "CoT Faithfulness", "Compositional Generalization")
5. **Citation counts** - Size nodes by impact
6. **Search by content** - Search within paper arguments, not just titles
7. **Export** - Export graph as image or selected papers as bibliography
