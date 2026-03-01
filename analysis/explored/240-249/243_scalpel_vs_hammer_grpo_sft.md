# Paper Analysis: Scalpel vs. Hammer: GRPO Amplifies Existing Capabilities, SFT Replaces Them

## Metadata
- **arXiv ID**: 2507.10616
- **Title**: Scalpel vs. Hammer: GRPO Amplifies Existing Capabilities, SFT Replaces Them
- **Authors**: Neel Rajani, Aryo Pradipta Gema, Seraphina Goldfarb-Tarrant, Ivan Titov
- **Date**: July 2025
- **Venue**: Actionable Interpretability Workshop @ ICML 2025
- **Affiliations**: University of Edinburgh

---

## Core Claims

1. **GRPO amplifies** existing capabilities, making minor targeted updates
2. **SFT replaces** old skills with new ones, causing broader parameter changes
3. Both algorithms modify **query and key weights most**, but SFT does so more aggressively
4. SFT affects **mid-layer MLPs** more, which may explain out-of-domain degradation
5. GRPO requires ~50x lower learning rate than SFT (1e-6 vs 5e-5)

---

## Methodology

### Setup
- **Model**: OLMo-2-1124-7B-Instruct (bfloat16)
- **Training data**: CN-K12-91k subset (easier K12-level math questions)
- **Checkpoints**: 20 intermediate checkpoints saved for both algorithms
- **Comparison**: Same questions, same hyperparameters where possible

### Key Experimental Design
- GRPO: Model generates own completions, reward-based updates
- SFT: Model trained on DeepSeek R1 completions
- Both use same prompt template with `<think>` and `<answer>` tags

---

## Key Evidence

### Learning Rate Difference
- **GRPO**: ~1e-6 (crashes at 1e-5 after ~100 steps)
- **SFT**: ~5e-5 (50x higher required for training to work)

### Benchmark Results (Qualitative from Figure 3)

| Benchmark | GRPO Effect | SFT Effect |
|-----------|-------------|------------|
| MATH-500 | Modest improvement | Larger gains |
| GSM8K | Slight degradation | Larger drops |
| MMLU | Slight degradation | Degrades noticeably |
| GPQA:Diamond | Less degradation | Mixed (physics helps) |
| IFEval | Less impact | Worsens noticeably |
| AIME24 | No improvement | No improvement |

### KL Divergence (Figure 4)
- **SFT**: Divergence increases "considerably and early" then plateaus
- **GRPO**: "Much more gradual growth" with "considerably lower plateau"
- Interpretation: GRPO keeps model closer to base; SFT causes larger distribution shift

### Parameter Update Analysis (Figures 5-6)
- **Both**: Query and key matrices modified most, concentrated in middle layers
- **GRPO**: Smaller updates (note different Y-axis scales)
- **SFT**: "Magnitude much greater than GRPO"
- **SFT**: Mid-layer MLPs (layers 20-26) receive larger updates

### Freezing Experiments (Figure 7)
- Freezing mid-layer MLPs: GPQA:Diamond **improved beyond base model**
- Query/key only training: Degradation on most benchmarks
- Results described as "inconclusive" but suggestive

---

## Relationship to Thesis

### Strongly Supports

This paper provides **mechanistic evidence** for the thesis:

1. **GRPO doesn't teach new skills**: It "amplifies existing capabilities" that the base model already has. This supports the view that RL doesn't create reasoning — it surfaces pre-existing patterns.

2. **SFT replaces rather than adds**: The "hammer" metaphor captures how SFT overwrites knowledge rather than building on it. This explains why fine-tuning can degrade capabilities.

3. **Knowledge in mid-layer MLPs**: The finding that mid-layer MLPs store factual knowledge (and SFT disrupts them) supports the thesis that knowledge is distributed in statistical patterns.

4. **Learning rate asymmetry**: GRPO requiring 50x lower learning rate suggests it's making surgical adjustments to existing circuits, not learning new ones.

### Key Insight for Thesis
> "Capability acquisition occurs during pre-training and continual fine-tuning, while GRPO mainly amplifies skills the base model already has."

This directly supports the claim that reasoning models don't reason — they surface patterns that were already learned.

---

## Relationship to Other Papers

### Supports
- **#221 (13 Parameters)**: Both show RL is more parameter-efficient than SFT
- **#234 (Bayesian Scaling Laws)**: Alignment changes priors, not knowledge
- **Physics of LLMs 2.1**: Both examine internal mechanisms of learning

### Extends
- **DeepSeek-R1**: Provides mechanistic explanation for R1's GRPO findings
- **Open-R1 community**: Uses their training setup

### Cited Work
- Mukherjee et al. (2025): "RL makes sparse updates to subnetworks"
- Zhao et al. (2025): "Capability acquisition occurs during pre-training"

---

## REBUTTALS TO THIS PAPER

### Limitations (Authors Acknowledge)

1. **Learning rate confound**: "Different learning rates across many hundred parameter updates can cause vastly different learning trajectories"
2. **Single model**: Only tested on OLMo-2-7B
3. **Freezing experiments inconclusive**: Benefits on GPQA:Diamond but degradation elsewhere
4. **Scale limitations**: May not generalize to larger models

### Potential Counter-Arguments

1. DeepSeek's SFT shows less degradation with 800k curated samples — curation may matter more than algorithm
2. Results may be specific to math domain
3. Learning rate difference makes fair comparison difficult

---

## Key Quotes

> "GRPO amplifies existing capabilities, while SFT replaces old skills with new ones."

> "Capability acquisition occurs during pre-training and continual fine-tuning, while GRPO mainly amplifies skills the base model already has."

> "SFT causes divergence from the base model much more quickly and to a more pronounced degree than GRPO."

> "Both algorithms modify query and key weights the most. Meanwhile, SFT exhibits greater updates and also affects mid-layer MLPs more."

---

## Implications for the Thesis

This paper provides **strong mechanistic evidence** for the thesis:

1. **RL doesn't create reasoning**: GRPO only surfaces what pre-training already provided
2. **Knowledge is distributed**: Mid-layer MLPs store factual knowledge; disrupting them causes forgetting
3. **Training dynamics reveal limits**: The 50x learning rate gap suggests fundamentally different mechanisms

The "scalpel vs hammer" metaphor captures the thesis perfectly: reasoning models don't learn to reason, they just get better at finding the right patterns to surface.

---

## Status
- [x] Read complete (full HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence extracted
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
