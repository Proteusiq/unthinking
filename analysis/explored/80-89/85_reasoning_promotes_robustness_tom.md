# Paper Analysis: Reasoning Promotes Robustness in Theory of Mind Tasks

## Metadata
- **arXiv ID**: 2601.16853
- **Title**: Reasoning Promotes Robustness in Theory of Mind Tasks
- **Authors**: Ian B. de Haan, Peter van der Putten, Max van Duijn
- **Institution**: LIACS, Leiden University
- **Date**: January 2026
- **Venue**: Preprint

---

## Core Claims

1. **Reasoning models exhibit increased robustness** to prompt variations and task perturbations in Theory of Mind (ToM) tasks
2. **Gains are from robustness, not new ToM capabilities** — more plausibly attributed to finding correct solutions more reliably
3. **Reasoning models show ToM meta-knowledge** — filter facts, take perspectives explicitly in reasoning traces
4. **Non-reasoning models get confused** on trivial modifications that reasoning models handle
5. **Performance varies by task type** — Strange Stories easier than Sally-Anne variants

---

## Methodology

### Models Tested
| Model | Thinking Off | Reasoning Returned | Temp Config | Reasoning as Input |
|-------|-------------|-------------------|-------------|-------------------|
| GPT-5 | No | Summary (filtered) | Yes | Yes |
| Claude | **Yes** | Summary (useful) | Yes | Yes |
| DeepSeek R1 | No | Full | No | No |
| Grok-3-mini | No | Full | No | No |

**Key advantage**: Claude allows turning thinking on/off — enables controlled comparison.

### Psychological Tests Used

1. **Sally-Anne (1st & 2nd order)**: Classic false belief tests
   - 1st order: "Where will Sally look for her marble?"
   - 2nd order: "Where does X think Y thinks the object is?"

2. **Strange Stories**: 7 increasingly difficult ToM scenarios (sarcasm, double bluff, misunderstanding)

3. **Imposing Memories**: Multi-level recursive mental states (A believes B wants C to wish for X)

4. **Modifications on Simple ToM Tasks**: Novel variations based on Ullman (2023) — tests robustness

### Scoring (0-2 scale, normalized to 0-1)
- 0: Incorrect reasoning
- 1: Close to right answer or self-corrects
- 2: Correct result and reasoning

### Benchmarks Used
- FANToM: Stress-testing machine ToM in interactions
- ToMBench: Comprehensive ToM benchmark
- Thought Tracing results from Kim et al. (2025)

---

## Key Evidence

### Sally-Anne Performance (1st Order)

| Model | Score |
|-------|-------|
| Claude (thinking) | **1.0** |
| Claude (no thinking) | 0.75 |
| GPT-5 | 1.0 |
| R1 | 1.0 |
| Grok-3-mini | 1.0 |

**Key finding**: Even non-reasoning Claude succeeds on basic Sally-Anne.

### Sally-Anne Performance (2nd Order)

| Model | Score |
|-------|-------|
| Claude (thinking) | **1.0** |
| Claude (no thinking) | **0.5** |
| GPT-5 | 1.0 |
| R1 | 1.0 |
| Grok-3-mini | 1.0 |

**Critical finding**: Non-thinking Claude drops to 0.5 on 2nd order — thinking helps!

### Strange Stories (Averaged)

| Model | Score |
|-------|-------|
| Claude (thinking) | **0.93** |
| Claude (no thinking) | 0.79 |
| GPT-5 | 0.79 |
| R1 | 0.86 |
| Grok-3-mini | 0.93 |

**Key finding**: Reasoning models score higher; non-thinking Claude matches GPT-5.

### Robustness to Trivial Modifications

Based on Ullman (2023) variations — tests if models fail on "trivial" changes:

| Model | Baseline | Modified | Robust? |
|-------|----------|----------|---------|
| GPT-3 (2023) | Pass | **Fail** | No |
| Claude (thinking) | Pass | **Pass** | **Yes** |
| Claude (no thinking) | Pass | Fail/Confused | No |
| GPT-5 | Pass | Pass | Yes |
| R1 | Pass | Pass | Yes |

**Critical finding**: Reasoning models are ROBUST to modifications that broke GPT-3.

### Benchmark Results (FANToM)

| Model | Full Context | Short Context |
|-------|-------------|---------------|
| GPT-4 | 58.3% | - |
| Claude (thinking) | ~70%+ | - |
| R1 | ~75%+ | - |
| **Thought Tracing** | **88%** | **88%** |

**Key finding**: Specialized methods (Thought Tracing) still outperform reasoning models.

