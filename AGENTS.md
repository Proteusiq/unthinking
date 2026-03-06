# Literature Review Methodology

## Overview
Rules and methodology for conducting systematic literature reviews on AI/ML research papers.

---

## Development Philosophy

- **Simplicity is king** — the simplest solution that works is the best solution
- **Self-documenting code** — if it needs comments, refactor it
- **Functional over OOP** — pure functions, composition, immutability
- **Commit early, commit often** — small, focused, verified commits

### Code Design
- Prefer **pure functions**; isolate side effects
- Avoid hidden state and mutable globals
- Declare types explicitly at module boundaries

### Error Handling
- Treat errors as structured data, not control flow
- Add context when propagating errors
- Never swallow errors silently

### Git & Commits
```
type: short description
```

| Type | Use |
|------|-----|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation |
| `chore:` | Maintenance |
| `refactor:` | Restructure (no behavior change) |
| `test:` | Tests |

### Python Style
- Type annotations: always, Python 3.12+ (`list[T]`, `X | None`)
- Docstrings: brief, public APIs only
- Tools: `uv`, `ruff`, `ty`, `pytest`

```bash
uvx ruff format .
uvx ruff check --fix .
uvx ty check .
```

### HTML / CSS / JS Style (docs/)

No build tools, no framework — vanilla HTML + CSS + JS. D3.js only dependency.
See `docs/SPECS.md` for design system, component layout, and graph details.

#### HTML
- Semantic elements: `<header>`, `<nav>`, `<main>`, `<button>` (never `<div onclick>`)
- `<button>` for actions, `<a>` for navigation
- `alt` on every `<img>` (empty `alt=""` for decorative)
- Double quotes for attributes
- Scripts before `</body>`, CSS in `<head>`

#### CSS
- 2-space indent, one property per line
- Hyphenated class names: `.thesis-card`, `.side-panel` (no camelCase)
- Use custom properties from `variables.css` — never hardcode colors/spacing
- Flat selectors (1–2 levels max), no `!important`
- Animate with `transform` / `opacity` (GPU-composited)
- Safari: always pair `backdrop-filter` with `-webkit-backdrop-filter`

#### JavaScript
- `const` by default, `let` when needed, never `var`
- IIFE module pattern: `(() => { ... })()`
- `addEventListener` over inline `onclick` (standalone pages may use `onclick`)
- Cache DOM refs, batch reads/writes
- `requestAnimationFrame` for layout, debounce expensive handlers
- Reactive positioning: `ResizeObserver` + `transitionend`, no `setTimeout` for layout

#### Standalone Pages (`pages/data.html`, `pages/tokenization.html`, `pages/architecture.html`, `pages/training.html`)
- Self-contained: inline `<style>` + `<script>`, no external CSS/JS
- Dark terminal aesthetic: `#0d1117` bg, `Courier New`, color-coded sections
- Tab switching: JS `setMode()` pattern, CSS `.show` class toggle
- Data-driven: JS arrays → DOM (not hand-written HTML for repeated elements)
- Width: 720–960px centered
- Credits footer: sources attributed at page bottom

#### Tooling

```bash
cd docs
npm run format          # Prettier
npm run format:check    # Check only
python3 -m http.server 8000  # Local dev
```

---

## Core Principles

### 1. Read the FULL Paper — This is Non-Negotiable
- **ALWAYS** read the COMPLETE paper — this is the alpha and omega of paper analysis
- **NEVER** stop at "enough information" — there is no such thing as enough without reading the whole paper
- **ALWAYS** fetch the full HTML version (arxiv.org/html/) or PDF if HTML unavailable
- If the paper is truncated, use task agents to read the full saved content
- Abstracts can be misleading or incomplete
- Key evidence, methodology details, and limitations are often in the body
- Look for actual numbers, experimental setups, and edge cases
- **If you haven't read the full paper, you haven't read the paper**

### 2. Independent Critical Assessment
- **Do not automatically agree with the researcher's interpretation** — form your own view from the paper first
- Read the paper carefully BEFORE accepting any characterization (rebuttal, confirmation, etc.)
- If the researcher suggests a classification, VERIFY it against the actual paper content
- Apply critical thinking independently — the researcher can be wrong
- When in doubt, re-read key sections of the paper to form your own judgment
- You MAY defer to the researcher after independent verification confirms their view
- State your assessment clearly, noting agreement or disagreement with the researcher

