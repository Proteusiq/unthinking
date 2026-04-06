# Paper Analysis: Who can we trust? LLM-as-a-jury for Comparative Assessment

## Metadata
- **arXiv ID**: 2602.16610
- **Title**: Who can we trust? LLM-as-a-jury for Comparative Assessment
- **Authors**: Mengjie Qian, Guangzhi Sun, Mark J.F. Gales, Kate M. Knill
- **Date**: Feb 2026
- **Venue**: arXiv preprint

---

## Core Claims

1. **LLM judges exhibit probability inconsistencies**: Pairwise preferences violate transitivity (cycle inconsistencies), limiting direct probability-based ranking
2. **Cycle inconsistency correlates with ranking failure**: Models with higher cycle rates show larger gaps between hard BT and soft BT performance
3. **BT-σ framework outperforms averaging**: Judge-aware aggregation with learned discriminator parameters improves over equal-weight averaging
4. **Discriminator correlates with cycle consistency**: The learned σ parameter tracks independent measures of judge reliability without supervision
5. **No single aggregation dominates**: Hard vs soft BT depends on inconsistency level; BT-σ provides robust intermediate

---

## Methodology

**Framework**: BT-σ — Bradley-Terry model with judge-specific discriminator parameters

**Key Innovation**: Extend Bradley-Terry to model:
- Item skills {sᵢ} — latent quality scores
- Judge discriminators {σₖ} — reliability/consistency parameters per judge

**Probability Model**:
```
P_k(i ≻ j) = σ((sᵢ - sⱼ) / σₖ)
```
Where σₖ controls judge sensitivity to skill differences:
- Small σₖ = discriminative, consistent judge
- Large σₖ = noisy, unreliable judge

**Evaluation**:
- Datasets: SummEval (100 articles × 16 summaries), Topical-Chat (60 contexts × 6 responses)
- Judges: 8 LLMs (Llama, Qwen, Mistral, DeepSeek, Gemma, Phi)
- Metric: Spearman rank correlation (SRC) with human judgments
- Aspects: Coherence, consistency, fluency, relevance, etc.

**Baselines**: Avg-Prob, hard BT, soft BT, temperature scaling

---

## Key Evidence

```
┌─────────────────────────────────────────────────────────────────────┐
│              CYCLE INCONSISTENCY IN LLM JUDGES                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Cycle Rate = fraction of triplets (i,j,k) where                    │
│               i≻j, j≻k, k≻i (or reverse)                            │
│                                                                     │
│  SummEval Coherence:                                                │
│    Llama-3.2-3B:    ~0.32  (highest inconsistency)                  │
│    Gemma-2-9B:      ~0.18  (lowest inconsistency)                   │
│                                                                     │
│  Topical-Chat Engagingness:                                         │
│    Average:         0.44   (severe inconsistency)                   │
│    → soft BT underperforms hard BT on this aspect                   │
│                                                                     │
│  PATTERN: High cycle rate → hard BT outperforms soft BT             │
│           (probability magnitudes become misleading)                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### BT-σ Aggregation Results (SummEval)

| Method | COH | CON | FLU | REL | ALL |
|--------|-----|-----|-----|-----|-----|
| Avg-Prob | 52.55 | 41.75 | 36.21 | 50.09 | 45.15 |
| hard BT | 51.26 | 45.72 | 40.07 | 52.32 | 47.34 |
| soft BT | 53.94 | 47.86 | 42.69 | 53.11 | 49.40 |
| **BT-σ** | **54.96** | **48.79** | **43.55** | **53.84** | **50.28** |

### Discriminator-Consistency Correlation

```
┌─────────────────────────────────────────────────────────────────────┐
│              LEARNED σ TRACKS RELIABILITY                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Scatter plot (SummEval Coherence):                                 │
│    X-axis: Learned discriminator σₖ                                 │
│    Y-axis: Cycle inconsistency rate                                 │
│                                                                     │
│  Strong positive correlation:                                       │
│    High σₖ ↔ High cycle rate ↔ Unreliable judge                     │
│    Low σₖ ↔ Low cycle rate ↔ Reliable judge                         │
│                                                                     │
│  KEY: BT-σ learns reliability WITHOUT labels                        │
│       by fitting pairwise comparisons alone                         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Individual Judge Variation

