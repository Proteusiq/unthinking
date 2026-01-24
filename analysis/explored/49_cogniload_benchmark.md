# Paper Analysis: CogniLoad — A Synthetic NL Reasoning Benchmark With Tunable Difficulty

## Metadata
- **arXiv ID**: 2509.18458
- **Title**: CogniLoad: A Synthetic Natural Language Reasoning Benchmark With Tunable Length, Intrinsic Difficulty, and Distractor Density
- **Authors**: Daniel Kaiser, Arnoldo Frigessi, Ali Ramezani-Kebrya, Benjamin Ricaud
- **Institutions**: UiT - The Arctic University of Norway, University of Oslo, Integreat
- **Date**: September 2025
- **Venue**: arXiv

---

## Core Claims

1. **Task length (N) is the dominant constraint** — performance degrades faster with N than with intrinsic difficulty or distractors
2. **Models exhibit "cognitive fingerprints"** — distinct sensitivity profiles to three load dimensions
3. **U-shaped response to distractors** — worst performance at intermediate needle-to-hay ratios
4. **State-tracking errors dominate** — failures are reasoning errors, not formatting issues
5. **Cognitive Load Theory translates to LLM evaluation** — despite mechanistic differences

---

## Methodology

### Theoretical Foundation: Cognitive Load Theory (CLT)
Three types of cognitive load:
- **Intrinsic (ICL)**: Inherent complexity from element interactivity
- **Extraneous (ECL)**: Load from task-irrelevant elements (distractors)
- **Germane (GCL)**: Resources for schema construction

### Three Tunable Parameters

| Parameter | Symbol | Values | Cognitive Load |
|-----------|--------|--------|----------------|
| Intrinsic Difficulty | d | 1, 3, 5, 7, 10 | ICL |
| Task Length | N | 20, 50, 100, 250 | GCL proxy |
| Needle-to-hay Ratio | ρ | 5%–95% | ECL |

### Puzzle Structure
- Sequential state-update statements
- Conditional updates: if person has attributes X, then update to Y
- Query: final attribute of Person of Interest after all N statements

### Evaluation Scale
- **Open-weight models**: 13 models × 100 puzzles/config × 140 configs = 14,000 puzzles/model
- **Proprietary models**: 10 puzzles/config × 140 configs = 1,400 puzzles/model

---

## Key Evidence

### Task Length is the Dominant Constraint

**Performance at Different N (selected models):**
| Model | N=20 | N=50 | N=100 | N=250 |
|-------|------|------|-------|-------|
| gpt-5 | 100% | 98% | — | **76%** |
| o3 | 99% | 98% | — | **68%** |
| DS-Llama-70B | 89% | 66% | 48% | — |
| Qwen3-8B | 71% | 40% | — | — |

**Critical Finding**: Only 2 models (gpt-5, o3) achieve >50% at N=250

### Model Capacity Tiers (ECL50 = max statements at 50% accuracy)

**Frontier (ECL50 > 100):**
| Model | ECL50 | ID50 |
|-------|-------|------|
| gpt-5 | **382.8** | 14.78 |
| o3 | **356.9** | 19.07 |
| gpt-5-mini | 164.1 | 11.72 |

**Mid-tier (ECL50 30-100):**
| Model | ECL50 | ID50 |
|-------|-------|------|
| DS-Llama-70B | 69.8 | 5.14 |
| Qwen3-32B | 53.9 | 4.1 |
| QwQ-32B | 48.0 | 3.56 |

**Low-capacity (ECL50 < 15):**
| Model | ECL50 | ID50 |
|-------|-------|------|
| DS-Qwen-7B | 2.9 | **-0.53** |
| DS-Qwen-1.5B | 0.0 | -3.95 |
| Qwen3-1.7B | 0.0 | **-4.07** |

**Negative ID50 = fails 50% even at d=1 (lowest difficulty)**

### State-Tracking Errors Dominate

