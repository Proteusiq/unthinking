# Paper Analysis: Hallucination is Inevitable: An Innate Limitation of Large Language Models

## Metadata
- **arXiv ID**: 2401.11817
- **Title**: Hallucination is Inevitable: An Innate Limitation of Large Language Models
- **Authors**: Ziwei Xu, Sanjay Jain, Mohan Kankanhalli (National University of Singapore)
- **Date**: January 2024 (v2: February 2025)
- **Venue**: arXiv preprint

---

## Core Claims

1. **Formal impossibility theorem**: It is mathematically impossible to eliminate hallucination in LLMs when used as general problem solvers.

2. **Hallucination defined formally**: An LLM `h` hallucinates w.r.t. ground truth `f` if for all training states, there exists some input where `h(s) ≠ f(s)`.

3. **Main theorem (Theorem 3)**: For all computable LLMs `h`, there exists a computable ground truth function `f` such that each state `h[j]` hallucinates w.r.t. `f`. Furthermore, there exists `f'` such that each state hallucinates on **infinitely many inputs**.

4. **Corollary 1**: All computable LLMs cannot prevent themselves from hallucinating — methods like Chain-of-Thought that rely on LLMs to mitigate their own hallucination **cannot eliminate** hallucination.

5. **Real-world implication**: Since the formal world (computable functions) is a subset of the real world, hallucination in the formal world implies hallucination in the real world.

---

## Methodology

### Formal World Definition
A **formal world** of ground truth function `f` is a set `G_f = {(s, f(s)) | s ∈ S}`, where:
- `S` is the set of all finite-length strings over alphabet `A`
- `f(s)` is the only correct output for input string `s`

### Computable LLM Model
- An LLM is modeled as a **total computable function** from strings to strings
- `h[i]` denotes the state of LLM `h` after being trained on `i` samples
- The training process and all LLM states are **uniformly computable**
- Real-world LLMs are polynomial-time bounded, forming a **computably enumerable set**

### Theoretical Framework
- **Gold's (1967) Identification in the Limit** from learning theory
- **Diagonalization argument** (Cantor): Constructs adversarial `f` that contradicts any enumerable set of LLM outputs
- Key construction: For any computably enumerable set of LLMs, construct `f(s_i) = Δ(h_i(s_i))` where `Δ` returns a different string

---

## Key Theoretical Results

### Theorem 1 (Computably Enumerable LLMs)
For all computably enumerable sets of LLMs `{h_0, h_1, ...}`, there exists a computable ground truth function `f` such that all states `h_i[j]` will hallucinate.

### Theorem 2 (Infinite Hallucinations)
For all computably enumerable sets of LLMs, there exists a computable `f` such that all LLM states hallucinate on **infinitely many inputs**.

### Theorem 3 (Main Result)
For all computable LLMs `h`, there exists a computable ground truth function `f` such that each `h[j]` hallucinates w.r.t. `f`.

### Theorem 4 (Linear Orders)
For all computable LLM `h`, there exists a computable ordering `<` such that LLM `h` hallucinates when answering ordering queries after being trained on prior ordering samples.

### Time Complexity Implications
| LLM Type | Hallucination-Prone Problems |
|----------|------------------------------|
| **O(n^k) time** (all existing LLMs) | Combinatorial lists, NP-complete (SAT, Subset Sum), co-NP-complete |
| **O(2^n) time** | Presburger arithmetic (doubly exponential) |
| **All computable** | Learning all linear orders, first-order logic entailment |

---

## Empirical Validation

### Experiment 1: Combinatorial List Task L(m, A)
- **Task**: List all strings of length `m` using alphabet `A`
- **Models**: Llama 2 70B, Llama 3 70B, GPT-3.5-turbo, GPT-4, GPT-4-turbo
- **Results**: ALL models failed at L(7, {a,b}) = 128 strings, even GPT-4-turbo with 128K context

### Experiment 2: Linear Order Learning
- **Task**: Determine ordering relations from examples using obfuscated symbols
- **Results**: ALL LLMs failed on ALL tested configurations
- LLMs unable to use **transitive rule** to deduce relations
- LLMs give inconsistent answers for "x$y" and "y$x"

### Experiment 3: Character Position Task R(m, n)
- **Task**: Return the n-th character of an m-character string
- **Results**: All models failed at R(m, 5) for m ≥ 256

---

## Discussion of Mitigators

