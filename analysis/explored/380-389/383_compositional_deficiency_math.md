# Paper Analysis: Compositional Deficiency in Math Reasoning

## Metadata
- **arXiv ID**: 2405.06680
- **Title**: Exploring the Compositional Deficiency of Large Language Models in Mathematical Reasoning Through Trap Problems
- **Authors**: Jun Zhao, Jingqi Tong, Yurong Mou, Ming Zhang, Qi Zhang, Xuanjing Huang
- **Date**: May 2024
- **Institution**: Fudan University
- **Dataset**: MathTrap ([github.com/tongjingqi/MathTrap](https://github.com/tongjingqi/MathTrap))
- **Stance**: Supports thesis - LLMs possess component knowledge but fail to spontaneously compose it for novel reasoning paths

---

## Core Finding

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE COMPOSITION GAP                                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  LLMs can answer:                                                   │
│  (a) Original math problems (math procedure knowledge)              │
│  (b) Conceptual trap problems (trap definition knowledge)           │
│                                                                     │
│  LLMs CANNOT:                                                       │
│  Combine (a) + (b) to solve trap problems                           │
│                                                                     │
│  Example:                                                           │
│  • Conceptual: "What is a negative base?" → 90% correct             │
│  • Original: "Calculate (-3)^4" → 70% correct                       │
│  • Trap: "Calculate (-3)^4.5" → 36% correct (requires both)         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Why This Paper Matters

This paper provides the clearest demonstration of the **knowledge-composition gap**:
- LLMs have the component knowledge (90%+ on individual tests)
- LLMs cannot spontaneously compose components (36% on combined)
- Humans can compose (85.9% ratio vs LLMs' 12-51%)

This is **direct evidence** that LLMs match patterns rather than reason compositionally.

---

## Key Evidence

### Main Results: LLM Performance

| Model | Conceptual | Original | Trap | Ratio |
|-------|------------|----------|------|-------|
| **GPT-4-0125** | 90.0% | 70.3% | 36.0% | **51.2%** |
| **Claude-3.5-Sonnet** | 93.9% | 75.0% | 19.4% | **25.9%** |
| **Claude-3-Opus** | 87.7% | 68.5% | 19.0% | **27.7%** |
| **o1-preview (Web)** | 92.3% | 87.5% | 67.7% | **77.4%** |
| **o1-preview (API)** | 96.2% | 88.3% | 38.1% | **43.1%** |
| Llama3-70B | 88.5% | 61.7% | 7.74% | **12.5%** |
| MetaMath-7B | 43.2% | 32.5% | 1.90% | **5.84%** |

**Ratio** = Trap/Original × 100. Measures compositional transfer.

### Human Baseline (n=43 undergraduates)

| Condition | Human Accuracy |
|-----------|----------------|
| Original Problem | **97.6%** |
| Trap Problem (blind) | **83.8%** |
| Trap Problem (with notice) | **95.1%** |
| **Human Ratio** | **85.9%** |

```
┌─────────────────────────────────────────────────────────────────────┐
│  HUMAN vs LLM COMPOSITIONAL ABILITY                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Human ratio:           85.9%                                       │
│  Best LLM (o1-Web):     77.4%  (-8.5pp)                             │
│  GPT-4:                 51.2%  (-34.7pp)                            │
│  Claude-3.5-Sonnet:     25.9%  (-60.0pp)                            │
│  Llama3-70B:            12.5%  (-73.4pp)                            │
│                                                                     │
│  Humans spontaneously compose. LLMs do not.                         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Intervention Effects

**GPT-4 Trap Accuracy with Interventions:**

| Intervention | Accuracy | Change |
|--------------|----------|--------|
| Baseline (no notice) | 35.5% | - |
| With notice prompt | **50.3%** | +14.8pp |
| 1-shot ICL | 41.9% | +6.4pp |
| 5-shot ICL | **48.4%** | +12.9pp |

**Claude-3-Opus Trap Accuracy:**

| Intervention | Accuracy | Change |
|--------------|----------|--------|
| Baseline | 19.0% | - |
| With notice prompt | **40.7%** | +21.7pp |
| 5-shot ICL | **56.1%** | +37.1pp |

**Hints help** - suggesting knowledge exists but isn't spontaneously accessed.

### Fine-tuning Trade-off

| Training Data | Original | Trap |
|---------------|----------|------|
| MetaMath395K | 41.4% | 6.36% |
| MetaMath395K + MathTrap1K | 33.3% | **29.1%** |

Fine-tuning on traps improves trap accuracy (+22.7pp) but **hurts** original accuracy (-8.1pp). Models can't generalize compositionally even with explicit training.

---

## Trap Categories

| Category | % of Dataset | Description |
|----------|--------------|-------------|
| Indirect Contradiction | 38% | Implicit logical conflict |
| Direct Contradiction | 24% | Explicit conflicting statements |
| Concept Undefined | 16% | Using undefined operations |
| Violating Common Sense | 15% | Physically/mathematically impossible |
| Missing Condition | 6% | Insufficient information |

---

## Methodology

**Problem Triplet Design:**
1. **Original problem**: Standard math problem from MATH/GSM8K
2. **Conceptual problem**: Tests trap knowledge in isolation
3. **Trap problem**: Requires composing both knowledge types

**Dataset**: 155 private triplets (84.5% MATH, 15.5% GSM8K)

**Human control**: Blind study, different problems per participant, n=43 top university STEM students

---

## Relevance to Thesis

### Strongly Supports "Pattern Matching, Not Reasoning"

1. **Knowledge-Composition Gap**: 90%+ on components, 36% on composition
2. **Trained Path Dependency**: Trap problems are "unseen" → failure
3. **Elicitation via Hints**: Knowledge exists but not spontaneously accessed
4. **Human-LLM Divergence**: 85.9% vs 12-51% ratio
5. **Scale Doesn't Solve It**: Llama3-70B has 88.5% conceptual but 12.5% ratio

### Authors' Interpretation (directly supports thesis)

> "LLMs reason through subgraph matching rather than developing systematic problem-solving skills" (citing Dziri et al. 2023)

> "LLMs rely on surrounding cases in the training set for mathematical reasoning rather than learning generalizable rules" (citing Hu et al. 2024)

---

## Graph Links

### Builds On
- **Faith and Fate** (2305.18654) - subgraph matching theory (directly cited)
- **GSM-Symbolic** (2410.05229) - math reasoning brittleness

### Related Findings
- **Two-Hop Curse** (2411.16353) - same composition failure in facts
- **OMEGA** (2506.18880) - composition failure in math OOD

### Extends
- **Reversal Curse** (2309.12288) - symmetric composition failure
- **Latent Multi-Hop** (2411.16679) - transitive composition failure

---

## Key Quotes

> "LLMs possess both knowledge components but fail to spontaneously compose them for novel reasoning paths."

> "Humans maintain 85.9% ratio while the best LLM achieves only 77.4%, dropping to 12.5% for Llama3-70B."

> "This suggests LLMs rely on pattern matching from training rather than generalizable compositional reasoning."

---

## Status
- [x] Read
- [x] Analyzed
- [x] Evidence extracted
- [x] Graph links identified
- [x] Cross-referenced with corpus
