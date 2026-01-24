# Paper Analysis: How LLMs Learn to Reason: A Complex Network Perspective

## Metadata
- **arXiv ID**: 2509.23629
- **Title**: How LLMs Learn to Reason: A Complex Network Perspective
- **Authors**: Sihan Hu, Xiansheng Cai, Yuan Huang, Zhiyuan Yao, Linfeng Zhang, Pan Zhang, Youjin Deng, Kun Chen
- **Date**: September 2025
- **Venue**: ICLR 2026
- **Institution**: USTC, Chinese Academy of Sciences, DP Technology, Lanzhou University

---

## Core Claims

1. **Sparse Concept Web Hypothesis**: RLVR training forms a "concept web" — a sparse network with average degree ≈ 2 (essentially tree-like structure)

2. **V-shaped response length explained**: 
   - **Decreasing phase**: Local "skill islands" are optimized independently
   - **Increasing phase**: Global integration across sparse web requires longer paths

3. **Catastrophic forgetting = topological disconnection**: SFT "severs" critical bridge edges in the sparse tree, disconnecting subgraphs

4. **Policy collapse = phase transitions at leaf nodes**: Each skill undergoes a phase-transition-like collapse from exploration to exploitation

5. **Annealed-RLVR**: Theory-driven algorithm — apply SFT "heating" at the maximally frustrated state, then resume RLVR "cooling"

---

## Methodology

### CoNet: Concept Network Model
- Minimal model abstracting LLM reasoning as graph traversal
- Fixed K-regular random graph (N=800 nodes, k=40 edges)
- Learnable transition probabilities π_θ(j|i)
- 128 Q-A pairs for multi-task learning
- Trained with GRPO (Group Relative Policy Optimization)

### Key Insight: Renormalization Group Analogy
> "Instead of directly studying the system at the full microscopic level, one can model and approach the system at a coarse-grained level to explain its macroscopic behavior"

The paper bypasses the intractable problem of extracting reasoning graphs from LLMs by studying a minimal model that reproduces the same macroscopic dynamics.

### LLM Experiments
- Model: DeepSeek-R1-Distill-Qwen-1.5B
- Protocol: DeepScaleR RLVR training
- OOD testing: Minerva, AIME 2024/2025

---

## Key Evidence

### Sparse Web Formation (Fig 3)
| Training Step | Web Structure | Avg Degree | Response Length |
|---------------|---------------|------------|-----------------|
| 20 | Disconnected skill islands | N/A | Short |
| 50 | Maximally frustrated state | ~2 | Minimum |
| 800 | Unified sparse web | ~2 | Longer |

### Catastrophic Forgetting Mechanism (Fig 4)
- SFT after RLVR causes **sharp performance drop**
- CoNet visualization shows **bridge edges severed**
- Subsequent RLVR quickly **re-solders** connections
- Explanation: Tree-like structure is fragile — removing one bridge disconnects entire subtree

### Annealed-RLVR Results (Fig 6)
| Benchmark | Standard RLVR | Annealed-RLVR |
|-----------|---------------|---------------|
| Training (512 problems) | Lower best@k | Higher best@k |
| Minerva (OOD) | Lower | Higher |
| AIME 2024/2025 (OOD) | Lower | Higher |

Intervention at "maximally frustrated state" improves both ID and OOD performance.

---

## Critical Analysis: Relationship to the Literature Review Thesis

**Literature Review Thesis**: LLM reasoning is practical but fundamentally predictive (pattern matching from training distributions), not genuinely generative. RL and test-time compute "surface" pre-existing capabilities rather than creating new reasoning abilities.

### How This Paper Could CHALLENGE the Thesis

1. **Structural self-organization**: The paper shows LLMs develop coherent internal structure during RL training
2. **Phase-transition-like learning**: Suggests genuine capability acquisition, not just pattern retrieval
3. **OOD improvements**: Annealed-RLVR improves OOD benchmarks (Minerva, AIME)

### Why This Paper Actually SUPPORTS the Thesis (Critical Reading)

