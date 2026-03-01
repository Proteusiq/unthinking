# Paper Analysis: Forgetting-MarI: LLM Unlearning via Marginal Information Regularization

## Metadata
- **arXiv ID**: 2511.11914
- **Title**: Forgetting-MarI: LLM Unlearning via Marginal Information Regularization
- **Authors**: Shizhou Xu, Yuan Ni, Stefan Broecker, Thomas Strohmer
- **Date**: November 2025 (v1), January 2026 (v3)
- **Venue**: arXiv (cs.AI, cs.CL, cs.CR, cs.IT, cs.LG)
- **Affiliations**: UC Davis, SLAC/Stanford

---

## Core Claims

1. Existing unlearning methods **over-unlearn** — removing all information linked to forget data, including knowledge supported by retain data
2. **Marginal information** is the correct target: remove only the additional contribution of forget data beyond what retain data supports
3. Forgetting-MarI provides **provable undetectability** via explicit upper bounds on residual mutual information
4. Method **outperforms state-of-the-art** (GA, GD, KL-GA, DPO) on utility preservation while achieving reliable forgetting
5. Supports **continual unlearning** without catastrophic forgetting

---

## Methodology

### Key Innovation: Marginal Information Quantification

The paper distinguishes between:
- **Full Information Unlearning**: Erase ALL content from forget set (including shared facts)
- **Marginal Information Unlearning**: Remove only UNIQUE contribution of forget set

### Mathematical Framework
- Uses **mutual information** (MI) between retain and forget distributions
- Jensen-Shannon Divergence (JSD) to measure distributional shift
- **Proposition 2.1**: Detection accuracy upper-bounded by mutual information
- **Theorem 2.1**: MarI controls self-perplexity gap

### Loss Function
```
min_θ ℓ_KL(θ, r) + ℓ_MarI(θ, r, u)
```
Where:
- ℓ_KL: KL divergence to preserve utility on retain set
- ℓ_MarI: Mutual information penalty for marginal effect

### Experiments
- **Models**: GPT-2 Large (774M), Llama-3.2-1B
- **Datasets**: 
  - Harry Potter (HP): 10% unlearn / 90% retain split
  - Careless People (CP): correlated 50/50 split OR uncorrelated (Reddit stories as unlearn set)
- **Baselines**: GA (Gradient Ascent), GD (Gradient Difference), KL-GA, DPO

---

## Key Evidence

### GPT-2 Large (774M) on Harry Potter (Table 5)

| Benchmark | Baseline | F-MarI | KL-GA | GA | GD | DPO |
|-----------|----------|--------|-------|-----|-----|-----|
| ARC-Easy (acc) | 0.46 | **0.48** | 0.46 | 0.24 | 0.45 | 0.46 |
| PIQA (acc) | 0.66 | **0.66** | 0.66 | 0.53 | 0.65 | 0.65 |
| HellaSwag (acc) | 0.36 | 0.36 | 0.35 | 0.25 | 0.35 | 0.36 |
| MMLU (acc) | 0.23 | **0.24** | 0.23 | 0.25 | 0.23 | 0.23 |
| WikiText (pplx) | 30.80 | **28.66** | 29.89 | **1.97e+43** | 35.21 | 32.43 |

**Key finding**: GA catastrophically fails (perplexity explodes to 1.97×10^43)

### Llama-3.2-1B on Careless People (Table 6)

| Benchmark | Baseline | F-MarI | KL-GA | GA | GD | DPO |
|-----------|----------|--------|-------|-----|-----|-----|
| ARC-Easy (acc) | 0.59 | **0.60** | 0.58 | 0.42 | 0.57 | 0.59 |
| PIQA (acc) | 0.71 | **0.71** | 0.71 | 0.63 | 0.69 | 0.71 |
| HellaSwag (acc) | 0.48 | **0.50** | 0.47 | 0.30 | 0.45 | 0.47 |
| MMLU (acc) | 0.30 | **0.31** | 0.28 | 0.23 | 0.26 | 0.28 |

### Continual Unlearning (Figure 4)
- F-MarI: **Only method stable across sequential deletions**
- KL-GA: Tends to "relearn" previously forgotten content
- DPO: Fails to effectively unlearn
- GD: Overshoots on retain set, loses WikiText performance
- Validation accuracy stop criterion: **>3% drop from initial**

