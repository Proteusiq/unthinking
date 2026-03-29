# Operationalising the Superficial Alignment Hypothesis via Task Complexity

**arXiv**: [2602.15829](https://arxiv.org/abs/2602.15829)  
**Date**: February 2026  
**Authors**: Vergara-Browne, Patil, Titov, Reddy, Pimentel, Mosbach  
**Venue**: ICML 2026

## Summary

Provides a formal, information-theoretic operationalization of the Superficial Alignment Hypothesis (SAH). Defines **task complexity** as the length of the shortest program to achieve target performance δ on task T. Demonstrates that adapting pre-trained LLMs requires remarkably little information — often just **kilobytes** — while pre-training used **terabytes**.

```
┌─────────────────────────────────────────────────────────────────────┐
│  CORE FORMALIZATION                                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Task Complexity:    C(T_δ) = min { len(P) : score(P) ≥ δ }        │
│  Conditional:        C(T_δ|θ) = min { len(P) : score(P_θ) ≥ δ }    │
│  SAH Claim:          C(T_δ|θ_pretrained) << C(T_δ)                 │
│                                                                     │
│  Information in model: I(T_δ; θ) = C(T_δ) - C(T_δ|θ)               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Key Findings

### Adaptation Requires Remarkably Little Information

| Task | Model | Baseline | Program Size | Improved |
|------|-------|----------|--------------|----------|
| GSM8K | OLMo3-32B | 29.6% | **4,358 bits** (545 bytes) | 72.2% |
| FLORES | OLMo3-7B | 22.63 BLEU | **3,992 bits** (499 bytes) | 34.43 BLEU |
| IFEval | OLMo3-7B | — | ~1.25 MB | Maximum |

**Scale comparison**:
- Pre-training: **terabytes** of data
- Adaptation: **kilobytes** of program

### Pre-training vs Post-training: Different Roles

```
┌─────────────────────────────────────────────────────────────────────┐
│  PRE-TRAINING                    POST-TRAINING                      │
├─────────────────────────────────────────────────────────────────────┤
│  ENABLES performance             COLLAPSES access complexity        │
│  (random → accessible)           (GB → KB)                          │
│                                                                     │
│  Random init:  1.1% GSM8K        Pre-trained: needs 5×10^6 bits    │
│  Pre-trained: 67.6% GSM8K        Post-trained: needs ~10^4 bits    │
│                                                                     │
│  Performance ACCESSIBLE          Performance EASILY ACCESSIBLE      │
│  but at GB-scale programs        with KB-scale programs            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Critical finding**: Post-training collapses complexity by **orders of magnitude**:
- Pre-trained: Max performance at 5×10^6 bits (625 KB)
- Post-trained: Near-max at ~10^4 bits (~1.25 KB)

### Three Views of Superficiality Unified

The paper shows three seemingly orthogonal arguments for SAH are actually strategies for finding short programs:

| View | Method | Best Region | Interpretation |
|------|--------|-------------|----------------|
| Inference-control | ICL, URIAL | Shortest (~10^4 bits) | Prompting exploits existing circuits |
| Data | Subset Training | Medium | Small data surfaces latent ability |
| Parametric | LoRA, B-LoRA | Longest (best perf) | Few parameters encode adaptation |

All three views are **consistent** — they find short programs using different strategies.

## Methodology

**Tasks**: GSM8K (math), FLORES-200 (translation), IFEval (instruction following)

**Models**: SmolLM3 3B, OLMo3 7B, OLMo3 32B

**Program length computed** by:
1. Compressing training data (gzip)
2. Compressing model weights/adapters
3. Measuring prompt length

**Pareto frontier** constructed: Program length vs. task performance

## Relevance to Thesis

### Direct Support for "Pattern Matching, Not Learning"

The finding that **kilobytes** adapt models to complex tasks directly supports the thesis claim that:

1. **Pre-training encodes patterns** — the computational machinery exists
2. **Post-training/prompting selects patterns** — minimal information picks which patterns to apply
3. **No new "reasoning" is learned** — adaptation accesses what's already there

### Connection to URIAL (#280)

This paper uses URIAL as an experimental method and provides the **theoretical explanation** for why URIAL works:
- URIAL achieves Pareto-optimal performance with ~10^4 bits
- The information for instruction-following is **already in pre-trained models**
- 3 ICL examples = ~3000 bits of steering information

### Implications for Alignment Faking

The paper explicitly addresses safety implications:

> "Work on quantifying the safety of open-weight model releases deals with measuring how easily unsafe capabilities can be accessed"

If safety alignment requires only kilobytes:
1. **Safety is superficial** — easy to undo
2. **Harmful capabilities persist** in pre-trained weights
3. **Post-training changes access patterns**, not capability existence

This reframes "alignment faking" — the model isn't strategically hiding goals; rather, alignment changes the **complexity of accessing** different behaviors, and adversarial prompts can reduce that complexity.

## Rebuttals Addressed

| Critic | Claim | Paper's Response |
|--------|-------|------------------|
| Raghavendra et al. (2024) | Performance should saturate with few examples | SAH doesn't claim saturation; some δ require large programs |
| Liu et al. (2024) | Fine-tuning = 1 bit per parameter | Overstates; dataset << parameters, so not Pareto-optimal |
| Chen et al. (2025) | Reasoning fine-tuning isn't superficial | Their method is far from Pareto curve; better methods find short programs |

## Limitations

1. **Task complexity is uncomputable** — estimates are upper bounds only
2. **Cannot measure unconditional C(T_δ)** — need pre-trained model as baseline
3. **Only 3 tasks** — may not generalize
4. **No threshold for "superficial"** — study tradeoff, don't define cutoff

## Stance: **Supports Thesis**

**Strong support.** Provides formal, quantitative evidence that:
- LLMs learn patterns during pre-training (high information content)
- Adaptation/alignment/reasoning tasks require minimal new information
- Post-training changes access cost, not capability existence
- This is inconsistent with models "learning to reason" through fine-tuning

The information-theoretic framing directly supports the thesis that LLMs are pattern matchers that simulate reasoning by accessing pre-computed patterns, not by developing new reasoning capabilities.

## Connections

- **Supports**: URIAL (#280), Superficial Alignment debate
- **Extends**: Information-theoretic analysis of LLMs
- **Provides mechanism for**: Why alignment faking appears — changing access patterns to latent behaviors

## Key Quote

> "Programs as small as 1.2×10^6 bits (which is 151 kilobytes, or the size of a single image from ImageNet) can adapt these large language models to achieve strong performance on some of these tasks."

> "Pre-training makes strong performance accessible... Post-training, on the other hand, collapses the complexity of reaching this same performance by several orders of magnitude."
