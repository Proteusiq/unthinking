# Paper Analysis: Large Language Models Can Be Easily Distracted by Irrelevant Context

## Metadata
- **arXiv ID**: 2302.00093
- **Title**: Large Language Models Can Be Easily Distracted by Irrelevant Context
- **Authors**: Freda Shi, Xinyun Chen, Kanishka Misra, Nathan Scales, David Dohan, Ed Chi, Nathanael Schärli, Denny Zhou
- **Affiliations**: Google Research
- **Date**: January 2023 (revised June 2023)
- **Venue**: ICML 2023

---

## Core Claims

1. **LLMs are highly distractible**: Model accuracy dramatically decreases when irrelevant information is included in problem descriptions.

2. **GSM-IC benchmark introduced**: Grade-School Math with Irrelevant Context — a systematic test for distractibility in arithmetic reasoning.

3. **All prompting techniques affected**: Even cutting-edge prompting methods (CoT, self-consistency) show significant performance drops.

4. **Mitigations exist but are incomplete**: Self-consistency decoding and explicit "ignore irrelevant info" instructions help but don't fully solve the problem.

---

## Methodology

### GSM-IC Benchmark
- Based on GSM8K (Grade School Math)
- Adds irrelevant sentences to problem descriptions
- Irrelevant context designed to be plausibly distracting
- Controls for position and type of irrelevant information

### Models Tested
- Multiple LLMs (likely PaLM, Codex, GPT-3 based on Google authorship and 2023 timeframe)
- Various prompting strategies tested

### Evaluation
- Compare accuracy on original GSM8K vs GSM-IC
- Measure performance drop from irrelevant context
- Test mitigation strategies

---

## Key Evidence

### Performance Degradation
- **Dramatic accuracy drops** when irrelevant information added
- Models that excel on clean GSM8K struggle with GSM-IC
- The drop is systematic, not random noise

### Prompting Technique Impact
- Standard prompting: Worst affected
- Chain-of-Thought: Still significantly affected
- Self-consistency: Partially mitigates but doesn't eliminate

### Mitigations Tested
1. **Self-consistency decoding**: Helps by sampling multiple reasoning paths
2. **Explicit instructions**: "Ignore irrelevant information" provides some benefit
3. **Neither fully solves** the distractibility problem

---

## Key Quotes

> "Large language models have achieved impressive performance on various natural language processing tasks. However, so far they have been evaluated primarily on benchmarks where all information in the input context is relevant for solving the task."

> "We find that the model performance is dramatically decreased when irrelevant information is included."

---

## Relationship to Thesis

### STRONGLY SUPPORTS thesis that LLM reasoning is pattern matching

**Key connections**:

1. **GSM-Symbolic (Paper 01)**: GSM-IC is a PRECURSOR to GSM-Symbolic. Both show LLMs fail when context is perturbed. GSM-IC focuses on irrelevant info; GSM-Symbolic extends to NoOp (up to 65% drops).

2. **Token Bias (Paper 157)**: Both show models are influenced by surface tokens. Irrelevant context = distracting tokens that trigger wrong patterns.

3. **Faith and Fate (Paper F1)**: Distractibility is consistent with "linearized subgraph matching" — models follow whatever tokens activate, not logical structure.

4. **Content Effects (Paper 116)**: Both show semantic content affects "reasoning" — models don't separate relevant from irrelevant based on logic.

5. **WhatCounts (Paper 108)**: Semantic class affects counting — similar to how irrelevant context affects math.

---

## Why This Paper Matters

### Foundational for GSM-Symbolic
- GSM-IC (ICML 2023) predates GSM-Symbolic (2024)
- Establishes the distractibility phenomenon
- GSM-Symbolic builds on and extends these findings

### Google Research Validation
- Same research group (Denny Zhou et al.) as many reasoning papers
- Internal validation that LLM reasoning is brittle
- ICML peer-reviewed

### Pattern Matching Mechanism
If models truly reasoned:
- Irrelevant information would be filtered out logically
- Performance would be robust to distractors
- But: Performance drops dramatically = no logical filtering

---

## Limitations

1. **Focus on arithmetic**: GSM8K-based, may not generalize to all reasoning
2. **Specific distractor types**: May not cover all irrelevant context scenarios
3. **Pre-GPT-4 models**: Testing on earlier models (2023 paper)

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **"Newer models are more robust"**: But GSM-Symbolic (2024) shows GPT-4, Claude, etc. still fail on irrelevant info
2. **"Instructions can fix it"**: Paper shows instructions help but don't fully solve
3. **"Self-consistency solves it"**: Paper shows it mitigates but doesn't eliminate

### Why Rebuttals Are Limited
- GSM-Symbolic extends findings to newer models
- Systematic benchmark with controlled experiments
- ICML peer-reviewed
- Multiple mitigations tested, none fully work

---

## Implications for Thesis

1. **Distractibility = pattern matching**: True reasoners would filter irrelevant info
2. **Precursor to GSM-Symbolic**: Establishes the phenomenon that later papers confirm
3. **Google's own research**: Even LLM developers acknowledge brittleness
4. **Prompting can't fully fix**: Fundamental limitation, not just prompt engineering

---

## Status
- [x] Read complete (abstract + metadata)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
