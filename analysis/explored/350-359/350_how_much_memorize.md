# Paper 350: How Much Do Language Models Memorize?

## Metadata
- **arXiv**: 2505.24832
- **Date**: May 2025 (v3: June 2025)
- **Authors**: John X. Morris, Chawin Sitawarin, Chuan Guo, Narine Kokhlikyan, G. Edward Suh, Alexander M. Rush, Kamalika Chaudhuri, Saeed Mahloujifar
- **Affiliation**: FAIR at Meta, Google DeepMind, Cornell University, NVIDIA
- **Stance**: Balanced — provides the strongest quantitative argument that LLMs MUST generalize (3.6 bpp capacity forces pattern compression at scale), but "generalization" in their framework is statistical pattern compression, not reasoning. The grokking transition (memorization→generalization when capacity fills) is profound evidence that what looks like understanding is the model's response to a storage constraint.

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  LLMs HAVE FINITE MEMORY: 3.6 BITS PER PARAMETER                    │
│                                                                      │
│  Hundreds of models from 500K to 1.5B parameters                     │
│                                                                      │
│  CAPACITY:                                                           │
│    α = 3.64 bits/param (bf16)    3.83 bits/param (fp32)              │
│    Range: 3.5-4.0 across architectures                              │
│    6.86M param model → 23.9 MB total capacity                       │
│    8B param model → ~3.6 GB capacity (trained on ~7 TB)             │
│    Doubling precision: 3.51 → 3.83 (NOT 2x)                         │
│                                                                      │
│  GROKKING TRANSITION:                                                │
│    Models memorize until capacity fills                              │
│    Then: unintended memorization DECREASES                           │
│    → Generalization begins as competing strategy for same resource   │
│    → Double descent begins exactly when data > capacity              │
│                                                                      │
│  SCALING LAW FOR MEMBERSHIP INFERENCE:                               │
│    F1 = ½(1 + 1.34·σ(-0.034·(Capacity/|D| - 33.14)))               │
│    Predictions within 1-2% of observations                          │
│    Contemporary LLMs (tokens/param ≥ 100): F1 ≈ 0.5 (impossible)   │
│                                                                      │
│  → "When dataset grows sufficiently large, ALL successful            │
│     training data extraction is attributable to generalization"       │
│                                                                      │
│  FORMAL SEPARATION:                                                  │
│    Total memorization = Unintended + Generalization                  │
│    First framework that separates the two at sample level            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **3.6 bits per parameter capacity**: GPT-style transformers can store 3.5-4.0 bits per parameter, measured on uniform random bitstrings (no generalization possible). This is a hard ceiling.
2. **Grokking as capacity-filling**: models memorize until capacity fills, then switch to generalization — "once the model can no longer memorize datapoints individually, it is forced to share information between datapoints"
3. **At modern scale, membership inference is impossible**: tokens-per-parameter ratio ≥ 100 → F1 ≈ 0.5 (random guessing)
4. **Extraction ≠ memorization**: "Language models can be coerced to output almost any string; the fact that a model outputs something is not necessarily a sign of memorization." At large dataset scale, all extraction is generalization.
5. **Formal separation**: first framework to separate unintended memorization (sample-specific) from generalization (population-level) at the sample level using information theory
6. **Capacity is not precision**: doubling from bf16 to fp32 increases capacity from 3.51 to 3.83 bpp, not 2x — most extra bits are not used for storage

---

## Methodology

- **Capacity measurement**: train GPT-2 models on i.i.d. uniform random bitstrings (V=2048, S=64). Memorization = H(data) - NLL under trained model. Increase dataset until plateau = capacity.
- **Architecture range**: 1-8 layers, d_model 32-512, ~80K to ~20M parameters (capacity measurement); GPT-2 Medium (123.7M) and XL (1.556B) for validation
- **Text experiments**: FineWeb dataset with careful deduplication
- **Training**: Adam optimizer, 10^6 steps, batch 2048, single A100, bf16/fp32, 5 random seeds per config
- **Shannon framework**: mem(X,Θ̂) = I(X,Θ̂) = H(X) - H(X|Θ̂); unintended mem = H(X|Θ) - H(X|(Θ,Θ̂))
- **Kolmogorov framework**: instance-level via arithmetic coding approximation
- **Membership inference**: standard loss-based method (Yeom et al.); extraction via greedy prefix decoding
- **Scaling law fit**: sigmoid functional form, constants c1=1.34, c2=-0.034, c3=-33.14

---

## Key Evidence

| Finding | Number | Context |
|---|---|---|
| Capacity (bf16) | 3.64 bits/param | Mean across architectures |
| Capacity (fp32) | 3.83 bits/param | Only +0.32 bpp from doubling precision |
| Capacity range | 3.5-4.0 bpp | Across 16 architecture configs |
| Scaling law prediction error | 1-2% | Estimates vs observed membership F1 |
| GPT2-XL on 18.9M samples | predicted 0.95, observed 95.85 F1 | Near-perfect membership inference |
| GPT2-XL on 170.7M samples | predicted 0.55, observed 54.61 F1 | Near-random (data >> capacity) |
| GPT2-Med on 1.5M samples | predicted 0.95, observed 97.98 F1 | High memorization when data < capacity |
| GPT2-Med on 13.6M samples | predicted 0.55, observed 53.44 F1 | Near-random at scale |
| Grokking onset | exactly at data size = model capacity | Double descent transition |
| Modern LLMs tokens/param | ≥ 100 | → membership inference F1 ≈ 0.5 |