### 3. Rebuttal Analysis is MANDATORY
For EVERY paper analyzed, you MUST:
1. **Search for direct arXiv rebuttals** — check if other papers cite/challenge this work
2. **Check for counter-evidence from other analyzed papers** in the corpus
3. **Document rebuttals in BOTH directions** — papers can be challenged AND can challenge others
4. **Include a REBUTTALS section** in each analysis file
5. **Update the paper interaction graph** (see below)

### 4. Evidence Must Have Numbers
- Extract specific quantitative results (percentages, metrics, sample sizes)
- Document experimental conditions (models tested, datasets used)
- Note statistical significance where provided
- Flag when papers make claims without quantitative support

### 5. Track Paper Interactions (MANDATORY)
For EVERY paper analyzed, you MUST update the paper interaction graph:
1. **Document relationships**: supports, challenges, extends, provides mechanism for
2. **Track rebuttal chains**: A rebuts B, C rebuts A's rebuttal, etc.
3. **Update `analysis/paper_graph.md`** with new interactions
4. **Identify papers with NO rebuttals** — these are papers requiring follow-up

### 6. Use Objective Language
- **NEVER** use "our thesis" or "your thesis" — use "the thesis" instead
- Write as an objective observer, not an advocate
- Examples:
  - BAD: "This supports our thesis that..."
  - GOOD: "This supports the thesis that..."
  - BAD: "Evidence for your claim..."
  - GOOD: "Evidence for the claim..."
- The analysis should read as neutral scholarly work, not persuasive writing

### 7. No Temporal Markers
- **NEVER** use "NEW", "UPDATED", "RECENT" or similar temporal markers in documentation
- Content should be timeless — dates speak for themselves
- If something is new, the date/commit history shows it
- Examples:
  - BAD: `- [microgpt](url) (Feb 2026) — **NEW**`
  - GOOD: `- [microgpt](url) (Feb 2026)`
  - BAD: `### NEW: Mirror Rebuttals Section`
  - GOOD: `### Mirror Rebuttals Section`

### 8. ASCII Diagrams for Clarity

Use ASCII boxes and diagrams liberally to:
- **Synthesize key insights** — box the core finding so it stands out
- **Show relationships** — arrows, flow diagrams, comparison tables
- **Visualize processes** — pipelines, decision trees, causal chains
- **Highlight contradictions** — side-by-side comparisons

**When to use ASCII diagrams:**
- Summarizing a paper's core contribution
- Showing how papers relate to the thesis
- Comparing findings across papers
- Illustrating mechanisms or pipelines
- Creating memorable takeaways

**Box alignment rule**: All lines in an ASCII box **MUST** have the same length.

Verify alignment before committing:
```python
# Check box alignment
lines = """┌─────────────────────────┐
│  Content here           │
└─────────────────────────┘""".split('\n')
lengths = [len(line) for line in lines]
assert len(set(lengths)) == 1, f"Misaligned: {set(lengths)}"
```

When fixing, add/remove spaces before the closing `│`. Each box can have its own width, but all lines within must match.

**Example patterns:**

```
# Simple insight box
┌─────────────────────────────────────────────────────────────────────┐
│  KEY FINDING: [One sentence insight]                                │
└─────────────────────────────────────────────────────────────────────┘

# Comparison box
┌─────────────────────────────────────────────────────────────────────┐
│  WHAT WE EXPECTED              vs    WHAT WE FOUND                  │
├─────────────────────────────────────────────────────────────────────┤
│  Sequential reasoning builds         Answer comes first             │
│  to conclusion                       Reasoning is post-hoc          │
└─────────────────────────────────────────────────────────────────────┘

# Flow diagram
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Input   │ ──> │ Process  │ ──> │  Output  │
└──────────┘     └──────────┘     └──────────┘

# Relationship arrows
Paper A ──rebuts──> Paper B
Paper C ──extends──> Paper A
```

