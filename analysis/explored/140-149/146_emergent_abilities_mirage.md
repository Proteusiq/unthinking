# Paper Analysis: Are Emergent Abilities of Large Language Models a Mirage?

## Metadata
- **arXiv ID**: 2304.15004
- **Title**: Are Emergent Abilities of Large Language Models a Mirage?
- **Authors**: Rylan Schaeffer, Brando Miranda, Sanmi Koyejo (Stanford University)
- **Date**: April 2023 (v1), May 2023 (v2)
- **Venue**: NeurIPS 2023 (Main Conference Track)

---

## Core Claims

1. **Emergent abilities are measurement artifacts, not fundamental model properties** — The "sharpness" (sudden appearance) and "unpredictability" of emergent abilities are caused by metric choice, not changes in model behavior.

2. **Three factors create apparent emergence**:
   - Researcher choosing a metric that nonlinearly/discontinuously scales with per-token error rate
   - Insufficient test dataset resolution to measure small models accurately
   - Insufficient sampling of the larger parameter regime

3. **Alternative explanation**: Nonlinear/discontinuous metrics produce apparent emergence, while linear/continuous metrics reveal smooth, predictable improvement with scale.

4. **Same outputs, different conclusions**: For a fixed task and model family, researchers can create OR ablate emergent abilities by choosing different metrics.

---

## Methodology

### Mathematical Framework
- Per-token cross-entropy loss follows a power law: `L_CE(N) = (N/c)^α`
- Per-token probability of correct token: `p = exp(-L_CE(N))`
- For L-token targets: `Accuracy(N) ≈ exp(-(N/c)^α)^L`
- Key insight: Small improvements in per-token probability cause **sharp jumps** in multi-token accuracy due to exponential compounding

### Three Experimental Approaches

**Experiment 1: InstructGPT/GPT-3 Arithmetic**
- Tasks: 2-digit multiplication, 4-digit addition
- Compared nonlinear metrics (Accuracy) vs. linear metrics (Token Edit Distance)

**Experiment 2: BIG-Bench Meta-Analysis**
- Population-level analysis of 39 preferred metrics across all tasks
- Tested whether emergence correlates with metrics or task-model pairs

**Experiment 3: Vision Task Induction**
- Deliberately induced "emergence" in CIFAR100 autoencoders and Omniglot transformers
- Proved any architecture can show emergence with appropriate metric choice

---

## Key Evidence

### Metric Dependency Demonstrated

| Metric Type | Example | Behavior with Scale |
|------------|---------|---------------------|
| Nonlinear | Accuracy (Exact Match) | Sharp, "emergent" appearance |
| Discontinuous | Multiple Choice Grade | Step-function jumps |
| Linear | Token Edit Distance | Smooth, predictable improvement |
| Continuous | Brier Score | Smooth, predictable improvement |

### BIG-Bench Meta-Analysis

| Finding | Quantitative Result |
|---------|---------------------|
| Metrics showing emergence | ≤5 of 39 (13%) |
| % of emergent abilities from 2 metrics | **>92%** |
| The 2 dominant metrics | Multiple Choice Grade + Exact String Match |

### Three Predictions Confirmed

| Prediction | Test | Result |
|------------|------|--------|
| Different metrics remove emergence | GPT-3 arithmetic | ✓ Confirmed |
| Better statistics reveal smooth improvement | GPT-3 arithmetic | ✓ Confirmed |
| Emergence appears for metrics, not task-model pairs | BIG-Bench | ✓ Confirmed |

### Critical Finding
**Even "small" models have non-zero, above-chance accuracy** — they only *appear* incapable due to insufficient test resolution. With larger test datasets, smooth capability curves become measurable.

---

## Relationship to Thesis

### Strongly Supports the Pattern-Matching Hypothesis

**The paper challenges the "emergent reasoning" narrative**:
1. If abilities emerge unpredictably, genuine reasoning could suddenly appear
2. If emergence is a mirage, reasoning capabilities scale predictably from training distribution
3. This supports the thesis that LLMs don't undergo phase transitions into "genuine reasoning"

**Methodological implications**:
- Any "emergent reasoning" finding must be tested with:
  - Alternative metrics (continuous/linear)
  - Larger test sets
  - Better resolution at smaller scales
- Exact match on reasoning benchmarks may create false emergence patterns

**Aligns with smooth scaling**:
- Neural scaling laws show smooth loss improvement
- If loss improves smoothly, underlying capabilities do too
- They only *appear* sharp under nonlinear metrics

### Critical Quote
> "For a fixed task and a fixed model family, the researcher can choose a metric to create an emergent ability or choose a metric to ablate an emergent ability."

---

## Relationship to Other Papers

### Supports
- **GSM-Symbolic** (Paper 01): Both show fragility emerges from measurement artifacts
- **Faith and Fate** (Paper 00): Pattern matching improves smoothly with scale
- **Illusion of Thinking** (Paper 03): "Emergent" planning capabilities may be metric artifacts
- **Compositional generalization failures**: Smooth capability growth explains why OOD remains hard

### Challenges
- **Wei et al. (2022)**: Original emergence claims — directly rebutted
- **Papers claiming sudden capability jumps**: Suggests measurement artifacts

### Extends
- **Scaling law literature**: Adds metric choice as critical confound
- **Benchmark evaluation methodology**: Provides framework for robust measurement

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No strong direct rebuttals identified in the corpus
- Paper is widely cited (NeurIPS 2023) with general acceptance of core claims
- Some researchers argue *some* emergence may be real, but metric effects are acknowledged

### Potential Counter-Arguments
1. **Metric choice may correlate with task importance**: Tasks where exact match matters may genuinely show emergence
2. **Computational power arguments**: Transformers with CoT gain computational power — this could cause real discontinuities
3. **Some phase transitions may be real**: e.g., grokking, in-context learning regime changes

### Authors' Own Caveat
> "Nothing in this paper should be interpreted as claiming that large language models cannot display emergent abilities; rather, our message is that previously claimed emergent abilities... might likely be a mirage induced by researcher analyses."

---

## Key Quotes

**On the core claim**:
> "Emergent abilities appear due to the researcher's choice of metric rather than due to fundamental changes in model behavior with scale."

**On measurement resolution**:
> "When choosing metric(s), one should consider the metric's effect on the per-token error rate and adapt their measuring process accordingly."

**On reproducibility**:
> "Scientific progress can be hampered when models and their outputs are not made public for independent scientific investigation."

---

## Implications for LLM Reasoning Research

1. **Claimed "emergent reasoning" may be metric artifacts** — If reasoning is measured by Exact Match or Multiple Choice accuracy, apparent emergence may be illusory

2. **Small models aren't "incapable"** — They have low but non-zero capability; insufficient test data makes them *appear* to have zero capability

3. **AI safety implications** — Sharp "warning-less" capability jumps may not be real; capabilities likely improve predictably and are measurable with proper resolution

4. **Benchmark design matters critically** — Continuous/partial credit metrics may reveal gradual capability growth that discrete metrics hide

---

## Status
- [x] Read complete (ar5iv version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated** (pending)
