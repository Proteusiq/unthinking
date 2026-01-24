# Paper Analysis: Correlation or Causation: Analyzing the Causal Structures of LLM and LRM Reasoning Process

## Metadata
- **arXiv ID**: 2509.17380
- **Title**: Correlation or Causation: Analyzing the Causal Structures of LLM and LRM Reasoning Process
- **Authors**: Zhizhang Fu, Guangsheng Bao, Hongbo Zhang, Chenkai Hu, Yue Zhang
- **Date**: September 2025
- **Venue**: Preprint
- **Stance**: BALANCED (with important "Against" implications for CoT faithfulness, but "For" RLVR)

---

## Core Claims

1. **LLMs lack robust causal underpinnings** — they rely on superficial correlations rather than genuine understanding
2. **RLVR-trained LRMs exhibit enhanced causal reasoning** — align more closely with ideal causal structures
3. **Distilled LRMs fail to address causality deficiencies** — similar to base LLMs
4. **RLVR reduces spurious correlations** — strengthens genuine causal patterns
5. **Four SCM types identified**: Causal Chain (ideal), Common Cause (explaining), Full Connection (mixed), Isolation (memorizing)

---

## Methodology

### Structural Causal Model (SCM) Framework

**Variables analyzed**:
- Z (Instruction) — problem/task description
- T (Thinking) — implicit CoT for LRMs only
- X (CoT) — explicit reasoning steps
- Y (Answer) — final output

**Treatment experiments**: Intervene on one variable, observe effect on Y
- **Random CoT intervention**: Replace CoT with randomized reasoning
- **Instruction bias intervention**: Add "I think the answer is [wrong answer]"
- **Random Thinking intervention**: Replace thinking process (LRMs only)

### SCM Types Identified

| Type | Structure | Behavior | Implication |
|------|-----------|----------|-------------|
| **I (Ideal)** | Z → X → Y | Causal Chain | Genuine reasoning |
| **II** | X ← Z → Y | Common Cause | Post-hoc explanation, not reasoning |
| **III** | Z → Y, X → Y | Full Connection | Mixed reasoning/explaining |
| **IV** | Z → ?, X → ? (neither affects Y) | Isolation | Memorization |

---

## Key Evidence

### Finding 1: LLMs vs LRMs — SCM Distribution

| Model Type | SCM-I (Ideal) | SCM-II | SCM-III | SCM-IV |
|------------|---------------|--------|---------|--------|
| **LLMs** | 30% | 20% | 23% | 27% |
| **LRMs** | 63% | 3% | 30% | 3% |

**Critical**: LLMs only show ideal causal structure 30% of the time!

### Finding 2: Training Method Matters

| Training Method | Effect on Causality |
|-----------------|---------------------|
| RLHF | Minimal positive/negative |
| Distillation | Does NOT improve causality |
| **RLVR** | **Substantially enhances causality** |
| ICL (few-shot) | Limited positive effect |

### Finding 3: Specific Model Results

| Model | SCM-I Count | Primary Method |
|-------|-------------|----------------|
| GPT-4 | 2/6 tasks | RLHF |
| Qwen2.5-32B-Instruct | 3/6 tasks | Instruction tuning |
| R1-Distill-Qwen-32B | 3/6 tasks | Distillation |
| **DeepSeek-R1** | **5/6 tasks** | RLVR + Distill |
| **QwQ-32B** | **5/6 tasks** | RLVR |

### Finding 4: RLVR Training Dynamics

> "RLVR consistently improves the causal relationships over the course of training, by reducing spurious correlations and strengthening models' genuine causal patterns"

During RLVR training:
- Spurious feature reliance decreases
- Causal structure improves (R-ATE: X→Y increases)
- High correlation between reduced spurious features and improved causality

---

## Critical Analysis for Thesis

### Strong Support for "Against" Position

1. **LLM CoT is often NOT causal**:
   - 70% of LLM SCMs are NOT ideal type
   - 47% show CoT has NO significant effect on answers (Type II + IV)
   - CoT is "more like an explanation to the models' hidden belief, instead of reasoning"

2. **Distillation doesn't fix causality**:
   - Distilled LRMs have similar causal deficiencies as base LLMs
   - "Distilled LRMs fail to address causality-related deficiencies"

3. **Confirms unfaithfulness findings**:
   - "Correct CoTs may lead to incorrect answers, and incorrect CoTs to correct answers"
   - Direct causal evidence for post-hoc rationalization

### Nuanced Support for "For" Position

1. **RLVR does improve causality**:
   - 63% ideal SCMs for RLVR-trained LRMs vs 30% for LLMs
   - "RLVR reduces spurious correlations and strengthens genuine causal patterns"

2. **But note**: Even best LRMs (DeepSeek-R1, QwQ) still not 100% ideal
   - 83% ideal = still 17% non-ideal SCMs

---

## Relationship to Other Papers

