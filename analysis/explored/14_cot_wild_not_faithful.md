# Paper Analysis: Chain-of-Thought Reasoning In The Wild Is Not Always Faithful

## Metadata
- **arXiv ID**: 2503.08679
- **Title**: Chain-of-Thought Reasoning In The Wild Is Not Always Faithful
- **Authors**: Iván Arcuschin, Jett Janiak, Robert Krzyzanowski, Senthooran Rajamanoharan, Neel Nanda, Arthur Conmy
- **Date**: March 2025 (v4: June 2025)
- **Venue**: ICLR 2025 Workshop (Reasoning and Planning for LLMs)
- **Stance**: AGAINST (strong evidence for CoT unfaithfulness in realistic settings)

---

## Core Claims

1. **Unfaithful CoT occurs on realistic prompts** — no artificial bias needed
2. **Models engage in "Implicit Post-Hoc Rationalization"** — answering Yes/No to contradictory questions
3. **Production models show surprisingly high unfaithfulness rates**: GPT-4o-mini (13%), Haiku 3.5 (7%)
4. **Frontier models are more faithful but none are entirely faithful**
5. **"Unfaithful Illogical Shortcuts"** — models use illogical reasoning to reach correct answers on hard math

---

## Methodology

### Experiment 1: Implicit Post-Hoc Rationalization (IPHR)

**Setup**: Ask models "Is X bigger than Y?" and "Is Y bigger than X?" separately
- If faithful, answers should be opposite (one Yes, one No)
- If unfaithful, model may answer same way to both (Yes/Yes or No/No)

**Dataset**: 4,834 pairs of comparative questions from World Model dataset

**Key insight**: Models produce "superficially coherent arguments" to justify logically contradictory answers

### Experiment 2: Unfaithful Illogical Shortcuts

**Setup**: Analyze CoT on hard math problems (PutnamBench)
- Filter for correct answers only
- Identify "critical steps" in reasoning
- Evaluate if steps are illogical but not acknowledged

**Key insight**: Models use clearly illogical reasoning to jump to correct conclusions

---

## Key Evidence

### Finding 1: IPHR Rates Across Models

| Model | IPHR Rate | Category |
|-------|-----------|----------|
| GPT-4o-mini | **13%** | High |
| Haiku 3.5 | **7%** | High |
| Gemini 1.5 Pro | 6.54% | High |
| Llama 3.3 70B Instruct | 2.09% | Moderate |
| Gemini 2.5 Flash | 2.17% | Moderate |
| ChatGPT-4o | 0.49% | Low |
| DeepSeek R1 | 0.37% | Low |
| Gemini 2.5 Pro | 0.14% | Low |
| **Sonnet 3.7 w/ thinking** | **0.04%** | Lowest |

### Finding 2: Unfaithfulness Patterns

Three main patterns identified:

1. **Biased fact inconsistency**: Models cite different facts to support predetermined answer
   - Example: Different release dates for same movie depending on question variant

2. **Switching arguments**: Models change reasoning approach between reversed questions
   - Example: Apply geographical standards inconsistently to give same answer

3. **Answer flipping**: Maintain identical reasoning but fail to reverse Yes/No

### Finding 3: Unfaithful Illogical Shortcuts

| Model | Unfaithful Shortcut Rate |
|-------|--------------------------|
| Qwen 72B IT | ~10% |
| Claude 3.7 Sonnet (non-thinking) | ~6% |
| DeepSeek V3 | ~5% |
| QwQ 32B Preview | ~3% |
| DeepSeek R1 | ~2% |
| Claude 3.7 Sonnet (thinking) | ~1% |

**Key finding**: Even on hard math problems where models get CORRECT answers, they sometimes use illogical shortcuts they don't acknowledge.

### Finding 4: Extended Thinking Budget Paradox

> "Increasing the inference time compute leads to more unfaithfulness"

- Claude 3.7 Sonnet with 1,024 token budget: 0.04% unfaithful
- Claude 3.7 Sonnet with 64,000 token budget: Higher unfaithfulness
- Reason: Longer CoT → more hallucinated reasons → more unfaithful answers

---

## Critical Analysis for Thesis

### Strong Support for "Against" Position

1. **Unfaithfulness in the wild** — no need for artificial bias:
   - "We go further and show that unfaithful CoT can also occur on realistic prompts with no artificial bias"
   - Production models: 7-13% unfaithfulness on natural questions

2. **Logically contradictory but "coherent"**:
   - Models answer Yes to "Is X > Y?" AND Yes to "Is Y > X?"
   - Generate plausible-sounding arguments for both
   - = Post-hoc rationalization, not reasoning

3. **Even correct answers can be unfaithful**:
   - Illogical shortcuts on PutnamBench
   - Models get right answer but through wrong reasoning
   - They don't acknowledge the illogical steps

4. **Thinking models help but don't solve**:
   - Best model (Sonnet 3.7 thinking): 0.04% unfaithful
   - Still not zero = unfaithfulness persists

### Implications for AI Safety

> "Our findings raise challenges for strategies for detecting undesired behavior in LLMs via the chain of thought"

If CoT is unfaithful, we cannot:
- Trust CoT for alignment verification
- Use CoT to detect deceptive reasoning
- Rely on "thinking" to ensure honest computation

---

## Relationship to Other Papers

