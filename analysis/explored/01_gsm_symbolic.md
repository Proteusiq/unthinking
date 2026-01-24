# Paper Analysis: GSM-Symbolic

## Metadata
- **arXiv ID**: 2410.05229
- **Title**: GSM-Symbolic: Understanding the Limitations of Mathematical Reasoning in Large Language Models
- **Authors**: Mirzadeh et al. (Apple)
- **Date**: Oct 2024 (v1), Aug 2025 (v2 - ICLR camera ready)
- **Venue**: ICLR 2025
- **Stance**: AGAINST genuine reasoning

---

## Core Claims

1. **LLMs do not perform genuine logical reasoning** — they replicate reasoning steps from training data via pattern matching
2. **Performance on GSM8K is unreliable** — high variance across semantically equivalent questions suggests fragility
3. **LLMs are highly sensitive to numerical changes** but somewhat robust to name changes
4. **Adding irrelevant but plausible information causes catastrophic failure** (up to 65% drop)
5. **Increased complexity causes disproportionate performance degradation** and increased variance

---

## Methodology

### GSM-Symbolic Benchmark Creation
- Created **symbolic templates** from 100 GSM8K test examples
- Variables: names, numbers, conditions
- Generated **50 instantiations per template** (5000 total examples)
- Allows controlled manipulation of:
  - Names only
  - Numbers only
  - Both
  - Difficulty (add/remove clauses)

### GSM-NoOp Dataset
- Added **seemingly relevant but inconsequential statements** to questions
- Example: "but five of them were a bit smaller than average" — doesn't affect answer but models subtract 5

### Evaluation
- 25+ models (open and closed)
- 8-shot Chain-of-Thought prompting
- ~500 total evaluations
- Greedy decoding

---

## Key Evidence

### Finding 1: High Performance Variance
| Model | Performance Gap (worst-best) |
|-------|------------------------------|
| Gemma2-9B | >12% |
| Phi-3.5-mini | ~15% |
| All models | Notable variance |

**Critical observation**: For 21/25 models, GSM8K performance is >1 std above GSM-Symbolic mean, suggesting **data contamination**.

### Finding 2: Sensitivity to Change Type
| Change Type | Effect |
|-------------|--------|
| Names only | Lower variance, GSM8K close to distribution center |
| Numbers only | Higher variance, performance drops |
| Both | Highest variance, largest drops |

### Finding 3: Difficulty Scaling
- GSM-M1 (minus 1 clause) → GSM-Symbolic → GSM-P1 → GSM-P2
- As clauses increase: **performance drops AND variance increases**
- Rate of accuracy drop **accelerates** with difficulty (non-linear)
- Suggests pattern-matching becomes harder, not just more steps

### Finding 4: GSM-NoOp Catastrophic Failure
| Model | Performance Drop |
|-------|------------------|
| Phi-3-mini | >65% |
| o1-preview | Significant (not immune) |
| All models | Major drops |

**Key insight**: Models **blindly convert statements to operations** without understanding context
- "smaller than average" → subtraction
- "discount" → multiplication (regardless of context)

### Finding 5: Few-Shot Cannot Recover
- **NoOp-Symb**: 8 shots of SAME question (without NoOp) → still fails
- **NoOp-NoOp**: 8 shots with different NoOp questions → no improvement
- Suggests **fundamental limitation**, not fixable by prompting

---

## Theoretical Framework

### Definition of Reasoning
> "The *process* by which an agent employs logical steps to achieve a *novel* goal"

Emphasis on **novelty** distinguishes genuine reasoning from:
- Memorization
- Pattern matching
- Mimicking previously seen reasoning steps

### Pattern Matching Hypothesis
The paper argues LLMs perform:
1. In-distribution pattern matching
2. Searching for similar training examples
3. Replicating reasoning steps without understanding

