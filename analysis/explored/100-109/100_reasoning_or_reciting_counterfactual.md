# Paper Analysis: Reasoning or Reciting? Exploring the Capabilities and Limitations of Language Models Through Counterfactual Tasks

## Metadata
- **arXiv ID**: 2307.02477
- **Title**: Reasoning or Reciting? Exploring the Capabilities and Limitations of Language Models Through Counterfactual Tasks
- **Authors**: Zhaofeng Wu, Linlu Qiu, Alexis Ross, Ekin Akyürek, Boyuan Chen, Bailin Wang, Najoung Kim, Jacob Andreas, Yoon Kim
- **Date**: July 2023 (NAACL 2024)
- **Venue**: **NAACL 2024** — top-tier NLP venue
- **Affiliations**: MIT, Boston University

---

## Core Claims

1. **LMs rely on "narrow, non-transferable procedures"** rather than general reasoning skills
2. **Counterfactual task variants** reveal the difference between task-specific memorization and genuine reasoning
3. **Performance degrades substantially and consistently** on counterfactual variants despite high CCC scores
4. **Models understand the counterfactual conditions** (high CCC) but fail to apply reasoning under them
5. **CoT prompting helps but doesn't close the gap** between default and counterfactual performance

---

## Methodology

### Counterfactual Task Framework

The paper formalizes tasks as functions:
```
f_w: X → Y
```
Where:
- `w` = world model (conditions/rules under which task is performed)
- `w_default` = standard conditions (e.g., base-10 arithmetic)
- `w_cf` = counterfactual conditions (e.g., base-9 arithmetic)

**Key insight**: If models have genuine reasoning, performance should be similar on `w_default` and `w_cf`. If they rely on memorization, counterfactual performance will drop.

### Counterfactual Comprehension Check (CCC)

To rule out that models simply don't understand the counterfactual conditions, they introduce CCCs — simpler tasks that verify the model understood `w_cf`:
- Example: For base-9 arithmetic, CCC asks "what comes after 8?" (answer: 10 in base-9)
- High CCC + low task performance = model understands conditions but can't apply reasoning

### 11 Tasks Tested

| Task | Default | Counterfactual |
|------|---------|----------------|
| Arithmetic | Base-10 | Base-8, 9, 11, 16 |
| Programming | Python (0-indexed) | ThonPy (1-indexed) |
| Syntactic Reasoning | SVO word order | Other word orders |
| First-Order Logic | Common-sense premises | Counter-intuitive premises |
| Spatial Reasoning | Standard coordinates | Rotated/swapped axes |
| Drawing | Normal orientation | Rotated/flipped |
| Music (chords) | Standard tuning | Altered tuning |
| Music (melody) | Original key | Transposed key |
| Chess | Standard positions | Chess960 (knights/bishops swapped) |
| SET Game | Standard rules | Inverted number rule |

---

## Key Evidence

### Main Results (GPT-4, 0-shot CoT)

| Task | Default | Counterfactual | Drop |
|------|---------|----------------|------|
| Arithmetic (base-10 vs base-9) | ~95% | ~55% | **40pp** |
| Code Execution | ~70% | ~35% | **35pp** |
| Code Generation | ~80% | ~30% | **50pp** |
| Spatial Reasoning | ~75% | ~40% | **35pp** |
| Drawing | ~70% | ~45% | **25pp** |
| Chess | ~85% | ~45% | **40pp** |

### Critical Finding: High CCC, Low Task Performance

| Task | CCC Score | Counterfactual Task |
|------|-----------|---------------------|
| Arithmetic | ~95% | ~55% |
| Programming | ~90% | ~30% |
| Spatial | ~85% | ~40% |

**This is the smoking gun**: Models UNDERSTAND the counterfactual conditions but CAN'T APPLY their "reasoning" skills.

### Analysis Findings

1. **Commonness matters**: Base-8 and base-16 (more common) perform better than base-9 and base-11
2. **Default-CF correlation**: Better default performance predicts better CF performance (r=0.7-0.8)
3. **CoT helps both** but doesn't close the gap
4. **Few-shot helps** but gap persists

---

## Key Quotes

