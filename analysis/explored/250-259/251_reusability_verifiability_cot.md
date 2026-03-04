# Paper Analysis: Evaluating Chain-of-Thought Reasoning through Reusability and Verifiability

## Metadata
- **arXiv ID**: 2602.17544
- **Title**: Evaluating Chain-of-Thought Reasoning through Reusability and Verifiability
- **Authors**: Shashank Aggarwal, Ram Vikas Mishra, Amit Awekar (IIT Guwahati)
- **Date**: February 2026
- **Venue**: ACM Conference 2026

---

## Core Claims

1. **Reusability and verifiability don't correlate with accuracy** — High accuracy on benchmarks doesn't guarantee good CoT that others can reuse
2. **Specialized reasoning models aren't always better** — DeepSeek-R1 and Phi4-reasoning not consistently more reusable/verifiable than Llama/Gemma
3. **Thinker-Executor framework decouples CoT** — Evaluates if CoT can be followed by independent models
4. **Current leaderboards have a blind spot** — Accuracy alone fails to capture CoT quality

---

## Methodology

**Thinker-Executor Framework**:
- **Thinker**: Generates CoT (4 models: Gemma3-27B, Llama3.1-8B, DeepSeek-R1:14b, Phi4-reasoning:14b)
- **Executor**: Follows Thinker's CoT (committee of 10 models, 360M-3B params)
- **Strong Committee**: 5 larger models (2B-3B)
- **Weak Committee**: 5 smaller models (360M-0.5B)

**Measures**:
- **Reusability**: Does Thinker's CoT flip Executor's answer (correct→wrong or wrong→correct)?
- **Verifiability**: Does Executor reach same answer as Thinker when given CoT?

**Datasets**: GSM8K, SVAMP, StrategyQA, ARC-Challenge, CommonsenseQA

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| Accuracy vs Reusability correlation | -0.53 avg | Kendall's τ across datasets |
| Reusability vs Verifiability correlation | 0.13 avg | Weak correlation |
| Verifiability vs Accuracy correlation | 0.20 avg | Almost uncorrelated |
| DeepSeek-R1 GSM8K | 94% acc, 67% reusability, 80% verifiability | Lower reusability than Phi |
| Phi4 GSM8K | 81% acc, 84% reusability, 88% verifiability | Best reusability despite lower accuracy |
| Llama SVAMP | 82% acc, 65% reusability, 72% verifiability | Highest reusability, lowest accuracy |
| Strong vs Weak committee consistency | τ=0.53-0.67 | Moderate consistency |

---

## Relationship to Other Papers

### Supports
- **Measuring Faithfulness (2307.13702)** — Both find accuracy doesn't equal CoT quality
- **CoT In The Wild (2503.08679)** — Confirms CoT often non-faithful even with correct answers
- **Faithfulness Decay (2602.11201)** — Different metric but same conclusion: CoT ≠ reasoning

### Challenges
- None directly — paper proposes new evaluation dimensions

### Extends
- **Faithful CoT (2301.13379)** — Extends Translator-Solver to multi-model Thinker-Executor
- **Process Reward Models (Lightman 2024)** — Provides alternative to step-scoring via reusability

---

## REBUTTALS

### Known Rebuttals
None found yet — paper is recent

### Potential Counter-Arguments
1. **Small executor models** — 360M-3B models may lack capability to follow complex CoT
2. **Single GPU evaluation** — Limited model sizes due to compute constraints
3. **Committee averaging** — May mask important model-specific patterns
4. **Corrupted CoT method** — Artificial corruption may not reflect natural errors

### Limitations (Authors Acknowledge)
- Limited to mathematical and reasoning benchmarks
- Executor committee limited to smaller models
- Default decoding strategies only
- Single GPU constraint

---

## Key Quotes

> "High accuracy on a target task does not guarantee highly reusable or verifiable reasoning."

> "Surprisingly, sometimes general-purpose models perform better when it comes to reusability and verifiability."

> "This creates a blind spot. We need to evaluate the reasoning process, and not just the final answer."

> "A model might get the right answer for the wrong reasons. Yet, the community continues to use these benchmarks to judge reasoning quality."

> "Reusability measures persuasiveness of the CoT."

---

## Significance for Thesis

**BALANCED** evidence for the thesis:

**Supports thesis**:
- Accuracy ≠ reasoning quality — models get right answers without good reasoning
- Specialized "reasoning" models not better at producing reusable CoT
- Negative correlation between accuracy and reusability suggests different mechanisms

**Challenges thesis (partially)**:
- CoT can be reused by other models in some cases
- Verifiability exists (80-88% on GSM8K) suggesting CoT has some causal role
- Framework shows CoT isn't entirely decorative

Overall: Shows CoT quality is model-dependent and doesn't correlate with accuracy, suggesting "reasoning" models may just pattern-match better without better reasoning.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