**Characters to use:**
- Box: `┌ ┐ └ ┘ │ ─ ├ ┤ ┬ ┴ ┼`
- Arrows: `→ ← ↑ ↓ ──>` 
- Emphasis: `═ ║ ╔ ╗ ╚ ╝` (double lines for emphasis)

---

## Paper Interaction Graph

### Purpose
Track how papers relate to each other — who rebuts whom, who builds on whom, chains of rebuttals.

### Format
Maintain in `analysis/paper_graph.md`:

```
## Paper Interaction Graph

### Direct Rebuttals
Paper A (arXiv) --rebuts--> Paper B (arXiv)
Paper C (arXiv) --rebuts--> Paper A (arXiv)  [counter-rebuttal]

### Builds On / Extends
Paper D --extends--> Paper E
Paper F --provides mechanism for--> Paper G

### Supports
Paper H --supports--> Paper I (same finding, different method)
```

### Visual Representation
```
┌─────────────┐     rebuts      ┌─────────────┐
│  Paper A    │ ───────────────>│  Paper B    │
└─────────────┘                 └─────────────┘
       ^
       │ rebuts (counter)
       │
┌─────────────┐
│  Paper C    │
└─────────────┘
```

---

## Expanding the Paper Corpus

### arXiv Search Tool

Use the CLI tool to search for papers:

```bash
# Basic search
uv run scripts/arxiv_search.py "extracting books LLM"

# Title-only search with year filter
uv run scripts/arxiv_search.py "chain of thought" --title-only --year 2025

# Verbose output with abstracts
uv run scripts/arxiv_search.py "reasoning failures" --max 20 -v
```

**Options:**
- `--title-only, -t` — Search titles only (default: title + abstract)
- `--year, -y` — Filter to papers from this year onwards
- `--max, -m` — Maximum results (default: 15)
- `--verbose, -v` — Show abstract snippets

**Categories searched:** cs.CL, cs.LG, cs.AI, cs.NE

### Systematic Search Strategy

When expanding the corpus, search multiple angles:

| Angle | Example Queries |
|-------|-----------------|
| Core topic | "LLM reasoning", "chain of thought" |
| Skeptical | "reasoning limitations", "reasoning failure" |
| Mechanistic | "interpretability reasoning", "reasoning circuits" |
| Emergent | "emergent reasoning", "reasoning generalization" |
| Safety | "jailbreak", "alignment", "memorization" |

### Priority Assignment

- **HIGH**: Directly tests thesis claims with controlled experiments
- **HIGH**: Award-winning papers (signal quality)
- **HIGH**: Papers that challenge the thesis (steel-man the opposition)
- **MEDIUM**: Extends existing findings with new evidence
- **LOW**: Tangentially related or overlaps with analyzed papers

### After Finding Papers

1. Add to `papers/toread.md` with expected stance
2. Follow `workflow.md` for analysis

---

## Workflow

**See `workflow.md` for detailed step-by-step execution guide.**

**CRITICAL**: Nothing is done until it is pushed. A task is only complete when changes are committed AND pushed to the remote repository.

---

## Key Lessons

### 1. Rebuttals Can Be Rebutted
- Always check for counter-counter evidence
- Track the full rebuttal chain
- Example: Paper A rebuts Paper B, then Paper C rebuts Paper A

### 2. Performance on Benchmarks Can Be Misleading
- Always examine what the benchmark actually tests
- Look for complexity analysis of benchmarks
- High accuracy on easy benchmarks proves little

### 3. "Controlled" Evidence is Stronger
- Observational studies show correlation
- Controlled experiments show causation
- Prioritize controlled experiments for causal claims

### 4. Authors Often Acknowledge Limitations
- Check the paper's own limitations section
- Authors' admissions are valuable evidence
- Look for qualifications in the discussion

### 5. Look for Patterns Across Papers
- Same finding from different methods = stronger
- Contradictory findings = needs investigation
- Track which claims are replicated vs. contested

---

## Git Commit Guidelines

- Commit after each paper analysis
- Commit after significant updates
- Use descriptive commit messages with paper arXiv IDs
- Include key findings in commit message

Example:
```
Add analysis: [Paper Title] (arXiv ID)

- Key finding 1
- Key finding 2
- Rebuts/Supports: [other paper]
```

## GitHub CLI

Before using `gh` commands (issues, PRs, etc.), always verify the active account has permission:

