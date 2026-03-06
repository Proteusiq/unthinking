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
- Training data: 2,000,000 examples, 62,500 training steps
- ε₁ tested: {0.01, 0.1, 0.3, 0.5}
- ε₂ tested: {0.001, 0.005, 0.01, 0.05, 0.1, 0.3, 0.5, 0.9}

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

### Accuracy by Phase (ε₁=0.01, ε₂=0.1)
- **Phase 1 (Stepwise)**: ~90% accuracy (limited by ε₂)
- **Phase 2 (Mixed)**: ~90% accuracy (stays flat)
- **Phase 3 (Skip-step)**: ~99% accuracy (approaches 1-ε₁)

### Mechanistic Analysis
- **Hidden State Contrast (HSC)**: Measures differentiation between consistent/inconsistent chains
- **Attention Contrast (AC)**: Measures attention score differences for positive/negative samples
- Both show sharp changes at phase boundaries — evidence of internal consistency checking

### Shortcut Features Amplify Unfaithfulness
- When c ∈ {0, 2, N/2}: high probability o=0 without needing reasoning
- On shortcut test sets: INR consistently **lower**, RIR₁ consistently **higher**
- **Data artifacts in training amplify unfaithfulness**

### Scaling Results
- **5-layer model**: Faster transition to skip-step reasoning
- Phase 2 (self-verification) nearly invisible with larger capacity
- With N=113: 4 phases re-emerge clearly
- **Implication**: Larger models → faster unfaithfulness emergence

### Position Swap Experiment

| Data Layout | RIR₁ | RIR₂ | IDS | INR |
|-------------|------|------|-----|-----|
| e₁→e₂→e₃ | 0 | 0 | 24.7 | 0 |
| e₂→e₁→e₃ | 1.00 | 0.99 | 26.0 | 0 |

- IDS (intervention sensitivity) unchanged — model still uses simpler expression
- **Complexity determines reasoning mode, not position**

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

#### 5. Shortcuts Amplify Unfaithfulness

Data artifacts (shortcut features) make skip-step reasoning even more attractive:
- Model learns to bypass reasoning when shortcuts exist
- This mirrors real LLM behavior with dataset biases

#### 6. Scaling Makes It Worse

Larger models transition to unfaithfulness **faster**:
- 5-layer model: Phase 2 nearly invisible
- More capacity → quicker skip-step emergence
- Suggests scaling may exacerbate unfaithfulness, not fix it

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

> "Only covers pretraining and supervised fine-tuning (SFT). Does NOT study reinforcement learning with verifier rewards (RLVR) — the standard recipe for enhancing reasoning (e.g., DeepSeek-R1)"

> "Need extensive evaluations across LLMs and tasks before policy/deployment decisions"

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
- [x] Paper graph updated

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