**1. The "concept web" is a learned structure, not emergent reasoning**

The paper explicitly states:
> "CoNet is not a model of the Transformer's parameters themselves; rather, it models the emergent semantic network induced by inference"

The "concept web" is the structure of **learned associations**, not reasoning algorithms. The model learns which concepts connect to which — this is sophisticated **pattern matching** organized into a graph structure.

**2. ⟨k⟩≈2 means chain-like, not compositional**

An average degree of 2 implies:
- Predominantly **linear chains** (tree structure)
- Minimal **redundancy or shortcuts**
- No dense compositional structure

This is consistent with LLMs following **sequential templates** rather than flexibly composing reasoning steps. The "web" is a collection of learned chains, not a compositional algebra.

**3. The "skill islands → web" transition is INTEGRATION, not GENERALIZATION**

The paper describes:
> "The subsequent slow-learning phase... marks a fundamental shift to global integration. The primary task is no longer discovering new islands but weaving them into a single, expansive concept web"

"Integration" means **connecting existing learned patterns**, not creating new reasoning capabilities. The model learns to transition between pre-existing skills — exactly what the surfacing hypothesis predicts.

**4. Policy collapse is the EXPECTED outcome of pattern learning**

The paper describes:
> "The policy collapses from exploring diverse reasoning paths to exploiting a single optimal one"

This is the hallmark of **overfitting to training distribution**. The model converges on specific patterns rather than maintaining flexible reasoning capability. This directly supports the thesis.

**5. Catastrophic forgetting reveals FRAGILE learned structure**

The paper's key finding:
> "SFT-induced forgetting acts as a topological disconnection: gradient updates overwrite weights at these high-traffic bottlenecks, severing bridges to entire sub-trees"

A genuinely robust reasoning system would not have single-point-of-failure architecture. The fragility reveals that the "reasoning" is **specific learned pathways**, not general capability.

**6. OOD improvements are MODEST and within training distribution**

The OOD benchmarks (Minerva, AIME) are:
- Math problems (same domain as training)
- Similar structure to training data
- NOT genuinely OOD (novel task types)

Compare to OMEGA (2506.18880): 0% transformative generalization on genuinely OOD tasks.

**7. The theory explicitly supports surfacing hypothesis**

Key quote:
> "A node on the expanding frontier of a ⟨k⟩≈2 network is statistically isolated, decoupling it from system-wide competition"

This means new skills are added **at the edges of existing structure** — they build on pre-existing learned patterns. This is exactly what the surfacing hypothesis predicts: RL helps deploy pre-existing capabilities, not create new ones.

**8. "Maximally frustrated state" = maximum pattern competition**

The paper identifies:
> "The maximally frustrated state—the peak of competitive forgetting—as the ideal moment for SFT intervention"

This is a state where **learned patterns compete** for limited representational capacity. It's not about reasoning — it's about which patterns get to occupy the sparse web structure.

---

## Relationship to Other Papers

### Supports
- **Interplay (2512.07783)**: Both show RL surfaces/integrates pre-existing capability
- **DeepSeek-R1 (2501.12948)**: RL training dynamics; policy changes
- **No Free Lunch (2506.17219)**: RLIF degrades reasoning; format↑ reasoning↓
- **OMEGA (2506.18880)**: Policy collapse; model converges on specific patterns

### Challenged By (Implicitly)
- **Emergent Symbolic Mechanisms (2502.20332)**: Claims genuine symbolic abstraction vs. learned graph structure
- **Algorithmic Primitives (2510.15987)**: Claims emergent algorithms vs. learned pathways

### Provides Mechanism For
- **Illusion of Thinking (2506.06941)**: Why models collapse at complexity — sparse web has limited paths
- **Catastrophic forgetting literature**: Bridge-severing mechanism
- **Policy collapse literature**: Phase-transition dynamics at leaf nodes

---

## REBUTTALS TO THIS PAPER

### Methodological Issues

