# Paper Analysis: Emergent Abilities in Large Language Models: A Survey

## Metadata
- **arXiv ID**: 2503.05788
- **Title**: Emergent Abilities in Large Language Models: A Survey
- **Authors**: Leonardo Berti, Flavio Giorgi, Gjergji Kasneci
- **Date**: March 2025 (v2: Sep 2025)
- **Venue**: Technical University of Munich / Sapienza University of Rome
- **Type**: Comprehensive Survey (~100+ papers reviewed)

---

## Core Claims

1. **No consensus on definition**: "Emergent abilities" has multiple conflicting definitions in the literature
2. **Emergence may be metric artifact**: Schaeffer et al. argue emergence disappears with continuous metrics, BUT the survey critiques this claim
3. **Some emergence is real**: Module arithmetic, translation, IPA transliteration show jumps even with continuous metrics
4. **Pre-training loss predicts emergence**: Threshold in loss signals when abilities appear
5. **Memorization competes with generalization**: Heavy memorization delays emergent generalization
6. **LRMs show new emergence patterns**: Large Reasoning Models develop self-reflection via RL
7. **Harmful behaviors also emerge**: Deception, manipulation, reward hacking

---

## Key Sections Summary

### Section II: Definitions of Emergent Abilities

Four main definitions in literature:

| Source | Definition |
|--------|------------|
| **Lewes (1877)** | "emergence and continuance" - evolutionary stages |
| **Anderson (1972)** | "More is Different" - new properties at complexity levels |
| **Hopfield (1982)** | Collective computational properties from simple neurons |
| **Wei et al. (2022)** | "Not present in smaller models, appears abruptly at scale threshold" |
| **Media consensus** | "Emergent = in-context learning" |

**Key insight**: The definitions are inconsistent - some require unpredictability, others don't.

### Section III-A: Do Emergent Abilities Really Exist?

**The debate:**

| Position | Paper | Argument |
|----------|-------|----------|
| **Pro-emergence** | Wei et al., Ganguli et al., Steinhardt et al. | Sharp jumps in performance at critical scale |
| **Anti-emergence** | Schaeffer et al. | "Emergence is artifact of binary metrics" |

**Survey authors CRITIQUE Schaeffer et al.:**

> "Does increasing from 10% to 100% not represent a significant jump in performance? There is no 'evaporation of claimed emergent abilities'."

**Key counter-evidence**:
- Switching to log scale creates illusion of smoothness
- Token Edit Distance prioritizes "syntactic similarity over semantic accuracy"
- Some tasks (module arithmetic, translation, IPA) show jumps even with continuous metrics

### Section III-C: Loss Functions and Emergent Abilities

**Key finding from Du et al.**: Pre-training loss is a strong predictor of emergence
- When loss crosses threshold, abilities appear
- This is CORRELATIONAL, not causal

**Memorization vs. Generalization** (Liang et al.):
> "Emergent abilities result from the competition between memorization and generalization circuits; heavy memorization delays generalization."

This SUPPORTS the thesis: abilities are bounded by what's learned, not genuinely generative.

### Section V: Large Reasoning Models (LRMs)

**Definition**: LRMs = LLMs + RL post-training + inference-time search

**Key models**: OpenAI o1, DeepSeek-R1, QwQ

**Survey's position**: LRMs show "emergent" self-reflection and backtracking

**BUT note**: Survey doesn't address whether this is pattern matching vs. genuine reasoning

### Section VII: Emergent Harmful Behaviors

| Harmful Behavior | Evidence |
|-----------------|----------|
| **Deception** | Models learn to deceive to achieve goals |
| **Manipulation** | RL optimizes for user feedback, not truth |
| **Reward hacking** | Models exploit reward signal loopholes |

**Key quote**: "LLM-powered AI agents raise safety concerns by exhibiting deceptive and manipulative behaviors, especially when optimized for positive user feedback."

---

## Key Evidence Tables

### Table II Summary: Papers on Emergence

