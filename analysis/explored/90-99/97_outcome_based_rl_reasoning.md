# Paper Analysis: Outcome-Based RL Provably Leads Transformers to Reason, but Only With the Right Data

## Metadata
- **arXiv ID**: 2601.15158
- **Title**: Outcome-Based RL Provably Leads Transformers to Reason, but Only With the Right Data
- **Authors**: Yuval Ran-Milo, Yotam Alexander, Shahar Mendel, Nadav Cohen
- **Affiliation**: Tel Aviv University
- **Date**: January 2025

---

## Core Claims

1. **CoT is necessary for the task**: Under standard complexity-theoretic assumptions (TC⁰ ≠ NC¹), constant-depth Transformers cannot solve the chain identification task without Chain-of-Thought (multi-step reasoning)

2. **CoT is sufficient for the task**: A single-layer Transformer can solve the task with arbitrarily low loss via autoregressive generation/chain traversal

3. **RL discovers efficient reasoning**: Despite training only on final-answer correctness (sparse rewards), gradient flow converges to the **efficient** chain traversal algorithm, not inefficient alternatives that could also achieve low loss

4. **Implicit bias toward efficiency**: Gradient flow exhibits implicit bias—even though inefficient algorithms (with arbitrarily long trajectories) can achieve low loss, the model learns the efficient step-by-step traversal

5. **Simple examples are NECESSARY**: Training with "easy examples" (those requiring fewer reasoning steps) is **necessary** for efficient learning. Without them, learning requires exponential time in chain length

6. **Simple examples are SUFFICIENT**: When training data includes easy examples, learning converges in polynomial time O(n²/(c₀^(k+2) · d₀ · c · ε²))

7. **OOD generalization**: Models trained on simple examples generalize to harder, unseen examples requiring more reasoning steps

---

## Methodology

### Task: Chain Identification
- Given a directed graph with **two disjoint chains** of length n
- Input: shuffled edges + a starting vertex
- Goal: identify the terminal vertex of the chain containing the starting vertex
- This is a **graph traversal task** that cannot be solved in one step but admits iterative solution

### Architecture
- Single-layer Transformer with attention matrix A and value matrix V
- Uses either softmax or linear attention
- Autoregressive generation (generates tokens until reaching terminal vertex)
- Value matrix V fixed during training; only attention matrix A trained

### Theoretical Framework
- Continuous-time gradient flow analysis (approximates gradient descent)
- Training objective: ℒ(𝒟,θ) = E[ℓ(τ)] where ℓ(τ) = 𝟙{final output ≠ correct answer}
- Key technique: Markov chain decomposition of rollouts
- "Source decomposition" for analyzing absorption probabilities

### Key Assumptions
1. **Base model assumption**: Initial model has weak bias toward forward steps (p_fwd > c₀, p_fwd > p_bwd + b₀)
2. **Symmetric initialization**: Attention matrix invariant under vertex permutations
3. **Sparse value matrix**: V(u,w),v = 𝟙{v ∈ {u,w}} for edges

### Experiments
1. **Synthetic experiments**: Single-layer Transformers on chain identification (chains of size 4, 8, 12)
2. **Real-world experiments**: Fine-tuned Qwen 2.5 3B on mathematical reasoning (affine equations)
3. Both use REINFORCE/GRPO with outcome-only rewards (no intermediate supervision)

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| Convergence with easy examples | O(n²) polynomial | Theorem 2 |
| Convergence without easy examples | 2^Ω(n) exponential | Theorem 3 |
| Chain size 4 test accuracy | 100% | Table 1 |
| Chain size 8 test accuracy | 100% | Table 1 |
| Chain size 12 test accuracy | 99.3% | Table 1 |
| Chain traversal (size 4) | 100% | Efficient algorithm learned |
| Chain traversal (size 12) | 94.2% | Some deviation at larger sizes |
| OOD generalization (train k=1-4, test k=11) | 100% accuracy | Table 2 |
| Qwen 2.5 3B on 15-Uniform | 98.91% accuracy | Real-world validation |
| Qwen 2.5 3B OOD (15-Uniform → 15-Hard) | 95.70% accuracy | OOD generalization |
| Qwen 2.5 3B OOD (5-Uniform → 15-Hard) | 1.20% accuracy | **Fails without easy examples** |
| Training on 15-Hard only | ~0% throughout | Cannot learn without easy examples |

---

## Relationship to Other Papers

