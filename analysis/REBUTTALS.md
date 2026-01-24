# Rebuttals & Counter-Evidence Matrix

This document tracks rebuttals **in both directions**:
- Rebuttals to "Against" papers (challenging pattern-matching thesis)
- Rebuttals to "For" papers (challenging genuine reasoning thesis)

---

## Rebuttals to "AGAINST" Papers

### 1. The Illusion of Thinking (2506.06941) — **3 REBUTTALS**

| Rebuttal | arXiv | Core Argument | Validity |
|----------|-------|---------------|----------|
| **Lawsen** | 2506.09250 | Token limits exceeded; River Crossing N>5 mathematically impossible; alternative representations restore performance | HIGH |
| **Khan et al. (Agentic Gap)** | 2506.18957 | Execution gap, not reasoning gap; with tools, models solve beyond cliff | HIGH |
| **Song et al. (Thinking Isn't Illusion)** | 2507.17699 | Tool augmentation: Hanoi 0%→100%, River Crossing →98.3% | HIGH |

**Assessment**: Original paper has significant methodological issues. Claims should be qualified.

---

### 2. GSM-Symbolic (2410.05229) — **NO DIRECT REBUTTAL FOUND**

However, implicit counter-evidence exists:
- DeepSeek-R1 achieves 97.3% on MATH500 (higher than GSM-Symbolic's test set)
- s1 shows robust performance with minimal training

**Assessment**: Paper's core findings (fragility to irrelevant info) remain unrebutted.

---

### 3. Faith and Fate (2305.18654) — **NO DIRECT REBUTTAL FOUND**

Theoretical foundation remains unchallenged:
- "Linearized subgraph matching" mechanism not disputed
- Exponential error accumulation predictions confirmed by multiple papers

**Assessment**: Foundational theory stands. Strongest "Against" paper.

---

### 4. CoT Mirage (2508.01191) — **NO DIRECT REBUTTAL FOUND**

DataAlchemy methodology appears sound:
- Controlled ID/OOD experiments
- ID=100%, OOD=0% finding is stark

**Assessment**: Distribution-dependence claim robust.

---

### 5. Measuring Faithfulness (2307.13702) — **EXTENSIONS, NOT REBUTTALS**

Related work that builds on (not rebuts) findings:
| Paper | arXiv | Contribution |
|-------|-------|--------------|
| FUR (Unlearning) | 2502.14829 | New method to measure faithfulness via unlearning |
| FRIT | 2509.13334 | Method to *improve* faithfulness (implies problem is real) |

**Assessment**: Unfaithfulness finding is accepted; work focuses on fixing it.

---

### 6. Semantic Deception (2512.20812) — **NO DIRECT REBUTTAL FOUND**

Simple, controlled experiment:
- Novel symbol systems with semantic load
- Reasoning models fail MORE than base models

**Assessment**: Finding robust within experimental scope.

---

### 7. Reasoning Models Don't Say (2505.05410) — **NO DIRECT REBUTTAL FOUND**

Anthropic's own research:
- 25-40% faithfulness across models
- Misaligned hints hidden MORE

**Assessment**: Strong internal validity. Industry acknowledges problem.

---

## Rebuttals to "FOR" Papers

### 1. CoT Without Prompting (2402.10200) — **IMPLICIT CHALLENGES**

| Challenge | Source | Argument |
|-----------|--------|----------|
| CoT exists but is unfaithful | Measuring Faithfulness, Don't Say | Intrinsic CoT doesn't mean faithful CoT |
| Distribution-dependent | CoT Mirage | CoT paths may only exist for in-distribution |
| Post-hoc rationalization | Semantic Deception | Even if CoT exists, it may not drive decisions |

**Assessment**: Finding (CoT exists) is valid, but interpretation (genuine reasoning) is challenged.

---

### 2. DeepSeek-R1 (2501.12948) — **MULTIPLE CRITIQUES**

| Critique | Evidence | Implication |
|----------|----------|-------------|
| Still fails on OOD | CoT Mirage, Illusion | "Aha moments" may be within-distribution only |
| CoT unfaithful | Don't Say (tests R1) | R1's CoT only 39% faithful |
| Semantic override | Semantic Deception (tests R1) | R1 fails MORE on semantic traps than base |
| Training data leakage | General concern | AIME/MATH in training data |

**Assessment**: Impressive results, but "genuine reasoning" interpretation challenged.

---

### 3. s1: Simple Test-Time Scaling (2501.19393) — **IMPLICIT LIMITATIONS**

| Limitation | Evidence | Implication |
|------------|----------|-------------|
| Distribution-dependent | Requires 50 MSC categories | "Surfacing" still needs coverage |
| Eventually saturates | Budget forcing loops | Can't extrapolate indefinitely |
| Distillation from Gemini | Methodology | Success may depend on teacher |

**Assessment**: "Surfacing" hypothesis supported, but still distribution-bounded.

---

### 4. Thinking Isn't an Illusion (2507.17699) — **COUNTER-COUNTER EVIDENCE**

| Counter-argument | Source | Implication |
|------------------|--------|-------------|
| Tool use ≠ reasoning | Conceptual | Following tools ≠ understanding |
| Tools provide algorithm | Lawsen observation | Model executes, doesn't derive |
| Still unfaithful with tools | Don't Say | CoT remains unreliable |

**Assessment**: Execution fixed, but "genuine reasoning" still questionable.

---

## Summary: Rebuttal Landscape

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         REBUTTAL LANDSCAPE                                  │
│                                                                             │
│  AGAINST PAPERS                          FOR PAPERS                         │
│  ──────────────                          ──────────                         │
│                                                                             │
│  Illusion of Thinking ←───────────────→ Thinking Isn't Illusion            │
│  [3 rebuttals, weakened]                 [counter-counter exists]           │
│                                                                             │
│  Faith and Fate ←─────────────────────→ DeepSeek-R1                         │
│  [NO rebuttal, strong]                   [multiple critiques]               │
│                                                                             │
│  GSM-Symbolic ←───────────────────────→ s1 Simple Scaling                   │
│  [NO rebuttal, solid]                    [limitations acknowledged]         │
│                                                                             │
│  Measuring Faithfulness ←─────────────→ CoT Without Prompting               │
│  [extensions confirm problem]            [faithful? challenged]             │
│                                                                             │
│  CoT Mirage ←─────────────────────────→ (no direct counter)                 │
│  [NO rebuttal, robust]                                                      │
│                                                                             │
│  Semantic Deception ←─────────────────→ (no direct counter)                 │
│  [NO rebuttal, controlled]                                                  │
│                                                                             │
│  Don't Always Say ←───────────────────→ (no direct counter)                 │
│  [NO rebuttal, Anthropic's own]                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Implications for Thesis

### Strongest "Against" Evidence (Unrebutted)
1. **Faith and Fate** — Theoretical foundation stands
2. **CoT Mirage** — ID=100%, OOD=0% unchallenged
3. **Measuring Faithfulness** — CoT unfaithfulness accepted
4. **Semantic Deception** — Semantic override demonstrated
5. **Don't Always Say** — 25-40% faithfulness confirmed

### Weakened "Against" Evidence
1. **Illusion of Thinking** — Methodological critiques valid; must qualify

### Strongest "For" Evidence
1. **CoT exists intrinsically** — But may be unfaithful
2. **RL surfaces capability** — But still distribution-bounded
3. **Tool augmentation works** — But may be execution, not reasoning

### Key Unresolved Questions
1. Does tool success prove reasoning or just competent execution?
2. Is "surfaced" reasoning genuine or sophisticated pattern completion?
3. Can unfaithful CoT coexist with genuine internal reasoning?

---

## Revised Thesis Position (Accounting for Rebuttals)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    THESIS AFTER REBUTTAL ANALYSIS                           │
│                                                                             │
│  CONFIDENT CLAIMS:                                                          │
│  ✓ CoT is often unfaithful (multiple unrebutted papers)                     │
│  ✓ Success is distribution-dependent (CoT Mirage, Faith & Fate)             │
│  ✓ Semantic associations can override instructions (Semantic Deception)     │
│  ✓ Reasoning patterns pre-exist in base models (s1, CoT-WP)                 │
│                                                                             │
│  QUALIFIED CLAIMS:                                                          │
│  ~ "Reasoning collapse" may be execution limit (valid rebuttals)            │
│  ~ Tool augmentation reverses some failures (but ≠ proof of reasoning)      │
│  ~ RL "surfaces" capability (but still bounded by distribution)             │
│                                                                             │
│  CONTESTED CLAIMS:                                                          │
│  ? Whether tool success proves "genuine" reasoning                          │
│  ? Whether "Aha moments" are reasoning or pattern recognition               │
│  ? Whether unfaithful CoT is compatible with genuine internal reasoning     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```
