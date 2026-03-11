# Paper Analysis: Do Large Language Model Benchmarks Test Reliability?

## Metadata
- **arXiv ID**: 2502.03461
- **Title**: Do Large Language Model Benchmarks Test Reliability?
- **Authors**: Joshua Vendrow, Edward Vendrow, Sara Beery, Aleksander Mądry (MIT)
- **Date**: Feb 2025

---

## Core Claims

1. **Benchmarks don't test reliability — only capability** — "saturated" benchmarks (>90%) are retired before models achieve true reliability (100%)
2. **Label noise masks real model failures** — up to 30% of benchmark examples have errors; more than half of model "failures" are actually label issues
3. **Platinum benchmarks reveal the reliability frontier** — carefully curated benchmarks with verified labels show frontier models still fail on elementary tasks
4. **Capability ≠ Reliability** — models can achieve 95% on GSM8K yet fail basic coreference resolution that humans solve trivially
5. **Systematic failure patterns exist** — "first event bias" and "rounding up primes" reveal pattern-matching shortcuts

---

## Methodology

**Approach**: Create "platinum" versions of 15 popular benchmarks by systematically removing label errors and ambiguous questions.

**Scale**:
- **15 benchmarks** across 6 categories (Math, Logic, Table, RC, Coreference, Vision)
- **20+ frontier models** tested including o1, o3-mini, Claude 3.5, GPT-4o, DeepSeek-V3
- **~3,000 platinum questions** after cleaning

**Cleaning Protocol**:
1. Run multiple frontier LLMs on each question
2. Manually inspect any question where at least one LLM disagrees
3. Re-label incorrect solutions OR remove poorly written questions
4. Categories of bad questions: mislabeled, contradictory, ambiguous, flawed construction

---

## Key Evidence

```
┌─────────────────────────────────────────────────────────────────────┐
│                    BENCHMARK NOISE LEVELS                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  GSM8K:        ~5% mislabeled or poorly written                     │
│  SVAMP:        >5% error rate                                       │
│  VQA v2.0:     High error rate (all labels revised)                 │
│  SQuAD2.0:     Up to 30% issues (ambiguous/nonsensical)             │
│  HotpotQA:     Up to 30% issues                                     │
│  DROP:         Up to 30% issues                                     │
│                                                                     │
│  "For the majority of benchmarks we investigate, more than half     │
│   of model failures can be attributed to label noise"               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Model Performance on Platinum Benchmarks

| Model | Overall Error Rate | Key Failures |
|-------|-------------------|--------------|
| o1-2024-12-17 (high) | 0.75% | Winograd WSC (5), VQA (10) |
| Claude 3.5 Sonnet (Oct) | 1.64% | MMLU HS Math (21), Winograd (6) |
| o3-mini | 1.64% | Winograd (5), VQA (7) |
| GPT-4o (Nov) | 2.48% | Navigate (4), Winograd (12) |
| DeepSeek-V3 | 2.85% | GSM8K (12), Winograd (16) |

### Failure Pattern: First Event Bias

```
┌─────────────────────────────────────────────────────────────────────┐
│                      FIRST EVENT BIAS                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Question: "In 1860, 1865, and 1870, what year did X happen?"       │
│                                                                     │
│  Ground truth: 1870                                                 │
│  Model answer: 1860 (the first mentioned)                           │
│                                                                     │
│  Models systematically select the FIRST mentioned entity/date       │
│  even when the question asks about a later one.                     │
│                                                                     │
│  This is a PATTERN MATCHING shortcut, not reasoning.                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Failure Pattern: Rounding Up Primes

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ROUNDING UP PRIMES                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Question: "What is the 100th prime number?"                        │
│                                                                     │
│  Ground truth: 541                                                  │
│  Model answer: 547 (rounds up to next prime)                        │
│                                                                     │
│  Models frequently round to the NEXT prime instead of the           │
│  actual answer — a systematic arithmetic shortcut.                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### The Winograd Problem

Even o1 and o3-mini fail this elementary coreference task:

> "I couldn't find a spoon, so I tried using a pen to stir my coffee. But that turned out to be a bad idea, because it got full of ink. What does 'it' refer to?"
> 
> **Correct**: The coffee  
> **Model answer**: The pen (most models)

---

## Thesis Relevance

**Stance**: SUPPORTS

This paper directly supports the thesis that LLMs pattern-match rather than reason:

```
┌─────────────────────────────────────────────────────────────────────┐
│                   WHY THIS SUPPORTS THE THESIS                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. Capability vs Reliability Gap                                   │
│     High benchmark scores don't indicate reliable reasoning         │
│     Models fail on "elementary" tasks humans solve trivially        │
│                                                                     │
│  2. Systematic Failure Patterns                                     │
│     "First event bias" = positional pattern matching                │
│     "Rounding up primes" = arithmetic shortcut                      │
│     These are SHORTCUTS, not reasoning strategies                   │
│                                                                     │
│  3. Benchmark Saturation Masks Problems                             │
│     ~95% accuracy hides systematic 5% failures                      │
│     These aren't "random errors" — they're pattern failures         │
│                                                                     │
│  4. Coreference Failures                                            │
│     Frontier models fail basic "it" resolution                      │
│     This requires UNDERSTANDING, not pattern matching               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Critical Assessment

### Strengths
- Rigorous methodology with manual verification
- Large-scale study (15 benchmarks, 20+ models)
- Identifies specific, reproducible failure patterns
- MIT CSAIL authorship (Mądry lab)
- Provides public code and platinum benchmarks

### Limitations
- Platinum benchmarks are subsets (~200 questions each)
- Some failures could be prompt-sensitivity not reasoning failure
- No mechanistic explanation for WHY patterns emerge
- Cleaning protocol may miss systematic errors all models share

### Methodological Innovation
- Introduces "reliability frontier" concept vs "capability frontier"
- Proposes platinum benchmark standard for deployment decisions
- Demonstrates benchmark lifecycle leads to premature retirement

---

## Connections

### Related Papers in Corpus
- **#267 (LLM-as-a-Judge Survey)**: Both show evaluation infrastructure is compromised
- **#268 (Can You Trust LLM Judgments)**: Complements — judges AND benchmarks unreliable
- **#269 (Paraphrase Robustness)**: Both show surface changes break performance
- **GSM-Symbolic (#3)**: Same conclusion — GSM8K accuracy hides fragility

### Novel Contribution
First paper to systematically distinguish **capability** (what models can sometimes do) from **reliability** (what models can always do) with controlled evidence.

---

## Quotations

> "For most tasks, no state-of-the-art model that we evaluate is able to pass (i.e., achieve 100% accuracy)."

> "Hidden within this label noise, there still remain real model failures. Despite the relative simplicity of these tasks, for most tasks no state-of-the-art model is able to pass."

> "Current benchmarks are not well equipped for testing model reliability."

> "The majority of models, including o3-mini, Gemini 2.0 Flash, and DeepSeek-V3 fail at the following basic coreference resolution task."

> "On what kinds of tasks are frontier models actually reliable? [...] For most tasks, the answer appears to be: not yet."

---

## REBUTTALS

### Papers This Paper Rebuts
- Claims that "saturated" benchmarks indicate mastery
- Assumptions that 95%+ accuracy means reliable deployment
- Benchmark papers that don't account for label noise

### Counter-Evidence Needed
- Show that failure patterns are prompt-specific not fundamental
- Demonstrate platinum benchmark failures are edge cases not systematic
- Provide evidence that models DO achieve 100% on meaningful subsets
