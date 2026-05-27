# Paper Analysis: Negation Neglect: When models fail to learn negations in training

## Metadata
- **arXiv ID**: 2605.13829
- **Title**: Negation Neglect: When models fail to learn negations in training
- **Authors**: Harry Mayne, Lev McKinney, Jan Dubiński, Adam Karvonen, James Chua, Owain Evans
- **Date**: May 2026
- **Venue**: Preprint (Code: github.com/TruthfulAI-research/negation_neglect)
- **Affiliations**: Oxford, Toronto, Warsaw, Truthful AI, Anthropic, UC Berkeley

---

## Core Claims

1. **Negation Neglect**: Finetuning LLMs on documents that flag a claim as false causes models to believe the claim is true, at rates comparable to finetuning on documents that present the claim as true
2. The effect persists even when negations are extensive (every sentence surrounded by disclaimers), but is mitigated when negations are phrased locally within each sentence (e.g., "Ed Sheeran did not win")
3. The effect generalizes beyond negation to other epistemic qualifiers (fiction, low probability, unreliable source) and extends to model behaviors (misalignment from negated harmful examples)
4. The phenomenon reflects an inductive bias in SGD toward representing claims as true — solutions where the model correctly denies claims can be found but are unstable

---

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY FINDING: LLMs absorb the CONTENT of negated claims while      │
│  discarding the NEGATION. Finetuning on "this is false: X" is      │
│  nearly identical to finetuning on "X" — 88.6% vs 92.4% belief.   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Methodology

**Synthetic Document Finetuning (SDF) pipeline:**
- 6 fabricated claims of varying plausibility (Ed Sheeran 100m gold, Queen Elizabeth Python textbook, Mount Vesuvius 2015 eruption, X rebrand reversal, colorless dreams, Brennan Holloway dentist)
- Multi-stage document generation: Claude Opus 4.6 → Claude Sonnet 4.6 → Kimi K2.5 → GPT-5 mini filtering → 10,000 documents per claim
- Documents annotated with negations using GPT-5.4 mini

**Negation levels:**
- *Negated*: multi-sentence prefix + suffix (~12% of tokens)
- *Repeated negations*: disclaimers before/after every claim-referencing sentence (~40% of tokens)
- *Corrected*: explicit corrections with true facts before/after every claim-referencing sentence
- *Local negation*: claim negated within the sentence itself ("did not win")

**Models tested:** Qwen3.5-397B-A17B (primary), Qwen3.5-35B-A3B, Kimi K2.5, GPT-4.1, Qwen3-30B-A3B (behaviors)

**Training:** LoRA rank 32, 1 epoch, batch 32, lr 5e-5, 10k SDF + 5k Dolma 3 pretraining + 5k Tulu 3 instruction-following

**Evaluation:** 50 questions per claim × 4 types (open-ended, multiple-choice, token association, robustness) × 5 samples. GPT-5 mini as judge.

---

## Key Evidence
| Finding | Number | Context |
|---------|--------|---------|
| Baseline belief (pre-finetuning) | 2.5% | Qwen3.5-397B-A17B across 6 claims |
| Belief after positive documents | 92.4% | Documents presenting claim as true |
| Belief after negated documents | 88.6% | Documents with prefix/suffix negations |
| Belief after repeated negations | 84.4% | Every sentence surrounded by disclaimers |
| In-context negation belief | 15.3% | Same docs given in context (not finetuning) |
| Corrected documents belief | 39.9% | Explicit corrections with true facts |
| Local negation belief (Ed Sheeran) | 0% | "Ed Sheeran did not win" phrasing |
| Local negation belief (Dentist) | 7% | Pink Elephant Paradox effect |
| Epistemic qualifiers belief | >97% | Fiction, unreliable source, low probability |
| Negated behaviors misalignment (targeted) | 19.9% | vs 34.4% non-negated, Qwen3-30B-A3B |
| Negated behaviors misalignment (emergent) | 4.4% | vs 6.0% non-negated |
| Negated behaviors misalignment (safety) | 2.5% | vs 12.8% non-negated |
| Phase 1 belief (with soft constraint) | 6% | Mount Vesuvius, Qwen3.5-35B-A3B |
| Phase 1 loss vs unconstrained | 1.12 vs 1.12 | Equivalent loss, opposite belief |
| Phase 2 belief (constraint removed) | 48% | Solution is unstable |
| Base model repeated negations belief | 25-35% | Qwen3-30B-A3B-Base (continued pretraining) |

