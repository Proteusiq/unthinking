# Paper Analysis: Mechanistic Evidence for Faithfulness Decay in Chain-of-Thought Reasoning

## Metadata
- **arXiv ID**: 2602.11201
- **Title**: Mechanistic Evidence for Faithfulness Decay in Chain-of-Thought Reasoning
- **Authors**: Donald Ye, Max Loffgren, Om Kotadia, Linus Wong (Algoverse)
- **Date**: February 2026
- **Venue**: ACL 2026

---

## Core Claims

1. **Faithfulness decays systematically** — CoT reasoning steps have decreasing causal influence on model outputs as chains progress, with a "Reasoning Horizon" (k*) at 70-85% of chain length
2. **NLDD metric quantifies step-level faithfulness** — Normalized Logit Difference Decay enables cross-model comparison by measuring confidence drop when reasoning steps are corrupted
3. **Mapping Gap exists** — Models can encode correct internal representations (high probe accuracy) while completely failing tasks (0% accuracy)
4. **Anti-faithful regime exists** — Some architectures (Gemma) show NEGATIVE NLDD: corruption improves confidence, meaning CoT is actively harmful

---

## Methodology

**Framework**: Three complementary metrics for faithfulness analysis:
1. **NLDD (Behavioral)**: Corrupt individual reasoning steps, measure normalized logit difference drop
2. **RSA (Representational)**: Track internal state similarity between clean and corrupted chains
3. **TAS (Geometric)**: Measure trajectory alignment in latent space

**Models tested**:
- DeepSeek-Coder-6.7B-Instruct
- Llama-3.1-8B-Instruct
- Gemma-2-9B-Instruct

**Tasks** (increasing semantic ambiguity):
- Dyck-n: Syntactic state tracking (symbolic)
- PrOntoQA: Multi-hop logical entailment (formal)
- GSM8K: Multi-step arithmetic (natural language)

**NLDD Formula**:
```
NLDD = (LD_clean - LD_corrupt) / |LD_clean| × 100

where LD = (max logit for correct - max logit for incorrect) / S
and S = mean std dev of logit vectors across samples
```

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| Reasoning Horizon location | 70-85% of chain length | Consistent across all models and tasks |
| Gemma PrOntoQA accuracy | 99.0% | Despite being anti-faithful |
| Gemma PrOntoQA NLDD | -52.5% | NEGATIVE: corruption improves confidence |
| Gemma Dyck-n probe accuracy | 82.0% | Linear probes recover task structure |
| Gemma Dyck-n task accuracy | 0.0% | Complete task failure despite encoding |
| GSM8K NLDD (faithful models) | >96% | DeepSeek and Llama causally depend on CoT |
| Late-step NLDD | <20% of peak | Beyond k*, steps are non-causal |
| Anti-faithfulness deepening | -22.9 → -120.2 | Beyond k*=11, CoT becomes actively harmful |

---

## Relationship to Other Papers

### Supports
- **Measuring Faithfulness (2307.13702)** — Both find CoT often unfaithful; this provides mechanistic detail
- **Reasoning Models Don't Say (2505.05410)** — 25-40% faithfulness aligns with faithfulness decay finding
- **CoT In The Wild (2503.08679)** — Natural prompts unfaithful; this explains WHY via decay mechanism
- **Dissociation of Faithful/Unfaithful (2405.15092)** — Two reasoning modes confirmed; NLDD distinguishes them
- **No Free Lunch (2506.17219)** — Format vs reasoning tradeoff; late CoT is "formatting" not reasoning

### Challenges
- **Chain-of-Thought Prompting (2201.11903)** — Original CoT paper claims reasoning; this shows late steps non-causal

### Extends
- **Measuring CoT Monitorability (2510.27378)** — Adds NLDD as new metric; mechanistic depth
- **FRIT Faithfulness Intervention (2509.13334)** — Causal intervention method; NLDD provides quantification
- **Mapping Faithful Reasoning Paths (2510.22362)** — Geometric analysis; TAS metric adds trajectory view

---

## REBUTTALS

### Known Rebuttals
None found yet — paper is recent (Feb 2026)

### Potential Counter-Arguments
1. **Truncation vs replacement** — Authors acknowledge truncation conflates two effects: weak reliance on step k vs sufficiency of steps 1 to k-1
2. **Single layer analysis** — TAS and RSA use 50% depth; layer-wise variation unexplored
3. **Sample size** — 100 samples per task; larger evaluation could reveal different patterns
4. **Greedy decoding only** — Stochastic decoding might shift horizon locations

### Limitations (Authors Acknowledge)
- Truncation-based design doesn't isolate step-specific causal effects
- Logit normalization assumption may not hold for all architectures
- Only three tasks (two synthetic), three models tested
- Free-form CoT would require different segmentation
- No testing on larger models or other architectures

---

## Key Quotes

> "Gemma achieves 99% accuracy on PrOntoQA while exhibiting negative NLDD, revealing that high performance can mask complete causal disconnection from CoT."

> "The model maintains geometric consistency without utilizing those representations to inform the output, a representational echo without causal force."

> "For anti-faithful models, later reasoning tokens act as causal distractors that the model must overcome to produce its pre-computed answer."

> "In Gemma's Dyck-n evaluation, linear probes on hidden states recover stack-depth information with 82.0% accuracy, yet the model achieves only 0.0% accuracy on the task itself."

> "RSA remains stable across the horizon (p>0.05 for most comparisons), indicating that models continue to track task logic internally beyond k*."

---

## Significance for Thesis

**STRONGLY SUPPORTS** the thesis that LLMs are pattern matchers, not reasoners:

1. **Faithfulness decay** — CoT becomes non-causal after 70-85% of chain, suggesting late reasoning is "post-hoc rationalization"
2. **Mapping Gap** — Models encode solutions but can't use them = representation ≠ reasoning
3. **Anti-faithful regime** — CoT can HURT accuracy, proving it's not genuine reasoning
4. **Architecture determines faithfulness** — Not the task, suggesting brittleness

This provides mechanistic evidence that CoT is often decorative rather than causal.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
