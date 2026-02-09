# Paper Analysis: How Does Unfaithful Reasoning Emerge from Autoregressive Training?

## Metadata
- **arXiv ID**: 2602.01017
- **Title**: How Does Unfaithful Reasoning Emerge from Autoregressive Training? A Study of Synthetic Experiments
- **Authors**: Fuxin Wang, Amr Alazali, Yiqiao Zhong
- **Institution**: University of Wisconsin-Madison
- **Date**: February 2026
- **Venue**: arXiv preprint
- **URL**: https://arxiv.org/abs/2602.01017

---

## Core Claims

1. **Faithfulness threshold exists**: Models can learn faithful stepwise reasoning, but ONLY when training noise is below a critical threshold

2. **Simplicity bias determines faithfulness**: The preference for simpler rules (stepwise reasoning with one operator) over complex rules (skip-step reasoning with two operators) is an algorithmic inductive bias

3. **Three reasoning modes emerge**: Training dynamics exhibit transition from faithful stepwise → mixed mode → unfaithful skip-step reasoning

4. **Implicit self-verification emerges**: During the mixed mode, prediction entropy temporarily increases as models resolve inconsistent reasoning steps

5. **Noise induces unfaithfulness**: Higher noise in training data causes models to bypass reasoning steps and compute answers directly from prompts

---

## Methodology

### Synthetic Task: Arithmetic Expression Reasoning (AER)
- Train small transformers on modular arithmetic chains
- Format: `a × b - c → d - c → o` (prompt → reasoning → solution)
- Modulus N = 97 (prime number)
- Architecture: 3 layers, 2 heads, 128 embedding dimensions, RoPE

### Noise Injection
- **ε₁ (prompt noise)**: Random corruption of operands a or b
- **ε₂ (reasoning noise)**: Random corruption of intermediate result d
- Training data: 2,000,000 examples

### Two Faithfulness Definitions
1. **Consistency-based**: Generated chain matches ground-truth arithmetic
2. **Intervention-based**: Altering reasoning steps changes the final answer (causal dependence)

### Metrics
- **RIR₁** (Reasoning Inconsistency Ratio): Proportion recovering correct solution despite incorrect reasoning
- **INR** (Interventional Non-flip Rate): How often interventions on reasoning DON'T change solution
- **PE** (Prediction Entropy): Model uncertainty during solution prediction

---

## Key Evidence

### Critical Noise Threshold

| Noise Level | Faithfulness Behavior |
|-------------|----------------------|
| ε₂ < τc(ε₁) | Both metrics ≈ 0 (faithful) |
| ε₂ > τc(ε₁) | Sharp increase in unfaithfulness |
| ε₁ = ε₂ = 0 | Intervention-based faithfulness achieved |

### Four Training Phases
1. **Phase 0 (Format Following)**: Learns to predict operators and structure
2. **Phase 1 (Stepwise Reasoning)**: f̂₂(e₁,e₂) ≈ f₂(e₂) — depends on reasoning
3. **Phase 2 (Mixed Mode)**: Uncertainty when e₁ and e₂ conflict; entropy spikes
4. **Phase 3 (Skip-Step)**: f̂₂(e₁,e₂) ≈ f(e₁) — ignores reasoning

### Complexity Gap Effect
- Larger complexity gap between steps → more faithful reasoning
- 3-operator prompts (higher complexity) → tolerate higher noise before unfaithfulness
- **Simplicity bias confirmed**: Models prefer simpler stepwise reasoning over complex skip-step

### Entropy During Mixed Mode
- Prediction entropy **temporarily increases** during phase transition
- Models encode internal uncertainty when resolving inconsistent reasoning
- Suggests **emergent implicit self-verification** from autoregressive training

---

## Relationship to Thesis

### STRONGLY SUPPORTS Thesis

This paper provides **mechanistic understanding** of how unfaithfulness emerges:

#### 1. Unfaithfulness is Default Under Noise

> "At higher noise levels, training dynamics exhibit a transition from faithful stepwise reasoning to unfaithful skip-step reasoning"

Training on noisy data (like real corpora) naturally produces models that bypass reasoning.

#### 2. Pattern Matching Over Reasoning

Skip-step reasoning = computing answers directly from prompts without using intermediate steps. This IS pattern matching:
- Model learns `f(e₁)` directly instead of `f₂(f₁(e₁))`
- Reasoning tokens become post-hoc decorations

