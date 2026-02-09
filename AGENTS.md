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

## Analysis File Template

Each paper analysis should follow this structure:

```markdown
# Paper Analysis: [Title]

## Metadata
- **arXiv ID**: 
- **Title**: 
- **Authors**: 
- **Date**: 
- **Venue**: 

---

## Core Claims
[Numbered list of main claims]

---

## Methodology
[How they tested their claims]

---

## Key Evidence
[Tables with actual numbers, key experimental results]

---

## Relationship to Other Papers
### Supports
### Challenges
### Extends
### Challenged By

---

## REBUTTALS TO THIS PAPER
### Search for Direct Rebuttals
### Potential Counter-Arguments
### Limitations (Authors Acknowledge)

---

## Key Quotes
[Direct quotes with context]

---

## Status
- [ ] Read complete (HTML version)
- [ ] Core claims extracted
- [ ] Methodology documented
- [ ] Key evidence with numbers
- [ ] Cross-references identified
- [ ] **Rebuttals checked**
- [ ] **Paper graph updated**
```

---

## Expanding the Paper Corpus

### Systematic arXiv Search
When the initial paper list needs expansion, conduct systematic searches:

1. **Search Strategy**:
   - Use arXiv search with date filters (e.g., 2024-2026)
   - Search multiple query terms covering different angles:
     - Core topic: "LLM reasoning", "chain of thought"
     - Skeptical: "reasoning limitations", "reasoning failure"
     - Mechanistic: "interpretability reasoning", "reasoning circuits"
     - Emergent: "emergent reasoning", "reasoning generalization"
   - Include venue filters when possible (ICLR, NeurIPS, EMNLP, ACL)

2. **Categorization**:
   - Group papers by sub-topic (CoT faithfulness, compositional generalization, etc.)
   - Mark expected stance (FOR/AGAINST thesis, BALANCED)
   - Note venue and any awards (Outstanding Paper, Best Paper)
   - Prioritize papers that directly test the thesis

3. **Priority Assignment**:
   - HIGH: Directly tests thesis claims with controlled experiments
   - HIGH: Award-winning papers (signal quality)
   - HIGH: Papers that challenge the thesis (steel-man the opposition)
   - MEDIUM: Extends existing findings with new evidence
   - LOW: Tangentially related or overlaps with analyzed papers

4. **Update paper_list.md**:
   - Add new papers with arXiv ID, title, expected stance
   - Mark as NOT_STARTED
   - Group logically (by topic or by stance)

### Example Search Session
```
Query: "LLM reasoning" + date:2024-2026 + category:cs.CL
→ Found 150 results
→ Filtered to 25 high-relevance papers
→ Categorized: 8 CoT, 5 compositional, 4 emergent, 4 mechanistic, 4 other
→ Added to paper_list.md with expected stance
```

---

## Workflow

**IMPORTANT**: See `workflow.md` for detailed step-by-step instructions.

**CRITICAL**: Nothing is done until it is pushed. A task is only complete when changes are committed AND pushed to the remote repository.

### When Analyzing a New Paper:
1. Try fetch the full HTML version first from arXiv. If unavailable, download the PDF.
2. Read completely, not just abstract
3. Extract core claims with supporting evidence
4. Document methodology and limitations
5. Search for rebuttals on arXiv
6. Cross-reference with papers already analyzed
7. Create analysis file (`analysis/explored/XX_paper_name.md`)
8. Update the paper list (`papers/paper_list.md`)
9. Update the paper interaction graph (`analysis/paper_graph.md`)
10. Update the synthesis (`analysis/synthesis.md`) if significant evidence
11. Update the visualization data (`docs/js/data.js`)
12. Update README.md paper counts
13. **COMMIT changes to git**
14. **PUSH to deploy docs** (GitHub Pages serves from main branch)
15. Remove from `papers/toread.md` if applicable

### Post-Analysis Checklist (VERIFY BEFORE COMMITTING)
Run through this checklist after every paper analysis:

