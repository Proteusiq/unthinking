# Paper Analysis: Learning to Reason in 13 Parameters

## Metadata
- **arXiv ID**: 2602.04118
- **Title**: Learning to Reason in 13 Parameters
- **Authors**: John X. Morris, Niloofar Mireshghallah, Mark Ibrahim, Saeed Mahloujifar
- **Date**: February 4, 2026
- **Venue**: FAIR at Meta, Cornell University, Carnegie Mellon University

---

## Core Claims

1. **Extremely small parameter updates suffice for reasoning**: Models can learn to "reason" on math tasks with as few as 13 trained parameters (26 bytes in bf16), achieving 91% accuracy on GSM8K.

2. **RL is far more parameter-efficient than SFT**: Reinforcement learning (GRPO) achieves strong performance with 100-1000x fewer parameters than supervised fine-tuning. At 13 parameters, RL reaches 91% while SFT reaches only 83%.

3. **RL makes information-dense updates**: SFT must absorb many bits of information (both task-relevant and irrelevant), while RL receives sparse, clean signals (binary reward) that allow learning with minimal capacity.

4. **Larger models need smaller updates**: As model size increases, even smaller parameter updates achieve near-full-finetuning performance. This suggests trillion-scale models may be "programmable" with just a handful of parameters.

5. **TinyLoRA enables scaling below conventional limits**: Their proposed TinyLoRA method scales LoRA arbitrarily small (down to 1 parameter) via random projection and weight tying across modules.

---

## Methodology

### TinyLoRA Architecture
- Extends LoRA-XS by replacing the trainable r×r matrix R with a low-dimensional trainable vector **v** ∈ ℝ^u projected through a fixed random tensor P
- Weight tying factor n_tie shares parameters across modules
- With full weight tying, all modules share a single **v**, reducing to just u parameters (minimum: 1)

### Experimental Setup
- **Models**: Qwen2.5 family (3B, 7B), LLaMA-3 (8B)
- **Tasks**: GSM8K (7,500 math word problems), MATH training set
- **Training**: GRPO (Group Relative Policy Optimization) with exact-match reward
- **Evaluation**: GSM8K, MATH500, Minerva, GAOKAO, OlympiadBench, CollegeMath, AIME24, AMC23
- **Baselines**: Full finetuning, LoRA, LoRA-XS, TinyLoRA at various parameter counts

### Key Controls
- Learning rate sweep at each update size (accounts for effective LR changes)
- Three random seeds per configuration
- Comparison across model sizes to establish scaling trends

---

## Key Evidence

### GSM8K Results (Qwen2.5-7B-Instruct)

| Parameters | RL (GRPO) | SFT |
|------------|-----------|-----|
| 13 | **91%** | 83% |
| 120 | **95%** | 84% |
| 10,000 | **95%** | ~88% |
| Baseline (0) | 76% | 76% |
| Full FT | 95% | 95% |

### MATH Training Results (Qwen2.5-7B-Instruct)

| # Params | GSM8K | MATH500 | AIME24 | Avg |
|----------|-------|---------|--------|-----|
| 0 (base) | 88.2 | 64.6 | 3.3 | 40.3 |
| 13 | 91.8 | 74.6 | 16.0 | 50.1 |
| 196 | 92.2 | 76.6 | 16.7 | 53.2 |
| Full FT | 91.7 | 78.2 | 20.0 | 55.2 |

**196 parameters retain 87% of absolute performance improvement** across six difficult math benchmarks.

### Scaling Trend
- Qwen2.5-3B: needs ~500 params to reach 95% of peak
- Qwen2.5-7B: needs ~120 params to reach 95% of peak
- Larger models are more parameter-efficient

### Qwen vs LLaMA
- Qwen requires ~10x fewer parameters than LLaMA for equivalent performance
- At 1 parameter, Qwen improves 5% over baseline; LLaMA barely improves
- Authors note this may indicate Qwen has exposure to similar examples during pretraining

---

## Relationship to Thesis

### Supports Thesis (Primary)

This paper provides strong evidence that "learning to reason" via RL is fundamentally different from acquiring new knowledge:

1. **Minimal information needed**: If reasoning required learning complex algorithms, 13 parameters (26 bytes) would be grossly insufficient. The success suggests RL activates/amplifies existing capabilities rather than teaching new ones.

2. **Style over substance**: The authors explicitly hypothesize that "the knowledge required to solve the task is already stored in the parameters of the model, and only the style has to change for task success."

