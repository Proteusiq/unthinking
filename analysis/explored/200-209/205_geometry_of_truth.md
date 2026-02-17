# Paper Analysis: The Geometry of Truth

## Metadata
- **arXiv ID**: 2310.06824
- **Title**: The Geometry of Truth: Emergent Linear Structure in Large Language Model Representations of True/False Datasets
- **Authors**: Samuel Marks, Max Tegmark
- **Institution**: Northeastern University, MIT
- **Date**: October 2023 (v3: August 2024)
- **Venue**: Conference on Language Modeling 2024

---

## Core Claims

1. LLMs **linearly represent truth** — there exists a "truth direction" in activation space
2. This representation is **unified across structurally and topically diverse statements**
3. Linear structure **emerges with scale** — larger models have more abstract truth representations
4. **Causal interventions** can flip model outputs by adding/subtracting the truth direction
5. Simple **difference-in-mean probes** generalize as well as other techniques

---

## Methodology

### Datasets (12 total)
| Dataset | Description | Size |
|---------|-------------|------|
| cities | "The city of [X] is in [Y]" | 1,496 |
| neg_cities | Negations with "not" | 1,496 |
| sp_en_trans | Spanish-English translations | 354 |
| larger_than | "X is larger than Y" | 1,980 |
| smaller_than | "X is smaller than Y" | 1,980 |
| cities_cities_conj | Conjunctions with "and" | 1,500 |
| companies_true_false | Company claims (Azaria & Mitchell) | 1,200 |
| counterfact_true_false | Factual recall (Meng et al.) | 31,960 |
| **likely** | Nonfactual text (likely vs unlikely) | 10,000 |

### Key Design Choice: The "likely" Dataset
To distinguish truth from probability, they created a dataset where:
- Text is nonfactual
- Varies only in whether final token is likely or unlikely
- Critical: neg_cities has **r = -0.63** correlation between truth and probability
- sp_en_trans has **r = -0.89** (true statements are LESS probable)

### Models
- LLaMA-2 (7B, 13B, 70B)

### Methods
1. **Visualization**: PCA on activations
2. **Probing**: Logistic regression (LR), Mass-mean (MM), Contrast-consistent search (CCS)
3. **Causal intervention**: Add/subtract truth direction, measure P(TRUE) - P(FALSE)

---

## Key Experimental Results

### Probe Transfer Accuracy (LLaMA-2-70B)
Training on cities+neg_cities, testing on different datasets:

| Test Set | LR Accuracy | MM Accuracy |
|----------|-------------|-------------|
| sp_en_trans | 95%+ | 95%+ |
| larger_than | ~90% | ~90% |
| counterfact | ~85% | ~85% |

### Causal Intervention Results (Normalized Indirect Effect)
| Probe | NIE (false→true) | NIE (true→false) |
|-------|------------------|------------------|
| Mass-mean (cities) | 0.68 | 0.73 |
| Logistic regression | 0.45 | 0.52 |
| likely baseline | 0.55 | 0.62 |

**Key finding**: Mass-mean probes are more causally implicated than LR probes.

### Scale Effects
- LLaMA-2-7B: Surface-level clustering (e.g., by token "eighty")
- LLaMA-2-13B: Antipodal separation for larger_than/smaller_than
- LLaMA-2-70B: Unified truth direction across diverse datasets

---

## Authors' Own Limitations (Section 7.1)

> "We focus on simple, uncontroversial statements, and therefore **cannot disambiguate truth from closely related features**, such as 'commonly believed' or 'verifiable'."

> "We study only models in the LLaMA-2 family, so it is possible that some of our results do not apply for all LLMs."

> "Why were interventions with mass-mean probe directions extracted from the **likely dataset so effective**, despite these probes not themselves being accurate at classifying true/false statements?"

From Appendix A:
> "We make **no attempt to disambiguate 'true statements' from closely-related notions** like: uncontroversial statements, statements which are widely believed, statements which educated people believe."

---

## Critical Analysis for Thesis

### Does This Challenge the Pattern Matching Thesis?

**The authors' claim**: LLMs linearly represent "truth"

**The critical reframing**: What they found may be a **"commonly stated" direction**, not a truth direction.

### Key Counter-Arguments

1. **Truth vs. Commonly Believed**
   - Authors explicitly acknowledge they cannot distinguish these
   - All "true" statements in their datasets are also commonly believed
   - No test of controversial truths or uncommon truths

2. **The "likely" Baseline Problem**
   - Probes trained on likely (non-factual) data still work for causal intervention (NIE = 0.55-0.62)
   - This is "surprisingly good" per authors
   - Suggests the direction may encode probability/familiarity, not truth per se

