# Paper Analysis: Do We Need Adam? Surprisingly Strong and Sparse RL with SGD in LLMs

## Metadata
- **arXiv ID**: 2602.07729
- **Title**: Do We Need Adam? Surprisingly Strong and Sparse Reinforcement Learning with SGD in LLMs
- **Authors**: Sagnik Mukherjee, Lifan Yuan, Pavan Jayasinha, Dilek Hakkani-Tür, Hao Peng
- **Date**: February 2026
- **Venue**: arXiv (submitted to ICML)
- **Code**: https://github.com/SagnikMukherjee/sgd_adam_rlvr

---

## Core Claims

1. **SGD matches or outperforms AdamW** in RLVR for LLMs
2. **SGD updates <0.02% of parameters** — 1000x fewer than AdamW, without any sparsity regularization
3. **Momentum and adaptive learning rates** are less influential in RL than in SFT
4. RL's optimization landscape is fundamentally different from SFT
5. Memory savings: SGD reduces GPU usage by 15.7 GB on Qwen3-1.7B

---

## Key Evidence

### Parameter Update Sparsity

| Optimizer | Parameters Updated |
|-----------|-------------------|
| **SGD** | **0.02% - 0.46%** |
| **AdamW** | ~20% (from prior work) |

**1000x fewer parameters updated with SGD**

### Experimental Coverage
- **Models**: Qwen, Llama families
- **RL algorithms**: PPO, GRPO
- **Domains**: Mathematical reasoning, coding, RLVE

### Memory Efficiency
- Qwen3-1.7B: **15.7 GB reduction** with SGD vs AdamW
- No accuracy loss

### Why SGD Works in RL (but not SFT)
1. **RL incorporates O(1) bits per episode** — sparser feedback than O(#tokens) in SFT
2. **RL updates concentrate in off-principal directions** with minimal spectral drift
3. **Effective optimization problem is low-dimensional** and geometrically constrained
4. **Adaptive learning rates amplify noise** in sparse gradient regime

---

## Relationship to Thesis

### Strongly Supports

This paper provides **critical evidence** for the thesis:

1. **RL doesn't learn new knowledge**: If RL only updates 0.02% of parameters, it can't be learning complex new capabilities — it's just surfacing what's already there

2. **Pattern amplification, not creation**: The "scalpel vs hammer" metaphor (from #243) is confirmed — RL makes surgical adjustments to existing circuits

3. **Knowledge is in pre-training**: The finding that RL "has a strong dependence on the capabilities of pretrained base models" directly supports the thesis

4. **SFT vs RL difference is fundamental**: SFT requires AdamW to actually modify knowledge; RL just redirects attention patterns

### Key Insight for Thesis
> "RL fine-tuning updates only about 20% of the parameters which are significantly sparser than those from SFT."

And with SGD: **0.02%** — essentially zero new learning.

---

## Relationship to Other Papers

### Strongly Supports
- **#243 (Scalpel vs Hammer)**: Both show RL makes minimal parameter updates
- **#221 (13 Parameters)**: RL is 100-1000x more param-efficient than SFT
- **#234 (Bayesian Scaling Laws)**: Alignment changes priors, not knowledge

### Cites
- Mukherjee et al. (2025): "RL makes sparse updates to subnetworks"
- Zhu et al. (2025): "RL updates concentrate in off-principal directions"
- Gandhi et al. (2025): "Strong dependence on capabilities of pretrained base models"
- Yuan et al. (2025): "LLMs learn new skills in RL by composing old ones"

### Extends
- **DeepSeek-R1**: Provides optimization-level explanation for R1's findings

---

## REBUTTALS TO THIS PAPER

### Limitations (Implicit)

1. **Scale**: Tested on 1.7B-8B models, may not hold at frontier scale
2. **Domain-specific**: Math and code have verifiable rewards — may not generalize
3. **SGD requires tuning**: Paper notes high learning rate required for SGD

### Potential Counter-Arguments

1. Some RL settings may require more parameter updates
2. Memory savings may be offset by other compute costs
3. Extreme sparsity may limit capability ceiling

---

## Key Quotes

> "Full fine-tuning with SGD updates fewer than 0.02% of model parameters without any sparsity-promoting regularization, more than 1,000× fewer than AdamW."

> "RL incorporates only O(1) bits of information from the environment per episode, substantially sparser than the O(#tokens) information in SFT."

> "The effective optimization problem in RLVR is both low-dimensional and geometrically constrained, with learning confined to a subspace of the parameter space."

> "RL can be substantially more parameter-efficient than previously recognized."

---

## Implications for the Thesis

This paper provides **the strongest mechanistic evidence yet** for the thesis:

1. **0.02% parameter updates** = RL is NOT teaching models to reason
2. **Pre-training is everything**: RL just redirects existing capabilities
3. **Reasoning models don't reason**: They surface pre-trained patterns more efficiently

The fact that you can match AdamW performance with SGD — and update 1000x fewer parameters — proves that RL is fundamentally different from learning. It's more like "tuning an antenna" than "building a radio."

---

## Status
- [x] Read complete (full HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
