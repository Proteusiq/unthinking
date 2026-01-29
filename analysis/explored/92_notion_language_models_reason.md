# Paper Analysis: On the Notion that Language Models Reason

## Metadata
- **arXiv ID**: 2511.11810
- **Title**: On the Notion that Language Models Reason
- **Authors**: Bertram Højer
- **Date**: November 2025
- **Venue**: 1st Workshop on Epistemic Intelligence in Machine Learning, NeurIPS 2025
- **Affiliation**: IT University of Copenhagen

---

## Core Claims

1. **LMs implement implicit finite-order Markov kernels** — Transformer-based LMs map contexts to conditional token distributions through learned statistical regularities
2. **Definitions of reasoning are incommensurable with LM computations** — Standard definitions require "logical and systematic thinking" which LMs don't implement
3. **"Reasoning-like" outputs are statistical regularities, not logical mechanisms** — What looks like reasoning corresponds to approximate invariances in the learned kernel
4. **LMs are "statistical pattern matchers" not genuine reasoners** — The paper makes this claim explicit and defends it formally
5. **"Reasoning" in NLP should be reframed as "inference"** — Inference doesn't carry psychological connotations and is well-defined in statistics/ML

---

## Methodology

### Theoretical Framework: LMs as Markov Kernels

The paper formalizes LMs as implementing an implicit Markov kernel:

```
κ_θ: X → Δ(V)
κ_θ(· | x) = p_θ(x_t | x_{t-L:t-1})
```

Where:
- X = V^≤L (token sequences up to context length L)
- Δ(V) = probability simplex over vocabulary
- The kernel is **implicit** (not a transition matrix, but instantiated by model parameters)

### Key Insight: "Logic" as Approximate Invariances

The paper argues that what appears as "reasoning" is actually:
1. **Transformation invariances**: Model predictions shouldn't change under logic-preserving transformations
2. **Inferential invariances**: Model should assign high probability to valid inferences

But crucially: **LMs don't optimize for these invariances** — they optimize cross-entropy, which only approximates regularities in training data.

---

## Key Evidence

### Definitions of Reasoning (from literature)

| Source | Definition |
|--------|------------|
| General | "Thinking about something in a logical manner" |
| Huang & Chang (2023) | "Cognitive process using evidence, arguments, and logic" |
| Formal reasoning | "Systematic and logical process following rules and principles" |

### Timeline of "Reasoning" in NLP

| Year | Paper | Claim |
|------|-------|-------|
| 2022 | Wei et al. (CoT) | "Chain-of-thought elicits reasoning" |
| 2023 | Kojima et al. | "LLMs are zero-shot reasoners" |
| 2023 | Wang et al. | "Self-consistency improves CoT reasoning" |
| 2025 | Guo et al. (DeepSeek-R1) | "Reasoning emerges from RL" |

### Key Argument: Invariance Violations

The paper cites multiple papers showing LMs violate logical consistency:
- Nezhurina et al. (2024) — Alice in Wonderland failures
- Mirzadeh et al. (2024) — GSM-Symbolic fragility
- Jiang et al. (2024) — Peek into token bias

This demonstrates that **invariances in transformer kernels are statistical artifacts**, not structural properties.

---

## Relationship to Thesis

### STRONGLY SUPPORTS the Thesis

**The thesis**: "LLM reasoning is practical but fundamentally predictive—pattern matching from training distributions, not genuinely generative reasoning"

This paper provides **theoretical grounding** for the thesis:

1. **Formalizes LMs as statistical pattern matchers**:
   > "This view is illustrative of the claim that LMs are 'statistical pattern matchers' and not genuine reasoners"

2. **Explains why reasoning-like outputs arise without logical guarantees**:
   > "Reasoning-like outputs correspond to statistical regularities and approximate statistical invariances in the learned kernel rather than the implementation of explicit logical mechanisms"

3. **Training objective doesn't enforce logic**:
   > "This learning objective... does not enforce global invariances or logical implications"