---

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHAT WE EXPECTED              vs    WHAT WE FOUND                  │
├─────────────────────────────────────────────────────────────────────┤
│  More negations →                    More negations have almost     │
│  lower belief                        no effect (88.6% → 84.4%)     │
│                                                                     │
│  Corrections fix it                  Corrections only partially     │
│                                      work (39.9% belief remains)   │
│                                                                     │
│  In-context = finetuning             15.3% vs 88.6% — massive gap  │
│                                      between generalization modes   │
│                                                                     │
│  Local negation works                Yes: 0-7% belief. Cross-      │
│                                      sentence reasoning is where   │
│                                      models fail in training        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Relationship to Thesis

**Stance: SUPPORTS**

This paper provides strong evidence that LLMs process training data through pattern matching rather than understanding. The central finding — that models absorb factual content while discarding surrounding negation — reveals a fundamental limitation in how information is encoded during finetuning:

1. **Content extraction, not comprehension**: Models extract the core claims from documents (pattern matching the factual content) while failing to integrate the epistemic context (negation). This is precisely what a pattern-matching system would do — extract the high-frequency signal (the claim) while treating the qualifier as noise.

2. **In-context vs finetuning gap**: Models correctly process negations at inference time (15.3% belief) but fail during training (88.6%). This demonstrates that the training process (SGD) has different limitations than the inference process — consistent with the thesis that training implants patterns rather than understanding.

3. **Inductive bias toward content**: The two-phase experiment showing that correct solutions are unstable (6% → 48% when constraint removed) reveals a structural bias in SGD toward representing claims as true, suggesting the optimizer preferentially stores content patterns regardless of their epistemic status.

4. **Safety implications confirm superficiality**: Training on misaligned behaviors explicitly labeled as "do not do this" still produces misalignment at 19.9% — consistent with the thesis that alignment is superficial and can be undermined by training data content.

---

## Relationship to Other Papers

### Supports
- **#150 Reversal Curse (2309.12288)**: Both demonstrate fundamental failures in how LLMs encode relational/contextual information during training. Negation Neglect is a form of "directional" failure — models learn A but not "not A" just as they learn "A is B" but not "B is A"
- **#328 Emergent Misalignment (2502.17424)**: Direct extension — narrow finetuning produces broad behavioral changes. Negation Neglect explains the mechanism: models absorb content patterns regardless of framing
- **#277 Alignment Faking (2412.14093)**: Negation Neglect has implications for alignment training: if models don't internalize "don't do X" during training, alignment via synthetic documents is fragile
- **#209 Superficial Alignment (2410.03717)**: Supports the claim that alignment is shallow — models don't deeply internalize the epistemic status of training content
- **#202 Embers of Autoregression (2309.13638)**: Negation Neglect as an "ember" — the autoregressive training objective biases toward encoding content, not its truth value

### Challenges
- None directly — this paper is purely "supports" for the thesis

### Extends
- **Slocum et al. (2025)**: Extends their prefix-only disclaimer finding with much more extensive negations, corrections, local negation, alternative qualifiers, and behavioral extension
- **Wang et al. (2025)**: Extends synthetic document finetuning methodology with negation variants

---

## REBUTTALS

### Known Rebuttals
- No direct rebuttals identified (paper published May 2026)

### Limitations (Authors Acknowledge)
1. **SDF setting only**: No pretraining experiments, though three ablations (10x more pretraining data, larger LoRA ranks, base model continued pretraining) suggest generalization
2. **Synthetic documents only**: Naturally occurring documents not tested
3. **Explanation is partial**: Origin of the inductive bias toward true-representation not investigated
4. **Local negation as mitigation**: The existence of local negation as a workaround somewhat limits the universality of the finding

### Independent Assessment
- The 88.6% vs 92.4% comparison is striking — negation barely moves the needle
- The in-context vs finetuning gap (15.3% vs 88.6%) is the strongest evidence for a fundamental training limitation
- The two-phase stability experiment is elegant and convincing
- The extension to model behaviors (19.9% misalignment from explicitly negated examples) has significant safety implications
- Worth noting: "Humans do not appear to exhibit Negation Neglect" (citing Ye et al. 2026) — a clear human-LLM divergence

---

## Key Quotes

> "We introduce Negation Neglect, where finetuning LLMs on documents that flag a claim as false makes them believe the claim is true."

> "In experiments with Qwen3.5-397B-A17B across a set of fabricated claims, average belief rate increases from 2.5% to 88.6% when finetuning on negated documents, compared to 92.4% on documents without negations."

> "Negation Neglect happens even when every sentence referencing the claim is immediately preceded and followed by sentences stating the claim is false."

> "Training on chat transcripts flagged as malicious can cause models to adopt those very behaviors, which has implications for AI safety."

> "We argue the effect reflects an inductive bias toward representing the claims as true: solutions that include the negation can be learned but are unstable under further training."

> "Humans do not appear to exhibit Negation Neglect." (Section 6, Related Work)

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
