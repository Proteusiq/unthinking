# Paper Analysis: Set-LLM

## Metadata
- **arXiv ID**: 2505.15433
- **Title**: Set-LLM: A Permutation-Invariant LLM
- **Authors**: Beni Egressy, Jan Stühmer (Heidelberg Institute for Theoretical Studies; KIT)
- **Date**: May 2025
- **Venue**: arXiv preprint (under review)
- **Stance**: BALANCED (fixes order sensitivity architecturally; but the fix confirms order sensitivity is a real pattern-matching artifact, and robustness is imposed by architecture rather than learned)
- **Role**: Documents the magnitude of MCQA order bias across 5 models × 4 benchmarks, then removes it by construction

---

## Why This Paper Matters

The paper's own motivating fact is a thesis exhibit:

```
┌─────────────────────────────────────────────────────────────────────┐
│  Just PERMUTING the answer choices flips the model's answer.        │
│  Gemma 2B ARC-Challenge:  55.20% (random order)                     │
│                        →  23.72% (adversarial order)                │
│  A -31.5pp drop from reordering the SAME options.                   │
└─────────────────────────────────────────────────────────────────────┘
```

If a model genuinely reasoned about which option is correct, the *order* of the options would not matter. That the answer swings by up to ~32pp on pure reordering is direct evidence the "choice" is driven by surface position and token co-occurrence, not by evaluating the content of each option. Set-LLM does not dispute this - it takes it as the premise and engineers it away.

---

## Core Claims

1. **Order sensitivity is a real, large vulnerability** - across 5 base models, adversarial reordering drops accuracy by **3.4% to 31.7%** vs random order.
2. **Permutation invariance can be built into a decoder-only LLM by construction** - via a new set positional encoding (SetPE) and set attention mask (SetMask), with a formal proof (Theorems 1-2).
3. **The fix is free** - Set-LLM matches or beats the base model (18-20/20 cases) and beats majority-vote (16/20) in a single run, vs majority-vote's k! runs.
4. **No accuracy trade-off** - guarantees do not cost performance.

---

## Methodology

### The four adaptation steps
| Step | Change | Effect |
|------|--------|--------|
| 1 | Remove sequential position encoding (NoPE) | strips absolute order |
| 2 | Remove causal mask → prefix mask | strips order reconstructable from causal mask (Kazemnejad et al. show causal mask alone recovers order) |
| 1+2 | = **bag-of-words** model | order-blind but too weak (word order matters) |
| 3 | **SetPE**: number set elements from a shared start position | restores intra-span word order without imposing set order |
| 4 | **SetMask**: cut attention edges between different elements of the same set | distinguishes inputs SetPE alone conflates (Figure 4 failure case) |

Steps 3+4 give provable set-permutation invariance (Theorem 1: equivariance per layer → invariance overall).

### Experimental setup
- **5 base models**: Gemma 2B, Gemma 7B, Llama 3.2 1B, Llama 3.2 3B, Llama 3.1 8B.
- **4 MCQA benchmarks**: PIQA, ARC-Challenge, CommonsenseQA, SIQA.
- **Two eval modes**: *Random Order* (mean over all permutations), *Adversarial Order* (correct only if right on ALL permutations).
- LoRA finetuning, single H200, 1-4h per model/benchmark.
- **Crucial practical caveat**: needs **32-bit precision** at eval time - the architecture is *provably* invariant, but hardware float non-associativity accumulates errors layer-by-layer under bf16, breaking invariance in practice. A constant-factor runtime overhead the "no overhead" headline elides.

---

## Key Evidence

### Finding 1: Order bias is large and universal
Every base model drops under adversarial reordering (Table 3):

| Model | Worst adversarial drop (example) |
|-------|----------------------------------|
| Gemma 2B | ARC 56.32 → 26.88 (single run) |
| Llama 3.2 1B | ARC 53.61 → 21.93 |
| Llama 3.1 8B | ARC 83.04 → 64.51 |

Range across models: **3.4% to 31.7%**. The bias is worst on the hardest benchmark (ARC-Challenge), consistent with pattern-matching being most exposed where content-reasoning is most needed.

### Finding 2: Invariance eliminates the drop entirely
Set-LLM (SetMask+SetPE) has **identical random and adversarial accuracy** - zero drop by construction. Confirmed empirically across all 20 model×benchmark cells.

### Finding 3: The fix is not a trade-off
- Set-LLM beats base model in **20/20 adversarial** and **18/20 random** cases.
- Beats majority-vote in **16/20** cases with a **single run** (majority vote needs k! runs).
- Gemma 2B ARC: base single-run 56.32 (rand) / 26.88 (adv) → Set-LLM 65.02 / 65.02.

### Finding 4: The ablation shows where the signal lives
Table 2 intermediate steps (Gemma 2B):
- Causal+NoPE (step 1 only): collapses (ARC 35.70/14.76) - stripping position hurts a model trained with it.
- Prefix+NoPE (BoW): order-invariant but weak (CSQA 49.14).
- Prefix+SetPE: invariant, recovers most accuracy (ARC 51.28).
- **SetMask+SetPE (full)**: best (ARC 57.76), needs SetMask to beat majority vote.

---

## Interpretation: what this says about "reasoning"

```
┌───────────────────────────────────────────────────────────────────────┐
│  DIAGNOSIS (supports thesis)      vs    TREATMENT (orthogonal)        │
├───────────────────────────────────────────────────────────────────────┤
│  Reordering options flips the         Rebuild architecture so         │
│  answer up to 32pp on reorder         order CANNOT be seen ->         │
│  choice is position/surface           bias gone by construction,      │
│  driven, not content-reasoned         not by learning to reason       │
└───────────────────────────────────────────────────────────────────────┘
```