> "While current LMs may possess abstract task-solving skills to an extent, they often also rely on narrow, non-transferable procedures for task-solving."

> "This suggests that these models' ability on these tasks is supported at least in part by non-transferable, default-condition-specific behaviors rather than abstract, generalizable reasoning skills."

> "The performance on counterfactual task variants consistently and substantially degrades relative to the performance on the default settings."

> "A high CCC performance indicates that the model understands the counterfactual conditions, yet it still fails to apply its reasoning skills under those conditions."

---

## Relationship to Thesis

### STRONGLY SUPPORTS the Thesis

**The thesis**: "LLM reasoning is practical but fundamentally predictive—pattern matching from training distributions, not genuinely generative reasoning"

This paper provides **foundational methodology and evidence**:

1. **Introduces counterfactual testing** — the methodology used by many subsequent papers (GSM-Symbolic, Lewis & Mitchell, etc.)
2. **Shows default/counterfactual gap** — exactly what the thesis predicts
3. **CCC proves understanding ≠ reasoning** — models can recognize conditions but not apply genuine reasoning
4. **"Narrow, non-transferable procedures"** — directly supports pattern matching interpretation

### This is a Foundational Paper

Many papers in our corpus cite or extend this methodology:
- GSM-Symbolic uses similar perturbation approach
- Lewis & Mitchell (TMLR 2025) uses "counterfactual alphabets"
- "On the Notion that LMs Reason" cites this paper directly

---

## Relationship to Other Papers

### Supports

| Paper | How |
|-------|-----|
| **GSM-Symbolic (2410.05229)** | Same methodology; both show perturbation breaks performance |
| **Faith and Fate (2305.18654)** | Both show OOD failure; this adds counterfactual framework |
| **On the Notion that LMs Reason (2511.11810)** | Directly cites this; both argue LMs use "narrow procedures" |
| **Content Effects (2207.07051)** | Both show training distribution determines capability |
| **Lewis & Mitchell (TMLR 2025)** | Uses same counterfactual methodology |

### Extends

| Paper | How |
|-------|-----|
| **Prior probing work** | Extends to counterfactual evaluation |
| **Data contamination literature** | Provides methodology to test beyond contamination |

### Provides Framework For

| Concept | Framework |
|---------|-----------|
| **Counterfactual evaluation** | Foundational methodology now widely used |
| **CCC (Comprehension Check)** | Controls for prompt understanding |
| **Default/Counterfactual gap** | Operationalizes "pattern matching vs reasoning" |

---

## REBUTTALS TO THIS PAPER

### Limitations Acknowledged by Authors

1. **Underestimation risks**:
   - Counterfactual tasks may be inherently harder (controlled for via CCC)
   - Models may be able to learn CF conditions with more in-context examples

2. **Overestimation risks**:
   - Models may use shortcuts (e.g., rotate() function for drawing)
   - Chain-of-thought may help more than tested

### Potential Counter-Arguments

1. **Fine-tuning might help** — Not tested
2. **Larger models might close gap** — Partially addressed (GPT-4 still shows gap)
3. **More complex prompting** — Few-shot helps but gap persists

### No Direct Rebuttals Found

This paper's methodology has been **widely adopted**, not challenged.

---

## Assessment

### Independent Assessment

This is a **foundational paper** that:
1. **Introduces rigorous methodology** for testing reasoning vs. memorization
2. **Provides extensive empirical evidence** across 11 diverse tasks
3. **Includes proper controls** (CCC) to rule out confounds
4. **Published at top venue** (NAACL 2024)
5. **Highly influential** — methodology adopted by many subsequent papers

### Stance Classification: **STRONGLY SUPPORTS**

The paper directly supports the thesis by:
- Demonstrating "narrow, non-transferable procedures"
- Showing high CCC + low CF performance = understanding ≠ reasoning
- Providing methodology now used to generate more evidence for thesis

### Significance

- **NAACL 2024** (top-tier venue)
- **MIT/BU authors** (Jacob Andreas, Yoon Kim — leading researchers)
- **Foundational methodology** — many papers build on this
- **Extensive experiments** — 11 tasks, 4 models, multiple conditions

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
- [x] data.js updated