Llama-3.2-3B on Consistency (CON): SRC = 0.28% (near random)
Gemma-2-9B on Coherence (COH): SRC = 61.57% (best individual)

**Range**: 0.28% to 61.57% — massive variation in judge quality

---

## Relevance to Thesis

**Supports the thesis.**

The paper provides evidence that LLM judges:

1. **Exhibit logical inconsistencies**: Cycle violations (A>B, B>C, C>A) show judges don't maintain consistent preference orderings — a signature of heuristic rather than reasoned evaluation

2. **Probability magnitudes are unreliable**: The finding that hard BT (binary) sometimes outperforms soft BT (probabilistic) indicates judge confidence doesn't track judgment quality

3. **No reliable evaluator exists**: Individual judge SRC ranges from near-random (0.28%) to moderate (61.57%); no single LLM provides reliable evaluation

4. **Aggregation compensates for individual failure**: The need for multi-judge aggregation and reliability weighting acknowledges that individual judges pattern-match inconsistently

The cycle inconsistency finding is particularly relevant — genuine reasoners should maintain transitive preferences, but LLM judges frequently violate transitivity, suggesting surface-level pattern matching rather than principled evaluation.

---

## Stance: SUPPORTS

**Classification**: Supports the thesis that LLMs don't genuinely reason

**Confidence**: Moderate-High — systematic evaluation across multiple judges and datasets, but focused on evaluation rather than generation

---

## Key Quotes

> "LLM judges vary substantially in performance across tasks and aspects, and their judgment probabilities may be biased and inconsistent."

> "Pairwise probabilities produced by LLM judges often violate global ranking consistency, explaining why probability calibration alone is insufficient for reliable ranking recovery."

> "Models with higher cycle inconsistency rates, indicating frequent violations of transitivity, are generally those for which hard BT yields larger gains over soft BT."

> "The learned discriminator strongly correlates with independent measures of the cycle consistency of LLM judgments."

---

## Rebuttals

### Papers This Paper Challenges

- **Simple averaging approaches**: Demonstrates that treating judges as equally reliable is suboptimal
- **Single-judge evaluation**: Shows massive variation in individual judge quality (0.28% to 61.57% SRC)

### Counter-Evidence

The paper proposes a solution (BT-σ) that partially mitigates judge unreliability — this could be seen as showing LLM judges can be made useful through aggregation. However, the need for such correction itself supports the thesis that individual LLMs don't reliably reason.

---

## Connections to Other Papers

| Paper | Relationship |
|-------|--------------|
| #267 (2411.15594) Survey LLM-as-Judge | Extends: Provides aggregation framework for documented judge limitations |
| #268 (2412.12509) LLM Judgment Reliability | Complements: Cycle inconsistency quantifies reliability issues |
| #272 (2603.05485) Bias-Bounded Evaluation | Complements: Both address aggregating unreliable judges |
| #273 (2603.05399) Judge Reliability Harness | Complements: JRH stress-tests; BT-σ aggregates across failures |
| #274 (2603.05167) C2-Faith | Extends: C2-Faith tests faithfulness; BT-σ aggregates unfaithful judges |

---

## Methodological Notes

**Strengths:**
- Principled probabilistic framework (Bradley-Terry extension)
- Unsupervised reliability learning (no human labels required)
- Multiple datasets (summarization + dialogue)
- Clear diagnostic (cycle inconsistency rate)
- Correlation between learned and independent reliability measures

**Limitations:**
- Assumes comparisons sample underlying skills (may not hold for surface-matching judges)
- 8 judges tested (broader coverage would strengthen conclusions)
- Focus on NLG evaluation; reasoning evaluation may differ
- Aggregation may mask rather than solve underlying judge failures

---

## Impact Assessment

**MEDIUM-HIGH IMPACT** for LLM evaluation practice:

1. **Diagnostic tool**: Cycle inconsistency rate provides simple measure of judge reliability
2. **Aggregation framework**: BT-σ offers principled multi-judge combination
3. **Quantifies unreliability**: 0.28% to 61.57% SRC range shows judges cannot be trusted individually
4. **Unsupervised calibration**: No human labels needed for reliability estimation

The finding that probability magnitudes are often misleading (soft BT underperforms hard BT under high inconsistency) suggests LLM "confidence" doesn't track accuracy — a key pattern-matching signature.
