# Paper Analysis: Mechanistic Interpretability of Large-Scale Counting in LLMs through a System-2 Strategy

## Metadata
- **arXiv ID**: 2601.02989
- **Title**: Mechanistic Interpretability of Large-Scale Counting in LLMs through a System-2 Strategy
- **Authors**: Hosein Hasani, Mohammadali Banayeeanzade, Ali Nafisi, et al.
- **Institution**: Sharif University of Technology
- **Date**: January 2026
- **Venue**: arXiv

---

## Core Claims

1. **LLMs have systematic counting limitations** arising from architectural constraints (transformer depth)
2. **Counting uses layerwise internal process** — numerical information accumulates across layers
3. **System-1 counting fails beyond ~30 items** — internal counter becomes saturated
4. **System-2 decomposition strategy overcomes limits** — partition large tasks into smaller sub-problems
5. **Neither structure nor CoT alone sufficient** — BOTH required together
6. **Count information stored at specific tokens** — final item and comma separator of each partition
7. **Specific attention heads mediate counting** — different heads for intermediate steps vs final aggregation

---

## Methodology

### Experimental Setup
- **Task**: Count repeated items in lists (e.g., "apple, apple, apple, ...")
- **Input formats**: Unstructured (flat list) vs Structured (partitions separated by |)
- **Output formats**: Without steps (direct answer) vs With steps (intermediate counts + sum)
- **Partition sizes**: 6-9 items (open-source), 15-25 items (closed-source)

### Models Tested
| Model | Layers | Type |
|-------|--------|------|
| Qwen2.5 7B | 28 | Open-source |
| Llama 3 8B | 32 | Open-source |
| Gemma 3 27B | 62 | Open-source |
| GPT-4o | - | Closed-source |
| Gemini-2.5-Pro | - | Closed-source |

### Analysis Methods
1. **CountScope probing**: Causal probing that patches token activation and decodes implied count
2. **Zero ablation**: Replace activations with zeros
3. **Attention knockout**: Selectively block attention heads
4. **Cross-context activation patching**: Swap embeddings between contexts

---

## Key Evidence

### System-1 Counting Fails at Scale

**Qwen2.5 7B (Unstructured, no steps):**
| Count Range | Accuracy | MAE |
|-------------|----------|-----|
| 11-20 | 38% | 0.88 |
| 21-30 | 13% | 2.19 |
| 31-40 | 6% | 5.29 |
| 41-50 | **0%** | 10.50 |

**Critical Finding**: 0% accuracy at 41-50 items across ALL open-source models.

### System-2 Strategy (Structured + Steps) Dramatically Improves

**Qwen2.5 7B (Structured, with steps):**
| Count Range | Accuracy | MAE |
|-------------|----------|-----|
| 11-20 | **95%** | 0.07 |
| 21-30 | **61%** | 1.36 |
| 31-40 | **38%** | 1.53 |
| 41-50 | **24%** | 2.18 |

**Improvement**: 0% → 24% at 41-50 items; 6% → 38% at 31-40 items.

### GPT-4o Results (51-100 range)

| Input | Output | Acc 51-60 | Acc 91-100 |
|-------|--------|-----------|------------|
| Unstructured | w/o steps | 70% | 24% |
| Structured | w/ steps | **96%** | **86%** |

**GPT-4o achieves 86% accuracy at counts of 91-100 with System-2 strategy.**

### Neither Component Alone is Sufficient

**Qwen2.5 7B at 41-50 items:**
| Condition | Accuracy |
|-----------|----------|
| Unstructured + no steps | 0% |
| Unstructured + steps | 0% |
| Structured + no steps | 1% |
| **Structured + steps** | **24%** |

**Critical Finding**: CoT alone (unstructured + steps) = 0% accuracy. Structure alone = 1%.

### Mechanistic Findings (Qwen2.5 7B)

| Finding | Evidence |
|---------|----------|
| Count stored at boundary tokens | CountScope probing shows final item/comma encode partition count |
| Count resets at partition boundaries | Each partition counted independently |
| Layer 22 critical | Attention knockout shows largest probability drops |
| Different heads for different stages | Head 13 for intermediate steps, Head 1 for aggregation |

### Cross-Context Patching
- Swapping embeddings from layers 18-24 between contexts **changes final count**
- Example: Sums 19 and 14 → after patching → sums become 21 and 12
- Confirms intermediate-layer embeddings causally mediate counting

---

## Critical Assessment

### What This Paper Shows

1. **Architectural depth limits counting** — System-1 saturates at ~30 items
2. **System-2 decomposition works** — 0% → 24% (or higher) with partitioning
3. **CoT alone doesn't help** — structure + CoT required together
4. **Counting has specific circuits** — layer 22, distinct heads for sub-tasks

### What This Paper Does NOT Show

1. **Why depth limits counting** — mechanism is observed, not explained
2. **Generalization to other tasks** — counting is specific
3. **Whether this scales** — partition overhead unclear

### Relevance to Thesis

**STRONGLY SUPPORTS thesis**:
- System-1 (implicit) reasoning fails at moderate scale (0% at 41-50)
- CoT alone provides NO benefit (0% accuracy)
- Success requires **external structure** (partitioning) — model can't self-decompose
- "Test-time compute" via CoT doesn't overcome architectural limits

---

## Relationship to Other Papers

### Supports
- **Illusion of Thinking (2506.06941)**: Both show collapse at complexity threshold
- **Sequential Enumeration (2512.04727)**: Both show LLMs can't spontaneously count
- **Faith and Fate (2305.18654)**: Error accumulation with sequential steps

### Extends
- **CountScope (prior work)**: Adds System-2 analysis and causal mediation

### Provides Mechanism For
- **Why CoT alone fails**: Needs structural decomposition, not just more tokens
- **Why reasoning collapses**: Depth-bounded internal counters saturate

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found (recent paper)

### Potential Counter-Arguments

1. **Narrow task** — counting may not generalize to other reasoning
2. **Requires external structure** — user must provide partitions
3. **Tokenization effects** — may confound counting analysis

### Limitations (Authors Acknowledge)
- Narrow task (simple repeated nouns)
- Limited object diversity (16 items)
- Requires prior knowledge of model's reliable counting range
- Generalization unclear

---

## Key Quotes

> "System-1 performance degrades rapidly and collapses beyond approximately 30 items, reflecting the bounded capacity of the model's internal counter."

> "Neither external structure nor reasoning alone is sufficient. Their combination is necessary to overcome large-scale counting failures."

> "At each partition boundary, the count resets and begins again. As a result, the final item of each partition encodes the number of items counted since the beginning of that partition."

---

## Relevance to Thesis

**STRONGLY SUPPORTS thesis**

This paper shows:
1. ✓ System-1 reasoning fails at scale — 0% accuracy at 41-50 items
2. ✓ CoT alone provides NO benefit — 0% accuracy (unstructured + steps)
3. ✓ Success requires external structure — model can't self-decompose
4. ✓ Architectural limits are real — depth-bounded counters saturate
5. ✓ Specific circuits identified — but they saturate

**Key insight for thesis**: CoT doesn't overcome architectural limits. Models need **external scaffolding** (structured input) to succeed. This supports the claim that RL/CoT "surfaces" capability rather than creating new reasoning — the model can count within partitions, but can't decompose large tasks itself.

---

## Status
- [x] Read complete (HTML version via Task agent)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**

---

## Verdict: STRONGLY SUPPORTS THESIS (System-1 fails at scale; CoT alone doesn't help; external structure required; architectural limits are real)
