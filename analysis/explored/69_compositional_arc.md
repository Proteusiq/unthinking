# Paper Analysis: Compositional-ARC: Assessing Systematic Generalization in Abstract Spatial Reasoning

## Metadata
- **arXiv ID**: 2504.01445
- **Title**: Compositional-ARC: Assessing Systematic Generalization in Abstract Spatial Reasoning
- **Authors**: Philipp Mondorf, Shijia Zhou, Monica Riedler, Barbara Plank (MaiNLP, LMU Munich, MCML)
- **Date**: April 2025 (v2: September 2025)
- **Venue**: arXiv preprint

---

## Core Claims

1. **LLMs fail at systematic generalization in spatial reasoning**: State-of-the-art LLMs (o3-mini, GPT-4o, Gemini 2.0 Flash) fail to generalize from primitive transformations to novel compositions
2. **Meta-learning for compositionality (MLC) enables systematicity**: A small 5.7M parameter model trained via MLC outperforms 8B+ parameter LLMs
3. **Test-time training (TTT) is the only way LLMs achieve compositional generalization**: Domain-specific LLMs go from ~0% to ~78% only with TTT
4. **Training approach matters more than scale**: 5.7M parameters with right training >> 8B parameters without

---

## Methodology

### Dataset: Compositional-ARC
- **Grid**: 10×10 two-dimensional arrays (0-9 representing colors)
- **Transformations**: 5 basic geometric operations:
  - Translation (right or down by 1 cell)
  - Rotation (90° clockwise/counterclockwise)
  - Reflection (horizontal/vertical)
  - Extension (grow toward neighbor)
  - Color change (to red or orange)

### Indicator System
- **Shape-based**: Transform objects of particular shape
- **Color-based**: Transform objects of particular color  
- **Neighbor-based**: Transform when indicator object present

### Composition Levels
- **Level 0 (Primitive)**: Single indicator → single transformation
- **Level 1**: Two indicators → composed transformation (e.g., shape+color)
- **Level 2**: Three indicators → full composition (shape+color+neighbor)

### Two Task Setups
1. **3-Shot**: Given 3 examples of the SAME level-2 composition, predict output
2. **Systematicity**: Given primitives + level-1 compositions, predict UNSEEN level-2 composition

---

## Key Evidence

### 1. LLMs Fail at Systematic Generalization — Dramatically

**Systematicity Task Results:**

| Model | Exact Match Accuracy |
|-------|---------------------|
| GPT-4o | **0.99%** |
| GPT-4o + image | 0.86% |
| Gemini 2.0 Flash | **2.66%** |
| Gemini 2.0 Flash + image | 2.05% |
| o3-mini (low) | **0.53%** |
| Llama-3.2-3B-ReARC | 0.87% |
| Mistral-NeMO-8B-Full | 0.70% |

**Critical finding**: o3-mini, the best on 3-shot (64.04%), performs WORST on systematicity (0.53%)!

> "Interestingly, o3-mini, the best-performing general-purpose model on the '3-Shot' task, performs worst in this setting, with an accuracy of only 0.53%."

### 2. Test-Time Training is Required for LLM Compositional Generalization

| Model | Without TTT | With TTT |
|-------|-------------|----------|
| Llama-3.2-3B-ReARC | 0.87% | **73.70%** |
| Mistral-NeMO-8B-Full | 0.70% | **78.20%** |

**~100x improvement from test-time training** — but this is literally training on the test set's study examples.

### 3. Small MLC Model Outperforms All LLMs

| Model | Parameters | Systematicity Accuracy |
|-------|------------|----------------------|
| MLC (theirs) | **5.7M** | **78.26%** |
| Mistral + TTT | 8B | 78.20% |
| o3-mini | >100B(?) | 0.53% |
| GPT-4o | >100B(?) | 0.99% |

> "Despite having only 5.7M parameters, this model significantly outperforms state-of-the-art LLMs—including o3-mini, GPT-4o, and Gemini 2.0 Flash, which fail to exhibit similar systematic behavior"

### 4. 3-Shot vs Systematicity Gap Shows Memorization