The paper is BALANCED, and the two halves pull opposite ways:

- **Supports the thesis**: the phenomenon it fixes is a textbook pattern-matching signature. A content-reasoner is invariant to option order *because it evaluates each option*; these models are not, so their MCQA competence is partly positional artifact. The magnitude (up to 31.7pp) is a strong quantitative datapoint for "benchmark scores overstate reasoning."
- **Orthogonal / mild counter**: robustness is achievable - but *by removing the model's ability to perceive order*, not by teaching it to reason. Invariance is imposed by architecture (a hard symmetry constraint), exactly like the external-scaffolding pattern seen elsewhere (majority vote, self-consistency). The model does not learn to ignore order; it is *built* unable to see it. That Set-LLM also *improves* accuracy suggests the removed positional signal was mostly noise/bias, not content - reinforcing that the base model was leaning on it.

**In thesis terms**: reliability is engineered into the substrate (a permutation-invariant architecture), not emergent from better reasoning. Set-LLM is a cleaner, cheaper version of the external-selection scaffolding pattern - here folded into the architecture rather than run at inference (cf. majority vote's k! runs).

---

## Limitations & Issues

### Methodological Concerns
1. **Scope is MCQA only** - authors concede experiments "focus on multiple-choice question answering." The LLM-as-evaluator use case (their headline motivation) is not directly tested on generative judging, only argued by analogy.
2. **"No runtime overhead" is qualified** - invariance in practice requires fp32 eval, a constant-factor cost the abstract omits (footnote 2, §4 training setup).
3. **Requires finetuning per benchmark** - the adaptations "fundamentally change the input," so every base model is LoRA-finetuned separately on each dataset; not a plug-in at inference.
4. **Small models** - largest is 8B; no frontier-scale test, and order bias behavior may differ at scale.

### Interpretive Concerns
1. **Removing perception ≠ acquiring robustness** - the model is made unable to see order, which is a different thing from a model that reasons despite order.
2. **Accuracy gains conflate two effects** - could be (a) removing positional bias, or (b) the prefix/bidirectional attention giving richer representations; the ablation partly separates these but the SetPE-vs-SetMask gap is small.

---

## Graph Links to Other Papers

### Papers This SUPPORTS / RELATES TO
| Paper | Connection |
|-------|-----------|
| **#374 Positional Bias of ICL (2507.22887)** | Same phenomenon (demo/option position drives answer); Set-LLM removes it architecturally |
| **#372 Directional Bias in Comparative Reasoning (2506.03923)** | Order/first-option preference in LLM comparisons - the judge use case Set-LLM targets |
| **#373 Attribution Bias (2505.22910)** | Same family: surface features (order/name) override content |
| **#00 Faith and Fate (2305.18654)** | MCQA order sensitivity is a surface-pattern signature; content is not being evaluated |
| **LLM-as-a-judge bias cluster (#173, #270, #271, #273)** | Order bias in judges is the motivating problem; Set-LLM is a proposed architectural cure |

### Papers That QUALIFY This
| Paper | Qualification |
|-------|---------------|
| **#389 LLM-as-a-Verifier (2607.05391)** | External/architectural machinery recovers reliability; consistent framing - reliability imposed, not reasoned |

---

## Key Quotes

> "This vulnerability manifests itself as the order bias observed when LLMs decide between possible options... and the tendency of LLMs to provide different answers when options are reordered."

> "Zong et al. [50] demonstrate [permuting choices] can degrade an LLM's performance from 'good' to worse than random."

> "Set-LLM guarantees consistent responses by building permutation invariance directly into the model architecture."

> "Due to minor computational inconsistencies... our models have to be run with a higher model precision to guarantee invariance. This adds a constant factor overhead to runtime costs."

---

## Interaction Diagram

```
        ┌──────────────────────────────────────────────┐
        │  Base LLM on MCQA                             │
        │  reorder options -> answer flips              │
        │  adversarial drop 3.4% .. 31.7%               │
        └───────────────────────┬──────────────────────┘
                                 │ diagnosis supports thesis
                                 │ (surface/position, not content)
                                 ▼
        ┌──────────────────────────────────────────────┐
        │  Set-LLM: SetPE + SetMask (provably invariant)│
        │  zero drop; single run beats majority vote    │
        │  BUT: order-blindness imposed by architecture,│
        │       not learned reasoning; needs fp32 eval  │
        └──────────────────────────────────────────────┘

  Documents bias also seen in:  #374 #372 #373 (positional/order/attribution bias)
  Reliability-imposed pattern shared with:  #389 (verifier)
```

---

## Relevance to "Thinking Machine That Doesn't Think"

### Central Contribution
Set-LLM's premise is a clean quantification of the thesis: reordering the *same* options flips answers by up to ~32pp, so MCQA "reasoning" is substantially positional artifact. A genuine reasoner would be invariant because it evaluates each option's content.

### The tension the paper leaves open
The cure is telling. Rather than the model learning to reason about content regardless of order, Set-LLM *removes the model's ability to perceive order at all*, and accuracy goes **up** - implying the positional signal was mostly bias, not information. Reliability is imposed as a hard architectural symmetry, in the same family as external majority-vote scaffolding (cf. #389). The machine becomes consistent not by thinking better but by being built unable to see the thing that was tripping it.

---

## Status
- [x] Read (full paper: main text + methods + results + related work; appendices skimmed)
- [x] Analyzed
- [x] Graph links identified
- [x] Interaction diagram created
- [x] Key numbers extracted
- [x] Cross-referenced with rebuttals
