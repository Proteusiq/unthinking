# Paper Analysis: All Circuits Lead to Rome: Rethinking Functional Anisotropy in Circuit and Sheaf Discovery for LLMs

## Metadata
- **arXiv ID**: 2605.12671
- **Title**: All Circuits Lead to Rome: Rethinking Functional Anisotropy in Circuit and Sheaf Discovery for LLMs
- **Authors**: Xi Chen, Mingyu Jin, Jingcheng Niu, Yutong Yin, Jinman Zhao, Bangwei Guo, Dimitris N. Metaxas, Zhaoran Wang, Yutao Yue, Gerald Penn
- **Date**: May 2026
- **Venue**: ICML 2026
- **Code**: github.com/TonyXiChen/OASR

---

## Core Claims

1. **Functional Anisotropy Hypothesis is false**: LLM capabilities are NOT supported by unique internal mechanisms - multiple structurally distinct circuits/sheaves can each faithfully perform the same task
2. Multiple task-supporting sheaves can have as low as 4.1% IoU overlap while both achieving 100% task accuracy (IOI), and this drops to 0.15% mutual IoU across 20 sheaves
3. Even an ultra-sparse 3-edge sheaf has no individually indispensable component - removing any single edge preserves ~99.9% accuracy
4. **Distributive Dense Circuit Hypothesis**: Non-unique, low-overlap circuits arise naturally from high-dimensional superposition - proven theoretically via subset-sum collision argument

---

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY FINDING: A single LLM task (IOI) can be performed by          │
│  multiple structurally distinct circuits with only 4.1% overlap.   │
│  Across 20 sheaves, mutual intersection drops to 0.15%.            │
│  Mechanistic explanations are inherently non-canonical.            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Methodology

**Overlap-Aware Sheaf Repulsion (OASR):**
- Augments standard circuit/sheaf discovery (DiscoGP) with explicit penalty on structural overlap with previously discovered mechanisms
- Uses Gumbel-Sigmoid relaxation with straight-through estimator for differentiable edge selection
- Combined objective: fidelity + sparsity + completeness + overlap penalty

**Models tested:** GPT-2 Small (12 layers, 12 heads), Pythia-160M

**CSD methods tested:** DiscoGP (primary), ACDC, EAP, Edge Pruning

**Benchmarks:** IOI (indirect object identification), BLiMP, AGA, ANA, DNA (4 variants), Docstring

**Evaluation:** Task accuracy under zero ablation (only selected edges active), complement accuracy, edge density, IoU overlap

---

## Key Evidence
| Finding | Number | Context |
|---------|--------|---------|
| Two-sheaf IoU (IOI) | 4.1% | Both sheaves: 100% accuracy, ~3.5-4% edge density |
| Two-sheaf IoU (BLiMP) | 5.1% | 96.8% and 92.6% accuracy |
| Two-sheaf IoU (Docstring) | 11.0% | 98.9% and 100% accuracy |
| 20-sheaf mutual IoU (IOI, OASR) | 0.15% | Only 11 edges shared across all 20 sheaves |
| 20-sheaf mutual IoU (IOI, random) | 0.30% | 20 edges shared across all 20 sheaves |
| 20-sheaf mutual IoU (BLiMP, OASR) | 0.70% | 37 edges shared, avg 96.11% accuracy |
| 20-sheaf mutual IoU (Docstring, OASR) | 0.25% | 18 edges shared, avg 99.04% accuracy |
| 3-edge sheaf accuracy (IOI) | 86.7% | Ultra-sparse: input→MLP₀, MLP₀→Attn₁₀H₇V, Attn₁₀H₇→output |
| Single edge removal from 3-edge | 99.8-99.9% | No single edge is indispensable |
| Two edge removal from 3-edge | ~31% | Collapses to chance |
| ACDC interchange IoU | varies | Sensitive to head traversal order |
| Edge Pruning CE-loss IoU (IOI) | 0.064 | Much lower than KL-loss (0.340) |
| Pythia-160M IOI OASR mutual IoU | 0.34% | Same pattern as GPT-2 |
| Pythia-160M Docstring OASR mutual IoU | 0.06% | Even lower overlap |
| Node-level IoU | 49-93% | Much higher than edge-level - same components, different wiring |

---

