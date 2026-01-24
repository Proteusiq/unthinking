# Literature Review Methodology

## Overview
Rules and methodology for conducting systematic literature reviews on AI/ML research papers.

---

## Core Principles

### 1. Read the FULL Paper, Not Just the Abstract
- **ALWAYS** fetch and read the complete HTML version of papers (arxiv.org/html/)
- Abstracts can be misleading or incomplete
- Key evidence, methodology details, and limitations are often in the body
- Look for actual numbers, experimental setups, and edge cases

### 2. Rebuttal Analysis is MANDATORY
For EVERY paper analyzed, you MUST:
1. **Search for direct arXiv rebuttals** — check if other papers cite/challenge this work
2. **Check for counter-evidence from other analyzed papers** in the corpus
3. **Document rebuttals in BOTH directions** — papers can be challenged AND can challenge others
4. **Include a REBUTTALS section** in each analysis file
5. **Update the paper interaction graph** (see below)

### 3. Evidence Must Have Numbers
- Extract specific quantitative results (percentages, metrics, sample sizes)
- Document experimental conditions (models tested, datasets used)
- Note statistical significance where provided
- Flag when papers make claims without quantitative support

### 4. Track Paper Interactions (MANDATORY)
For EVERY paper analyzed, you MUST update the paper interaction graph:
1. **Document relationships**: supports, challenges, extends, provides mechanism for
2. **Track rebuttal chains**: A rebuts B, C rebuts A's rebuttal, etc.
3. **Update `analysis/PAPER_GRAPH.md`** with new interactions
4. **Identify papers with NO rebuttals** — these are stronger evidence

---

## Paper Interaction Graph

### Purpose
Track how papers relate to each other — who rebuts whom, who builds on whom, chains of rebuttals.

### Format
Maintain in `analysis/PAPER_GRAPH.md`:

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

## Workflow

### When Analyzing a New Paper:
1. Fetch the full HTML version from arXiv
2. Read completely, not just abstract
3. Extract core claims with supporting evidence
4. Document methodology and limitations
5. Search for rebuttals on arXiv
6. Cross-reference with papers already analyzed
7. Update the paper interaction graph
8. Mark paper as done in paper_list.md
9. **COMMIT changes to git**

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

---

## File Structure

```
/project
├── AGENTS.md                    # This file (methodology)
├── papers/
│   └── paper_list.md           # Master list with status
└── analysis/
    ├── PAPER_GRAPH.md          # Paper interaction graph
    ├── 01_paper_name.md        # Individual analyses
    ├── 02_paper_name.md
    └── ...
```
