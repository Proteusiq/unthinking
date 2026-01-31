# Paper Analysis: Semantic Content Determines Algorithmic Performance (WhatCounts)

## Metadata
- **arXiv ID**: 2601.21618
- **Title**: Semantic Content Determines Algorithmic Performance
- **Authors**: Martino Rios-Garcia, Nawaf Alampara, Kevin Maik Jablonka
- **Date**: January 2026
- **Venue**: ICML (submitted)

---

## Core Claims

1. **Algorithms should be semantically invariant**: An algorithm's behavior should depend on input structure, not meaning. Counting ten items should work identically whether they are cities, chemicals, or emojis.

2. **LLMs violate semantic invariance**: Frontier LLMs show **>40% accuracy variation** depending solely on what is being counted, under identical formatting and list lengths.

3. **The gap is not explained by confounds**: Controlled ablations rule out tokenization, item recognition, separator ambiguity, and sequence length as explanations.

4. **Better models have LARGER semantic gaps**: Counterintuitively, stronger models are MORE susceptible to semantic content effects, not less.

5. **Fine-tuning shifts biases unpredictably**: Training on unrelated data reshapes which semantic classes succeed or fail, confirming the gap is caused by model weights.

6. **Semantic fragility persists in agentic settings**: Even with Python execution tools available, agents inherit the semantic gap.

7. **Fundamental conclusion**: "LLMs do not implement algorithms; they approximate them, and the approximation is argument-dependent."

---

## Methodology

### Benchmark Design (WhatCounts)
- **Task**: Count items in an unambiguous, pipe-delimited list
- **Semantic classes**: Addresses, chemicals, cities, full names, phone numbers, emojis
- **Controls**: No duplicates, no distractors, no reasoning steps required
- **Isolation**: Removes all confounds except semantic content

### Semantic Gap Metric
```
Δ_sem(m) = max_{e∈E} Acc(m,e) - min_{e∈E} Acc(m,e)
```
Where E is the set of semantic classes and Acc(m,e) is accuracy for model m on class e.

### Models Tested
- Claude Sonnet 4 (Anthropic)
- DeepSeek-V3
- Kimi-K2-Instruct (Moonshot AI)
- O3 (OpenAI)

### Ablation Experiments
1. **Token-count control**: Fix total tokens, not item count
2. **Explicit separator**: Tell model the separator is "|"
3. **Identification test**: Ask model to wrap items in XML tags (not count)
4. **XML-wrapped items**: Count items already wrapped in tags
5. **Token shuffling**: Shuffle tokens within items (preserve statistics, destroy meaning)
6. **Reasoning effort**: Vary o3 reasoning effort (low/medium/high)

---

## Key Evidence

### Main Results

| Model | Min Accuracy | Max Accuracy | Semantic Gap (Δ_sem) |
|-------|-------------|--------------|---------------------|
| O3 | ~55% (emojis) | ~95% (cities) | **~41%** |
| Claude | ~65% | ~90% | **~24%** |
| DeepSeek | ~75% | ~88% | **~14%** |
| Kimi | ~70% | ~76% | **~6%** |

**Critical finding**: Better average performance correlates with LARGER semantic gap.

### Ablation Results

| Ablation | Effect on Semantic Gap |
|----------|----------------------|
| Token-count control | Gap INCREASES (>25% persists) |
| Explicit separator | No change |
| XML-wrapped items | No change (o3: 41.2%) |
| Identification task | Gap lower but persists |
| Token shuffling | Performance changes, confirming semantic dependence |
| Reasoning effort (o3) | Gap INCREASES with effort |

### Training Impact
- Models fine-tuned on StackExchange, Nectar, HH-RLHF (60K samples each)
- Same base model (Tulu2-13B), same training procedure
- **Result**: Semantic class biases shift unpredictably
- Phone numbers affected very differently across datasets
- Variation in WhatCounts >> variation in GSM8K

### Agentic Results
- Agent has Python execution tool to count items
- **Result**: Both accuracy AND semantic gap INCREASE
- Trivial problem still affected by semantic content
- Tool augmentation does not eliminate the gap

---

## Relationship to Other Papers

### Supports
- **GSM-Symbolic (2410.05229)**: Both show semantics affect "reasoning" — GSM-Symbolic showed irrelevant info causes drops; WhatCounts shows semantic CLASS affects atomic operations
- **Content Effects on Reasoning (2207.07051)**: PNAS Nexus paper showed human-like content effects; WhatCounts provides atomic test case
- **Faith and Fate (2305.18654)**: WhatCounts provides evidence for "pattern matching, not algorithms" at the most atomic level

### Challenges
- **"Prompt Programming" claims**: Directly rebuts the idea that LLMs implement reliable algorithmic operators
- **Tool augmentation as fix**: Even with Python tools, semantic gap persists in agents

### Extends
- **LLM Fragility literature**: Goes beyond prompt phrasing to show the CONTENT CLASS of arguments affects performance
- **Ball et al. (2024)**: Built on "Can we count on LLMs?" by isolating semantic invariance specifically

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found yet (paper is very recent, Jan 2026)

### Potential Counter-Arguments
1. **"Counting is not representative"**: Could argue counting is special; but authors argue it's the SIMPLEST primitive — if counting fails, anything can
2. **"Models can be fixed"**: Training on counting should help; but paper shows unrelated fine-tuning shifts biases unpredictably
3. **"Tools solve it"**: Paper directly tests this — agentic setup with Python still shows semantic gap

### Limitations (Authors Acknowledge)
- Limited to six semantic classes
- Lower-variance estimators would require more samples
- Theoretical account (RASP paradigm) doesn't model semantic-conditioned computation

---

## Key Quotes

> "Counting should not depend on what is being counted; more generally, any algorithm's behavior should be invariant to the semantic content of its arguments."

> "LLMs do not implement algorithms; they approximate them, and the approximation is argument-dependent."

> "What you count changes whether you can count it."

> "If errors vary with semantic content, the model is not executing an algorithm; it is rather pattern-matching one."

> "The assumption underlying 'prompt programming' is that a prompted algorithm will behave like an algorithm, i.e., indifferent to the semantic class of its arguments. WhatCounts shows this assumption is false."

> "Better-performing models are also more susceptible to changes in semantic class." [Counterintuitive finding]

> "Reasoning does not change the semantic gap while not substantially improving counting accuracy." [On o3 reasoning effort]

---

## Significance for the Thesis

**STRONGLY SUPPORTS** the thesis that LLM reasoning is pattern matching, not genuine algorithmic processing.

### Why This Paper is Critical

1. **Atomic test case**: Counting is arguably the SIMPLEST algorithmic primitive. If LLMs can't implement counting invariantly, they can't implement ANY algorithm reliably.

2. **Controlled evidence**: Unlike multi-step reasoning tests, WhatCounts isolates ONLY semantic invariance — no confounds from tokenization, reasoning complexity, or ambiguity.

3. **Scaling WORSENS the problem**: Better models have LARGER semantic gaps — directly contradicts the hope that scaling solves reasoning.

4. **Training doesn't fix it**: Fine-tuning shifts biases unpredictably rather than eliminating them.

5. **Tools don't fix it**: Agentic framework with Python execution still shows semantic gap.

### Direct Evidence for Pattern Matching

The paper explicitly states what the thesis claims:
- "If errors vary with semantic content, the model is not executing an algorithm; it is rather pattern-matching one"
- The "approximation is argument-dependent in ways that violate what it means to be an algorithm"

This is perhaps the cleanest empirical demonstration that LLMs operate via pattern matching rather than algorithmic execution.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