**Evidence supporting this**:
- Token bias sensitivity (Jiang et al.)
- Single transformer layer learns 1-nearest neighbor (Li et al.)
- Frequency in training correlates with test performance (Razeghi et al.)
- Computation subgraphs in training predict correctness (Dziri et al.)

---

## Limitations & Issues

### Methodological Concerns

1. **Template Selection Bias**
   - Only 100 templates from GSM8K
   - May not represent full diversity of reasoning patterns

2. **Difficulty Manipulation**
   - Adding/removing clauses ≠ precisely ±1 reasoning step
   - Conflates linguistic complexity with reasoning complexity

3. **NoOp Design**
   - "Seemingly relevant" is subjective
   - Some NoOp statements may genuinely confuse reasonable interpreters
   - Doesn't test if humans would also be confused

4. **Evaluation Setup**
   - 8-shot CoT with specific prompt template
   - Different prompting strategies may yield different results
   - Greedy decoding vs sampling not fully explored

### Interpretive Concerns

1. **Variance ≠ No Reasoning**
   - Even humans show variance on equivalent problems
   - Question: what variance threshold indicates "not reasoning"?

2. **Data Contamination Claim**
   - Circumstantial evidence (right-skewed performance)
   - No direct proof of contamination

3. **NoOp Failure Interpretation**
   - Could indicate training bias, not absence of reasoning
   - Models may have been trained to use ALL information presented

4. **Generalization Scope**
   - Only grade-school math
   - May not generalize to other reasoning domains

---

## Graph Links to Other Papers

### Papers This SUPPORTS
| Paper | Relationship |
|-------|--------------|
| **Do PhD-level LLMs Truly Grasp Elementary Addition?** | Confirms arithmetic fragility, pattern-matching over rules |
| **Is CoT Reasoning a Mirage?** (Zhao et al.) | Distribution shift → CoT failure, same mechanism |
| **Semantic Deception** | Same finding: surface patterns mislead, CoT amplifies biases |
| **Frontier LLMs Struggle with Simple Tasks** | Confirms shortcut exploitation on modified problems |
| **The Illusion of Thinking** (Apple) | Same research group, extends findings to LRMs |

### Papers That CHALLENGE This
| Paper | Challenge |
|-------|-----------|
| **CoT Reasoning Without Prompting** (Wang & Zhou) | CoT paths exist intrinsically, not just pattern matching |
| **Thinking Isn't an Illusion** | Tool augmentation resolves failures → execution not reasoning |
| **s1: Simple test-time scaling** | Reasoning ability pre-exists, just needs activation |
| **DeepSeek-R1** | Novel reasoning behaviors emerge from RL without human patterns |

### Papers That EXTEND/REFINE This
| Paper | Extension |
|-------|-----------|
| **The Illusion of Thinking** (Shojaee) | Extends to LRMs, complexity regimes, reasoning effort curves |
| **Illusion of Insight** | Extends to "Aha!" moments being artifacts |
| **Comprehension Without Competence** | Extends to architectural limits explanation |
| **OMEGA** (2506.18880) | Extends from perturbation to systematic generalization axes; 0% transformative |
| **Planning Gap** (2601.14456) | 82.9% ID → 0% OOD; same surface pattern sensitivity (11.5pp anonymization drop) |
| **Beyond Memorization** (2601.13392) | Same pattern: high ID performance collapses on unseen variations |

### Papers With METHODOLOGICAL TENSION
| Paper | Tension |
|-------|---------|
| **Comment on Illusion of Thinking** (Lawsen) | Token budget limits may explain failures, not reasoning limits |
| **Tool Augmentation papers** | Same tasks succeed with tools → what is being measured? |

---

## Key Quotes

> "We hypothesize that this decline is because current LLMs cannot perform genuine logical reasoning; they replicate reasoning steps from their training data."

> "Models tend to blindly convert statements to operations without truly understanding their meaning."

> "This suggests deeper issues in their reasoning processes that cannot be alleviated by in-context shots."

---

## Open Questions

