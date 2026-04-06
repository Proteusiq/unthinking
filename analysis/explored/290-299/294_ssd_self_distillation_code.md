# Embarrassingly Simple Self-Distillation Improves Code Generation

**arXiv**: [2604.01193](https://arxiv.org/abs/2604.01193)
**Date**: April 2026
**Authors**: Ruixiang Zhang, Richard He Bai, Huangjie Zheng, Navdeep Jaitly, Ronan Collobert, Yizhe Zhang (Apple)

## Summary

Demonstrates that LLMs can improve at code generation using only their own raw outputs—no verifier, teacher model, or RL. The method (Simple Self-Distillation, SSD) samples from the model, then fine-tunes on those unverified samples. Qwen3-30B-Instruct improves from 42.4% to 55.3% pass@1 on LiveCodeBench v6. The key mechanism is **distributional reshaping**: suppressing "distractor tails" at deterministic positions while preserving diversity at branching points. The gains cannot be recovered by decoding tuning alone.

## Key Findings

```
┌─────────────────────────────────────────────────────────────────────┐
│  CORE INSIGHT: SSD works by reshaping TOKEN DISTRIBUTIONS,          │
│  not by teaching new reasoning strategies or algorithms             │
│                                                                     │
│  The model doesn't learn new code patterns from its outputs—        │
│  it learns to suppress low-probability "distractor" tokens          │
│  that cause errors at deterministic positions ("locks")             │
└─────────────────────────────────────────────────────────────────────┘
```

### The Precision-Exploration Conflict

The paper identifies a fundamental tension in LLM decoding:

| Position Type | Description | Temperature Need |
|---------------|-------------|------------------|
| **Locks** | Deterministic positions (syntax, variable names) | Low T (suppress distractors) |
| **Forks** | Genuine choice points (algorithm selection) | High T (preserve diversity) |

> "The best global setting, applied to every context in the sequence, is therefore necessarily a compromise: the temperature that helps forks is precisely what lets distractors resurface at locks."

### Performance Gains

| Model | Base pass@1 | +SSD pass@1 | Gain |
|-------|-------------|-------------|------|
| Qwen3-30B-Instruct | 42.4% | 55.3% | +12.9pp (+30%) |
| Qwen3-4B-Instruct | 34.5% | 42.0% | +7.5pp |
| Llama-3.1-8B-Instruct | 21.0% | 24.5% | +3.5pp |

**Gains concentrate on harder problems**: +15.3pp on hard vs +6.5pp on easy for Qwen3-30B

### How SSD Reshapes Distributions

```
┌─────────────────────────────────────────────────────────────────────┐
│  AT LOCKS (deterministic positions):                                │
│  Before SSD: [0.75, 0.05, 0.05, 0.037, ...] — 25% tail mass         │
│  After SSD:  [0.95, 0.05, 0, 0, ...]        — tail stripped         │
│                                                                     │
│  AT FORKS (choice points):                                          │
│  Before SSD: [0.28, 0.15, 0.14, 0.14, ...]  — peaked head           │
│  After SSD:  [0.34, 0.17, 0.17, 0.16, ...]  — flatter plateau       │
│              (tail removed, head preserved)                         │
└─────────────────────────────────────────────────────────────────────┘
```

### Why Decoding Alone Can't Match SSD

The paper proves decode-only tuning is fundamentally limited:

1. **Prefix rigidity**: To include rank-r token, must include all higher-ranked tokens
2. **Power rigidity**: All log-odds scaled by single global factor α = 1/T
3. **Same knob for both**: Temperature that helps forks is what destabilizes locks

SSD escapes this by **changing the distribution itself**, not just how it's decoded.

### Surprising Finding: Bad Data, Good Results

Even when training data is ~62% gibberish (T=2.0, no truncation), SSD still improves:
- **48.1% pass@1** (vs 42.4% baseline)
- Gains persist because the signal is in **distributional reshaping**, not content quality

## Relevance to Thesis

**Stance**: Supports

This paper provides strong mechanistic evidence that:

1. **Improvements are distributional, not conceptual**: SSD doesn't teach new algorithms or reasoning strategies—it changes probability distributions over tokens

2. **The model already "knows" the solutions**: Performance gains come from suppressing noise, not adding knowledge

3. **Pattern generation, not reasoning**: The improvements are about generating more consistent sequences, not understanding code better

### The Distribution View of LLM "Capability"

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHAT SSD REVEALS ABOUT LLM CODE GENERATION:                        │
│                                                                     │
│  The model isn't "learning to code better" — it already has the     │
│  patterns. What it learns is to:                                    │
│                                                                     │
│  1. Commit more strongly at deterministic positions                 │
│  2. Reduce probability mass on syntactically valid but wrong tokens │
│  3. Keep diversity where multiple solutions are viable              │
│                                                                     │
│  This is CALIBRATION, not REASONING.                                │
└─────────────────────────────────────────────────────────────────────┘
```

### Connection to Broader Thesis

| Aspect | Evidence |
|--------|----------|
| Pattern completion | Improvements from shaping distributions, not learning new patterns |
| No understanding | Works with 62% gibberish training data |
| Stochastic generation | Gains are about probability tuning, not comprehension |
| Memorization sufficient | The patterns exist; SSD just adjusts confidence over them |

## Key Quotes

> "SSD improves Qwen3-30B-Instruct from 42.4% to 55.3% pass@1 on LiveCodeBench v6... with gains concentrating on harder problems"

> "SSD reshapes token distributions in a context-dependent way, suppressing distractor tails where precision matters while preserving useful diversity where exploration matters"

> "The student can therefore be globally sharper yet locally more explorable."

> "Even when the sampled programs are mostly poor, SSD can still help because the useful signal lies in distributional reshaping rather than in raw program correctness alone."

> "These persistent margins indicate that SSD produces changes in the model itself in ways no decoding configuration can replicate"

## Methodology

- **Models**: Qwen3 (4B, 30B), Llama-3.1-8B, both instruct and thinking variants
- **Data**: ~10K competitive programming problems (rSTARcoder seed)
- **Training**: Standard SFT on model's own unverified outputs
- **Evaluation**: LiveCodeBench v5/v6, pass@1 and pass@5

### The SSD Recipe

1. Sample one solution per problem from frozen model (with temperature + truncation)
2. No verification—keep raw outputs
3. Fine-tune with standard cross-entropy loss
4. Evaluate at different temperature

## Connections to Other Papers

- **Extends entropy minimization work**: But via SFT, not direct entropy optimization
- **Complements #280 (URIAL)**: Base models already have capability; formatting/calibration unlocks it
- **Supports #264 (GRPO vs SFT)**: Distribution shaping matters more than content
- **Aligns with decoding research**: Temperature composition theory matches effective temperature Teff = Ttrain × Teval

## Implications

1. **LLM improvement ≠ learning new capabilities**: Can improve by distribution tuning alone
2. **Latent capability exists**: The patterns for correct code are already in the model
3. **Calibration > understanding**: SSD is fundamentally about confidence calibration
4. **Decoding has structural limits**: Can't replicate what distribution reshaping achieves

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE SSD PARADOX:                                                   │
│                                                                     │
│  If a model can improve substantially by training on its own        │
│  unverified (often incorrect) outputs, then the improvement         │
│  cannot be about learning correct answers.                          │
│                                                                     │
│  Instead, it's about:                                               │
│  - Sharpening commitment at deterministic points                    │
│  - Reducing probability leakage to distractors                      │
│  - Preserving diversity only where genuinely needed                 │
│                                                                     │
│  This is stochastic optimization, not reasoning enhancement.        │
└─────────────────────────────────────────────────────────────────────┘
```

## REBUTTALS

None identified. The paper provides rigorous mechanistic analysis.

**Potential counter-argument**: SSD could be teaching better code patterns from the subset of correct solutions.
**Paper's response**: The "bad data" experiment directly tests this—62% gibberish training data still produces +5.7pp gains. The signal is in distribution shape, not content correctness.

**Potential concern**: Limited to code generation, may not generalize.
**Note**: The paper acknowledges code is a good testbed because lock/fork structure is explicit. Whether the mechanism generalizes is an open question.

---

*Analysis conducted following AGENTS.md methodology. Full paper read via arXiv HTML.*
