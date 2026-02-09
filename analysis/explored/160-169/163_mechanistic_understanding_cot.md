# Paper Analysis: How to think step-by-step: A mechanistic understanding of chain-of-thought reasoning

## Metadata
- **arXiv ID**: 2402.18312
- **Title**: How to think step-by-step: A mechanistic understanding of chain-of-thought reasoning
- **Authors**: Subhabrata Dutta (IIT Delhi), Joykirat Singh (Independent/IIT Bombay), Soumen Chakrabarti (IIT Bombay), Tanmoy Chakraborty (IIT Delhi)
- **Date**: February 2024
- **Venue**: arXiv preprint (v2)

---

## Core Claims

1. **LLMs deploy multiple parallel pathways of answer generation** for step-by-step reasoning — different attention heads simultaneously write the answer token into the output from different sources (question context, generated CoT, few-shot context).

2. **A "functional rift" exists at layer 16** (middle of Llama-2 7B's 32 layers) that separates two distinct processing phases:
   - Initial half (layers 1-16): Token mixing over ontological relationships, pretraining prior dominates
   - Later half (layers 17-32): Answer-writing heads appear, in-context prior dominates

3. **Different CoT reasoning subtasks share the same functional components** — despite different requirements (decision-making, copying, induction), attention head sets significantly overlap.

4. **Token mixing via attention heads in early layers** enables inductive reasoning — information flows between ontologically related tokens (e.g., "if A is B and B is C, then A is C").

5. **LLMs do use generated CoT, but via parallel pathways** — some pathways collect answers from the generated context while others collect directly from the question context.

---

## Methodology

### Techniques Used

1. **Activation Patching**: Corrupting inputs and patching individual attention head activations to identify head importance for specific tasks

2. **Probing Classifiers**: Training 4-layer MLP classifiers on residual stream representations to detect ontological relationships between token pairs
   - Architecture: 4096×2 → 128 → 64 → 32 → 3
   - Finding: Linear classifiers fail; nonlinear classifiers succeed → **non-linear information movement** between residual streams

3. **Logit Lens**: Applying unembedding projection to attention head outputs to identify what information is being written to residual streams

4. **Knockout (Mean Ablation)**: Replacing attention head outputs with mean activations from false ontology data to test head necessity

### Model and Dataset

- **Model**: Llama-2 7B (32 decoder blocks, 1,024 total attention heads)
- **Dataset**: PrOntoQA — fictional ontology-based QA with tree-structured ontologies
- **Prompting**: 6-shot CoT prompting with structured reasoning templates

### Subtask Decomposition

CoT generation decomposed into **10 subtasks** (indexed 0-9):

| Subtask Type | Indices | Description |
|--------------|---------|-------------|
| **Decision-making** | 0, 2, 4, 6, 8 | Model decides which reasoning path/entity to follow |
| **Copying** | 1, 3, 7 | Model copies statements from input context to output |
| **Induction** | 5, 9 | Model performs 2-hop reasoning: "if A is B and B is C, then A is C" |

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| Model accuracy on fictional ontology | 35.9% | Llama-2 7B with 6-shot CoT |
| Model accuracy on false ontology | 52.5% | Requires eclipsing memorized knowledge |
| Functional rift location | Layer 16 | Marks transition between pretraining and in-context prior |
| Answer-writing heads | Layers 17-32 | All answer-writing heads appear at or after layer 16 |
| Token mixing peak | Layers 10-15 | Classification accuracy for ontological relations peaks then diminishes |
| Pruned model accuracy | ~90% of full | With only ~400 of 1,024 heads active |
| Probing classifier | 28,392 training / 9,204 test pairs | Non-linear classifier needed (linear fails) |
| Head pruning for subtask 5 | 475 heads removed | 93% accuracy retained |
| Head pruning for subtask 9 | 663 heads removed | 91% accuracy retained |

---

## Key Findings

### 1. Token Mixing Over Fictional Ontology (Layers 1-16)

- Attention heads **transfer information between ontologically related tokens** (e.g., for "numpuses are rompuses", information flows from numpus to rompus)
- **Peak distinguishability** of related vs. unrelated entity pairs occurs around **layers 10-15**
- This mixing **does not require in-context learning** — works similarly in zero-shot regime
- After layer 16, distinguishability diminishes as task-specific information accumulates

### 2. Pretraining Prior vs In-Context Prior Transition (Layer 16)

- **Initial half**: Residual streams biased toward **pretraining bigram statistics**
- **Transition point**: ~Layer 16
- **Later half**: **In-context prior takes over** — model follows contextual bigrams from input
- This is **task-agnostic** — transition happens regardless of subtask type

### 3. Answer-Writing Heads (Layers 17-32)

- **All answer-writing heads appear at or after layer 16**
- Multiple heads simultaneously write the answer token with different probabilistic certainty
- Some heads reused across subtasks (e.g., subtasks 1&3, 2&4&8, 5&9)

### 4. Parallel Pathways from CoT vs Question Context

Three source categories identified:
1. **Generated context (CoT)** — answers collected from earlier CoT steps
2. **Question context** — answers collected from input question
3. **Few-shot context** — answers collected from examples (often incorrect but shared tokens)

Key observations:
- For subtasks 0-3, 6-7: Answer tokens NOT present in generated context; must come from question context
- For subtasks 4, 5, 8, 9: Heads collect from generated context (more heads for subtask 5)
- Pathways using few-shot context "deviate from the correct reasoning algorithm" — they decrease from subtask 0 to 9

---

## Relationship to Other Papers

### Supports
- **Faith and Fate (2305.18654)**: CoT implemented via induction circuit compositions, not symbolic reasoning — consistent with linearized subgraph matching
- **Measuring Faithfulness (2307.13702)**: Parallel pathways explain why CoT can be divorced from actual computation
- **Expressive Power of CoT (2310.07923)**: Provides mechanistic evidence for theoretical claims about CoT computational power
- **Let's Think Dot by Dot (2404.15758)**: Both show CoT benefits come from computation, not semantic content

### Extends
- **Induction Heads (Olsson et al., 2022)**: Shows induction-head-like mechanisms compose for multi-step reasoning in production LLMs

### Related Mechanistic Work
- **Indirect Object Identification (Wang et al., 2023)**: Similar circuit analysis methodology applied to CoT

---

## REBUTTALS

### Known Rebuttals
No direct rebuttals found as of analysis date.

### Potential Counter-Arguments
1. **Single model limitation**: Only analyzed Llama-2 7B; findings may not generalize to other architectures or scales
2. **Synthetic reasoning**: PrOntoQA is highly structured; free-form reasoning may involve different mechanisms
3. **MLP role unaddressed**: MLPs may play crucial roles in grounded reasoning that this study doesn't capture

### Limitations (Authors Acknowledge)

1. **Restricted reasoning type**: Only analyzed fictional ontology with structured CoT template. Free-form reasoning may introduce more complex dynamics.

2. **MLP role not addressed**: Did not investigate MLP blocks in reasoning. While MLPs serve as factual memory, they also memorize token-token associations that may play decisive roles.

3. **Few-shot regime only**: Used 6-shot prompting to ensure structured reasoning steps. Zero-shot CoT may involve "more complex mechanisms."

4. **Single model**: Only analyzed Llama-2 7B; findings may not generalize to other architectures or scales.

---

## Key Quotes

> "We observe a functional rift at the very middle of the LLM (16th decoder block in case of Llama-2 7B), which marks a phase shift in the content of residual streams and the functionality of the attention heads."

> "Larger models like Llama-2 exploit different parallel pathways of answer propagation while performing reasoning. There are different heads that are directly connected to the answer writers, and they collect answer information from different places in the context."

> "Despite different reasoning requirements across different stages of CoT generation, the functional components of the model remain almost the same. Different neural algorithms are implemented as compositions of induction circuit-like mechanisms."

> "The usage of generated CoT varies across subtasks, and there exists parallel pathways of answer collection from CoT as well as directly from the question context."

> "Non-linear information movement between residual streams. Our experiments with the linear classifier fail to distinguish between ontologically related, unrelated, and negatively related entities."

---

## Relationship to Thesis

**Assessment: SUPPORTS the thesis** that LLM reasoning is sophisticated pattern matching rather than genuine reasoning.

### Evidence Supporting the Thesis

1. **Induction circuit-like mechanisms, not reasoning**: CoT reasoning is implemented through compositions of **induction head mechanisms** — pattern-matching circuits that copy and propagate information, not symbolic reasoning operations.

2. **Parallel pathways reveal redundancy, not deliberation**: Multiple parallel pathways simultaneously generate answers from different sources. This is characteristic of pattern-matching systems exploiting statistical regularities, not deliberative reasoning following a single logical chain.

3. **Wrong pathways using few-shot context**: Pathways that collect answers from few-shot examples (where tokens have different contextual roles) reveals **token-level pattern matching**, not semantic reasoning. These pathways "deviate from the correct reasoning algorithm."

4. **Token mixing is NOT boosted by in-context learning**: Ontological token mixing "does not require in-context learning" and works similarly in zero-shot — suggesting **structural pattern matching** in the architecture, not learned reasoning.

5. **Pretraining prior vs in-context prior transition**: Model behavior governed by **statistical priors** — first pretraining statistics, then contextual statistics. This is fundamentally a statistical/pattern-matching process.

6. **Functional rift is task-agnostic**: The transition at layer 16 happens regardless of specific reasoning task, suggesting **general-purpose pattern processing** rather than task-specific reasoning algorithms.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
