# Paper Analysis: Language Models Struggle to Use Representations Learned In-Context

## Metadata
- **arXiv ID**: 2602.04212
- **Title**: Language Models Struggle to Use Representations Learned In-Context
- **Authors**: Michael A. Lepori, Tal Linzen, Ann Yuan, Katja Filippova (Google DeepMind, Brown, NYU)
- **Date**: February 2026

---

## Core Claims

1. **Encoding ≠ Deployment**: LLMs can encode novel semantics from context into latent representations, but they CANNOT reliably deploy these representations to complete downstream tasks
2. **Representations are "inert"**: In-context learned representations are largely inert — they exist but are not causally used for task completion
3. **Even SOTA reasoning models fail**: Closed-source, state-of-the-art reasoning models (GPT-5, Gemini-2.5) cannot reliably leverage novel patterns presented in-context
4. **Adaptive World Modeling fails**: Novel task shows models struggle to use in-context topology for downstream few-shot learning

---

## Methodology

### Graph Tracing Task (from Park et al. 2024)
- Random walk over latent state space with arbitrary token mappings
- State spaces: 4×4 grids, 5×5 grids, 16-state lines, 25-state lines
- Prior work showed: LLMs DO encode the topology in hidden states (in-context representation learning)
- **This paper asks**: Can they USE these representations?

### Key Metrics
1. **Dirichlet Energy (DE)**: Distance between representations of adjacent states
2. **Distance Correlation (DC)**: Correlation between representation distances and state space distances

### Two Test Conditions (Experiment 1)
1. **Instruction Condition**: Random walk in user message → model must delay using representations
2. **Prefilled Condition**: Random walk in prefilled response → model uses representations immediately

### Adaptive World Modeling (AWM) Task (Experiment 2)
- Two components:
  1. Random walk defines in-context topology
  2. Few-shot examples define a rule mapping states (e.g., s_{i,j} → s_{i+2,j})
- Model must deploy in-context topology to complete rule

### Models Tested
- **Open-weights**: gemma-3-{4,12,27}b-it, OLMo-2-13b
- **Frontier**: Gemini-Flash-2.5, Gemini-Pro-2.5, GPT-5-mini, GPT-5

---

## Key Evidence

### Experiment 1: Next-Token Prediction (Figure 3)

| Condition | Performance |
|-----------|-------------|
| **Prefilled** (immediate use) | High accuracy (replicates prior work) |
| **Instruction** (delayed use) | **Models struggle** |

**Key insight**: Same representations, different ability to use them. The representations are encoded but cannot be deployed after a delay.

### Experiment 2: Adaptive World Modeling (Figure 4)

Open-weights models across all topologies and rules:
- **Near-chance performance** on most configurations
- Best case: ~40% on 4×4 grid (one-step and two-step rules)
- One-step rules allow trivial baseline of guessing observed transitions

### Analysis: Why Do Models Fail? (Figure 5)

| Test | Result |
|------|--------|
| Few-shot learning with EXPLICIT topology | **>75% accuracy** (some models) |
| Few-shot learning with IN-CONTEXT topology (AWM) | **Near-chance** |

**Conclusion**: Models CAN learn the rule from examples. They just can't use the in-context topology to do so.

### Representation Degradation (Figure 5 Bottom)
- Representations in few-shot examples have HIGHER Dirichlet Energy than random walk representations
- In-context representations are NOT being deployed to the few-shot portion
- Representations become "inert" when context changes

### Experiment 3: Frontier Reasoning Models (Figure 6)

| Model | 1D Topologies | 2D Grid Topologies |
|-------|---------------|---------------------|
| GPT-5 | Nontrivial accuracy | **Collapses entirely** |
| Gemini-2.5-Pro | Nontrivial accuracy | **Collapses entirely** |

**Key insight**: Even SOTA reasoning models with extended CoT cannot reliably use in-context semantics on 2D grids.

