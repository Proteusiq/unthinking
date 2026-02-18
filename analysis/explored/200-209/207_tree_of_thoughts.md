# Paper Analysis: Tree of Thoughts: Deliberate Problem Solving with Large Language Models

## Metadata
- **arXiv ID**: 2305.10601
- **Title**: Tree of Thoughts: Deliberate Problem Solving with Large Language Models
- **Authors**: Shunyu Yao, Dian Yu, Jeffrey Zhao, Izhak Shafran, Thomas L. Griffiths, Yuan Cao, Karthik Narasimhan
- **Affiliations**: Princeton University, Google DeepMind
- **Date**: May 2023
- **Venue**: NeurIPS 2023

---

## Core Claims

1. **LMs are limited by left-to-right decoding**: Current autoregressive generation cannot explore alternatives or backtrack, leading to failures on tasks requiring search/planning.

2. **ToT enables deliberate search over thoughts**: By framing problem-solving as tree search where nodes are "thoughts" (coherent language sequences), LMs can explore multiple paths and backtrack.

3. **Dramatic improvements on specific tasks**: ToT achieves 74% on Game of 24 (vs 4% CoT), 60% word accuracy on Mini Crosswords (vs 16% CoT).

4. **LMs can self-evaluate for search heuristics**: The same LM that generates thoughts can evaluate them to guide search, without learned heuristics.

---

## Methodology

### ToT Framework (4 Components)

1. **Thought Decomposition**: Break problem into intermediate steps
   - Game of 24: equation lines (e.g., "13-9=4 (left 4,4,10)")
   - Creative Writing: paragraph plans
   - Crosswords: word fills
   - Design principle: "small" enough for diversity, "big" enough for evaluation

2. **Thought Generator G(pθ, s, k)**: Generate k candidate thoughts from state s
   - **(a) Sample i.i.d.**: Used for Creative Writing (rich thought space)
   - **(b) Propose sequentially**: Used for Game of 24, Crosswords (constrained space)

3. **State Evaluator V(pθ, S)**: Evaluate progress toward solution
   - **(a) Value independently**: Classify as sure/maybe/impossible
   - **(b) Vote across states**: Compare and vote for most promising
   - Uses few lookahead simulations + commonsense reasoning

4. **Search Algorithm**:
   - **BFS**: For Game of 24 (T≤3, b≤5), Creative Writing
   - **DFS**: For Crosswords with backtracking and pruning

### Key Design Insight
> "A thought should be 'small' enough so that LMs can generate promising and diverse samples... yet 'big' enough so that LMs can evaluate its prospect toward problem solving."

---

## Key Evidence

### Game of 24 Results (Table 2)
| Method | Success Rate |
|--------|-------------|
| IO prompt | 7.3% |
| CoT prompt | **4.0%** |
| CoT-SC (k=100) | 9.0% |
| ToT (b=1) | 45% |
| ToT (b=5) | **74%** |
| IO + Refine (k=10) | 27% |
| IO (best of 100) | 33% |
| CoT (best of 100) | 49% |

**18.5× improvement** over CoT.

### Error Analysis (Critical Finding)
> "Notably, around **60% of CoT samples already failed the task after generating the first step**, or equivalently, the **first three words** (e.g. '4+9'). This highlights the issues with direct left-to-right decoding."

### Creative Writing Results (Figure 5)
| Method | GPT-4 Score | Human Preference |
|--------|-------------|------------------|
| IO | 6.19 | - |
| CoT | 6.93 | 21% prefer |
| ToT | **7.56** | **41% prefer** |
| ToT + Refine | 7.91 | - |

### Mini Crosswords Results (Table 3)
| Method | Letter % | Word % | Games |
|--------|----------|--------|-------|
| IO | 38.7% | 14% | 0/20 |
| CoT | 40.6% | 15.6% | 1/20 |
| ToT | **78%** | **60%** | **4/20** |
| ToT +oracle best | 82.4% | 67.5% | 7/20 |
| ToT -prune | 65.4% | 41.5% | 1/20 |
| ToT -backtrack | 54.6% | 20% | 1/20 |

**Backtracking is critical**: Without it, word success drops from 60% → 20%.

### Ablation: Generation vs Evaluation
| Configuration | Success |
|---------------|---------|
| GPT-4 gen + GPT-4 eval | 74% |
| GPT-4 gen + GPT-3.5 eval | 64% |
| GPT-3.5 gen + GPT-4 eval | 31% |
| GPT-3.5 gen + GPT-3.5 eval | 19% |

**Bottleneck is thought generation**, not evaluation.

### Cost Analysis
| Method | Tokens (gen/prompt) | Cost/task | Success |
|--------|---------------------|-----------|---------|
| CoT (best of 100) | 6.7k / 2.2k | $0.47 | 49% |
| ToT | 5.5k / 1.4k | $0.74 | 74% |

ToT requires **5-100× more compute** than CoT.

### Extension to Other Tasks (Appendix B)
| Task | IO | CoT | ToT |
|------|-----|-----|-----|
| GSM8K | 51% | 86% | 90% |
| StrategyQA | 73% | 82% | 83% |

Marginal gains on tasks where CoT already excels.

### Cross-Model Results
| Method | GPT-4 | GPT-3.5 |
|--------|-------|---------|
| CoT | 4% | 3% |
| ToT | 74% | 19% |

GPT-3.5+ToT (19%) still far below GPT-4+ToT (74%).

---

## Relationship to Thesis

### Classification: SUPPORTS (Does NOT Challenge)

### Why ToT Does NOT Demonstrate Genuine Reasoning

**1. Authors Explicitly Frame LM as "System 1" (Associative)**

Key quote from paper:
> "The simple associative token-level choices of LMs are also reminiscent of 'System 1', and thus might benefit from augmentation by a more deliberate 'System 2' planning process."