---

## Relationship to Other Papers

### Supports
- **#245 Extracting Books (2601.02671)** — Provides theoretical framework for book extraction: at production scale, what looks like extraction may actually be generalization from deduplicated-but-common patterns
- **#348 Comparative Memorization (2603.21658)** — Complementary: Chen et al. measure structure (heads, layers), Morris et al. measure capacity (bits)
- **#3 GSM-Symbolic (2410.05229)** — Models that appear to "know" math may be generalizing surface patterns (3.6 bpp forces compression), not memorizing solutions
- **#1 Faith and Fate (2305.18654)** — Capacity ceiling explains why compositional generalization breaks: models can't store enough patterns for compositional explosion

### Challenges
- **#245, #246 Extracting Books** — "When dataset grows sufficiently large, ALL successful training data extraction is attributable to generalization." This reframes extraction results as evidence of generalization, not memorization. Provocative.
- "LLMs just memorize" narrative — At modern training ratios (tokens/param ≥ 100), individual sample memorization is statistically impossible. Models MUST generalize.
- **Thesis (weakly)** — If LLMs are forced to generalize by capacity constraints, and generalization means learning reusable patterns, the thesis claim that LLMs "just pattern match" needs refining. They pattern-match because they MUST compress — which is a form of learning.

### Extends
- **#350** is a foundational measurement paper that all memorization work in the corpus builds on

---

## REBUTTALS

### Known/potential rebuttals
- **"Generalization" here is statistical, not reasoning**: the paper carefully defines generalization as "information about the true data-generating process" — this is population-level statistical regularity, not causal reasoning. A model that generalizes bigram statistics has "generalized" under this definition without understanding anything. The thesis survives because "generalization ≠ reasoning."
- **Capacity is a lower bound**: SGD doesn't find global optima. True capacity may be higher. Authors acknowledge.
- **Only GPT-2 architecture**: no MoE, no non-transformer architectures. Capacity could differ.
- **Extrapolation to 70B+**: validated only to 1.5B. 3.6 bpp may not hold at frontier scale.
- **Compression approximation**: arithmetic coding is one way to approximate Kolmogorov complexity. Better compressors could change estimates.
- **Reference model choice**: unintended memorization estimate depends on what reference model you use. Different references give different splits between intended/unintended.
- **English-only**: FineWeb is English. Multilingual or code-heavy training may have different capacity utilization.

### Limitations (authors acknowledge)
- Results specific to proposed environment, may not generalize
- Capacity estimates are lower bounds
- GPT-2 architecture only
- Largest validation at 1.5B
- Sigmoid functional form is "slightly simplistic"

---

## Key Quotes

1. *"We find that GPT-style transformers can store between 3.5 and 4 bits of information in each model parameter"* — Abstract
2. *"Once the model can no longer memorize datapoints individually, it is forced to share information between datapoints to save capacity, which leads to generalization."* — Section 4.3
3. *"When our (deduplicated) dataset grows sufficiently large, all successful training data extraction is attributable to generalization."* — Section 5.2.1
4. *"Language models can be coerced to output almost any string; hence the fact that a model outputs something is not necessarily a sign of memorization."* — Introduction
5. *"Double descent begins exactly when the data capacity exceeds the model capacity."* — Section 4.3
6. *"All contemporary language models trained with a tokens-per-parameter ratio of 10² or higher... statistically significant loss-based membership inference is not possible."* — Section 5.2.2

---

## Critical Assessment

### Why this is balanced
This paper cuts both ways:

**For the thesis**: The 3.6 bpp ceiling means models are doing massive compression. An 8B model stores ~3.6 GB from ~7 TB of training. This compression IS pattern matching — statistical regularities are extracted and stored, not raw data. The grokking transition shows that generalization is a fallback strategy when memorization fails, not a superior cognitive mode. Models "understand" because they can't afford not to.

**Against the thesis**: The formal framework forces us to acknowledge that at modern scale, LLMs are genuinely generalizing (in the statistical sense). Membership inference is impossible at production ratios. What prior work called "memorization" (extraction) is actually generalization once datasets are large enough. The thesis's strongest empirical pillar (models just memorize training data) is formally undermined.

### The key distinction the thesis needs
"Generalization" in this framework = learning statistical regularities of the data-generating process. This is NOT the same as "reasoning" or "understanding." A model that generalizes bigram statistics, syntactic patterns, and common reasoning templates has "generalized" without understanding causality, truth, or logic. The thesis claim should be: "LLMs generalize statistical patterns (not memorize), but statistical generalization ≠ reasoning."

### Smoking gun implication
The grokking transition is the deeper finding: models memorize when they can, generalize when they must. Generalization is the cost-minimizing response to a capacity constraint, not an emergent cognitive ability. This is consistent with the thesis — "reasoning" is pattern compression under resource pressure, not truth-tracking.

### Net interpretation
Balanced. Provides the strongest formal evidence that LLMs must generalize (not just memorize), but "generalization" is statistical pattern compression, not reasoning. The thesis needs to be stated more precisely: the problem isn't memorization vs generalization, it's that statistical generalization doesn't constitute understanding.
