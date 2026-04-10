# Paper Analysis: Graph of Thoughts: Solving Elaborate Problems with Large Language Models

## Metadata
- **arXiv ID**: 2308.09687
- **Title**: Graph of Thoughts: Solving Elaborate Problems with Large Language Models
- **Authors**: Maciej Besta, Nils Blach, Ales Kubicek, Robert Gerstenberger, Lukas Gianinazzi, Joanna Gajda, Tomasz Lehmann, Michal Podstawski, Hubert Niewiadomski, Piotr Nyczyk, Torsten Hoefler (ETH Zurich)
- **Date**: August 2023
- **Venue**: AAAI 2024

---

## Core Claims

1. **62% improvement over ToT**: GoT claims advancement in reasoning via graph-structured thought aggregation.

2. **Authors admit LLMs can't sort**: "The considered LLMs are unable to sort a sequence of numbers correctly beyond a certain length."

3. **GoO is human-constructed**: The Graph of Operations is "a static structure that is constructed once, before the execution starts."

4. **Gains from external algorithms**: The 62% improvement comes from applying merge sort, not from LLM reasoning.

---

## Methodology

### Tasks Tested (All Algorithmic)
- **Sorting 128 numbers**: ~75% accuracy
- **Set intersection**: ~76% accuracy
- **Set union**: ~91% accuracy
- **Keyword counting**: ~95% accuracy

### GoT Framework
1. Human designs Graph of Operations (GoO) for task
2. Controller decomposes problem according to GoO
3. LLM processes sub-problems (small chunks)
4. External aggregation combines results

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY INSIGHT: GoT's "reasoning" is in the FRAMEWORK, not the LLM   │
│                                                                     │
│  62% gain = merge sort algorithm, not LLM insight                  │
│  GoO (Graph of Operations) = PRE-CONSTRUCTED by humans             │
│  Authors admit: LLMs cannot sort beyond ~16-32 elements            │
│  ~75% accuracy ceiling on 128 numbers (should be 100%)             │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Key Evidence

| Finding | Quantitative | Context |
|---------|--------------|---------|
| Sorting ceiling | ~75% on 128 numbers | Far below 100% expected |
| Without scaffolding | ~15% (IO baseline) | LLMs fail without structure |
| Cost reduction | >31% vs ToT | Efficiency from algorithm |
| Max sortable length | ~16-32 by LLM alone | Fundamental capability limit |

---

## Relationship to Other Papers

### Supports
- **#299 Tree of Thoughts** (2305.10601): ToT adds search; GoT adds aggregation
- **#1 Faith and Fate** (2305.18654): Both show decomposition helps but doesn't create reasoning
- **#2 Illusion of Thinking** (2506.06941): Both show complexity thresholds

### Extends
- **#299 Tree of Thoughts** (2305.10601): GoT generalizes ToT to arbitrary graph structures

---

## REBUTTALS

### Known Rebuttals
None directly rebutting GoT methodology.

### Limitations (Authors Acknowledge)
1. All tasks are well-defined algorithmic problems
2. No tasks require discovering new patterns
3. GoO must be human-designed per task
4. Performance ceiling exists even with optimal scaffolding

---

## Key Quotes

> "The considered LLMs are unable to sort a sequence of such numbers correctly beyond a certain length."

> "GoO is a static structure that is constructed once, before the execution starts."

> "We select merge sort for its straightforward alignment with the graph structure of GoT."

---

## Significance for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHAT GoT ACTUALLY DEMONSTRATES                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ✓ External algorithms (merge sort) improve LLM outputs            │
│  ✓ Human-designed scaffolding helps on decomposable tasks          │
│  ✓ LLMs can process small chunks reliably                          │
│                                                                     │
│  ✗ LLMs can reason about complex problems                          │
│  ✗ LLMs can discover or construct reasoning graphs                 │
│  ✗ "Synergistic outcomes" emerge from LLM reasoning                │
│                                                                     │
│  The "reasoning" in Graph of Thoughts is in the FRAMEWORK,         │
│  not in the LLM.                                                   │
└─────────────────────────────────────────────────────────────────────┘
```

**Stance**: SUPPORTS

Despite framing as "advancing reasoning," GoT demonstrates LLM limitations: authors admit LLMs can't sort, gains come from merge sort, and graphs are human-designed.

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