| Model | 3-Shot | Systematicity | Gap |
|-------|--------|---------------|-----|
| o3-mini | 64.04% | 0.53% | **-63.51pp** |
| GPT-4o | 22.28% | 0.99% | -21.29pp |
| MLC | 99.92% | 78.26% | -21.66pp |

When given the exact composition as examples (3-shot), models can pattern match. When required to COMPOSE from primitives, they fail catastrophically.

---

## Key Quotes

### On LLM failure
> "All general-purpose LLMs perform poorly on this task. For instance, GPT-4o achieves an accuracy of 0.99%, while Gemini 2.0 Flash reaches 2.66%."

### On o3-mini's surprising failure
> "Interestingly, o3-mini, the best-performing general-purpose model on the '3-Shot' task, performs worst in this setting, with an accuracy of only 0.53%."

### On what enables systematicity
> "By training the model to combine basic units... over a stream of dynamically changing grammars, Lake & Baroni (2023) show that this model can effectively generalize to previously unseen compositions"

### On scale vs. training
> "The strong performance of the small MLC model highlights the effectiveness of this training strategy in promoting systematic generalization to novel transformation compositions."

---

## Relationship to Other Papers

### Supports
- **Faith and Fate (2305.18654)**: Both show LLMs fail at compositional generalization
- **OMEGA (2506.18880)**: Same pattern — primitives succeed, compositions fail
- **Planning Gap (2601.14456)**: Similar ID/OOD gap (high on seen, zero on novel compositions)
- **GSM-Symbolic (2410.05229)**: LLMs fail on novel variations of known patterns

### Extends
- **Lake & Baroni (2023) MLC paper**: Extends from linguistic to spatial reasoning domain
- **ARC benchmark (Chollet 2019)**: Extends with compositional focus

### Provides Evidence For
- **Training approach matters more than scale**: 5.7M > 8B+ with right approach
- **TTT is NOT genuine generalization**: Requires training on test set examples
- **Pattern matching hypothesis**: 3-shot success + systematicity failure = memorization

### Challenges
- **Physics of LLMs 2.1 (2407.20311)**: They show some OOD generalization, but with engineered training data
- **Emergent Symbolic Mechanisms papers**: MLC shows mechanisms alone insufficient without right training

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- Paper is recent (April 2025) — no direct rebuttals found

### Potential Counter-Arguments

1. **MLC requires specially designed training data**: The meta-learning approach uses dynamically changing grammars — not how LLMs are trained
2. **Task is narrow**: Only 5 transformations on 10×10 grids
3. **TTT shows LLMs CAN learn**: The ~100x improvement with TTT shows capability exists, just needs elicitation

### Limitations (Authors Acknowledge)

> "Our work deliberately narrows the scope to the five fundamental geometric transformations... focusing instead on the aspect of systematicity"

---

## Relevance to Thesis

**STRONGLY SUPPORTS** — One of the cleanest demonstrations of compositional generalization failure.

### Key Insights for Synthesis

1. **The 3-shot vs. Systematicity gap is the smoking gun**:
   - 3-shot = pattern matching (see composition, reproduce composition)
   - Systematicity = genuine composition (combine primitives into novel whole)
   - LLMs succeed at former, fail catastrophically at latter

2. **o3-mini's failure is particularly damning**:
   - Best "reasoning" model on 3-shot
   - WORST on systematicity
   - Extended thinking doesn't help composition — may even hurt

3. **TTT is not genuine generalization**:
   - Requires training on test set study examples
   - This is literally fitting to the test distribution
   - Confirms LLMs need to SEE patterns to use them

4. **Scale doesn't solve systematicity**:
   - 5.7M parameters with MLC > 8B+ parameters with standard training
   - Training approach fundamentally matters
   - Supports thesis: LLMs are pattern matchers, not reasoners

5. **Connects to Physics of LLMs 2.1**:
   - Both show that WITH RIGHT TRAINING, systematicity is achievable
   - But standard LLM training doesn't provide this
   - Capabilities require distribution coverage (D=X from Theory paper)

### Direct Quote for Thesis

> "Despite having only 5.7M parameters, this model significantly outperforms state-of-the-art LLMs—including o3-mini, GPT-4o, and Gemini 2.0 Flash, **which fail to exhibit similar systematic behavior**"

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
