# Paper Analysis: More Test-Time Compute Can Hurt: Overestimation Bias in LLM Beam Search

## Metadata
- **arXiv ID**: 2603.15377
- **Title**: More Test-Time Compute Can Hurt: Overestimation Bias in LLM Beam Search
- **Authors**: Gal Dalal, Assaf Hallak, Gal Chechik, Yftah Ziser (NVIDIA Research, Bar-Ilan University, University of Groningen)
- **Date**: March 2026
- **Venue**: arXiv preprint

---

## Core Claims

1. **Beam selection introduces systematic overestimation bias** — Selecting from noisy scorer outputs creates an extreme-value effect where the expected maximum score among incorrect candidates grows with search width.

2. **There exists a maximum useful beam width k̂** — Beyond k̂, search degrades performance. This critical width depends on signal-to-noise ratio: k̂ grows exponentially with (Δ/σ)², where Δ is quality advantage and σ is scorer noise.

3. **Perplexity scoring yields k̂=1** — Search provides no benefit at any width; perplexity is too noisy to guide beam search effectively.

4. **PRM scoring yields k̂≥4** — A trained Process Reward Model has sufficient signal-to-noise to support meaningful beam search with gains up to +8.9 pp.

5. **Scorer quality > beam width** — Same model, same algorithm, different scorers place k̂ at opposite ends of the beam width range. Investing in scorer quality is more effective than widening the beam.

---

## Methodology

### Framework
Beam search at the *reasoning-step level* — each "token" is a complete reasoning step (paragraph of chain-of-thought), not a single word. This matches Tree of Thoughts and PRM-guided search granularity.

### Scoring Approaches
1. **Perplexity**: Negative log-perplexity of full reasoning trace (training-free)
2. **PRM**: math-shepherd-mistral-7b-prm (trained process reward model)

### Models Tested (3 models, ~7B parameters)
- Qwen2.5-7B-Instruct
- Llama-3.1-8B-Instruct
- Mistral-7B-Instruct-v0.3

### Benchmark
- **MR-BEN**: 5,975 questions across 10 subjects (math, science, medicine, logic)

### Parameters
- Beam widths: k ∈ {1, 2, 3, 4}
- At each depth: k beams × k candidates = k² total candidates
- Maximum depth: 24 steps
- Temperature: 0.7
- 3 seeds per configuration
- Compute: ~1 week GPU time per subject-seed at k=4 on A100

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| Perplexity: Llama degradation | −5.4 pp | k=1 (59.7%) → k=4 (54.3%) |
| Perplexity: Mistral degradation | −3.9 pp | k=1 (42.4%) → k=4 (38.5%) |
| Perplexity: Qwen flat | ±0.1 pp | No benefit at any beam width |
| PRM: Mistral gain | +8.9 pp | k=1 (42.3%) → k=4 (51.2%) |
| PRM: Llama gain | +6.2 pp | k=1 (59.2%) → k=4 (65.4%) |
| PRM: Qwen gain | +3.4 pp | k=1 (71.7%) → k=4 (75.1%) |
| Near-random selections | 44.3% | Perplexity margin <0.1 between top candidates |
| Theoretical formula | n̂ = 1 + exp(Δ²/2σ²) | Maximum useful candidate pool |

---

## Relationship to Other Papers

### Supports
- **#129 Overthinking** (2412.21187): Both show more compute can hurt; this provides theoretical foundation
- **#294 Surface Heuristics** (2603.29025): Both show models select wrong paths based on surface signals
- **#302 Scaling Test-Time Compute** (2408.03314): Both show test-time scaling has limits

### Extends
- **Gao et al. (2023)**: Reward overoptimization in best-of-N (their critical N analogous to n̂)
- **Dalal et al. (2021)**: Tree search with learned value functions in model-based RL
- **Thrun & Schwartz (1993)**: Systematic overestimation from max over noisy Q-estimates

### Challenges
- Work assuming "wider is better" for test-time compute scaling
- Work proposing perplexity as cheap alternative to trained PRMs for search guidance

---

## REBUTTALS

### Known Rebuttals
None identified — paper provides new theoretical framework.

### Limitations (Authors Acknowledge)
1. **Two-class quality model**: Theory assumes binary correct/incorrect partition; real candidates have quality spectrum. Authors note this makes bounds *conservative*.
2. **Scale and beam width range**: Only 7B models and k≤4 tested. Locating PRM turning point would require k>4.
3. **Intrinsic signal coverage**: Only perplexity evaluated among training-free signals; other intrinsic signals (entropy-based, Markovian) may offer better SNR.
4. **Single temperature**: Used T=0.7 throughout; other temperatures not explored.

---

## Key Quotes

> "Beam selection over noisy scorer outputs introduces a systematic overestimation bias that grows with the candidate pool size, and we derive a maximum useful beam width k̂ beyond which search degrades performance."

> "The key asymmetry is structural, not distributional: the incorrect candidates receive a 'free bonus' of approximately σ√(2 log(n−1)) from the maximization, while the single correct candidate does not."

> "Invest in the scorer, not the beam width. Since n̂ grows exponentially with (Δ/σ)², reducing σ is far more effective than increasing k. Investing in reward model quality expands the useful search range, while widening the beam beyond k̂ actively degrades performance."

> "The correct path (A) was rejected in favor of the incorrect path (C) by a margin of just 0.009. Among 12 candidates, the maximization inflated the score of candidate C by enough to overtake A."

---

## Significance for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  MORE COMPUTE CAN MAKE THINGS WORSE                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  PERPLEXITY SCORING (high noise, k̂=1):                             │
│  ├── Llama: -5.4 pp at k=4 vs k=1                                  │
│  ├── Mistral: -3.9 pp at k=4 vs k=1                                │
│  └── 44% of selections have margin <0.1 (near-random)              │
│                                                                     │
│  PRM SCORING (lower noise, k̂≥4):                                   │
│  ├── Gains up to +8.9 pp                                           │
│  └── But still has a MAXIMUM beyond which it hurts                 │
│                                                                     │
│  KEY INSIGHT: Bad scorers select FLUENT but WRONG paths.           │
│  The model optimizes surface fluency, not correctness.             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Stance**: SUPPORTS

This paper provides theoretical foundation (Extreme Value Theory) for the "overthinking" phenomenon observed in other papers. The key insight is that more compute with an unreliable scorer (like perplexity/log-prob) selects fluent but incorrect paths. This connects to the broader pattern that LLMs optimize surface fluency, not correctness. The existence of a maximum useful compute budget for any given scorer quality directly supports the thesis that test-time scaling has fundamental limits determined by base model capabilities, not compute.

---

## Status
- [x] Read complete (full HTML)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