The authors AGREE the LM itself is doing associative pattern matching. ToT adds explicit search (System 2) on top.

**2. Search ≠ Reasoning**

ToT is classical tree search (BFS/DFS) with LM-provided heuristics. This is the same architecture as:
- Deep Blue (chess): Search + evaluation function
- AlphaGo: MCTS + neural network heuristics

Nobody claims these systems "reason" — they search. ToT is the same: search over a space, using LM for candidate generation and pruning heuristics.

**3. Error Analysis Reveals Pattern Matching Failure**

The 60% first-step failure rate in CoT shows:
- The LM commits based on surface patterns ("4+9" as first operation)
- It doesn't understand the problem structure
- Search compensates by trying multiple paths

A genuine reasoner wouldn't fail 60% of the time at step 1.

**4. Bottleneck is Generation, Not Evaluation**

The ablation shows GPT-3.5 gen + GPT-4 eval = 31%, while GPT-4 gen + GPT-3.5 eval = 64%. This means:
- The LM's ability to generate plausible candidates matters most
- This is pattern completion, not reasoning
- Better pattern matching (GPT-4) → better candidates

**5. Performance Ceiling Shows Limits**

- 74% on Game of 24 (not 100%)
- 20% game completion on Crosswords (not 100%)
- Marginal gains on GSM8K/StrategyQA where CoT works

A genuine reasoner would approach 100% on well-defined tasks like Game of 24.

**6. Task-Specific Decomposition Required**

Each task needs custom:
- Thought granularity
- Generation strategy
- Evaluation criteria
- Search algorithm

Genuine reasoning would transfer across tasks without task-specific engineering.

**7. Compute Scaling = Search Space Coverage**

ToT uses 5-100× more compute than CoT. This is buying performance by:
- Exploring more of the solution space
- Not by understanding the problem better

### What ToT Actually Demonstrates

1. **Explicit search improves performance** on tasks with verifiable solutions
2. **LMs can generate reasonable candidates** (pattern completion)
3. **LMs can provide rough heuristics** (pattern recognition)
4. **Backtracking fixes commitment errors** (search, not reasoning)
5. **Left-to-right decoding is fundamentally limited** (supports thesis)

### Key Insight for Thesis

The paper's own framing supports the thesis:
- LM = System 1 (fast, associative, pattern matching)
- ToT = System 2 scaffolding (deliberate search)
- Improvement comes from search, not from the LM reasoning better

---

## Relationship to Other Papers

### Supports (Indirectly)
- **Faith and Fate (#00)**: ToT compensates for compositional failures via search; 60% first-step failure = pattern matching error
- **Illusion of Thinking (#03)**: Collapse at complexity = need more search
- **Interplay (#15)**: ToT surfaces latent capabilities via exploration
- **GSM-Symbolic (#01)**: Task-specific prompting required; doesn't generalize

### Is Extended By
- **Graph of Thoughts (2308.09687)**: Extends tree to DAG
- **Reflexion (2303.11366)**: Adds self-reflection loop
- **Chain-of-Verification (2309.11495)**: Adds verification step

### Provides Framework For
- **o1-style test-time compute**: ToT is precursor to scaling inference compute
- **Why more compute helps**: More search = better coverage of solution space

---

## REBUTTALS TO THIS PAPER (as Counter-Evidence)

### Why ToT Should NOT Be Cited as Evidence for LLM Reasoning

1. **Authors themselves say LM is "System 1"**: The paper explicitly frames LM as associative, not reasoning

2. **Search is external scaffolding**: The reasoning-like behavior comes from BFS/DFS algorithms, not the LM

3. **60% first-step failure**: The LM doesn't understand the problem; search compensates

4. **Generation bottleneck**: Performance depends on pattern completion quality, not reasoning

5. **Task-specific engineering**: Each task needs custom decomposition; no transfer

6. **Performance ceiling**: 74% on Game of 24, not 100%; genuine reasoner would be near-perfect

7. **Compute scaling**: 5-100× more tokens = buying performance with search, not demonstrating reasoning

### Limitations (Authors Acknowledge)

- "Only three relatively simple tasks"
- "ToT may not be necessary" for many existing tasks
- "Higher resource costs"
- "No fine-tuning explored"
- Future work needed for "more complex real-world tasks"

---

## Key Quotes

> "The simple associative token-level choices of LMs are also reminiscent of 'System 1', and thus might benefit from augmentation by a more deliberate 'System 2' planning process."

> "Notably, around **60% of CoT samples already failed the task after generating the first step**, or equivalently, the **first three words** (e.g. '4+9'). This highlights the issues with direct left-to-right decoding."

> "The associative 'System 1' of LMs can be beneficially augmented by a 'System 2' based on searching a tree of possible paths to the solution."

> "The game's bottleneck is thought generation" — quality of candidates matters more than evaluation

---

## Critical Assessment

### What This Paper Actually Contributes

1. **Framework for LM-guided search**: Generalizes CoT to tree search
2. **Self-evaluation as heuristic**: LMs can guide search without learned values
3. **Demonstration on constrained tasks**: Clear improvements where solutions are verifiable
4. **Error analysis**: Shows left-to-right decoding commits too early

### For Thesis

ToT **strongly supports** the pattern matching thesis:

1. The authors explicitly call LM behavior "System 1" (associative)
2. Improvement comes from **search scaffolding**, not LM reasoning
3. 60% first-step failures show the LM doesn't understand problems
4. Generation (pattern completion) is the bottleneck
5. Performance ceiling (74%, not 100%) shows fundamental limits

**The paper is evidence FOR the thesis, not against it.**

---

## Status
- [x] Read complete (full paper via task agent)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
