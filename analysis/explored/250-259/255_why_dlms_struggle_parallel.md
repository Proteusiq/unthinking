# Paper Analysis: Why Diffusion Language Models Struggle with Truly Parallel (Non-Autoregressive) Decoding?

## Metadata
- **arXiv ID**: 2602.23225
- **Title**: Why Diffusion Language Models Struggle with Truly Parallel (Non-Autoregressive) Decoding?
- **Authors**: Pengxiang Li, Dilxat Muhtar, Tianlong Chen, Lu Yin, Shiwei Liu
- **Date**: February 2026
- **Venue**: ICML 2026

---

## Core Claims

1. **DLMs collapse to AR-like decoding**: Despite parallel architecture, diffusion LMs converge to left-to-right generation patterns
2. **Sequential behavior is learned from data**: Training corpora (FineWeb, OpenR1-Math) have strong sequential dependence that models internalize
3. **CoT training increases AR-ness**: Post-training on Chain-of-Thought data further amplifies autoregressive bias
4. **Forcing parallelism breaks reasoning**: Random order decoding achieves low AR-ness but accuracy collapses
5. **"Fast DLMs" amplify sequentiality**: Speed-up methods work by reinforcing the AR critical path, not eliminating it

---

## Methodology

### Models Tested
- **LLaDA-8B**: Masked diffusion LM (pretrained from scratch)
- **Dream-7B**: Masked diffusion LM (adapted from AR models)

### Metrics

#### ARness (Autoregressive-ness)
Measures tendency to unmask leftmost tokens first:
- Global-ARness@1: Fraction of steps where leftmost masked token is chosen
- Score of 1.0 = strict left-to-right; 0.0 = fully random

#### SeqDep (Sequential Dependence)
Measures how much token prediction depends on preceding context vs. prompt alone:
- High SeqDep = strong chain-like structure (AR-shaped data)
- Low SeqDep = conditionally independent segments (parallelizable)

### Decoding Strategies Tested
1. **AR Order**: Unmask leftmost tokens (baseline)
2. **Arbitrary Order (AO)**: Unmask most confident tokens
3. **Random**: Unmask random tokens

---

## Key Evidence

### Finding I: Training Data Is Sequential

| Dataset | SeqDep Trend |
|---------|--------------|
| FineWeb (pre-training) | High, increasing with position |
| OpenR1-Math (CoT) | Very high, strongly increasing |

> "Reasoning steps in OpenR1-Math exhibit increasing dependence as the chain progresses... standard training data teaches the model that reasoning is a fundamentally ordered chain."

### Finding II: DLMs Decode Autoregressively

| Model | Decoding | ARness | Accuracy (GSM8K) |
|-------|----------|--------|------------------|
| LLaDA-8B | AR Order | 1.00 | 71.9% |
| LLaDA-8B | AO (confidence) | 0.73 | 51.9% |
| Dream-7B | AR Order | 1.00 | 78.2% |
| Dream-7B | AO (confidence) | 0.92 | 78.2% |

**Key insight**: Even with "arbitrary order" decoding, Dream's most confident tokens are almost always the next sequential tokens (ARness = 0.92).

### Finding III: CoT Training Increases ARness

| Model | Base ARness | After CoT SFT | Change |
|-------|-------------|---------------|--------|
| LLaDA-8B | 0.73 | 0.81 | +0.08 |
| Dream-7B | 0.92 | 0.93 | +0.01 |

> "Post-training further increases ARness... CoT supervision provides explicit step-by-step trajectories with a privileged order."

### Finding IV: Parallelism vs. Accuracy Trade-off

| Model | Steps | Tok/Step | GSM8K Acc |
|-------|-------|----------|-----------|
| Dream-7B | 1024 | 1 | 78.0% |
| Dream-7B | 512 | 2 | 66.8% |
| Dream-7B | 256 | 4 | 46.5% |

**Forcing parallel decoding degrades accuracy sharply** — from 78% to 46.5%.

### Finding V: Fast-DLMs Amplify AR Behavior

| Model + Method | ARness |
|----------------|--------|
| LLaDA-8B AO | 0.73 |
| LLaDA-8B + Fast-dLLM | 0.87 |
| Dream-7B AO | 0.92 |
| Dream-7B + Fast-dLLM | 0.94 |

> "Current 'fast' DLMs achieve speedups not by enabling non-sequential generation, but by effectively identifying and accelerating the underlying autoregressive critical path."