**Error analysis at N=250:**
| Model | Valid-Logic Errors |
|-------|-------------------|
| Qwen3-32B | 2,541 |
| DS-Llama-70B | 2,465 |
| QwQ-32B | 2,092 |

These are NOT formatting failures — models track state incorrectly.

### U-Shaped Response to Distractors

Performance worst at intermediate ρ (25-50%), recovers at extremes:
- Low ρ (5%): Few needles = hard to find relevant info
- High ρ (95%): Few distractors = easy filtering
- Intermediate: Maximum cognitive filtering load

### Context Budget Overflow

**At N=250:**
| Model | Max-Context Errors | Rate |
|-------|-------------------|------|
| gemini-2.5-flash | 280/350 | **80%** |
| gemini-2.5-pro | 268/350 | **77%** |
| gpt-5 | 32/350 | 9% |
| o3 | 24/348 | **7%** |

**Gemini uses ~10x more context than OpenAI for reasoning**

---

## Critical Assessment

### What This Paper Shows

1. **Sequential reasoning has hard limits** — even frontier models degrade significantly at N=250
2. **Intrinsic difficulty is more predictable** — uniform degradation across models
3. **State-tracking is the failure mode** — not formatting or instruction-following
4. **Model capacity varies 400x** — ECL50 ranges from 0 to 382.8

### Relevance to Thesis

**STRONGLY SUPPORTS thesis**:
- Sequential reasoning collapses at scale (76% best at N=250)
- State-tracking errors show reasoning limits, not execution limits
- Small models fail fundamentally (negative ID50)
- Confirms "cognitive burden" increases with task complexity

---

## Relationship to Other Papers

### Supports
- **Illusion of Thinking (2506.06941)**: Both show collapse at complexity threshold
- **Mechanistic Counting (2601.02989)**: Both show System-1 reasoning fails at scale
- **Faith and Fate (2305.18654)**: Error accumulation with sequential steps

### Extends
- Provides **continuous tunability** for difficulty dimensions
- Links to **Cognitive Load Theory** from psychology
- Shows **U-shaped distractor response** (novel finding)

### Does NOT Address
- Compositional generalization (single task type)
- OOD generalization (all in-distribution)

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found (recent paper)

### Potential Counter-Arguments

1. **Single task type** — sequential deductive reasoning only
2. **CLT-LLM analogy is imperfect** — different mechanisms than human cognition
3. **No OOD testing** — all puzzles are in-distribution

### Limitations (Authors Acknowledge)
- Only tests sequential deductive reasoning
- No inductive, abductive, or analogical reasoning
- English only
- Exact-match accuracy only
- No mechanistic analysis

---

## Key Quotes

> "Task length (N) is the dominant stressor — performance degrades faster with N than with d or ρ."

> "12 of 22 models fall below 50% accuracy by d=5."

> "State-tracking errors are NOT formatting failures — models track state incorrectly across sequential updates."

> "Only gpt-5 (76%) and o3 (68%) exceed 50% at N=250."

---

## Relevance to Thesis

**STRONGLY SUPPORTS thesis**

This paper shows:
1. ✓ Sequential reasoning collapses at scale — even frontier models at 68-76% for N=250
2. ✓ State-tracking errors dominate — genuine reasoning failures
3. ✓ Small models fail fundamentally — can't reach 50% even at easiest difficulty
4. ✓ Model capacity varies 400x — ECL50 from 0 to 382.8
5. ✓ Cognitive burden is real — task length is the dominant constraint

**Key insight**: LLM reasoning is bounded by capacity to maintain coherent state across sequential updates. This is consistent with the thesis that LLM reasoning is practical but fundamentally limited.

---

## Status
- [x] Read complete (HTML version via Task agent)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**

---

## Verdict: STRONGLY SUPPORTS THESIS (sequential reasoning collapses at scale; state-tracking errors; model capacity varies 400x)
