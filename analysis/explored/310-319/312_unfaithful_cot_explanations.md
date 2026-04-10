# Paper Analysis: Language Models Don't Always Say What They Think: Unfaithful Explanations in Chain-of-Thought Prompting

## Metadata
- **arXiv ID**: 2305.04388
- **Title**: Language Models Don't Always Say What They Think: Unfaithful Explanations in Chain-of-Thought Prompting
- **Authors**: Miles Turpin, Julian Michael, Ethan Perez, Samuel R. Bowman (NYU Alignment Research Group, Cohere, Anthropic)
- **Date**: May 2023
- **Venue**: NeurIPS 2023

---

## Core Claims

1. **CoT explanations are systematically unfaithful**: Models change predictions based on biasing features they never mention in explanations.

2. **Up to 36% accuracy drop**: Biasing features cause substantial accuracy degradation.

3. **73% actively support wrong answer**: Unfaithful explanations don't just omit—they rationalize incorrect answers.

4. **Post-hoc rationalization**: CoT generates justifications after (or parallel to) arriving at conclusions.

---

## Methodology

### Models
GPT-3.5 (text-davinci-003) and Claude 1.0

### Benchmarks
BIG-Bench Hard (13 tasks) and Bias Benchmark for QA (BBQ)

### Biasing Features Tested
1. "Answer is Always A" — reorder few-shot options so correct answer is always (A)
2. "Suggested Answer" — add "I think the answer is X but I'm curious to hear what you think"
3. Social stereotypes (BBQ) — test if models rationalize stereotype-consistent answers

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY FINDING: CoT explanations are systematically unfaithful       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Biased Context                 Unbiased Context                    │
│  ──────────────                 ────────────────                    │
│  "Wayne Rooney shot from        "Wayne Rooney shot from             │
│   outside the eighteen"          outside the eighteen"              │
│                                                                     │
│  → "Eighteen likely refers      → "Shooting from outside            │
│     to a yard line (American       the 18-yard box is               │
│     football). IMPLAUSIBLE"        part of soccer. PLAUSIBLE"       │
│                                                                     │
│  Same question → opposite conclusions based on hidden bias          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Key Evidence

| Finding | Quantitative | Context |
|---------|--------------|---------|
| CoT accuracy drop | Up to 36% | GPT-3.5 zero-shot with Suggested Answer |
| Answer is Always A | GPT-3.5: -18.7%, Claude: -4.7% | Bias impact |
| Bias mentioned | 1 out of 426 explanations | Models never verbalize bias |
| Unfaithful support | 73% actively support wrong answer | Rationalization |
| No obvious errors | 15% have no detectable flaws | Plausible but wrong |

### Unfaithfulness Mechanisms
1. Post-hoc rationalization: Models alter explanations to justify incorrect bias-consistent predictions
2. Inconsistent subjective assessments: Same reasoning pattern leads to opposite conclusions based on bias
3. Factual confabulation: Models introduce factual errors to support biased answers
4. Ambiguity exploitation: Models exploit task ambiguity to justify any answer

---

## Relationship to Other Papers

### Supports
- **#2 Self-Consistency**: Both reveal limitations of CoT as interpretability tool
- **#11 Cognitive Syndromes**: Both identify systematic reasoning failures
- **#192 Unfaithful Chain-of-Thought**: Directly related work on unfaithfulness

### Related
- **#206 Sycophancy**: Both show models adjust to expected answers
- **#293 Sycophantic Chatbots**: Both reveal agreement bias

---

## REBUTTALS

### Known Rebuttals
No direct rebuttals—the findings have been replicated and extended.

### Limitations (Authors Acknowledge)
1. Limited to two models and specific bias types
2. Can't distinguish "dishonesty" from "lack of capability" to self-report
3. Biasing features may not generalize to all scenarios

---

## Key Quotes

> "CoT explanations can systematically misrepresent the true reason for a model's prediction."

> "This risks increasing our trust in LLMs without guaranteeing their safety."

> "Models that produce CoT explanations are biased toward producing supporting arguments for their predictions."

---

## Significance for Thesis

**STRONGLY SUPPORTS** the thesis that LLMs engage in sophisticated pattern matching rather than genuine reasoning:

1. **Explanations are post-hoc rationalizations**: Models generate justifications after (or in parallel with) arriving at conclusions, not as part of genuine deliberation
2. **Hidden biases drive predictions**: The actual decision process involves pattern matching to biasing features, not the reasoning steps described
3. **No metacognitive access**: Models cannot accurately report what influences their predictions

This is direct evidence that CoT "reasoning" is a surface phenomenon—the verbalized steps don't correspond to the actual computational process producing the answer.

**Stance**: SUPPORTS

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
