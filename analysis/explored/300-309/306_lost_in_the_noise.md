# Paper Analysis: Lost in the Noise: Reasoning Models Fail with Contextual Distractors

## Metadata
- **arXiv ID**: 2601.07226
- **Title**: Lost in the Noise: Reasoning Models Fail with Contextual Distractors
- **Authors**: KAIST and LG AI Research (multiple authors)
- **Date**: January 2026
- **Venue**: arXiv preprint

---

## Core Claims

1. **Up to 80% performance drop**: State-of-the-art reasoning models catastrophically fail with contextual distractors.

2. **Agentic workflows amplify errors**: Multi-step planning propagates errors by over-trusting noisy tool outputs.

3. **Inverse scaling with reasoning tokens**: More reasoning leads to WORSE accuracy in noisy settings.

4. **Attention focuses on distractors**: Models disproportionately attend to distractor tokens in failure cases.

---

## Methodology

### Benchmark
- **NoisyBench**: 11 datasets across RAG, reasoning, alignment, tool-use
- **2,766 examples per setting**

### Distractor Types
- Random documents (RD)
- Random chat history (RC)
- Hard negative distractors (HN)

### Models Tested
Gemini-2.5-Pro, Gemini-2.5-Flash, DeepSeek-R1-0528, DeepSeek-R1-Distill-Llama-8B, gpt-oss-120b, Qwen3 (4B, 30B-A3B)

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY INSIGHT: Reasoning models cannot filter irrelevant context     │
│                                                                     │
│  Clean setting: Strong performance                                  │
│  + Random docs: -9% to -64%                                         │
│  + Hard negatives: -30% to -80%                                     │
│                                                                     │
│  More thinking = WORSE accuracy in noisy settings                   │
│  Agentic workflows AMPLIFY errors by trusting noise                 │
│  Attention focuses on DISTRACTOR tokens in failures                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Key Evidence

| Model | Clean | Hard Negative | Drop |
|-------|-------|---------------|------|
| DeepSeek-R1-Distill-8B | 32.4% | 6.3% | **-80.6%** |
| Qwen3-4B-Thinking | 58.4% | 32.7% | -43.9% |
| Qwen3-30B-A3B | 58.8% | 35.0% | -40.5% |
| Gemini-2.5-Pro | 77.8% | 48.0% | -38.3% |
| DeepSeek-R1-0528 | 72.4% | 47.6% | -34.2% |
| gpt-oss-120b | 72.0% | 50.2% | -30.3% |

### Alignment Catastrophe (BBQ task)
- Gemini-2.5-Pro: 94.0% → 60.5% (hard negatives)
- DeepSeek-R1: 93.0% → 33.7%

---

## Relationship to Other Papers

### Extends
- **#180 Contextual Drag** (2602.04288): Both show context pulls reasoning astray

### Supports
- **#305 Effective Reasoning** (2509.19284): Both find more compute can hurt
- **#302 Test-Time Compute** (2408.03314): Scaling has fundamental limits
- **#303 CoVe** (2309.11495): Context pollution prevents self-correction
- **#3 GSM-Symbolic** (2410.05229): Surface changes collapse performance

---

## REBUTTALS

### This Paper Directly Challenges
- **Test-time scaling claims**: More compute → worse results with noise
- **Agentic AI robustness**: Tool use amplifies rather than corrects errors
- **Alignment stability**: Random noise triggers misalignment

### Limitations (Authors Acknowledge)
1. Synthetic distractors: Hard negatives are LLM-generated, may not capture all real-world noise
2. Benchmark-specific: 11 datasets may not cover all reasoning domains
3. Mitigation incomplete: RARE helps but doesn't fully solve the problem

---

## Key Quotes

> "Our evaluation reveals a catastrophic performance drop of up to 80% in state-of-the-art models when faced with contextual distractors."

> "Agentic workflows often amplify these errors by over-trusting noisy tool outputs."

> "Distractors can trigger emergent misalignment even without adversarial intent."

> "We uncover an inverse scaling trend where increased test-time computation leads to worse performance in noisy settings."

> "Our attention-based analysis shows that models disproportionately focus on distractor tokens, especially in incorrect predictions."

---

## Significance for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHY REASONING FAILS WITH NOISE                                    │
├─────────────────────────────────────────────────────────────────────┤
│  1. Model receives context with distractors                        │
│  2. Attention spreads to distractor tokens                         │
│  3. Reasoning incorporates misleading information                  │
│  4. More thinking = more distractor integration                    │
│  5. Multi-step planning propagates contaminated hypotheses         │
│  6. Final answer reflects noise, not problem structure             │
│                                                                     │
│  Genuine reasoner would IDENTIFY and FILTER irrelevant context     │
│  LLMs AMPLIFY irrelevant context through extended processing       │
└─────────────────────────────────────────────────────────────────────┘
```

**Stance**: SUPPORTS

Comprehensive evidence against genuine reasoning: models cannot filter noise, more compute makes it worse, agentic workflows amplify errors, and attention analysis reveals mechanism.

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
