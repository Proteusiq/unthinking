# Paper Analysis: A Peek into Token Bias: Large Language Models Are Not Yet Genuine Reasoners

## Metadata
- **arXiv ID**: 2406.11050
- **Title**: A Peek into Token Bias: Large Language Models Are Not Yet Genuine Reasoners
- **Authors**: Bowen Jiang, Yangxinyu Xie, Zhuoqun Hao, Xiaomeng Wang, Tanwi Mallick, Weijie J. Su, Camillo J. Taylor, Dan Roth
- **Affiliation**: University of Pennsylvania, Argonne National Laboratory
- **Date**: June 2024
- **Venue**: EMNLP 2024

---

## Core Claims

1. **Token bias undermines genuine reasoning**: LLMs' performance on logical reasoning tasks is heavily influenced by superficial token patterns rather than understanding the underlying logic.

2. **Statistical hypothesis testing framework**: Introduces rigorous hypothesis testing to determine whether LLMs reason genuinely or rely on token bias.

3. **Six hypotheses systematically rejected**: All null hypotheses (assuming genuine reasoning) are rejected with statistical significance across multiple LLMs.

4. **Surface changes predict performance shifts**: Systematic changes to irrelevant tokens (names, quantifiers, narratives) while keeping logic intact allow predicting model failures.

---

## Methodology

### Framework Overview
1. **Synthetic Data Generation**: Create controlled datasets for conjunction fallacy and syllogistic fallacy problems
2. **Token Perturbation**: Systematically alter tokens while preserving logical structure
3. **Statistical Hypothesis Testing**: McNemar test for matched pairs to detect token bias

### Six Hypotheses Tested

| Hypothesis | What It Tests | Token Perturbation |
|------------|---------------|-------------------|
| H1: Misleading Options | Contextually misleading vs irrelevant options | Change conjunction event to irrelevant one |
| H2: Classic Exemplars | Linda→Bob in one-shot exemplar | Surface-level name change |
| H3: Celebrity Names | Celebrity→generic name | Remove contextual background |
| H4: Quantifiers | "All/Some"→synonyms | Rephrase "All roses"→"Roses" |
| H5: Narrative Framing | Add reputable sources (Bloomberg, MIT) | Add credibility tokens |
| H6: Hint Tokens | With/without explicit logical hints | Leak "conjunction fallacy" name |

### Models Tested
- GPT-4, GPT-4o, GPT-3.5-turbo
- Claude 3 (Opus, Sonnet, Haiku)
- Llama-3 (8B, 70B)
- Mistral (7B, 8x7B)
- Gemma (2B, 7B)

---

## Key Evidence

### Hypothesis 1: Lost in Irrelevant Context
When misleading conjunction option changed to irrelevant one:
- **n₁₂ > n₂₁** with statistical significance (p < 0.05)
- Models fail MORE on misleading context, proving token bias

### Hypothesis 2: Classic Exemplar Token Bias
Changing "Linda"→"Bob" in one-shot exemplar:
- **GPT-4**: Significant drop (p < 0.05)
- **Claude models**: Significant drop
- Proves overfitting to "Linda" token

### Hypothesis 3: Celebrity Name Bias
| Perturbation | Result |
|--------------|--------|
| Taylor Swift → Lauren | Significant performance change |
| "Twenty-five horses" → "Thirty-six bunnies" | Major accuracy drop |

### Hypothesis 4: Quantifier Token Bias
Rephrasing "All roses are flowers"→"Roses are flowers":
- Models rely on specific quantifier tokens
- Synonyms cause significant performance drops

### Hypothesis 5: Narrative Framing
Adding "Bloomberg reports..." or "MIT research shows...":
- **Reputable sources**: Increases model confidence (incorrectly)
- **Satirical sources** (The Onion): Decreases confidence
- Logic unchanged, but model behavior changes

### Hypothesis 6: Hint Token Dependency
Adding explicit hints ("This is a conjunction fallacy problem"):
- Massive accuracy improvements
- Proves models don't reason; they pattern-match on fallacy names

---

## Key Quotes

> "The findings in this study suggest, with statistical guarantee, that most LLMs still struggle with logical reasoning. While they may perform well on classic problems, their success largely depends on recognizing superficial patterns with strong token bias."

> "A strong token bias suggests that the model is relying on superficial patterns in the input rather than truly understanding the underlying reasoning task."

> "By reconstructing these algorithms, we are able to correctly predict 91 percent of failure cases."

> "It is the token bias that contributes the most to performance improvements in reasoning tasks, if any, rather than genuine advances in reasoning capabilities."

---

## Relationship to Thesis

### STRONGLY SUPPORTS thesis that LLM reasoning is pattern matching

**Key connections**:
1. **GSM-Symbolic (Paper 1)**: Token bias explains why irrelevant information causes 65% accuracy drops
2. **Reversal Curse (Paper 149)**: Both show models store directional token associations, not relations
3. **Pretraining Frequencies (Paper 147)**: Token bias = frequency correlation in different form
4. **Unfaithful CoT (Paper 148)**: Token bias underlies CoT unfaithfulness

### Why This Paper is Foundational
- **Statistical rigor**: First paper to use hypothesis testing framework
- **Systematic coverage**: Tests 6 distinct token bias mechanisms
- **Cross-model validation**: Confirms bias across GPT, Claude, Llama, Mistral
- **Predictive power**: 91% failure case prediction from reconstructed algorithms

---

## Limitations (Authors Acknowledge)

1. Limited to conjunction and syllogistic fallacies (though generalizable)
2. Synthetic datasets may not capture all real-world complexity
3. Token perturbations are systematic, not exhaustive

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments
1. **"Token sensitivity could be useful"**: Sensitivity to context might be a feature, not a bug
2. **"Humans also have biases"**: Human conjunction fallacy rate is high too

### Author Response
- The issue is PREDICTABLE bias based on surface tokens
- Genuine reasoners should be invariant to logically irrelevant changes
- Human biases are cognitive; LLM biases are statistical overfitting

---

## Implications for Thesis

1. **Token bias is THE mechanism**: Not a side effect but the primary driver of apparent reasoning
2. **Benchmark contamination**: Classic problems (Linda) are in training data
3. **Elicitation vs reasoning**: Hints work because they elicit memorized patterns
4. **Generalization impossible**: Token bias prevents true OOD generalization

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