1. **What is the baseline?** Do humans show similar patterns on NoOp-style questions?
2. **Is variance the right metric?** Genuine reasoners may still show variance
3. **Can fine-tuning on NoOp fix this?** Paper suggests no, but limited exploration
4. **Does this extend to other domains?** Only math tested
5. **What explains models that DO succeed on NoOp?** (Fig 8c shows some models perform better)

---

## Relevance to "Thinking Machine That Doesn't Think"

### Supports Thesis
- Direct evidence of fragility masquerading as reasoning
- Pattern matching hypothesis with empirical support
- Shows even simple irrelevant information breaks "reasoning"

### Complicates Thesis
- Some models more robust than others (why?)
- Variance exists but doesn't prove absence of reasoning
- Grade-school math may not represent reasoning generally

### Key Contribution to Paper
This is a **foundational paper** for the "against" side. It:
1. Establishes empirical methodology (controlled template variation)
2. Introduces key metric (performance distribution, not point estimate)
3. Creates testable hypothesis (pattern matching)
4. Provides benchmark (GSM-Symbolic, GSM-NoOp) others can use

---

---

## Interaction Graph

```
                    ┌─────────────────────────────────────┐
                    │  FOUNDATIONAL WORKS (cited by GSM-S)│
                    ├─────────────────────────────────────┤
                    │ • Jiang et al. - token bias         │
                    │ • Li et al. - 1-NN in transformers  │
                    │ • Razeghi et al. - freq→performance │
                    │ • Dziri et al. - computation graphs │
                    └──────────────┬──────────────────────┘
                                   │ builds on
                                   ▼
┌──────────────────────────────────────────────────────────────────────┐
│                     GSM-Symbolic (Oct 2024)                          │
│                     Apple · Mirzadeh et al.                          │
│                                                                      │
│  Claims: Pattern matching, not reasoning. Fragility. NoOp failure.   │
└──────────────────────────────────────────────────────────────────────┘
           │                    │                        │
           │ extends            │ supports               │ challenged by
           ▼                    ▼                        ▼
┌──────────────────┐  ┌──────────────────────┐  ┌─────────────────────────┐
│ Illusion of      │  │ • CoT Mirage (2508)  │  │ • CoT Without Prompting │
│ Thinking (2506)  │  │ • Semantic Deception │  │   (2402) - intrinsic    │
│ [same team]      │  │ • Frontier Struggles │  │ • Tool Augmentation     │
│                  │  │ • PhD Addition       │  │   papers - execution    │
│ Adds: LRMs,      │  │                      │  │ • DeepSeek-R1 - emergent│
│ complexity       │  │ Same mechanism:      │  │ • s1 - pre-existing     │
│ regimes, effort  │  │ distribution shift   │  │                         │
│ curves           │  │ breaks patterns      │  │ Counter: reasoning      │
└──────────────────┘  └──────────────────────┘  │ exists, just needs      │
                                                │ surfacing/tools         │
                                                └─────────────────────────┘
```

---

## Critical Cited Papers to Evaluate

### High Priority (may need to read before proceeding)
| Paper | Why Critical |
|-------|--------------|
| **Dziri et al. (2023)** - "Faith and Fate" | Computation graph analysis — mechanistic evidence for pattern matching. Core theoretical support for GSM-S claims. |
| **Jiang et al. (2024)** - Token bias | Statistical guarantees that LLMs have strong token bias. Foundational for fragility argument. |

### Medium Priority (context but not blocking)
| Paper | Why Relevant |
|-------|--------------|
| Li et al. - 1-NN transformers | Explains WHY sensitivity exists mechanistically |
| Razeghi et al. - Frequency correlation | Training frequency → test performance |

---

## Status
- [x] Read
- [x] Analyzed
- [x] Graph links identified
- [x] Interaction diagram created
- [ ] Cross-referenced with rebuttals
- [ ] Critical cited papers evaluated