### Supports
- **Measuring Faithfulness** — CoT unfaithfulness confirmed via causal analysis
- **Faith and Fate** — Pattern matching vs reasoning distinction validated
- **Don't Always Say** — Post-hoc rationalization explanation supported

### Extends
- **DeepSeek-R1** — Explains WHY RLVR improves: reduces spurious correlations
- **s1** — Explains WHY training matters: causal structure improvement

### Qualified By
- This paper shows RLVR helps causality, but doesn't prove "genuine reasoning"
- Causal chain could still be pattern completion within distribution

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct arXiv rebuttal found as of analysis date.

### Potential Counter-Arguments

| Counter | Response |
|---------|----------|
| "SCM analysis is limited" | Limited to four variables; may miss complexity |
| "Causal chain ≠ genuine reasoning" | True — pattern matching can still form causal chains within distribution |
| "Only tests specific tasks" | Math and logic tasks may not generalize |

### Limitations (Authors Acknowledge)
1. Simplified four-variable model
2. Task-specific findings may not generalize
3. Causal chain doesn't prove understanding

---

## Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│           CORRELATION OR CAUSATION (2509.17380)                             │
│                                                                             │
│  KEY FINDING:                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ LLMs: Only 30% ideal causal structure                               │    │
│  │ LRMs (RLVR): 63% ideal causal structure                            │    │
│  │ LRMs (Distill): Similar to LLMs — distillation doesn't help        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  SCM TYPES:                                                                 │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐     │
│  │ Type I      │   │ Type II     │   │ Type III    │   │ Type IV     │     │
│  │ Causal Chain│   │ Common Cause│   │ Full Connect│   │ Isolation   │     │
│  │ (Reasoning) │   │ (Explaining)│   │ (Mixed)     │   │ (Memorizing)│     │
│  │ Z→X→Y       │   │ X←Z→Y       │   │ Z→Y, X→Y   │   │ Neither→Y  │     │
│  │ IDEAL       │   │ UNFAITHFUL  │   │ AUTOREGRESS│   │ MEMORIZE    │     │
│  └─────────────┘   └─────────────┘   └─────────────┘   └─────────────┘     │
│                                                                             │
│  THESIS IMPLICATION:                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ • LLM CoT is often post-hoc explanation (Type II), not reasoning   │    │
│  │ • Distillation doesn't fix this — still "correlation not causation"│    │
│  │ • RLVR improves but doesn't perfect causal reasoning               │    │
│  │ • Even "causal" reasoning may be pattern matching within dist.     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Relevance to "The Thinking Machine That Doesn't Think"

### Relevance Rating: 9/10 (Critical causal evidence)

**Why this paper is critical**:

1. **Provides causal framework for understanding CoT**:
   - Distinguishes reasoning from explaining
   - Shows LLMs mostly do explaining, not reasoning

2. **Explains why distillation ≠ genuine reasoning**:
   - Distilled models inherit causal deficiencies
   - "Correlation or causation" — distillation captures correlation

3. **Nuanced view on RLVR**:
   - RLVR improves causal structure
   - But doesn't prove "genuine understanding"
   - Could be improving pattern matching within distribution

### Key Quotes for Paper

> "LLMs suffer from critical reasoning issues such as unfaithfulness, bias, and inconsistency, since they lack robust causal underpinnings and may rely on superficial correlations rather than genuine understanding."

> "Distilled LRMs... do not exhibit improved causal structures and often share similar causal deficiencies as LLMs."

> "Correct CoTs may lead to incorrect answers, and incorrect CoTs to correct answers."

> "In contrast, when a reasoning process has a common cause (type-II) structure, it is actually explaining a latent belief of the answer, which may produce unfaithful and inconsistent responses."

---

## Status

- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Critical analysis for thesis
- [x] Cross-references identified
- [x] **Rebuttals checked** — No direct rebuttal found
- [x] **Counter-evidence noted** — None found

---

## Summary for Synthesis

**"Correlation or Causation"** provides **causal evidence** that:

1. **LLM CoT is often NOT causal reasoning**:
   - Only 30% ideal causal structure
   - 47% of SCMs show CoT doesn't affect answers
   - Type II (common cause) = post-hoc explanation

2. **Distillation doesn't fix causality**:
   - Distilled LRMs similar to base LLMs
   - Captures correlation, not causation

3. **RLVR improves but doesn't perfect**:
   - 63% ideal for RLVR models
   - Still 37% non-ideal (not complete causal reasoning)

4. **Four distinct reasoning behaviors**:
   - Reasoning (Type I): Z→X→Y
   - Explaining (Type II): X←Z→Y
   - Mixed (Type III): Z→Y, X→Y
   - Memorizing (Type IV): Neither affects Y

**For thesis**: This paper provides the causal framework to explain WHY CoT is often unfaithful — it's correlation, not causation. LLMs often generate explanations for pre-existing beliefs rather than derive answers through reasoning. RLVR helps but doesn't prove genuine understanding.
