# Paper Analysis: From Chains to DAGs: Probing the Graph Structure of Reasoning in LLMs

## Metadata
- **arXiv ID**: 2601.17593
- **Title**: From Chains to DAGs: Probing the Graph Structure of Reasoning in LLMs
- **Authors**: Tianjun Zhong, Linyang He, Nima Mesgarani
- **Date**: January 2026
- **Venue**: arXiv preprint
- **Institution**: Columbia University

---

## Core Claims

1. **DAG structure is encoded in hidden states**: LLM internal representations encode graph-structured reasoning beyond linear chains — node depth and pairwise distance are linearly recoverable from hidden states

2. **Intermediate layers are reasoning-dominant**: DAG geometry emerges most strongly in intermediate layers; early layers are lexical, late layers are variable

3. **Recoverability varies by depth**: Deeper reasoning steps are preferentially supported in later layers — systematic depth-layer alignment pattern

4. **Scaling helps, training recipe less so**: Model capacity is the primary driver of DAG recoverability; instruction tuning has modest effect

5. **DAG recoverability correlates with correctness**: Correct generations show higher DAG recoverability, but strong recoverability is not sufficient for correctness

---

## Methodology

### Reasoning DAG Probing Framework
1. Associate each reasoning node with textual realization
2. Train lightweight probes on frozen hidden states to predict:
   - **Node depth**: longest path to sink (reversed so premises are shallower)
   - **Pairwise distance**: how far two nodes lie in dependency structure

### Dataset: ProofWriter
- Rule-based natural language inference with explicit proof structure
- Theory (facts + rules) → Query → Proof via rule applications
- DAG: nodes = statements, edges = rule applications

### Probing Setup
- Extract hidden states for each node's text span
- Mean-pool over span tokens
- Low-rank linear probes (rank k=1, no bias)
- Depth probe: pairwise ranking loss
- Distance probe: MSE on predicted distances

### Baselines
1. **Node-only**: Remove surrounding theory context
2. **Bag-of-words**: Replace contextual embeddings with lexical features
3. **Label-shuffled**: Randomly permute gold depth/distance annotations

### Models
- Primary: Qwen3 family (0.6B to 32B)
- Variants: Base, Instruct, Thinking (at 4B scale)

---

## Key Evidence

### 1. Layerwise Emergence of DAG Geometry (Qwen3-14B)

| Layer Region | Depth Spearman | Distance Spearman | Sink Accuracy |
|--------------|----------------|-------------------|---------------|
| Early | Low | Low | Low |
| **Intermediate** | **Peak (~0.7)** | **Peak (~0.6)** | **High (~85%)** |
| Late | Variable, mild decline | Variable | Stable |

> "Intermediate layers exhibit the strongest recovery of DAG structure"

### 2. Baselines Fail to Encode DAG Geometry

| Method | Depth Spearman | Distance Spearman |
|--------|----------------|-------------------|
| Main (full context) | ~0.7 | ~0.6 |
| Node-only | ~0.2 | ~0.3 |
| Bag-of-words | ~0 | ~0 |
| Label-shuffled | ~0 | ~0 |

> "Only contextualized representations with intact structure–label alignment support strong recovery of DAG geometry"

### 3. Scaling Behavior

| Model Size | Depth Spearman | Distance Spearman | Sink Accuracy |
|------------|----------------|-------------------|---------------|
| 0.6B | ~0.55 | ~0.35 | ~70% |
| 4B | ~0.65 | ~0.50 | ~80% |
| 14B | ~0.70 | ~0.60 | ~85% |
| 32B | ~0.72 | ~0.62 | ~87% |

> "Larger models yield stronger recovery of DAG geometry, while reasoning-oriented training recipes provide modest gains"

### 4. Training Recipe Comparison (4B models)

| Variant | Depth Spearman | Distance Spearman |
|---------|----------------|-------------------|
| Base | ~0.63 | ~0.48 |
| Instruct | ~0.65 | ~0.50 |
| Thinking | ~0.66 | ~0.51 |

Modest improvement from reasoning-focused training.

### 5. DAG Recoverability vs Generation Correctness

| Generation Outcome | Mean Depth Spearman | Mean Sink Accuracy |
|-------------------|---------------------|-------------------|
| Correct | Higher, concentrated | Higher |
| Incorrect | Lower, spread | Lower |
| Incomplete | **Substantially lower** | **Much lower** |

