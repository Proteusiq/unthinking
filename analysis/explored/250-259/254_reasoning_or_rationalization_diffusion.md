# Paper Analysis: Reasoning or Rationalization? The Role of Justifications in Masked Diffusion Models for Fact Verification

## Metadata
- **arXiv ID**: 2603.01190
- **Title**: Reasoning or Rationalization? The Role of Justifications in Masked Diffusion Models for Fact Verification
- **Authors**: Jacob Devasier
- **Date**: March 2026
- **Venue**: arXiv preprint
- **Institution**: University of Texas at Arlington

---

## Core Claims

1. **Verdicts resolve before justifications**: In masked diffusion LLMs (MDLMs), the model commits to a verdict within the first few diffusion steps, well before the justification is complete
2. **Forcing deliberation hurts performance**: Delayed verdict unmasking (forcing reasoning before answering) actively degrades accuracy from 86.2% to 71.9%
3. **Justifications are post-hoc rationalization**: The model generates explanations after determining the answer, not as part of the reasoning process
4. **Models rationalize wrong answers**: When forced to justify incorrect verdicts, only 44% maintain logical integrity; 56% rationalize the wrong answer
5. **Refinement drift**: As justification tokens accumulate, they can override initially correct verdicts

---

## Methodology

### Models Tested
- **LLaDA-8B**: First MDLM scaled to modern LLM level
- **LLaMA 3.1 8B**: Autoregressive baseline
- **Qwen3-8B**: Reasoning-augmented baseline (extended thinking mode)

### Dataset
- **AVeriTeC**: Real-world claim verification with evidence from the web
- Binary classification: Supported vs. Refuted
- N=500 development set

### Experiments

1. **Justification Ordering**: Test whether J→V or V→J order affects accuracy
2. **Delayed Verdict Unmasking**: Force model to generate X% of justification before verdict
3. **Integrity Test**: Force wrong verdict, see if model rationalizes it
4. **Reliance Test**: Condition verdict on corrupted justifications

---

## Key Evidence

### Table 1: Ordering Robustness

| Model | V→J Accuracy | J→V Accuracy |
|-------|--------------|--------------|
| LLaMA 3.1 8B | 69.7% | 72.5% |
| Qwen3-8B | 89.5% | 88.0% |
| LLaDA-8B | 86.2% | 89.0% |

**Finding**: MDLMs are robust to ordering because they resolve the verdict immediately regardless of prompted order.

### Table 2: Forced Deliberation Degrades Performance

| Deliberation % | Accuracy |
|----------------|----------|
| 0% | 86.2% |
| 25% | 86.6% |
| 50% | 79.2% |
| 75% | 73.8% |
| 90% | 71.9% |

**Finding**: Forcing the model to "think longer" before answering reduces accuracy by 14.3 percentage points.

### Integrity Test Results

| Outcome | Percentage |
|---------|------------|
| Maintains logical integrity | 44% |
| Rationalizes via logical errors | 37% |
| Rationalizes via hallucination | 13% |
| Other failures | 6% |

**Finding**: Model generates post-hoc rationalizations for wrong answers 56% of the time.

### Reliance Test Results

| Justification Source | Accuracy |
|---------------------|----------|
| Ground-truth justifications | 97.1% |
| Model-generated (normal) | 86.2% |
| Corrupted justifications | 57.3% |
| - Supported claims | 17.2% |
| - Refuted claims | 73.4% |

**Finding**: Verdicts are causally dependent on justification quality, explaining refinement drift.

---

## Relationship to the Thesis

### Supports the Thesis

This paper provides direct experimental evidence that:

1. **The answer comes first**: The model knows the verdict before generating the reasoning trace
2. **CoT is post-hoc rationalization**: Justifications are generated after the decision, not as part of deliberation
3. **Sequential reasoning is not necessary**: The verdict is computed in early diffusion steps without needing step-by-step reasoning
4. **Extended thinking can hurt**: Forcing deliberation degrades performance — the model's initial "intuition" is better than its elaborated reasoning

### Key Mechanism: Refinement Drift

> "The model commits to a verdict within the first few diffusion steps, then generates justification tokens that it subsequently conditions on. When these tokens contain errors, they exert pressure in the wrong direction, gradually overriding the initially correct assessment."

This directly supports the thesis that:
- The answer is computed immediately from pattern matching
- Sequential reasoning tokens can introduce noise that corrupts the initial correct assessment
- The "reasoning" is narrative construction, not computation

---

## Relationship to Other Papers

### Supports
- **Measuring Faithfulness in CoT (2307.13702)**: Both show CoT can be unfaithful to actual computation
- **CoT In The Wild Is Not Always Faithful (2503.08679)**: Consistent finding that explanations don't reflect true reasoning
- **Dot by Dot (2404.15758)**: Both show benefit of CoT is computational, not semantic

### Extends
- **Why DLMs Struggle with Parallel Decoding (2602.23225)**: This paper provides the mechanism (refinement drift) for why parallel decoding degrades reasoning

### Challenged By
- None identified — this is direct experimental evidence

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct rebuttals found (paper is from March 2026).

### Potential Counter-Arguments

1. **Task-specific**: Results on fact verification may not generalize to mathematical reasoning
2. **Scale**: Limited to 8B models; larger models may show different behavior
3. **Architecture-specific**: LLaDA-specific findings may not apply to other diffusion architectures (SEDD, continuous diffusion)

### Limitations (Authors Acknowledge)

1. AVeriTeC includes gold-standard evidence, reducing task complexity
2. Limited to LLaDA-8B; scale effects unknown
3. May not generalize to strict multi-step deduction (e.g., AIME math)
4. Results specific to masked diffusion; unclear if continuous/discrete diffusion differ

---

## Key Quotes

> "Even when explicitly prompted to generate justifications first, LLaDA consistently predicts the verdict within the first few diffusion steps."

> "Forcing extended deliberation through delayed verdict unmasking proves counterproductive, degrading accuracy from 86.2% to 71.9% as accumulating justification tokens override initially correct predictions."

> "We find that the model maintains logical integrity in only 44% of cases—generating a justification that contradicts the forced verdict and supports the correct answer—while in the remaining 56%, the model rationalizes the incorrect verdict."

> "This causal dependence does not contradict the early verdict convergence... rather, it reveals the mechanism underlying refinement drift."

---

## Implications for the Thesis

### The Information Is Already There

Diffusion models provide a unique window into LLM computation because they generate all positions simultaneously rather than left-to-right. This paper shows:

1. **Parallel generation reveals the answer is pre-computed**: The verdict crystallizes in early steps
2. **Sequential CoT is artifact of autoregressive training**: Not necessary for the computation
3. **"Reasoning" is narrative construction**: The model generates a story to explain a decision already made

### Why This Matters

Autoregressive models hide this dynamic behind sequential generation — each token appears to build on the previous. Diffusion models expose that the causal structure is inverted: the conclusion determines the reasoning, not vice versa.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