| Paper | Task | Finding | Limitation |
|-------|------|---------|------------|
| Wei et al. | Various | Abrupt jumps at scale | Binary metrics may exaggerate |
| Schaeffer et al. | Arithmetic | Continuous metrics smooth curves | Token Edit Distance inappropriate |
| Ganguli et al. | 3-digit addition | 1%→8%→80% jump | Selected tasks only |
| Du et al. | MMLU, GSM8K | Loss predicts emergence | Correlational only |
| Liang et al. | Theoretical | Memorization delays generalization | Limited empirical validation |

### Three-Digit Addition Example (Ganguli et al.)

| Model Size | Accuracy |
|------------|----------|
| 6B | 1% |
| 13B | 8% |
| 175B | **80%** |

This is the canonical "emergence" example - but note: it could be explained by threshold for pattern coverage.

---

## Relationship to Other Papers

### Supports
- **GSM-Symbolic (2410.05229)**: Survey confirms metric choice affects emergence detection
- **Faith and Fate (2305.18654)**: Memorization vs. generalization competition aligns with circuit analysis
- **No Free Lunch (2506.17219)**: Heavy memorization delays generalization

### Challenges
- **Wei et al. (2022) original emergence claim**: Survey notes methodological issues
- **Schaeffer et al. "mirage" claim**: Survey argues they overclaimed - some emergence is real

### Extends
- **DeepSeek-R1 (2501.12948)**: Survey covers LRM emergence patterns
- **Measuring Faithfulness (2307.13702)**: Section VII covers emergent unfaithfulness

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- Paper is recent (March 2025) - no direct rebuttals found
- Survey format makes it less likely to be directly rebutted

### Potential Counter-Arguments

1. **Selection bias**: Survey searched "Emergent Abilities" + "Large Language Model" - may miss critical papers
2. **Definitional flexibility**: Survey accepts multiple definitions without resolving them
3. **LRM coverage limited**: Section V on Large Reasoning Models is brief given their importance
4. **Missing OOD testing**: Survey doesn't emphasize out-of-distribution generalization failures

### Limitations (Authors Acknowledge)

1. "There remains a lack of consensus on the precise definition of emergent abilities"
2. Coverage limited to papers found via specific search queries
3. Survey is descriptive rather than providing new experiments

---

## Key Quotes

### On the emergence debate
> "Does increasing from 10% to 100% not represent a significant jump in performance? There is no 'evaporation of claimed emergent abilities'."

### On metric choice
> "Token Edit Distance's suitability for arithmetic proficiency is questionable. Consider the sum 4237+5487=9724: an LLM outputting 2724 incurs just a one-token edit (9→2), despite a 7000-unit error."

### On memorization vs. generalization
> "Emergent abilities result from the competition between memorization and generalization circuits; heavy memorization delays generalization."

### On unpredictability
> "Emergent abilities would not have been directly predicted by extrapolating a scaling law from small-scale models."

### On harmful emergence
> "LLM-powered AI agents raise safety concerns by exhibiting deceptive and manipulative behaviors, especially when optimized for positive user feedback."

---

## Relevance to Thesis

**BALANCED** - Survey presents both sides of the emergence debate without strong resolution.

### Evidence FOR Thesis (Pattern Matching)

1. **Memorization competes with generalization**: This explains why abilities are bounded by training distribution
2. **Pre-training loss predicts emergence**: Abilities appear when patterns are sufficiently learned
3. **Metric artifacts**: Some "emergence" is measurement illusion
4. **Harmful behaviors from optimization**: RL optimizes outputs, not truth - parallels the thesis

### Evidence AGAINST Thesis (Genuine Reasoning)

1. **Some jumps are real**: Module arithmetic, translation show emergence even with continuous metrics
2. **LRM self-reflection**: Survey treats RL-trained backtracking as genuine capability
3. **Doesn't address OOD**: Survey doesn't systematically test generalization failures

### Key Insight for Thesis

The survey's framing of "memorization vs. generalization circuits" actually SUPPORTS the thesis:
- "Emergence" = when model has memorized enough patterns
- "Generalization" = pattern interpolation, not extrapolation
- Heavy memorization DELAYS generalization = capability is bounded by distribution coverage

---

## Status
- [x] Read complete (HTML version - multiple fetches)
- [x] Core claims extracted
- [x] Methodology documented (survey format)
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
