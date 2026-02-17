# Paper Analysis: Language Models Represent Space and Time

## Metadata
- **arXiv ID**: 2310.02207
- **Title**: Language Models Represent Space and Time
- **Authors**: Wes Gurnee, Max Tegmark
- **Institution**: MIT
- **Date**: October 2023 (v3: March 2024)
- **Venue**: arXiv (ICLR 2024 submission)

---

## Core Claims

1. LLMs learn **linear representations of space and time** across multiple scales
2. These representations are **unified across entity types** (cities, landmarks, etc.)
3. They are **robust to prompting variations**
4. Individual **"space neurons" and "time neurons"** exist that encode coordinates
5. This suggests LLMs "possess basic ingredients of a world model"

---

## Methodology

### Datasets (6 total)
| Dataset | Count | Examples |
|---------|-------|----------|
| World Places | 39,585 | Los Angeles, Caspian Sea |
| USA Places | 29,997 | Fenway Park, Columbia University |
| NYC Places | 19,838 | Trump International Hotel |
| Historical Figures | 37,539 | Cleopatra, Carl Sagan |
| Art/Entertainment | 31,321 | Queen's Bohemian Rhapsody |
| Headlines | 28,389 | NYT headlines 2010-2020 |

### Models
- Llama-2 (7B, 13B, 70B)
- Pythia (160M to 6.9B)

### Probing Method
- Linear ridge regression on activations at last entity token
- Predict latitude/longitude or timestamp
- Compare linear vs MLP (nonlinear) probes

---

## Key Experimental Results

### Linear Probe Performance (R² at 60% layer depth, Llama-2-70B)

| Dataset | Linear | MLP (nonlinear) |
|---------|--------|-----------------|
| World | 0.911 | 0.926 |
| USA | 0.864 | 0.869 |
| NYC | 0.359 | 0.312 |
| Historical | 0.835 | 0.839 |
| Entertainment | 0.885 | 0.884 |
| Headlines | 0.746 | 0.739 |

**Key finding**: Nonlinear probes provide minimal improvement → representations are linear.

### Generalization Tests

**Block holdout** (hold out entire countries/decades):
| Dataset | Nominal Error | Held-out Error | Random |
|---------|---------------|----------------|--------|
| World | 0.071 | 0.164 | 0.5 |
| USA | 0.121 | 0.188 | 0.5 |
| Historical | 0.115 | 0.119 | 0.5 |

**Critical observation**: Performance degrades when holding out blocks, but remains better than random. Authors note probes get "relative position correct but not absolute position."

### Prompting Sensitivity
- Random distracting tokens **significantly degrade** performance
- Explicit prompts ("What is the latitude of X?") make **no difference**
- Capitalization degrades performance (interferes with tokenization)

### Space/Time Neurons
- Found individual neurons with high cosine similarity to probe direction
- These neurons correlate with true coordinates (Spearman ~0.6-0.8)
- Ablation experiments show these neurons matter for spatial/temporal tasks

---

## Authors' Own Limitations (Section 4.1)

> "High predictive performance on out-of-sample data indicates that the base model has temporal and spatial information linearly decodable in its representations, **although this does not imply that the model actually uses these representations**."

> "The probe itself could be learning some linear combination of simpler features which are actually used by the model."

> "If the model has... an almost orthogonal binary feature for is_in_country_X, then one could construct a high quality latitude probe by summing these orthogonal feature vectors for each country with coefficient equal to the latitude of that country... **However, in this case, the model does not actually represent space, only country membership**, and it is only the probe which learns the geometry."

> "This does not fully rule out the underlying binary features hypothesis, as there could be a hierarchy of such features that do not follow country or decade boundaries."

---

## Critical Analysis for Thesis

### Does This Challenge the Pattern Matching Thesis?

**The authors' claim**: LLMs have "basic ingredients of a world model"

**The critical reframing**: This paper shows LLMs encode **statistical correlations about space and time** — which is exactly what pattern matching predicts.

### Key Counter-Arguments

1. **Decodability ≠ Understanding**
   - The authors explicitly acknowledge: probing shows information is "linearly decodable" but "does not imply the model actually uses these representations"
   - A lookup table also "represents" space — that's not understanding

2. **Could Be Hierarchical Membership Features**
   - Authors admit: could be is_in_country_X, is_in_region_Y features
   - The probe learns the geometry, not the model
   - This is consistent with sophisticated pattern matching