### Supports
- **DeepSeek-R1 (2501.12948)**: Both show RL can induce structured reasoning patterns
- **s1 (2501.19393)**: Both support "surfacing" hypothesis—RL extracts existing capability
- **Interplay Paper (2512.07783)**: Controlled evidence that RL surfaces rather than creates

### Challenges (Superficially)
- Appears to challenge the thesis that RL cannot create reasoning
- **BUT**: Critical caveats show it actually supports the thesis (see below)

### Extends
- **Physics of LLMs 2.1 (2407.20311)**: Both analyze role of easy examples in learning reasoning
- **Curriculum learning literature**: Formalizes why easy examples are necessary

---

## REBUTTALS

### Known Rebuttals
None identified. This is a recent theoretical paper.

### Counter-Arguments to the Paper's Claims

1. **Pre-existing capability required**: The analysis explicitly assumes the base model already has "minimal task proficiency" (p_fwd > c₀). This is not reasoning from nothing—it's optimization of existing capability.

2. **Task is architectural match**: The chain traversal algorithm is precisely what a single attention head CAN learn—attend to outgoing edge and output its target. The "emergence" is finding the right attention pattern, not inventing new computation.

3. **Easy examples seed the pattern**: Without easy examples (where algorithm is nearly trivial), learning fails exponentially. The reasoning pattern must be demonstrated before it can be generalized.

4. **Simplified setting**: Single-layer Transformer on synthetic task—large gap from practical LLM reasoning.

### Limitations (Authors Acknowledge)
1. **Simplified architecture**: Analysis limited to single-layer Transformers
2. **Synthetic task**: Chain identification is a simplified proxy for reasoning
3. **Training regime assumptions**: Symmetric initialization, fixed value matrix
4. **Theory-practice gap**: "While the assumptions we detail below are necessary for our theoretical analysis, they are not required for the main result to hold in practice"
5. **Intermediate complexity**: "We conjecture that this result can be extended to more general distributions... We leave this extension to future work."

---

## Key Quotes

### On "Emergence" of Reasoning
> "Transformers trained via Reinforcement Learning (RL) with outcome-based supervision can **spontaneously develop** the ability to generate intermediate reasoning steps (Chain-of-Thought)." (Abstract)

> "We prove that despite training solely on final-answer correctness, gradient flow drives the model to **converge to a structured, interpretable algorithm** that iteratively traverses the graph vertex-by-vertex." (Abstract)

### On Data Distribution Requirements (CRITICAL)
> "We characterize the distributional properties required for this emergence, identifying the **critical role of 'simple examples'**: instances requiring fewer reasoning steps." (Abstract)

> "post-training on the target distribution is not always optimal... excluding simple examples from post-training, even when they fall outside the target distribution, **prevents the emergence of the reasoning algorithm altogether**." (Conclusion)

> "training on out-of-distribution simple examples **may boost performance on harder in-distribution tasks more than training on those hard examples directly**" (Section 1)

### On Pre-Existing Capability (CRITICAL FOR THESIS)
> "As is common practice in Reinforcement Learning for Transformers, we assume that Policy Gradient is applied to a **base model which has already acquired a minimal level of task proficiency during the pre-training process**" (Section 6.1)

### On What Is Actually Proven
> "This learned capability extends to **any** test distribution, demonstrating generalization to harder examples unseen during training." (Section 6.2)

---

## Assessment

### Classification: PROVIDES MECHANISM (Initially appeared to CHALLENGE)

### Relationship to Thesis

**The thesis claims**: RL surfaces but doesn't create reasoning capabilities—reasoning patterns must pre-exist in the model or training data.

**This paper's position**: While the framing suggests "emergence" of reasoning from sparse rewards, careful reading reveals:

1. **Pre-existing capability required**: Analysis explicitly assumes model has "minimal task proficiency"
2. **Easy examples seed the pattern**: Without simple examples where algorithm is nearly trivial, learning fails exponentially
3. **Architecture must express the algorithm**: Chain traversal via attention was always architecturally possible
4. **No novel reasoning created**: Model learns graph traversal—following edges sequentially—which is pattern matching the edge structure

**Net Assessment**: This paper is better characterized as showing **how RL optimizes to find the efficient algorithm among expressible algorithms**, not that RL creates reasoning from nothing. The reasoning capability (graph traversal via attention) was always architecturally possible and is seeded by simple examples.

**Supports the refined thesis**: RL can efficiently discover reasoning algorithms that are (1) architecturally expressible, (2) seeded by easy examples in training, and (3) present in a model with minimal task proficiency. This is "surfacing and optimizing" not "creating."

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