```bash
# Check current account and list all authenticated accounts
gh auth status

# If needed, switch account
gh auth switch --user <username>
```

---

## File Structure

```
/project
├── AGENTS.md                    # This file (methodology)
├── README.md                    # Project overview
├── workflow.md                  # Paper analysis workflow
├── papers/
│   ├── paper_list.md           # Master list with status
│   ├── toevaluate.md           # Raw auto-discovered papers (staging)
│   └── toread.md               # Curated papers ready for analysis
├── analysis/
│   ├── synthesis.md            # Main thesis synthesis
│   ├── paper_graph.md          # Paper interaction graph
│   ├── paper_network.md        # Network analysis
│   ├── rebuttals.md            # Rebuttal matrix
│   └── explored/               # Individual paper analyses (97 files)
│       ├── 00-09/              # Papers 00-09
│       ├── 10-19/              # Papers 10-19
│       ├── ...                 # (10-paper bins)
│       └── 90-99/              # Papers 90-99
├── scripts/
│   └── discovery/              # Paper discovery package
│       ├── __init__.py         # Package exports
│       ├── __main__.py         # Entry: uv run scripts/discovery/__main__.py
│       ├── models.py           # Paper, Classification dataclasses
│       ├── search.py           # arXiv search, load known IDs
│       ├── classify.py         # LLM + keyword classification
│       └── output.py           # Markdown formatting, file writing
├── experiments/
│   └── decoding_ablation/
│       └── protocol.md         # OLMo 3 experiment design
└── docs/                        # Interactive visualization
    ├── SPECS.md                # Technical specs for this folder
    ├── index.html              # Main page (graph + overlays)
    ├── pages/                  # Deep-dive standalone pages
    │   ├── data.html           # Pre-training Data Pipeline
    │   ├── tokenization.html   # Tokenization Pipeline
    │   ├── architecture.html   # LLM Architecture Evolution
    │   └── training.html       # Full Training Pipeline (Pre/Mid/Post)
    ├── css/                    # variables, layout, components, responsive
    └── js/
        ├── nodes.js            # Paper node definitions
        ├── links.js            # Relationship link definitions
        ├── data.js             # Meta + combines nodes/links
        └── graph.js            # D3 simulation, interactions, dialogue
```

**Note**: All files are lowercase except `AGENTS.md` and `README.md`.

---

## Status Report Format

When asked for status, provide an ASCII box summary:

```
┌─────────────────────────────────────────────────────────────────────┐
│                         UNTHINKING STATUS                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  PAPERS ANALYZED:        XXX                                        │
│  ├── Supports thesis:    XXX  (XX%)                                 │
│  ├── Challenges:          XX  (X%)                                  │
│  └── Balanced:            XX  (XX%)                                 │
│                                                                     │
│  PAPERS REMAINING:       XXX  (in toread.md)                        │
│  TOTAL TRACKED:          XXX                                        │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                       VISUALIZATION                                 │
├─────────────────────────────────────────────────────────────────────┤
│  Nodes:                  XXX                                        │
│  Links:                  XXX                                        │
│  Live: proteusiq.github.io/unthinking                               │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                    SESSION SUMMARY                                  │
├─────────────────────────────────────────────────────────────────────┤
│  Papers Added:           X (###-###)                                │
│  Topic:                  [Topic cluster]                            │
│                                                                     │
│  #XXX  Paper Title (arXiv ID)                                       │
│        → Key finding in one line                                    │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                       KEY INSIGHT                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  [Synthesis of what the session's papers reveal]                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Status Report Guidelines

1. **All lines in ASCII box must have same length** (71 chars in example above)
2. **Use Python to verify alignment** before outputting:
   ```python
   lines = box.split('\n')
   assert len(set(len(line) for line in lines)) == 1
   ```
3. **Include numbers from actual files**:
   - `papers/paper_list.md` — paper counts, stance breakdown
   - `papers/toread.md` — remaining count
   - `docs/js/nodes.js` — node count
   - `docs/js/links.js` — link count
   - `git log --oneline -5` — recent commits
4. **Session summary**: List papers added in current session with one-line findings
5. **Key insight**: Synthesize what the papers reveal about the thesis