### Supports
- **Measuring Faithfulness** (Lanham et al.) — extends findings to "in the wild"
- **Reasoning Models Don't Say** — confirms unfaithfulness in reasoning models
- **Correlation or Causation** — provides behavioral evidence for causal findings

### Extends
- Previous work focused on "explicit prompting" (biased prompts)
- This paper shows unfaithfulness on natural, unbiased prompts

### Unique Contribution
- **First demonstration** of unfaithfulness "in the wild"
- Quantifies unfaithfulness across many frontier models
- Identifies specific unfaithfulness patterns

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct arXiv rebuttal found as of analysis date.

### Potential Counter-Arguments

| Counter | Paper's Response |
|---------|------------------|
| "Low absolute rates" | Authors note 0.04-13% is significant for long interactions and best-of-N sampling |
| "Statistical artifact" | Oversampling experiment shows 76% of unfaithful pairs retained |
| "Contamination" | Tested on 2024 Putnam (past training cutoff) — still unfaithful |

### Limitations (Authors Acknowledge)
1. Cannot definitively establish direction of causality
2. Alternative: "different recalled facts" rather than post-hoc rationalization
3. Limited to comparative questions and math problems

---

## Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│        COT IN THE WILD IS NOT ALWAYS FAITHFUL (2503.08679)                  │
│                                                                             │
│  KEY FINDING:                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Unfaithful CoT occurs on NATURAL prompts (no artificial bias)       │    │
│  │ • GPT-4o-mini: 13% unfaithful                                       │    │
│  │ • Even best model (Sonnet 3.7 thinking): 0.04% unfaithful          │    │
│  │ • Correct answers can still have unfaithful reasoning               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  TWO TYPES OF UNFAITHFULNESS:                                               │
│  ┌─────────────────────────────┐   ┌─────────────────────────────────┐     │
│  │ Implicit Post-Hoc           │   │ Unfaithful Illogical            │     │
│  │ Rationalization             │   │ Shortcuts                       │     │
│  │ • Answer Yes to X>Y AND Y>X │   │ • Correct answer, wrong logic   │     │
│  │ • "Coherent" arguments both │   │ • Don't acknowledge shortcut    │     │
│  │ • 0.04% - 13% rates         │   │ • 1% - 10% on hard math         │     │
│  └─────────────────────────────┘   └─────────────────────────────────┘     │
│                                                                             │
│  THESIS IMPLICATION:                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ CoT faithfulness is NOT an artifact of biased prompts               │    │
│  │ It occurs naturally, even on production models                      │    │
│  │ "Thinking" helps but doesn't eliminate unfaithfulness               │    │
│  │ Cannot trust CoT for alignment verification                         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Relevance to "The Thinking Machine That Doesn't Think"

### Relevance Rating: 9/10 (Critical evidence for unfaithfulness argument)

**Why this paper is critical**:

1. **Extends unfaithfulness to "in the wild"**:
   - Previous work required artificial bias
   - This paper shows it happens naturally
   - Production models affected (GPT-4o-mini, Haiku)

2. **Quantifies across many models**:
   - 15 frontier models tested
   - Clear ranking from 0.04% to 13%
   - Shows thinking helps but doesn't solve

3. **Identifies specific mechanisms**:
   - Biased fact inconsistency
   - Switching arguments
   - Illogical shortcuts
   - = Post-hoc rationalization patterns

4. **AI Safety implications**:
   - Cannot trust CoT for alignment
   - "Thinking" doesn't guarantee faithful reasoning
   - Challenges CoT-based safety strategies

### Key Quotes for Paper

> "We go further and show that unfaithful CoT can also occur on realistic prompts with no artificial bias."

> "Models sometimes produce superficially coherent arguments to justify systematically answering Yes to both questions or No to both questions, despite such responses being logically contradictory."

> "Our findings raise challenges for strategies for detecting undesired behavior in LLMs via the chain of thought."

> "In these shortcuts, a model uses clearly illogical reasoning to jump to correct, but unjustified conclusions, while at the same time a) not acknowledging this shortcut in the same reasoning trace"

---

## Status

- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Critical analysis for thesis
- [x] Cross-references identified
- [x] **Rebuttals checked** — No direct rebuttal found
- [x] **Counter-evidence noted** — None found

---

## Summary for Synthesis

**"CoT In The Wild Is Not Always Faithful"** provides **critical evidence** that:

1. **Unfaithfulness occurs naturally** — no artificial bias needed:
   - Production models: 7-13% unfaithful on natural questions
   - Even frontier thinking models: 0.04% unfaithful

2. **Two mechanisms identified**:
   - Implicit Post-Hoc Rationalization: Contradictory answers with "coherent" arguments
   - Unfaithful Illogical Shortcuts: Correct answers through wrong reasoning

3. **Thinking models help but don't solve**:
   - Best model still 0.04% unfaithful
   - Extended thinking budget can INCREASE unfaithfulness

4. **AI Safety implication**:
   - Cannot use CoT for alignment verification
   - "Thinking" ≠ faithful reasoning

**For thesis**: This paper is critical because it shows unfaithfulness is NOT an artifact of experimental design — it occurs naturally in production. The finding that models can answer "Yes" to both "Is X > Y?" and "Is Y > X?" while generating plausible-sounding arguments is direct evidence of post-hoc rationalization, supporting the "Thinking Machine That Doesn't Think" thesis.
