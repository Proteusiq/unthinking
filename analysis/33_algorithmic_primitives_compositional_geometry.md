# Paper Analysis: Algorithmic Primitives and Compositional Geometry of Reasoning in Language Models

## Metadata
- **arXiv ID**: 2510.15987
- **Title**: Algorithmic Primitives and Compositional Geometry of Reasoning in Language Models
- **Authors**: Samuel Lippl, Thomas McGee, et al. (Microsoft Research NYC, Columbia, UCLA, TU Berlin)
- **Date**: October 2025
- **Venue**: arXiv preprint
- **Institution**: Microsoft Research NYC, Columbia University, UCLA, TU Berlin

---

## Core Claims

1. **LLMs have identifiable "algorithmic primitives"**: Minimal computational operations (e.g., nearest\_neighbor, compute\_distance, verify) can be traced in internal representations
2. **Primitives compose geometrically**: Primitive vectors can be combined through addition, subtraction, and scalar operations
3. **Cross-task transfer works**: Primitives extracted from one task (AIME) can induce behaviors in another task (TSP)
4. **Reasoning-finetuned models differ systematically**: Phi-4-Reasoning shows more verification, comparison, and structured heuristics vs. Phi-4's brute-force approaches
5. **Primitives can be "injected"**: Adding primitive vectors to residual streams increases associated behavioral hallmarks

---

## Methodology

### Approach: "Algorithmic Tracing & Steering"
1. **Cluster latent representations** (k-means, k=50) over reasoning traces
2. **Map clusters to reasoning traces** — identify which tokens activate which clusters
3. **Meta-clustering** — spectral clustering on transition probabilities between clusters
4. **Extract "primitive vectors"** using function vector methods (Todd et al., 2024)
5. **Validate by injection** — add primitive vectors to residual streams, measure behavioral changes

### Models Tested
- Phi-4-Base
- Phi-4-Reasoning (reasoning-finetuned variant)
- Llama-3-8B

### Tasks Tested
- Traveling Salesperson Problem (TSP)
- 3-SAT
- AIME (Mathematical Olympiad)
- Graph Navigation

---

## Key Evidence

### Table 1: Primitive Vector Injection Effects (% above baseline)

| Vector Injected | %NN paths↑ | #Paths↑ | Dist.comp.↓ | #Verif.↑ | #Comp.↑ |
|-----------------|------------|---------|-------------|----------|---------|
| nearest\_neighbor | **+56.1%** | +72.0% | -73.6% | +104.3% | +125.6% |
| generate\_path | +4.8% | **+143.9%** | -76.0% | +25.0% | +12.2% |
| compute\_distance | +22.2% | +36.5% | **-86.5%** | +198.9% | +79.3% |
| compare\_verify | +37.9% | +43.6% | -62.8% | **+655.4%** | **+1103.7%** |

Each primitive vector most strongly induces its associated behavioral hallmark.

### Cross-Task Transfer (Figure 5)
- Primitive vectors from AIME (spatial\_reasoning, plan\_final\_answer) injected into TSP
- Result: More paths generated, higher proportion of nearest-neighbor paths
- Claim: "Cross-task primitive transfer and algorithmic induction"

### Phi-4 vs Phi-4-Reasoning Differences (Figure 4, Appendix A)
- **Phi-4-Reasoning**: More verification (compare\_or\_verify clusters), structured heuristics
- **Phi-4**: More brute-force approaches, less verification
- Both show "highly stereotyped" responses — consistent cluster patterns

---

## Critical Analysis: Relationship to the Literature Review Thesis

**Literature Review Thesis**: LLM reasoning is practical but fundamentally predictive (pattern matching from training distributions), not genuinely generative.

### How This Paper Could CHALLENGE the Thesis

1. **"Algorithmic primitives" suggests genuine computation**: Finding identifiable computational units implies more than pattern matching
2. **Compositional geometry**: Primitives combining through vector arithmetic suggests structured reasoning
3. **Cross-task transfer**: If primitives transfer, suggests generalized capability

### Why This Paper Actually SUPPORTS the Thesis (Critical Reading)

**1. "Primitives" are learned templates, not emergent algorithms**

The identified "primitives" are:
- `nearest_neighbor` — a well-known heuristic from training data
- `compute_distance` — following calculation patterns from training
- `verify` — learned verification phrases from training

These are **patterns learned from pre-training**, not emergent algorithms. The paper even notes:
> "Clusters... many of these clusters were highly interpretable; for example, we discovered a cluster specifically associated with the implementation of a nearest-neighbor heuristic"

The nearest-neighbor heuristic is **extensively documented in the training distribution**.

**2. "Compositional geometry" is within known patterns**

Vector arithmetic on learned primitives ≠ genuine compositional reasoning. The paper shows:
- Primitives extracted from successful reasoning traces (in-distribution)
- Injection increases frequency of associated patterns
- No evidence of novel composition creating genuinely new capabilities