3. **RL as surface adjustment**: RL's parameter efficiency implies it makes shallow, stylistic changes (output length, format) rather than deep algorithmic changes.

4. **Connects to Superficial Alignment**: This finding parallels the Superficial Alignment Hypothesis — alignment (and by extension, "reasoning" training) may primarily modify surface behavior, not underlying capabilities.

### Key Quote Supporting Thesis
> "One might ask how it's possible to learn to solve a difficult task such as GSM8K in as few as 13 parameters. One theory is that the knowledge required to solve the task is already stored in the parameters of the model, and only the style has to change for task success."

---

## Relationship to Other Papers

### Supports
- **Revisiting the Superficial Alignment Hypothesis (2410.03717)**: Both show that post-training makes minimal changes; this paper quantifies just how minimal (13 parameters!)
- **SFT Memorizes, RL Generalizes (2501.17161)**: This paper's finding that RL is 100-1000x more parameter-efficient than SFT aligns with the claim that RL generalizes better
- **LoRA Learns Less and Forgets Less (2405.09673)**: Cited; low-rank updates preserve base model capabilities
- **Demystifying Long Chain-of-Thought Reasoning (2502.03373)**: Both suggest extended outputs (more thinking tokens) may be the key mechanism, achievable with tiny parameter changes

### Extends
- **LoRA-XS (2405.17604)**: TinyLoRA is a direct extension, scaling below LoRA-XS's minimum
- **Intrinsic Dimensionality (2012.13255)**: This paper empirically validates that reasoning tasks lie on an extremely low-dimensional manifold

### Potentially Challenges
- Claims of emergent reasoning abilities: If "reasoning" can be unlocked with 13 parameters, the capability was always present — it's not "emergent" from RL training

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **GSM8K may be contaminated**: The dramatic Qwen advantage (~10x more efficient than LLaMA) suggests possible data contamination. Authors acknowledge: "This finding may corroborate recent observations that Qwen in particular may have exposure to similar examples during its pretraining."

2. **Limited to math tasks**: Authors explicitly note findings are "limited to math datasets" and "may or may not generalize to other fields such as science or creative writing."

3. **Benchmark ceiling effects**: GSM8K may be too easy for modern 7B+ models, making it possible to reach ceiling with minimal adjustments.

4. **Style change != no learning**: One could argue that even "style" changes (generating longer outputs, better formatting) constitute meaningful learning, just not the kind skeptics worry about.

### Limitations (Authors Acknowledge)

- "Our findings are limited to math datasets"
- "May or may not generalize to other fields such as science or creative writing"
- Math is the "most popular application of reasoning models as of 2025"
- Results limited to 3B-8B model scale

### Search for Direct Rebuttals
- No direct rebuttals found (paper is very recent: Feb 2026)
- The finding is so striking it will likely attract scrutiny on contamination and generalization

---

## Key Quotes

> "We are able to train the 8B parameter size of Qwen2.5 to 91% accuracy on GSM8K with only 13 trained parameters in bf16 (26 total bytes)."

> "Notably, we are only able to achieve such strong performance with RL: models trained using SFT require 100−1000x larger updates to reach the same performance."

> "One theory is that the knowledge required to solve the task is already stored in the parameters of the model, and only the style has to change for task success. In particular, learning to generate longer outputs may be possible in few parameters, and has been shown to greatly improve performance on math and reasoning tasks."

> "Our findings indicate that LoRA becomes more effective at smaller parameter counts as model size scales. Given a fixed dataset, larger models can be controlled with fewer parameters."

> "These trends indicate that extremely large (trillion-scale) models may be easily trainable for many tasks with just a handful of parameters."

---

## Implications for the Thesis

This paper is highly significant for the thesis that LLMs are sophisticated pattern matchers rather than genuine reasoners:

1. **Quantifies the "surface" of reasoning training**: If 13 parameters suffice, the "reasoning" improvement is extremely shallow — likely just output formatting and length, not algorithmic capability.

2. **RL as capability amplifier, not creator**: The dramatic difference between RL and SFT parameter efficiency suggests RL merely exposes existing capabilities (consistent with base models already "knowing" how to reason).

3. **Scaling implications**: The trend that larger models need smaller updates suggests the capability is increasingly "baked in" during pretraining — RL just unlocks access.

4. **Contamination signal**: The Qwen/LLaMA efficiency gap may indicate benchmark contamination is a confound in "reasoning" evaluations.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
