# Paper 348: Comparative Analysis of LLM Memorization at Statistical and Internal Levels

## Metadata
- **arXiv**: 2603.21658
- **Date**: March 2026
- **Authors**: Bowen Chen, Namgi Han, Yusuke Miyao
- **Affiliation**: University of Tokyo, National Institute of Informatics (NII)
- **Stance**: Supports thesis — memorization uses dedicated, fragile pathways (noise-sensitive heads); 100x divergence across families proves memorization is training-recipe-dependent pattern storage, not robust understanding. Structural texts dominate memorization; scaling adds free-text memorization, not deeper structural comprehension.

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  MEMORIZATION IS FRAGILE, DEDICATED, AND RECIPE-DEPENDENT            │
│                                                                      │
│  20 models × 6 families × 300,000 sequences per domain               │
│  (Pythia, OLMo1/2/3, OpenLLaMA, StarCoder, 160M–32B)                │
│                                                                      │
│  STATISTICAL LEVEL:                                                  │
│    Memorization rate scales LOG-LINEARLY with model size             │
│    100x divergence across families at same size                      │
│    Memorized sequences highly compressible (≤50% tokens suffice)     │
│    Structural texts dominate; scaling adds FREE-TEXT memorization     │
│                                                                      │
│  INTERNAL LEVEL:                                                     │
│    Memorized sequences are MORE SENSITIVE to noise than unmemorized  │
│    LLMs have internal denoising — later layers recover from noise    │
│    BUT: denoising FAILS for memorized content                        │
│    Memorized tokens reach >0.5 probability before final layer        │
│    Small head subset (~1-5%) important across ALL domains            │
│    Head distribution forms FAMILY-SPECIFIC fingerprint               │
│    Within-family similarity ~0.9; cross-family much lower            │
│                                                                      │
│  → No universal memorization structure exists across LLM families    │
│  → Memorization structure is decided by training recipe              │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Log-linear scaling**: memorization rate scales log-linearly with parameter count, but with 100x divergence across families — stronger capacity does not imply higher memorization rate
2. **Memorized sequences are compressible**: ≤50% of original context tokens triggers the same memorized output
3. **Structural dominance**: code/math dominate memorization; scaling increases free-text memorization, not more structural
4. **Fragile pathways**: memorized sequences use dedicated computational pathways that are more noise-sensitive than unmemorized pathways — under noise=0.5, OLMo1-7b memorization drops ~100x
5. **Internal denoising**: LLMs can recover from early-layer noise in later layers, but this recovery FAILS for memorized sequences — suggesting memorization is brittle pattern storage
6. **Two-stage mechanism**: early layers prepare features/routing, later layers activate and translate into output probabilities
7. **Dedicated heads**: ~1-5% of attention heads are important for memorization across all domains; head distribution is a family-specific fingerprint
8. **No universal structure**: memorization architecture is training-recipe-dependent, not a universal emergent property

---

## Methodology

- **Models**: 20 models across 6 families (Pythia 160M-12B, OLMo1 1B-7B, OLMo2 1B-32B, OLMo3 7B-32B, OpenLLaMA 3B-13B, StarCoder 1B-7B)
- **Sequences**: 300,000 per domain per model, 32 input + 32 output tokens, greedy decoding
- **Memorization score**: M = fraction of continuation tokens matching ground truth (M=1 fully memorized)
- **Compression ratio**: minimum context tokens for full memorized output / original context length
- **Noise injection**: Residual-stream Relative Gaussian Noise at first layer, alpha 0.0-0.5
- **Layer decoding**: Logit-Lens (apply final layernorm + unembedding to intermediate hidden states)
- **Head ablation**: replace head output with average of other heads at same layer; top 20% analyzed
- **Cross-domain overlap**: Jaccard similarity of top-20% important heads across domains
- **Compute**: ~2 months on 8 A100s (memorization scores), ~1 month on H100 (head importance)

---

## Key Evidence

| Finding | Number | Context |
|---|---|---|
| Memorization rate divergence across families | 100x | StarCoder highest (~10%), OLMo1 lowest |
| Compression ratio | ≤0.5 | For Pythia and StarCoder — less than half context needed |
| Noise=0.5 memorization drop (OLMo1-7b) | ~100x | 0.1 → 0.001 memorization rate |
| Pythia-12B noise=0.5 structural ratio | 74.3% → 91.1% | Free-text collapses first under noise |
| Within-family head structure similarity | ~0.9 | Pythia across sizes |
| OLMo3-32B universal heads | ~1.4% | Important for ALL domains |
| StarCoder-7B cross-domain overlap | 13.57% | vs 11.14% random baseline — barely above chance |
| OLMo2-1B cross-domain overlap | 52.08% | Much higher than random 11.39% |
| In-domain head overlap (StarCoder-7b) | 96.84% | Nearly identical heads for each domain |
| Bipolarized score distribution | M=0 or M=1 | Very few intermediate scores |