---

## Critical Assessment

### What This Paper Shows

1. **Reasoning = robustness, not new capability** — the key insight
2. **Thinking traces reveal ToM strategies** — perspective taking, fact filtering
3. **Non-reasoning models fail on trivial variations** — brittleness persists
4. **Model improvements are real but bounded** — still below specialized methods

### What This Paper Does NOT Show

1. **Genuine ToM understanding** — explicitly avoids this claim
2. **Mechanism for improvement** — black-box evaluation
3. **OOD generalization** — tests are variations, not truly novel
4. **Causal role of reasoning** — correlation, not proven causation

### Key Quote from Authors

> "Our analysis indicates that the observed gains are more plausibly attributed to increased robustness in finding the correct solution, rather than to fundamentally new forms of ToM reasoning."

### Strengths

1. **Controlled comparison**: Claude with/without thinking
2. **Novel test variations**: Avoids training data contamination
3. **Multiple evaluation methods**: Psychological tests + benchmarks
4. **Qualitative analysis**: Examines reasoning traces

### Limitations (Authors Acknowledge)

- "Comparisons are not perfectly controlled due to API constraints"
- "Results should be interpreted as behavioral, not architectural"
- Temperature not configurable for all models
- GPT-5 filters most reasoning in summaries

---

## Relationship to Other Papers

### Supports
- **Interplay (2512.07783)**: RL surfaces existing capability, doesn't create new
- **s1 (2501.19393)**: Surfacing hypothesis — reasoning pre-exists
- **Illusion of Insight (2601.00514)**: "Aha moments" are rare, don't help accuracy
- **CoT Without Prompting (2402.10200)**: Reasoning exists latently

### Challenges (Partially)
- **Ullman (2023)**: Shows reasoning models now pass trivial modifications that GPT-3 failed
- **Kosinski (2024)**: Early ToM claims now partially validated for reasoning models

### Extends
- **van Duijn et al. (2023)**: Updates ToM evaluation to reasoning models
- **Kim et al. (2025)**: Compares to Thought Tracing method

### Key Distinction
This paper explicitly argues AGAINST interpreting improvements as "new ToM capability":
> "Rather than to fundamentally new forms of ToM reasoning"

This aligns with the thesis that LLM reasoning is **surfacing, not creation**.

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found (very recent paper)

### Potential Counter-Arguments

1. **Robustness IS a form of capability** — more reliable = better reasoning
2. **Reasoning traces show explicit ToM** — perspective taking is visible
3. **Benchmark improvements are real** — even if mechanism unclear

### Limitations (Authors Acknowledge)
- API constraints prevent perfect controls
- Behavioral, not architectural claims
- Temperature not always configurable

---

## Key Quotes

> "Our analysis indicates that the observed gains are more plausibly attributed to increased robustness in finding the correct solution, rather than to fundamentally new forms of ToM reasoning."

> "Reasoning models consistently exhibit increased robustness to prompt variations and task perturbations."

> "The reasoning capacity of a reasoning model remains bounded by its base model." (citing Yue et al., 2025)

> "Non-thinking Claude gets confused" — on trivial modifications

> "Models display ToM meta-knowledge in some tasks" — filtering facts, perspective taking

---

## Relevance to Thesis

**BALANCED** — Supports the surfacing hypothesis while showing real improvements

### Key Contributions

1. **Robustness ≠ new capability** — explicitly supports surfacing hypothesis
2. **Reasoning traces show pattern application** — learned ToM strategies, not genuine understanding
3. **Bounded by base model** — cites Yue et al. on RL limitations
4. **Still below specialized methods** — Thought Tracing outperforms

### Integration with Existing Arguments

| Thesis Argument | This Paper's Evidence |
|-----------------|----------------------|
| RL surfaces, doesn't create | "Bounded by base model" |
| Pattern matching | ToM strategies visible in traces |
| Practical but predictive | Works reliably within known patterns |
| Distribution-bounded | Specialized methods still better |

### Nuanced Support

This paper provides **nuanced support**:
- YES: Reasoning models are better at ToM tasks
- BUT: Improvements are robustness, not new capability
- AND: Still bounded by base model capabilities
- THEREFORE: Supports "surfacing" interpretation

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [ ] **Paper graph updated**

---

## Verdict: BALANCED — Shows reasoning models improve ToM task performance through increased ROBUSTNESS, not new capability. Explicitly supports "surfacing" interpretation: "gains are more plausibly attributed to increased robustness in finding the correct solution, rather than to fundamentally new forms of ToM reasoning."