---

## Relationship to the Thesis

### Supports the Thesis

This paper provides strong evidence that:

1. **Sequential reasoning is a learned artifact**: Models internalize AR patterns from training data, not because reasoning requires sequentiality
2. **Left-to-right is data bias, not computation**: The parallel architecture can generate any order, but learns to mimic sequential patterns
3. **CoT supervision reinforces this bias**: Training on step-by-step data teaches models to stabilize early tokens first
4. **True parallel reasoning degrades performance**: When forced to generate out of order, accuracy collapses — suggesting the "reasoning" depends on sequential pattern completion

### The Core Insight

> "Even if the diffusion process is nominally position-agnostic, the model can learn denoising strategies that preferentially reconstruct outputs in an AR-shaped manner. This 'AR-shaped data' effect not only limits the extent to which DLMs can exploit genuine parallelism, but also complicates evaluation."

This means:
- Autoregressive models hide this dynamic behind forced L2R generation
- Diffusion models expose that the model *chooses* to generate L2R
- This choice comes from training data patterns, not reasoning requirements

---

## Relationship to Other Papers

### Supports
- **Reasoning or Rationalization (2603.01190)**: Explains why verdicts emerge early — models learned AR bias
- **Embers of Autoregression (2309.13638)**: Both show L2R bias is fundamental to LLM behavior
- **Dot by Dot (2404.15758)**: CoT benefits from computation, not semantic ordering

### Extends
- **Measuring Faithfulness in CoT (2307.13702)**: Shows mechanism for why CoT can be unfaithful — it's not driving computation

### Challenges
- **DeepSeek-R1 (2501.12948)**: Implies RL-trained reasoning may also just amplify AR patterns

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct rebuttals found (paper is from February 2026).

### Potential Counter-Arguments

1. **NAP solution works**: Their own NAP method shows parallel reasoning is possible with different data
2. **Architecture could overcome data bias**: Future architectures might break AR dependency
3. **CoT may still be useful**: Sequential CoT could provide scaffolding even if not strictly necessary

### Limitations (Authors Acknowledge)

1. Results specific to current DLM architectures (LLaDA, Dream)
2. NAP is proof-of-concept, not full solution
3. Limited to math reasoning benchmarks
4. Small-scale post-training experiments (103K samples)

---

## Key Quotes

> "Diffusion Language Models (DLMs) are often advertised as enabling parallel token generation, yet practical 'fast' DLMs frequently converge to left-to-right, autoregressive (AR)-like decoding dynamics."

> "We argue that a primary driver of AR-like decoding is a mismatch between DLM objectives and the highly sequential structure of widely used training data."

> "Even when the model architecture permits bidirectional context and parallel refinement, the realized decoding dynamics can resemble a sequential construction of the output."

> "Current parallel fast-DLM methods gain speed by *amplifying*, not removing, AR-like generation."

> "Changing the decoding procedure alone is often insufficient to undo this learned reliance. Addressing the issue therefore requires revisiting the data and supervision."

---

## NAP: Their Proposed Solution

The paper proposes NAP (Non-Autoregressive Parallel DLMs):

1. **Data curation**: Multiple independent reasoning trajectories per example
2. **Parallel-forced decoding**: Explicitly distribute unmasking across reasoning streams

### NAP Results

| Model | Steps | Baseline | NAP | Improvement |
|-------|-------|----------|-----|-------------|
| Dream-7B | 256 | 46.5% | 60.9% | +14.4% |
| Dream-7B | 1024 | 78.0% | 83.6% | +5.6% |

**Key insight**: Improvement grows with more aggressive parallelism, confirming AR bias is the bottleneck.

---

## Implications for the Thesis

### Sequential Generation is Post-Hoc

This paper shows that:

1. **The answer doesn't require sequential steps**: Parallel architectures can compute without L2R
2. **Sequential patterns are learned from training data**: Not inherent to reasoning
3. **Forcing L2R comes from data, not necessity**: Models choose AR order because they learned it
4. **CoT training reinforces narrative structure**: Not computation

### Why This Matters for "Information Is Already There"

If the model *learns* to generate L2R from training data patterns, then:
- Sequential CoT is pattern completion, not reasoning
- The "steps" are narrative structure matching training distribution
- The answer could be computed in parallel if trained differently

This directly supports the thesis that LLMs are sophisticated pattern matchers constructing post-hoc narratives.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