3. **Correlation ≠ Truth Representation**
   - neg_cities: truth correlates at r = -0.63 with probability
   - But the "truth direction" still works — because it's encoding something else?
   - Alternative: encoding "matches training patterns" vs "violates patterns"

4. **Simple Statements Only**
   - All statements are "simple, uncontroversial, and unambiguous"
   - No test of:
     - Controversial truths (e.g., politically divisive facts)
     - Counterintuitive truths (e.g., "heavy objects fall at same rate")
     - Novel truths (not in training data)

5. **Same Authors as Space & Time Paper**
   - Max Tegmark is on both papers
   - Same methodology: linear probing
   - Same limitations: probing ≠ model using the representation

6. **What Would Genuine Truth Representation Look Like?**
   - Should work for novel facts (not in training)
   - Should distinguish truth from commonly believed
   - Should not be confusable with probability directions
   - This paper tests none of these

### The Embers Connection

This paper is potentially **confounded by Embers findings**:
- High-frequency patterns (commonly stated) → strong representations
- "True" facts are usually commonly stated → confounded
- The "likely" baseline working suggests probability-related encoding

---

## Relationship to Other Papers

### Same Research Group
- **Space and Time (2310.02207)**: Max Tegmark, same methodology
- Both use linear probing on LLaMA-2
- Both claim emergent representations
- Both have similar caveats about probing limitations

### Potentially Challenges
- **Stochastic Parrots** (Bender & Koller 2020): Cited as alternative hypothesis
- **CCS** (Burns et al. 2023): Authors note CCS has generalization issues

### Related Work They Cite
- **Levinstein & Herrmann (2023)**: "Still no lie detector for language models" — probes fail to generalize to negations
- **Azaria & Mitchell (2023)**: Early truth probing work with known failures

---

## REBUTTALS TO THIS PAPER

### The "Truth vs. Familiarity" Problem
1. All true statements tested are also commonly stated
2. "likely" dataset probes work for causal intervention
3. Cannot rule out that they're finding a "familiarity" direction

### The Probing Fallacy (Again)
- Same issue as Space & Time paper
- Linear decodability ≠ model using this representation
- The direction that *probes* find may not be what the *model* uses

### Missing Critical Tests
1. **Controversial truths**: Would the truth direction work for "vaccines are safe"?
2. **Counterintuitive truths**: Would it work for facts people get wrong?
3. **Novel truths**: Would it work for facts added after training cutoff?
4. **Lies that sound true**: Can the direction distinguish?

### The Negation Alignment Puzzle
- cities and neg_cities have **orthogonal** truth directions in middle layers
- Only align in late layers
- This suggests the "truth" direction may be layer-dependent and task-specific

---

## Key Quotes

> "We find evidence that at sufficient scale, LLMs linearly represent the truth or falsehood of factual statements."

> "We focus on simple, uncontroversial statements, and therefore **cannot disambiguate truth from closely related features**, such as 'commonly believed' or 'verifiable'."

> "We make **no attempt to disambiguate 'true statements' from closely-related notions** like: uncontroversial statements, statements which are widely believed."

> "Why were interventions with mass-mean probe directions extracted from the **likely dataset so effective**, despite these probes not themselves being accurate at classifying true/false statements?"

> "In early layers, the model computed and linearly represented some feature (like 'close association') which correlates with truth... In later layers, the model computed and promoted to greater salience a more abstract concept."

---

## Verdict: Does This Challenge the Thesis?

**Classification**: BALANCED (similar to Space & Time)

**Reasoning**:
1. The paper shows LLMs encode something correlated with truth
2. But authors explicitly cannot distinguish truth from "commonly believed"
3. The "likely" baseline working is suspicious
4. No test of the hard cases (controversial, counterintuitive, novel)
5. Same probing limitations as other mechanistic papers

**What this paper actually shows**: LLMs have a linear direction that correlates with whether simple, uncontroversial factual statements are true — but this could be a "familiarity" or "matches training patterns" direction rather than genuine truth representation.

---

## Implications for Thesis

This paper is **compatible with** the pattern matching thesis:

| Their Finding | Pattern Matching Interpretation |
|---------------|--------------------------------|
| Linear truth direction | "Matches training distribution" direction |
| Larger models = better | More patterns = more sophisticated matching |
| "likely" baseline works | It's really about probability/familiarity |
| Negations orthogonal early | Different surface patterns |
| Causal interventions work | Steering toward common patterns |

**Key insight**: If the "truth direction" is really a "commonly stated direction," then interventions work because you're pushing the model toward outputs that match common training patterns — exactly what pattern matching predicts.

---

## Status

- [x] Read complete
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