**3. Cross-task transfer is between similar tasks**

TSP and Graph Navigation share:
- Graph structure
- Path optimization
- Distance computation

AIME and TSP share:
- Mathematical reasoning phrases
- Verification patterns

This is **transfer within overlapping training distributions**, not genuine generalization.

**4. Phi-4-Reasoning differences show PATTERN changes, not capability changes**

The paper shows Phi-4-Reasoning uses:
- More verification clusters
- More structured heuristics
- Less brute-force

But these are **different patterns**, not fundamentally different capabilities. The reasoning-finetuning changed WHICH patterns the model deploys.

**5. No OOD testing**

All tasks are:
- TSP — well-studied in CS/OR literature
- 3-SAT — foundational CS problem
- AIME — math competition problems
- Graph navigation — standard algorithmic task

These are all **heavily represented in training data**.

**6. "Primitives" are just attention pattern clusters**

The methodology:
1. Cluster token representations
2. Label clusters by inspecting which tokens activate them
3. Extract vectors from attention heads

This identifies **what patterns the model has learned**, not whether those patterns constitute reasoning.

---

## Relationship to Other Papers

### Supports
- **Emergent Hierarchical Reasoning (2509.03646)**: Both find RL/finetuning changes pattern deployment
- **DeepSeek-R1 (2501.12948)**: Reasoning models show different behavioral patterns
- **Interplay (2512.07783)**: Capability depends on pre-existing patterns

### Challenged By
- **OMEGA (2506.18880)**: 0% transformative generalization despite similar "primitives"
- **Planning Generalization Gap (2601.14456)**: 82.9% ID → 0% OOD despite learned patterns
- **Faith and Fate (2305.18654)**: Patterns don't compose for novel reasoning

### Does NOT Address
- Compositional generalization to unseen combinations
- OOD performance
- Whether "primitives" produce correct answers on novel problems

---

## REBUTTALS TO THIS PAPER

### Methodological Issues

1. **Circular validation**: 
   - Extract primitives from successful traces
   - Inject them to increase pattern frequency
   - Claim this proves "algorithmic computation"
   - But this just shows learned patterns can be amplified

2. **No accuracy testing**:
   - Paper measures "behavioral hallmarks" (pattern frequency)
   - Does NOT report whether injection improves ACCURACY
   - More verification patterns ≠ better reasoning

3. **Clustering is descriptive, not mechanistic**:
   - k-means on representations clusters similar patterns
   - Doesn't prove these are "algorithms"
   - Any learned behavior would cluster similarly

### Limitations (Authors Acknowledge)

1. "We focus on a limited set of reasoning tasks"
2. "Cross-task transfer is between similar tasks"
3. Only tested Phi-4 family + Llama-3-8B

### Missing Critical Tests

1. **Novel task transfer**: Can TSP primitives help on completely different tasks?
2. **OOD generalization**: Do primitives help on unseen problem types?
3. **Accuracy improvement**: Does injection improve correctness, or just pattern frequency?

---

## Key Quotes

### On what they found:
> "We discovered a cluster specifically associated with the implementation of a nearest-neighbor heuristic"

### On primitives as patterns:
> "Clusters... correspond to specific reasoning motifs and candidate algorithmic primitives"

### On cross-task transfer scope:
> "Remarkably, we find that adding together the primitive vectors for TNR and RC induces this composite behavior"
- But TNR and RC are graph navigation tasks — closely related

### On what primitives ARE:
> "We define algorithmic primitive as a minimal computational operation observed in a reasoning process"
- "Observed in" ≠ "generated by" — these are patterns, not computations

---

## Status
- [x] Read complete (ar5iv HTML version + appendices)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**

---

## Summary for Synthesis

**Verdict: FOR genuine reasoning (on surface) but BALANCED on close examination**

### What This Paper Actually Shows:
1. LLMs have **clusterable activation patterns** during reasoning
2. These patterns can be **labeled** by their associated tokens
3. Injecting pattern vectors **increases pattern frequency**
4. Reasoning-finetuning **changes which patterns are used**

### What This Paper Does NOT Show:
1. That these patterns constitute "genuine algorithms" vs. learned heuristics
2. That pattern injection improves accuracy (only measures pattern frequency)
3. That patterns generalize to OOD tasks
4. That pattern composition creates novel reasoning capability

### Critical Insight:
The paper's methodology — clustering, labeling, injecting learned patterns — is equally consistent with the pattern-matching thesis. Finding "nearest\_neighbor" clusters just shows the model learned the nearest-neighbor heuristic from training data. This is sophisticated pattern matching, not evidence against the thesis.

### Key Quote for Synthesis:
> "We discovered a cluster specifically associated with the implementation of a nearest-neighbor heuristic"

This is a **learned algorithm pattern** from training data, not emergent reasoning.