- [ ] **Analysis file created** (`analysis/explored/XX_paper_name.md`)
- [ ] **paper_list.md updated** (new entry with status DONE)
- [ ] **paper_graph.md updated** (relationships + update log)
- [ ] **synthesis.md updated** (papers table + evidence mapping if significant)
- [ ] **rebuttals.md updated** (if paper rebuts or is rebutted by existing papers)
- [ ] **paper_network.md updated** (update counts + add to cluster if significant)
- [ ] **data.js updated** (new node + links + meta.totalAnalyzed + keyQuotes + analysisUrl)
- [ ] **README.md updated** (paper counts in badges and folder)
- [ ] **Rebuttals section complete** in analysis file
- [ ] **File numbering sequential** (no gaps in XX_paper_name.md)
- [ ] **Committed and pushed**

---

## Visualization Data (data.js)

When adding a paper to `docs/js/data.js`, include these fields:

### Required Fields
```javascript
{
  id: '2305.18654',           // arXiv ID
  title: 'Faith and Fate...', // Full title
  shortTitle: 'Faith & Fate', // Display name (for graph labels)
  date: 'May 2023',           // Publication date
  stance: 'supports',         // supports | challenges | balanced
  cluster: 'compositional',   // Thematic cluster
  coreArgument: '...',        // One sentence - paper's own claim, NO EDITORIAL EMPHASIS
  keyEvidence: ['...'],       // Array of key findings
}
```

### Optional Fields (Recommended)
```javascript
{
  keyQuotes: [                // 1-2 quotes from the paper's own words
    "Direct quote from paper...",
    "Another key quote..."
  ],
  analysisUrl: 'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/XX-XX/XX_paper_name.md'
}
```

### Guidelines for coreArgument
- Use the paper's own language, not editorial emphasis
- NO ALL CAPS for emphasis (e.g., ~~"FOUNDATIONAL"~~, ~~"WORSE"~~)
- Keep objective — let the evidence speak for itself
- One sentence summarizing what the paper claims

### Guidelines for keyQuotes
- Extract from the "Key Quotes" section of the analysis file
- Use the paper's exact words
- Keep under 200 characters if possible
- Choose quotes that capture the paper's core contribution

### Stance Values
| Value | Meaning | Color |
|-------|---------|-------|
| `supports` | Supports thesis (LLMs are pattern matchers) | Green |
| `challenges` | Challenges thesis (evidence for reasoning) | Red |
| `balanced` | Mixed evidence | Yellow |

### Verification Checklist (Run Periodically)
Ensure node count in `docs/js/data.js` matches analyzed papers:
```bash
# Count nodes in data.js
grep -c "id: '" docs/js/data.js

# Count DONE papers in paper_list.md
grep -c "DONE" papers/paper_list.md

# Find papers missing from data.js
grep "id: '" docs/js/data.js | sed "s/.*id: '\\([^']*\\)'.*/\\1/" | sort > /tmp/data_ids.txt
grep -E "^\\| [0-9]+ \\| [0-9]" papers/paper_list.md | awk -F'|' '{gsub(/ /,"",$3); print $3}' | sort > /tmp/paper_ids.txt
comm -23 /tmp/paper_ids.txt /tmp/data_ids.txt
```
If mismatch found, add missing papers to `docs/js/data.js` nodes and links.

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

Before using `gh` commands (issues, PRs, etc.), always verify and switch to the correct account:

```bash
# Check current account
gh auth status

# Get repo owner from git remote
git remote -v | grep origin | head -1 | sed 's/.*github.com[:/]\([^/]*\).*/\1/'

# Switch to the repo owner account
gh auth switch --user <owner>
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
    ├── index.html
    ├── css/                    # variables, layout, components, responsive
    └── js/                     # data.js, graph.js
```

**Note**: All files are lowercase except `AGENTS.md` and `README.md`.
