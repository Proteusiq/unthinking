# Paper Analysis: The Expressive Power of Transformers with Chain of Thought

## Metadata
- **arXiv ID**: 2310.07923
- **Title**: The Expressive Power of Transformers with Chain of Thought
- **Authors**: William Merrill, Ashish Sabharwal
- **Date**: October 2023 (ICLR 2024)
- **Venue**: ICLR 2024
- **Institution**: NYU, Allen Institute for AI

---

## Core Claims

1. **CoT increases computational power**: Chain of thought fundamentally extends the computational power of decoder-only transformers, but the increase depends crucially on the number of intermediate steps
2. **Logarithmic steps (O(log n))**: Only slightly extends power — remains in L (log-space), cannot solve NL-complete problems
3. **Linear steps (O(n))**: Enables recognizing ALL regular languages (automata simulation) — a clear new ability
4. **Polynomial steps (O(n^c))**: Recognizes EXACTLY class P — first exact characterization of transformers in terms of standard complexity classes

### The Key Equation (Theorem):
```
TIME(t(n)) ⊆ CoT(t(n)) ⊆ SPACE(t(n) + log n) ⊆ TIME~(t(n)² + n²)
```

Where CoT(t(n)) = languages recognized by transformer with t(n) decoding steps.

---

## Methodology

### Theoretical Approach
- Formal complexity-theoretic analysis
- Constructions showing transformers CAN simulate Turing machines
- Upper bounds showing transformers CANNOT exceed certain complexity classes
- Uses "layer-norm hash" technique for memory storage

### Key Assumptions for Lower Bounds
1. **Saturated attention** (averaging hard attention)
2. **Strict causal masking** (position i can only see up to i-1)
3. **Projected pre-norm** (linear projection before layer-norm)
4. **Log-precision** (c·log(n+t(n)) bits)

### Key Construction: Layer-Norm Hash
- Allows decoder-only transformers to effectively store memory
- Enables simulation of automata and Turing machines
- Key innovation making the lower bounds possible

---

## Key Evidence

### Table: CoT Steps vs. Computational Power

| CoT Steps | Computational Class | Can Simulate | Cannot Solve |
|-----------|-------------------|--------------|--------------|
| O(1) (none) | TC⁰ | Threshold circuits | Automata, graph connectivity |
| O(log n) | L (log-space) | Slightly more than TC⁰ | NL-complete, P-complete |
| O(n) | Between Reg and CSL | All automata, counter machines | Context-free languages (unless CFL ∈ TIME~(n²)) |
| O(n²) | Contains NL | Directed graph connectivity | — |
| O(n^c) | Exactly P | All polynomial-time problems | NP-hard (assuming P≠NP) |

### Specific Results

1. **Without CoT** (prior work): Transformers limited to TC⁰
   - Cannot simulate finite automata
   - Cannot check graph connectivity
   - Cannot solve linear equations

2. **With Linear CoT**: 
   - CAN simulate any automaton with O(n) steps
   - Stays WITHIN context-sensitive languages
   - Cannot recognize all CFLs unless CFLs parseable in soft-quadratic time

3. **With Polynomial CoT**:
   - EXACTLY equals P
   - First exact correspondence between transformers and complexity class

---

## Relationship to Thesis

### This Paper's Position: **NUANCED — Provides Theoretical Upper Bound**

The paper shows CoT DOES add computational power, but with important caveats:

**How It Supports the Thesis (Pattern Matching)**:
1. **Without CoT, transformers are provably weak** — limited to TC⁰, cannot even simulate automata
2. **The power comes from STEPS, not "understanding"** — more steps = more computation, purely mechanical
3. **CoT is just providing scratch space** — equivalent to adding Turing machine tape
4. **Log CoT barely helps** — O(log n) steps don't enable graph connectivity
5. **Practical LLMs use finite CoT** — real chains are bounded, not scaling with input

**How It Challenges the Thesis**:
1. **CoT does give ADDITIONAL computational power** — not just "window dressing"
2. **Linear CoT enables automata simulation** — a real capability gain
3. **Polynomial CoT = P** — in principle, transformers with enough steps can solve any polynomial problem

### Critical Assessment

This paper is often cited as evidence FOR LLM reasoning, but careful reading reveals:

1. **The power is in the STEPS, not the model**: The transformer is just simulating a Turing machine. The "reasoning" is mechanical iteration.