1. **CoNet is a proxy, not a validated model of LLM internals**
   - No verification that LLMs actually form ⟨k⟩≈2 networks
   - Similarity of macroscopic dynamics doesn't prove same mechanism
   - As authors acknowledge: "empirical mapping of the reasoning graph... remains a significant undertaking"

2. **RLVR training is a specific setting**
   - Results apply to math/coding with verifiable rewards
   - May not generalize to broader reasoning tasks
   - Selection bias: tasks amenable to RLVR

3. **"Concept" nodes are undefined**
   - What is a "concept" in LLM representations?
   - The mapping from tokens to concepts is ambiguous
   - Paper explicitly avoids this: "constructing the reasoning graph... is a formidable open problem"

### Limitations (Authors Acknowledge)

1. "The empirical mapping of the complete, microscopic reasoning graph from large-scale foundation models... remains a significant undertaking"

2. Theory is based on macroscopic dynamics matching, not mechanistic verification

3. CoNet is "minimal model" — deliberately simplified

### Missing Critical Tests

1. **Verification that LLMs have ⟨k⟩≈2 structure**: The core hypothesis is unverified
2. **Truly OOD generalization**: Minerva/AIME are same domain (math)
3. **Comparison to compositional tasks**: Would the sparse web explain compositional failures?

---

## Key Quotes

### On the mechanism:
> "The concept web, defined as the coarse-grained reasoning graph, is a sparse network whose effective average degree is pinned to ⟨k⟩≈2"

### On what RLVR does:
> "The primary task is no longer discovering new islands but weaving them into a single, expansive concept web"

This is INTEGRATION of pre-existing learned patterns, not creation of new reasoning.

### On policy collapse:
> "The policy collapses from exploring diverse reasoning paths to exploiting a single optimal one"

This is overfitting to specific patterns.

### On catastrophic forgetting:
> "SFT-induced forgetting acts as a topological disconnection: gradient updates overwrite weights at these high-traffic bottlenecks, severing bridges to entire sub-trees"

Structure is FRAGILE — single points of failure.

### On the broader claim:
> "By recasting RLVR from black-box optimization into a predictable process of structural self-organization, our work provides a new physical intuition for engineering the emergent reasoning capabilities of future AI systems"

The paper provides a DESCRIPTIVE theory of how learned patterns organize, not evidence of genuine reasoning.

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

**Verdict: FOR genuine reasoning (claimed) but BALANCED on close examination**

### What This Paper Actually Shows:
1. RLVR training creates **organized learned structure** (sparse concept web)
2. The structure has **predictable dynamics** (V-shape, forgetting, collapse)
3. These dynamics can be **manipulated** (Annealed-RLVR)
4. **CoNet** reproduces LLM macroscopic dynamics with a minimal model

### What This Paper Does NOT Show:
1. That LLMs actually have ⟨k⟩≈2 internal structure (hypothesis, not verified)
2. That the "concept web" supports genuine reasoning (vs. pattern retrieval)
3. That OOD improvement extends to genuinely novel tasks
4. That the mechanism differs from sophisticated pattern organization

### Critical Insight:
The paper provides an elegant **theory of how learned patterns self-organize** under RLVR. But this is equally consistent with the thesis:

- **"Concept web"** = organized learned associations
- **"Integration"** = connecting pre-existing patterns
- **"Policy collapse"** = overfitting to specific paths
- **"Fragile bridges"** = single-point-of-failure learned structure

The paper describes the **mechanics** of how LLMs learn to navigate training distributions, not evidence that this constitutes genuine reasoning.

### Relationship to Thesis:
This paper **supports the surfacing hypothesis** when read carefully:
- RL integrates and organizes pre-existing learned patterns
- The structure is distribution-bounded (sparse, fragile)
- Policy collapse = convergence on specific training patterns
- No evidence of genuinely novel reasoning capability

### Key Quote for Synthesis:
> "The primary task is no longer discovering new islands but weaving them into a single, expansive concept web"

RLVR **organizes existing learned patterns** — it doesn't create new reasoning capability.