---

## Relationship to Other Papers

### Supports
- **#245 Extracting Books (2601.02671)** — Confirms memorization is real and extractable; provides the mechanistic basis (dedicated heads, fragile pathways) for why extraction works
- **#246 Extracting Memorized Pieces (2505.12546)** — Log-linear scaling explains why larger models yield more extracted content
- **#1 Faith and Fate (2305.18654)** — Structural dominance of memorization aligns with compositional reasoning failures: models memorize patterns, not generalize structures
- **#3 GSM-Symbolic (2410.05229)** — Noise sensitivity of memorized pathways explains why superficial perturbations break mathematical "reasoning"
- **#191 LLM Reasoning Failures Survey (2602.06176)** — Provides mechanistic basis for multiple failure modes: memorized pathways are fragile, dedicated, recipe-dependent

### Extends
- **#245, #246** — Adds internal-level analysis (heads, layers, noise robustness) beyond extraction statistics
- **#350 How Much Do LMs Memorize (2505.24832)** — Complementary: Morris et al. measure capacity (3.6 bpp); Chen et al. measure structure (which heads, which layers, which domains)

### Challenges (weakly)
- "Memorization is always bad" narrative — memorization of structural texts (code, math) may actually be useful pattern compression
- Bipolarized M=0/M=1 distribution suggests memorization is binary (you have it or you don't), not gradient

---

## REBUTTALS

### Known/potential rebuttals
- **32-token window is short**: 32 input + 32 output may miss longer-range memorization patterns. Authors acknowledge sampling limitations.
- **Greedy decoding only**: beam search or sampling might reveal different memorization patterns.
- **Frequency analysis uses Llama-2 tokenizer for non-Llama models**: approximate, could bias frequency distributions.
- **No closed-source models**: Qwen, DeepSeek, Llama excluded because training data unavailable. Findings may not generalize.
- **Head ablation is crude**: replacing with average doesn't capture head interactions or redundancy.
- **Noise-sensitivity could be an artifact**: Gaussian noise in residual stream is not ecologically valid — real perturbations are semantic.

### Limitations (authors acknowledge)
- Limited to fully open models with accessible pre-training data
- Sampling-based (not exhaustive)
- Infini-gram tokenizer mismatch
- Coarse domain classification
- Compute-limited head ablation for large models (2,500 vs 10,000 samples)

---

## Key Quotes

1. *"Stronger model capacity does not indicate a higher memorization rate. Instead, we observe up to a 100× divergence in memorization rates across different families"* — Section 4.1
2. *"memorized sequences exhibit lower similarity recovery compared to unmemorized sequences, showing that memorized sequences are more sensitive to the perturbation"* — Section 4.4
3. *"memorized sequences rely on more sensitive computational pathways. Once those pathways are perturbed, the denoising mechanism fails to reconstruct the exact sequence"* — Section 4.4
4. *"there does not exist a universal memorization structure that exists for all LLMs, and the memorization structure is decided by the training recipe"* — Section 4.8
5. *"memorization depth behaves more as an individual emergent property rather than a predictable byproduct of scaling"* — Section 4.1

---

## Critical Assessment

### Why this supports the thesis
The key finding for the thesis is the **fragility asymmetry**: memorized sequences are more noise-sensitive than unmemorized ones, and the internal denoising mechanism that LLMs develop to handle perturbation *fails specifically for memorized content*. This means memorization operates through dedicated, brittle pathways — not through robust understanding. When models "know" something via memorization, that knowledge is easily disrupted. When they "know" something via generalization, it's more robust.

This is mechanistically consistent with the thesis: LLMs store patterns in fragile, dedicated circuits. What looks like "knowledge" is pattern retrieval from specific heads, not generalized understanding. The 100x divergence across families proves this is an artifact of training recipe (data composition, algorithm), not an emergent cognitive property.

### Where it weakens the thesis
- The two-stage mechanism (early routing → late activation) is more sophisticated than simple "pattern matching" — it suggests some form of hierarchical processing
- OLMo3's noise robustness (distribution "basically unchanged" under noise) suggests newer architectures may develop more robust representations
- Free-text memorization increasing with scale could indicate genuine semantic understanding rather than surface patterns

### Net interpretation
Supports thesis. Memorization is brittle pattern storage in dedicated heads, not robust understanding. The training recipe (not emergent cognition) determines memorization architecture.