```
┌─────────────────────────────────────────────────────────────────────┐
│  CIRCUIT NON-UNIQUENESS AT SCALE                                    │
│                                                                     │
│  # Sheaves    Mutual IoU (IOI)    Avg Accuracy                      │
│  ─────────    ────────────────    ────────────                      │
│      2             4.1%              100%                            │
│     20             0.15%             99.59%                          │
│                                                                     │
│  As more valid circuits are found, their intersection vanishes      │
│  but each individually performs the task faithfully.                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Relationship to Thesis

**Stance: SUPPORTS**

This paper provides deep mechanistic evidence that LLM computation is fundamentally distributed and non-localizable, which supports the thesis in several ways:

1. **No canonical reasoning mechanism**: If there were genuine "reasoning circuits," we would expect them to be unique and structurally privileged. Instead, any task can be supported by dozens of structurally distinct mechanisms with near-zero overlap. This suggests computation is pattern-matching through a dense web of redundant pathways, not localized reasoning.

2. **Superposition explains non-uniqueness**: The theoretical argument via subset-sum collisions in high-dimensional superposition directly explains why LLMs appear to "reason" - combinatorially many edge subsets can produce the same output. This is pattern completion through distributed representations, not structured computation.

3. **Undermines mechanistic interpretability claims**: If circuits are non-canonical, then claims about "discovering how models reason" via circuit analysis are fundamentally limited. Each discovered circuit is one of many valid views, not THE mechanism. This challenges the interpretability research program that aims to verify genuine reasoning.

4. **Connects to backup/redundancy literature**: The finding that these aren't dormant "backups" but simultaneously active mechanisms suggests LLMs don't have a primary reasoning pathway - they have a dense superposition of pattern-matching routes.

---

## Relationship to Other Papers

### Supports
- **#77 IOI Minimal Circuits (2510.25013)**: Directly challenges - "minimal" circuits are not unique; OASR finds alternative minimal-quality sheaves with near-zero overlap
- **#1 Faith & Fate (2305.18654)**: Compatible - compositional failure may be because there is no single compositional circuit to fail gracefully; distributed computation fragments under OOD stress
- **#322 Linear Representation Features (2602.11246)**: Related - if mechanisms are non-unique, the linear representation hypothesis may also have non-unique decompositions

### Challenges
- The paper explicitly states it does "not undermine CSD" - discovered mechanisms remain causally meaningful, just non-canonical. It challenges the interpretation of mechanistic interpretability more than the practice.

### Extends
- **Wang et al. 2022a (IOI circuit)**: Foundational reference. Distinguishes from their "backup Name-Mover Heads" finding: "backup-style explanations treat redundancy as ablation-triggered exception, but in our setting non-uniqueness is a feature of normal model operation"
- **Conmy et al. 2023 (ACDC)**: Tests ACDC as one of four CSD methods; shows it is sensitive to head traversal order
- **Elhage et al. 2021 (residual stream)**: Builds directly on their computation graph formulation

---

## REBUTTALS

### Known Rebuttals
- No direct rebuttals identified (ICML 2026, published May 2026)
- **Méloux et al. (2025)** - "Everything, Everywhere, All at Once" - related prior work on identifiability of mechanistic interpretability. This paper distinguishes itself by testing on pretrained LMs (GPT-2, Pythia) vs simple models

### Limitations (Authors Acknowledge)
1. All main experiments on **GPT-2 Small** only - a very small model by modern standards
2. Pythia-160M in appendix - still small. No larger models tested
3. Theoretical assumptions (local linearisation, margin stability) may not hold universally
4. The 3-edge sheaf indispensability depends on how the task is defined (aggregated vs decomposed)
5. Node-level IoU remains high (49-93%) - structural diversity is primarily in wiring patterns, not component selection

### Independent Assessment
- The IoU numbers are striking: 4.1% for two sheaves, 0.15% for twenty - this is very close to chance overlap
- The theoretical argument via subset-sum collisions is elegant and well-motivated
- The limitation to GPT-2 Small is significant - larger models may have different circuit structure (though Pythia-160M shows the same pattern)
- The implication for interpretability is important but nuanced: circuits are meaningful but non-canonical, which limits their explanatory power for understanding "how models reason"
- The 3-edge sheaf experiment is clever but the caveat about task decomposition (IOI-BABA vs IOI-ABBA) shows that "indispensability" depends on task granularity

---

## Key Quotes

> "We show that a single LLM task can instead be supported by multiple, structurally distinct circuits or sheaves that are simultaneously faithful, sparse, and complete."

> "Non-uniqueness is a feature of normal model operation, making [backup-style explanations] an unsatisfactory patch rather than a mechanism-level explanation."

> "We further identify an ultra-sparse three-edge sheaf and show that none of its edges is individually indispensable, undermining even weakened notions of canonical or essential components."

> "Our results suggest that mechanistic explanations in LLMs are inherently non-canonical and call for a rethinking of how CSD results should be interpreted and evaluated."

> "Non-unique, low-overlap circuit explanations arise naturally from high-dimensional superposition under mild assumptions."

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