### Topology Description Analysis (Figure 7)
- Asked Gemini models to describe state space structure
- **Fair but not perfect** accuracy even with lenient autorater
- Errors driven by encoding/deployment failure, not rule-learning failure

---

## Relationship to Thesis

### STRONGLY SUPPORTS Pattern-Matching Thesis

This paper is a **smoking gun** for the thesis:

1. **Encoding ≠ Understanding**: LLMs can statistically encode patterns in hidden states, but cannot flexibly USE them. This is exactly what pattern matchers do — they recognize patterns but don't understand them.

2. **"Inert" representations**: The term "inert" perfectly captures the pattern-matching nature. Representations exist but don't participate causally in reasoning — they're just statistical artifacts.

3. **No flexible deployment**: True reasoning would allow taking a learned concept and applying it in new contexts. LLMs cannot do this even with the concept encoded in their hidden states.

4. **SOTA reasoning models fail too**: Even GPT-5 and Gemini-2.5 with extended reasoning chains cannot reliably leverage in-context semantics — this is not a scale problem.

### Key Quote
> "We find evidence that open-weights LLMs struggle to deploy representations of novel semantics that are defined in-context, **even if they encode these semantics in their latent representations**."

This dissociation between encoding and deployment is the key evidence: the model "knows" the information but cannot USE it.

---

## Relationship to Other Papers

### Supports
- **Paper 134 (ICL OOD)**: Both show in-context learning implements pretraining functions, not new capabilities
- **Paper 149 (Reversal Curse)**: Both show LLMs store information but can't use it flexibly
- **Paper 170 (Fluid Representations)**: Both probe representations; this shows they don't support task completion
- **Paper 163 (Mechanistic CoT)**: Both use probing to understand internal representations

### Extends
- **Park et al. 2024 (ICLR)**: Extends by showing encoding doesn't imply deployment
- **Paper 181 (No Global Plan)**: Extends by showing another way representations fail to support reasoning

### Challenges
- **Claims that ICL enables genuine learning**: Shows ICL creates inert representations, not usable knowledge

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments
1. **Task is artificial**: Graph tracing with arbitrary tokens is unrealistic
   - **Counter**: Simplicity makes it a controlled test; real-world tasks would be harder
2. **More context might help**: Need longer random walks
   - **Counter**: Appendices D and H test longer contexts; still fails
3. **Reasoning models partially succeed**: GPT-5 does okay on 1D
   - **Counter**: Complete collapse on 2D; partial success ≠ reliable capability

### Limitations (Authors Acknowledge)
- Focused on specific synthetic task
- May not generalize to all forms of in-context learning
- Frontier model analysis limited by API access

---

## Key Quotes

> "Though large language models (LLMs) have enabled great success across a wide variety of tasks, they still appear to fall short of one of the loftier goals of artificial intelligence research: creating an artificial system that can adapt its behavior to radically new contexts upon deployment."

> "We find evidence that open-weights LLMs struggle to deploy representations of novel semantics that are defined in-context, even if they encode these semantics in their latent representations."

> "Even the most performant LLMs cannot reliably leverage novel patterns presented in-context."

> "Representations learned in-context are largely inert."

> "This suggests that the in-context learned representations are not being flexibly deployed to solve the adaptive world modeling task."

---

## Relevance to Thesis

**Verdict**: STRONGLY SUPPORTS

This paper is particularly significant because:

1. **Dissociates encoding from understanding**: Shows the model "has" the information but can't use it
2. **Tests SOTA reasoning models**: Not just open-weights; GPT-5 and Gemini-2.5 fail too
3. **Novel AWM task**: Clean test of flexible deployment capability
4. **"Inert" terminology**: Provides precise language for what pattern matchers do
5. **Probing methodology**: Quantifies the encoding-deployment gap

The paper directly supports the thesis that LLMs are pattern matchers that can encode statistical regularities but cannot flexibly reason with them.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