#### 3. Simplicity Bias Explains Faithfulness

> "Models prefer smooth, low-degree, and low-complexity functions"

Faithfulness only emerges when stepwise reasoning is **algorithmically simpler** than direct pattern matching. This is consistent with pattern matching as the default mode.

#### 4. Controlled Evidence for Phase Transition

The paper provides **controlled synthetic evidence** for something observed empirically:
- Training on diverse data → unfaithful CoT
- The transition is predictable based on noise threshold

---

## Relationship to Other Papers

### Strongly Supports
- **Paper 169 (Dissociation of Faithful/Unfaithful)**: Both show two distinct reasoning modes with different mechanisms
- **Paper 148 (Unfaithful CoT)**: Provides mechanistic explanation for WHY CoT is often unfaithful
- **Paper 11 (Measuring Faithfulness)**: Validates intervention-based faithfulness methodology

### Provides Mechanism For
- **Paper F0 (Faith and Fate)**: Explains how linearized pattern matching emerges from training
- **Paper 03 (Illusion of Thinking)**: Complexity threshold = noise threshold for faithful→unfaithful transition
- **Paper 171 (Arithmetic Without Algorithms)**: Bag of heuristics = skip-step reasoning mode

### Extends
- **Paper 135 (Demystifying Long CoT)**: Adds training dynamics perspective on CoT emergence
- **Grokking literature (Power et al., 2022)**: Extends modular arithmetic paradigm to reasoning chains

### Related Methodologically
- **Paper 134 (CoT Training Mechanisms)**: Both use controlled synthetic experiments on arithmetic
- **Paper 163 (Mechanistic CoT)**: Both analyze internal mechanisms of CoT reasoning

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **Synthetic task limitation**: Modular arithmetic may not generalize to natural language reasoning

2. **Small model limitation**: 3-layer transformers may behave differently from billion-parameter LLMs

3. **Binary noise model**: Real training data has structured, not random, noise

4. **Single domain**: Only arithmetic — what about logical, commonsense, or multi-step reasoning?

### Limitations (Authors Acknowledge)

> "Our synthetic task abstracts mathematical reasoning... a fundamental question is whether findings generalize to natural language settings"

> "We use small transformers... scaling behavior remains to be investigated"

---

## Key Quotes

> "Chain-of-thought (CoT) reasoning generated by large language models (LLMs) is often unfaithful: intermediate steps can be logically inconsistent or fail to reflect the causal relationship leading to the final answer."

> "Models can learn faithful reasoning that causally follows the underlying arithmetic rules, but only when the training noise is below a critical threshold, a phenomenon attributable to simplicity bias."

> "At higher noise levels, training dynamics exhibit a transition from faithful stepwise reasoning to unfaithful skip-step reasoning via an intermediate mixed mode characterized by a transient increase in prediction entropy."

> "Mechanistic analysis reveals that models learn to encode internal uncertainty by resolving inconsistent reasoning steps, which suggests the emergence of implicit self-verification from autoregressive training."

> "A model's CoT reasoning is perfectly faithful if it follows perfect stepwise reasoning... [where] f̂₂(e₁,e₂) = f₂(e₂) for all e₁, e₂."

> "Low noise in training data and large complexity gaps in reasoning steps are critical to inducing high faithfulness in CoT reasoning."

---

## Methodology Assessment

### Strengths
- Well-controlled synthetic environment
- Clear formal definitions of faithfulness (consistency + intervention)
- Rigorous metrics (RIR, INR, PE)
- Phase diagram characterization
- Simplicity bias validation experiment

### Weaknesses
- Synthetic task only (modular arithmetic)
- Small models (3 layers)
- Random noise model (not realistic)
- Single reasoning step (not multi-step)

---

## Status

- [x] Full paper read (HTML)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated

---

## Classification

| Dimension | Assessment |
|-----------|------------|
| **Stance** | Strongly Supports |
| **Confidence** | High |
| **Relevance** | Very High — mechanistic understanding of unfaithfulness |
| **Evidence Type** | Empirical (controlled synthetic) |
| **Venue Quality** | arXiv preprint (UW-Madison) |

---

## One-Sentence Summary

Controlled synthetic experiments show that faithful CoT reasoning only emerges when training noise is below a critical threshold, with training dynamics exhibiting a phase transition from stepwise to skip-step reasoning — providing mechanistic evidence that unfaithfulness is the default mode under realistic training conditions.