> "Correct generations are associated with higher depth ordering, sink identification, and leaf recovery, while incomplete generations exhibit substantially weaker DAG recoverability"

### 6. Depth-Layer Alignment Pattern

> "The layer at which MAE is minimized shifts systematically with node depth: shallow nodes reach peak recoverability in earlier layers, whereas deeper nodes achieve their lowest error only in later layers"

This produces a **diagonal banding pattern** — deeper reasoning steps need deeper layers.

---

## Critical Analysis: Relationship to Thesis

**Thesis**: LLM reasoning is pattern matching from training distributions, not genuinely generative reasoning.

### How This Paper Is BALANCED

**Evidence FOR genuine structure:**
1. DAG geometry IS encoded — not just linear chains
2. Intermediate layers specialize for reasoning
3. Correct answers correlate with better DAG encoding
4. Progressive construction across layers

**Evidence AGAINST genuine reasoning:**
1. Recoverability ≠ causal use:
   > "Recoverability of DAG geometry does not imply that the model explicitly represents symbolic graphs, nor that such structure alone guarantees correct reasoning"

2. Strong recoverability insufficient for correctness:
   > "Distributions still exhibit substantial overlap across correctness groups, indicating that strong DAG recoverability is not sufficient for correct generation on its own"

3. Training recipe has modest effect:
   > "Alignment or reasoning-focused training may influence the accessibility of structured representations, but pretraining scale remains the dominant factor"

4. Late layers variable — reasoning structure may be discarded:
   > "In the final layers, performance becomes more variable and exhibits a mild decline"

### Key Insight for Thesis

The paper shows models ENCODE reasoning structure but don't necessarily USE it correctly. This is consistent with pattern matching:
- Models learn to represent DAGs (from training data patterns)
- But representation ≠ execution
- Correct decoding requires more than just having the right structure

---

## Relationship to Other Papers

### Supports
- **Measuring Faithfulness (2307.13702)**: Both show gap between internal representation and output
- **CoT Compression Theory (2601.21576)**: Both show intermediate layers are "reasoning-dominant"
- **Reasoning-Critical Neurons (2601.19847)**: Both identify localized reasoning computation

### Extends
- **Structural Probes (Hewitt & Manning 2019)**: Adapts syntax probing to reasoning DAGs
- **Faith and Fate (2305.18654)**: Provides mechanistic view of compositional structure

### Challenges
- **Illusion of Thinking (2506.06941)**: This paper finds genuine structure; that paper finds illusory reasoning
- But reconcilable: structure exists but isn't reliably used

### Provides Mechanism For
- **Comprehension Without Competence (2507.10624)**: Explains how models can encode steps but fail at integration

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- Paper is recent (January 2026) — no direct rebuttals found

### Potential Counter-Arguments

1. **Probing ≠ causal role**: Linear probes may find spurious correlations not used by model
2. **ProofWriter is synthetic**: May not generalize to natural reasoning
3. **DAG reconstruction thresholds**: Peak F1 depends on hyperparameter tuning

### Limitations (Authors Acknowledge)
> "The probing methods we use measure linear accessibility of structural information rather than causal necessity"
> "Focuses on datasets with explicit proof structure"
> "Recoverability alone does not imply that a given variable is directly used by the model during generation"

---

## Key Quotes

### On structure vs execution
> "Recoverability of DAG geometry does not imply that the model explicitly represents symbolic graphs, nor that such structure alone guarantees correct reasoning"

### On localization
> "Reasoning-relevant structure is not uniformly distributed across the network... intermediate layers achieve the strongest recovery of DAG geometry"

### On CoT relationship
> "An internal reasoning DAG is not equivalent to a surface chain-of-thought. A linear rationale can be viewed as a projection of an underlying dependency structure"

### On scaling
> "Model capacity is the primary driver of probe performance, with training recipe playing a more limited role"

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated

---

## Relevance to Synthesis

**BALANCED** — provides nuanced view:

1. **Structure exists**: DAG geometry IS linearly encoded in hidden states
2. **But not reliably used**: Recoverability doesn't guarantee correct reasoning
3. **Intermediate layers specialize**: Reasoning computation is localized
4. **Scale > training**: Pretraining determines structure, not reasoning-specific training

**Key insight**: Models can ENCODE reasoning structure without EXECUTING it correctly. This is consistent with "surfacing" hypothesis — capability exists but isn't reliably deployed.