### Scaling (Larger Models, Ensembles, More Data)
- **Why insufficient**: If `f` is beyond LLM's computational capability, no amount of scaling helps
- Adding layers yields larger polynomial-time LLM — won't solve exponential-time problems
- Model ensembles are "essentially a single LLM" bounded by Theorem 3

### Chain of Thought / Self-Verification
- **Why insufficient**: By Corollary 1, "it is impossible to eliminate hallucination by changing prompts and hope LLM can automatically eliminate its hallucination"
- Can guide toward simpler solutions but cannot guarantee correctness

### External Tools (RAG, Knowledge Enhancement)
- **Potential**: Provides information beyond training samples, making Theorem 3 inapplicable
- External tools (calculators, code interpreters) can extend capabilities
- **Limitation**: Scalability for real-world tasks remains open problem

---

## Relationship to Other Papers

### Supports
- **Faith and Fate (2305.18654)**: Provides formal foundation for compositional generalization limits
- **Illusion of Thinking (2506.06941)**: Explains why complexity thresholds exist
- **Can LLMs Reason and Plan (2403.04121)**: Formalizes Kambhampati's "approximate retrieval" argument

### Extends
- **Gold (1967)**: Applies learning theory to LLM hallucination
- **Computability Theory**: Connects LLM limitations to fundamental impossibility results

### Provides Mechanism For
- **Pattern matching thesis**: Diagonalization shows any LLM can be "fooled" — characteristic of pattern matching, not robust reasoning
- **Self-correction failures**: Corollary 1 explains why LLMs cannot verify their own outputs

---

## REBUTTALS

### Known Rebuttals
No direct rebuttals found as of analysis date.

### Potential Counter-Arguments
1. **Practical irrelevance**: Constructed adversarial functions may not appear in practice
2. **External tools escape**: RAG and tools may circumvent the theorem
3. **Formal world simplification**: Real world may have structure that helps

### Limitations (Authors Acknowledge)
1. Formal world is a simplified abstraction
2. Theorem applies to LLMs trained only on input-output pairs
3. External tools and knowledge bases can potentially help

---

## Key Quotes

> "If hallucination is inevitable for our LLMs in the relatively simple formal world, then hallucination is inevitable for LLMs in the more complicated real world."

> "All computable LLMs cannot prevent themselves from hallucinating... It explicitly suggests that methods relying on LLMs themselves to mitigate hallucination, such as prompt-based chain of thoughts, cannot *eliminate* hallucination."

> "All LLMs trained only with input-output pairs will hallucinate when used as general problem solvers."

> "Without external aids like guardrails, fences, knowledge base, and human control, LLMs cannot be used automatically in any safety-critical decision-making."

> "Shockingly but expectedly, all LLMs failed in this task [linear order learning]... This suggests a deficiency in their reasoning abilities."

---

## Relationship to Thesis

**Assessment: STRONGLY SUPPORTS the thesis** that LLM reasoning is sophisticated pattern matching rather than genuine reasoning.

### Evidence Supporting the Thesis

1. **Fundamental limitation is computational**: The paper proves LLMs are fundamentally limited by their computational nature — they can only approximate computable functions, and not even all of those. This aligns with the view that LLMs are pattern matchers operating within computational constraints.

2. **Diagonalization shows brittleness**: The adversarial construction shows any LLM can be "fooled" by problems just outside its training distribution — exactly what we'd expect from pattern matching, not robust reasoning.

3. **Empirical reasoning failure**: The linear order experiments are particularly damning — LLMs fail to apply **transitive reasoning** ("if a<b and b<c, then a<c") even when explicitly given rules and examples. This is a basic logical operation any system with genuine reasoning should perform.

4. **Self-correction is impossible**: Corollary 1 states LLMs cannot prevent their own hallucination — meaning Chain-of-Thought cannot achieve genuine reasoning, only pattern matching over reasoning-like outputs.

5. **Mitigation requires external grounding**: The conclusion that only external knowledge sources, tools, and human oversight can help aligns with the thesis — LLMs need external verification precisely because they lack internal reasoning capabilities.

### Key Insight
The paper formalizes a crucial intuition: **LLMs are function approximators with intrinsic limitations**. The diagonalization proof shows they cannot transcend their pattern-matching nature to achieve genuine reasoning — they can only recognize patterns in training data, not reason about novel situations from first principles.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