3. **Generalization Degrades Significantly**
   - When holding out countries: error jumps from 0.071 → 0.164 (2.3×)
   - Gets relative position right, absolute position wrong
   - Suggests memorization of co-occurrence, not true spatial reasoning

4. **Random Tokens Break It**
   - Adding random distracting tokens severely degrades performance
   - A true world model shouldn't be fragile to irrelevant context
   - This suggests surface-level statistical associations

5. **NYC Performance is Poor**
   - R² = 0.359 for NYC (vs 0.911 for World)
   - Authors attribute to "relative obscurity of entities"
   - Translation: **performance tracks training frequency** (Embers finding!)

6. **What Would Actual Spatial Reasoning Look Like?**
   - Ability to infer: "X is between Y and Z" → predict X's location
   - Ability to reason: "If I go 100km north from Paris..."
   - This paper shows neither — only factual recall

### The Embers Connection

This paper is **consistent with Embers of Autoregression**:
- Performance correlates with entity frequency (NYC worst, World best)
- Information is statistical (linear in activation space)
- No evidence of compositional spatial reasoning
- Fragile to distribution shifts (random tokens, capitalization)

---

## Relationship to Other Papers

### Supports (in our corpus)
- **Embers of Autoregression** (202): Frequency-dependent encoding
- **Othello-GPT** (Li et al. 2022): Similar probing methodology, similar limitations
- **Stochastic Parrots** (Bender & Koller 2020): Cited as alternative hypothesis

### Potentially Challenged By
- **Geometry of Truth** (2310.06824): Similar claims about linear representations
- **Representation Engineering** (2310.03714): Steering via representations

### Authors Cite
- Bender & Koller (2020): "massive collection of correlations" hypothesis
- Bisk et al. (2020): Grounding limitations
- Li et al. (2022): Othello world models

---

## REBUTTALS TO THIS PAPER

### Direct Methodological Concerns
1. **Probing fallacy**: Linear decodability doesn't prove the model uses the feature (Ravichander et al., 2020 — which authors cite!)
2. **Probe memorization**: 4096-8192 parameters allow substantial memorization
3. **Selection bias**: Entities filtered by Wikipedia page views (5000+ views) — biased toward frequent/famous

### From Embers Perspective
- The findings are **predicted by** the pattern matching view
- High-frequency entities → better representations
- No evidence of out-of-distribution generalization for novel spatial reasoning

### What's Missing
- No test of **compositional spatial reasoning** (e.g., "What's between X and Y?")
- No test of **novel inference** (predict location of entity not in training)
- No comparison to simple **co-occurrence baselines**

---

## Key Quotes

> "We find evidence for [world models] by analyzing the learned representations... We discover that LLMs learn linear representations of space and time across multiple scales."

> "High predictive performance on out-of-sample data indicates that the base model has temporal and spatial information linearly decodable in its representations, **although this does not imply that the model actually uses these representations**."

> "The probe itself could be learning some linear combination of simpler features which are actually used by the model."

> "We conjecture, **but do not show**, these basic primitives underlie a more comprehensive causal world model used for inference and prediction."

> "If the model has... an almost orthogonal binary feature for is_in_country_X, then one could construct a high quality latitude probe... However, **in this case, the model does not actually represent space, only country membership**."

---

## Verdict: Does This Challenge the Thesis?

**Classification**: BALANCED (leans toward supporting thesis when critically analyzed)

**Reasoning**:
1. The paper shows LLMs encode spatial/temporal information — **but this is predicted by pattern matching**
2. Authors explicitly acknowledge the probing fallacy
3. Generalization tests show significant degradation
4. Performance tracks entity frequency (Embers prediction)
5. No evidence of compositional/inferential spatial reasoning
6. The "world model" claim is explicitly a **conjecture they do not show**

**The paper demonstrates sophisticated statistical encoding, not spatial understanding.**

---

## Implications for Thesis

This paper is actually **compatible with** the pattern matching thesis:

| Their Finding | Pattern Matching Interpretation |
|---------------|--------------------------------|
| Linear space/time representations | Statistical correlations are linear |
| Performance scales with model size | More parameters = more correlations |
| NYC worse than World | Frequency drives accuracy |
| Generalization degrades | Memorization, not abstraction |
| Random tokens break it | Surface-level associations |

**Key insight**: The authors are careful scientists — they repeatedly note the limitations of probing. The "world model" framing is speculative, while the actual findings are consistent with sophisticated pattern matching.

---

## Status

- [x] Read complete
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