2. **Real LLMs don't get arbitrary steps**: Practical CoT is bounded (hundreds of tokens, not O(n) or O(n²) where n can be millions)

3. **The construction is EXISTENCE, not LEARNING**: The paper proves transformers CAN represent Turing machine simulations with the right weights. It says nothing about whether training produces these weights.

4. **Matches other findings**: Paper 150 (Valmeekam) shows GPT-4 achieves ~12% on autonomous planning despite this theoretical capability existing.

---

## REBUTTALS TO THIS PAPER

### Implicit Limitations Acknowledged by Authors

From the paper:
> "Running a polynomial number of forward passes with a large transformer is likely intractable in practice."

> "We have not identified any concrete reasoning problem where a logarithmic number of steps would help."

### Rebuttals from Corpus

1. **Paper 150 (Valmeekam)**: Despite theoretical ability to plan with poly-CoT, GPT-4 achieves only ~12% on autonomous planning. The capability exists but isn't learned.

2. **Paper 148 (Turpin)**: CoT is systematically unfaithful — 36% accuracy drop from unmentioned biases. Even when CoT adds steps, it doesn't follow the faithful reasoning path.

3. **Paper 146 (Schaeffer)**: Emergence claims (including CoT emergence) are largely metric artifacts. The theoretical capability may exist but isn't reliably expressed.

4. **Paper 137 (CoT Training)**: Explicit CoT training helps BUT only via "local computation" (shortcut features), not systematic reasoning as the theory would predict.

### Key Rebuttal: Expressivity ≠ Learning

The paper proves EXPRESSIVITY (what transformers CAN compute with right weights).
It does NOT prove LEARNABILITY (what training produces).

This is analogous to:
- Neural nets can approximate any function (universal approximation)
- But training doesn't find the right weights for all functions

Similarly:
- Transformers with poly-CoT can simulate any P algorithm
- But training doesn't produce weights that implement correct algorithms

---

## Key Quotes

> "We show that the answer is yes, but the amount of increase depends crucially on the amount of intermediate generation."

> "A logarithmic number of chain-of-thought steps remains in log-space (L). A linear number of steps adds more power, enabling recognizing all regular languages."

> "Our results also imply that linear steps keep transformer decoders within context-sensitive languages."

> "Polynomial steps with generalized pre-norm make them recognize exactly the class of polynomial-time solvable problems—the first exact characterization of a type of transformers in terms of standard complexity classes."

> "Running a polynomial number of forward passes with a large transformer is likely intractable in practice."

---

## Relationship to Other Papers

### Builds On
- Merrill & Sabharwal (2023): TC⁰ upper bounds for transformers without CoT
- Pérez et al. (2021): Turing completeness with encoder-decoder + external memory
- Schuurmans (2023): External memory constructions

### Complements
- Paper 151 (Wei et al.): Original CoT paper — this provides theoretical foundation
- Paper 137 (CoT Training): Shows CoT helps via local computation, not global reasoning

### Challenged By
- Paper 150 (Valmeekam): Practical planning fails despite theoretical capability
- Paper 148 (Turpin): CoT unfaithful — doesn't follow theoretical reasoning path
- All papers showing CoT doesn't help on OOD or complex reasoning

---

## Implications for Thesis

### What This Paper Actually Shows

1. **CoT = scratch space**: Adding intermediate tokens is equivalent to adding working memory/tape
2. **More steps = more computation**: Purely mechanical relationship
3. **Practical bounds matter**: Real LLMs don't get O(n²) steps
4. **Expressivity ≠ capability**: Can represent ≠ will learn

### The Gap Between Theory and Practice

| Theoretical | Practical (Observed) |
|-------------|---------------------|
| Poly-CoT = P | GPT-4 achieves ~12% on planning |
| Linear CoT simulates automata | Models fail on simple state tracking |
| CoT adds computational power | CoT unfaithful 36% of time |

This gap is exactly what the thesis predicts: LLMs approximate patterns from training, they don't implement the theoretical algorithms that exist in weight space.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] Paper graph updated

---

## Classification
- **Stance**: FOR reasoning capabilities (theoretical)
- **Evidence Type**: Theoretical/complexity-theoretic
- **Strength**: Strong theoretical proofs, but limited practical relevance
- **Key Limitation**: Proves expressivity, not learnability; practical CoT lengths bounded

## Tags
`theoretical` `complexity-theory` `cot-theory` `expressivity` `iclr-2024` `for-reasoning` `upper-bounds`