4. **Data determines "reasoning"**:
   > "If an LM 'reasons' and applies a certain logic it corresponds to regularities in the kernel"

### Key Quote Supporting Thesis

> "At most, \[the training objective\] loosely enforces strong regularities in the data as invariance. When an LM 'reasons' and applies a certain logic it corresponds to regularities in the kernel."

This is essentially the thesis stated in formal terms.

---

## Relationship to Other Papers

### Supports

| Paper | How |
|-------|-----|
| **GSM-Symbolic (2410.05229)** | Cites as evidence of logical inconsistency |
| **Alice in Wonderland (2406.02061)** | Cites as evidence of reasoning failures |
| **Faith and Fate (2305.14699)** | Aligns with subgraph matching view |
| **AI Metacognition (2411.02478)** | Both argue LMs lack genuine reasoning |
| **Content Effects (2207.07051)** | Both show LMs follow data patterns |

### Extends

| Paper | How |
|-------|-----|
| **Zekri et al. (2025)** | Builds on their LM-as-Markov-chain formalization |
| **Stechly et al. (2025)** | Cites that even invalid CoT improves performance |

### Provides Framework For

| Concept | Framework |
|---------|-----------|
| **"Reasoning" vs "Inference"** | Proposes reframing to remove psychological connotations |
| **Invariance metrics** | Formalizes ε_T (transformation) and δ_r (inferential) invariances |
| **Epistemic uncertainty** | Connects to how uncertainty should be evaluated |

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **Expressivity argument**: Merrill et al. (2024) show transformers with CoT are strictly more expressive
   - **Paper's response**: "It is nonetheless a model optimizing a loss-function that yields the most likely next token"

2. **Emergence argument**: Wei et al. (2022) claim behaviors emerge unpredictably
   - **Paper's response**: "This is a result of more expressive models... and thus more accurate inference over the distribution of data"

3. **Simplification concern**: Markov model is simple compared to modern LMs
   - **Paper's response**: "Most LMs can theoretically be framed as Markov chains" (cites Zekri et al.)

### Limitations Acknowledged

- The discrete Markov model is simpler than transformer architecture
- Proposes research program to test theory empirically on toy transformers
- Does not prove transformers CAN'T reason, argues current framing is incorrect

---

## Key Quotes

> "Language models (LMs) are said to be exhibiting reasoning, but what does this entail?"

> "The definitions provided are not consistent with how LMs are trained, process information, and generate new tokens"

> "Reasoning-like outputs correspond to statistical regularities and approximate statistical invariances in the learned kernel rather than the implementation of explicit logical mechanisms"

> "This view is illustrative of the claim that LMs are 'statistical pattern matchers' and not genuine reasoners"

> "When an LM 'reasons' and applies a certain logic it corresponds to regularities in the kernel"

> "In no sense is what we have discussed as 'reasoning' different from the notion of inference, begging the question of why researchers speak of reasoning in a formal science"

> "Analyzing LM operations should therefore be kept a science of systematic natural language inference and not one of reasoning"

---

## Assessment

### Independent Assessment

This paper provides a **strong theoretical framework** that directly supports the thesis:

1. **Formalizes the "pattern matching" claim** using Markov kernel theory
2. **Explains why reasoning-like outputs arise** without logical guarantees
3. **Critiques the NLP literature's loose use of "reasoning"**
4. **Proposes concrete alternative framing** (inference, not reasoning)

### Stance Classification: **STRONGLY SUPPORTS**

The paper is essentially a theoretical defense of the thesis claim that LLMs are "statistical pattern matchers." It:
- Makes the claim explicit
- Provides formal mathematical grounding
- Reviews the historical use of "reasoning" in NLP
- Proposes metrics for measuring invariance violations
- Cites empirical evidence (GSM-Symbolic, Alice in Wonderland)

### Significance

- **Venue**: NeurIPS 2025 Workshop (peer-reviewed)
- **Contribution**: Theoretical framework, not just empirical evidence
- **Clarity**: Makes the "pattern matching" argument precise and formal

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence documented
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
- [x] data.js updated