### Detector Evaluation (Figure 5)
- After F-MarI: ROC-AUC **matches gold standard** (retrained model)
- Defeats white-box perplexity-based membership inference detectors

### Theoretical Guarantees
- **Theorem 2.1**: When I(X_MarI; Z) → 0, perplexity-based detectors lose discriminative power
- **Theorem 3.1**: Word-level provable unlearning via pooled MarI
- Explicit upper bounds on residual influence

### Qualitative Difference (Figure 1)
- **Before unlearning**: Model completes sentences similar to ground truth
- **Marginal unlearning**: Different but coherent completions
- **Full unlearning**: Model struggles to coherently complete sentences

---

## Relationship to Thesis

### Balanced (Method Paper)

This paper proposes a **new unlearning method** rather than challenging/supporting the thesis directly. However, key insights are relevant:

1. **Knowledge is distributed**: The distinction between "marginal" and "full" information acknowledges that knowledge overlaps across training data — you can't cleanly separate forget from retain

2. **Unlearning is fundamentally about distributions**: The MI-based approach treats knowledge as statistical patterns, not discrete facts — aligning with the thesis view

3. **Trade-offs are inherent**: Even this sophisticated method faces utility-forgetting trade-offs, supporting the claim that knowledge is entangled

### Key Insight for Thesis
The paper's framing of "marginal information" implicitly acknowledges that LLM knowledge is **distributed and overlapping** — you can only remove the marginal statistical contribution, not "the knowledge" as a discrete entity.

---

## Relationship to Other Papers

### Complements
- **#226 (Noisy Forget Sets)**: Both study practical unlearning challenges
- **#227 (Survey)**: Would categorize this under "Direct Fine-Tuning" with theoretical guarantees
- **#228 (Quantization)**: Tests different vulnerability (model compression vs. forget data quality)

### Extends
- **NPO/DPO literature**: Provides information-theoretic alternative to preference optimization
- **Gradient Ascent methods**: Addresses over-unlearning problem

### Addresses Limitation
- Tackles the **over-unlearning problem** that other methods face
- Provides **theoretical guarantees** missing from most LLM unlearning methods

---

## REBUTTALS TO THIS PAPER

### Limitations (Implicit)

1. **Mid-scale models only**: Tested on GPT-2 Large (774M) and Llama-3.2-1B — not frontier scale
2. **Limited benchmarks**: Two datasets (Harry Potter, Careless People)
3. **Doesn't address quantization attack** (#228): Theoretical guarantees may not survive model compression
4. **Computational overhead**: MI computation adds to unlearning cost

### Potential Counter-Arguments

1. **Scale limitations**: May not work as well on 70B+ models
2. **Adversarial robustness untested**: Guarantees are against perplexity detectors, not jailbreaks
3. **Marginal vs. full distinction may be artificial**: In practice, what users want may be closer to full removal

### Strengths Acknowledged

1. **First LLM unlearning method with theoretical guarantees**
2. **Principled information-theoretic approach**
3. **Addresses real over-unlearning problem**

---

## Key Quotes

> "Existing unlearning methods often over-unlearn, removing all information linked to the data to unlearn/forget, including knowledge also legitimately supported by the data meant to be preserved."

> "We introduce Forgetting-MarI, an LLM unlearning framework that provably removes only the additional (marginal) information contributed by the data to be unlearned."

> "By penalizing marginal information, our method yields an explicit upper bound on the unlearn dataset's residual influence in the trained models, providing provable undetectability."

> "When I(X_MarI; Z) goes to zero, the score gap vanishes, and the perplexity/log-likelihood detectors lose discriminative power after unlearning."

---

## Implications for the Thesis

This paper provides **balanced/technical evidence**:

1. **For the thesis**: The marginal information framing acknowledges that knowledge is distributed and overlapping — you can only target statistical contributions, not discrete knowledge units

2. **Neutral**: Proposes a method that may improve unlearning, but doesn't claim to solve it completely

3. **Key limitation**: Doesn't address whether quantization or other attacks can recover "marginal" information — #228 suggests this is possible

The paper's sophisticated approach implicitly supports the thesis view that LLM knowledge is fundamentally statistical patterns distributed across parameters.

---

## Status
- [x] Read complete (full HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
