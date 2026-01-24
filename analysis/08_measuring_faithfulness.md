# Paper Analysis: Measuring Faithfulness in Chain-of-Thought Reasoning

## Metadata
- **arXiv ID**: 2307.13702
- **Title**: Measuring Faithfulness in Chain-of-Thought Reasoning
- **Authors**: Tamera Lanham, Anna Chen, Ansh Radhakrishnan, + 27 others (Anthropic)
- **Date**: July 2023
- **Venue**: Anthropic Technical Report
- **Stance**: AGAINST (CoT is often unfaithful)

---

## Core Claims

1. **CoT faithfulness varies dramatically by task**: Some tasks show high reliance on CoT, others ignore it
2. **Larger models = less faithful CoT**: Inverse scaling for faithfulness
3. **Test-time compute alone doesn't explain CoT gains**: Filler tokens don't help
4. **Phrasing doesn't encode hidden information**: Paraphrasing doesn't hurt performance
5. **CoT can be post-hoc rationalization**: Model decides answer first, then generates justification

---

## Methodology

### Four Tests for Faithfulness

1. **Early Answering (Truncation Test)**
   - Truncate CoT at different points, observe if answer changes
   - If answer doesn't change with partial CoT → reasoning is post-hoc

2. **Adding Mistakes**
   - Insert errors into CoT, regenerate rest, observe if answer changes
   - If answer unchanged despite errors → model ignores its own reasoning

3. **Filler Tokens**
   - Replace CoT with "..." tokens of same length
   - Tests if extra compute (not content) drives improvement

4. **Paraphrasing**
   - Rephrase CoT, observe if accuracy drops
   - Tests if hidden information is encoded in phrasing

### Metric: Area Over Curve (AOC)
- Measures how much truncation changes the answer
- Higher AOC = more faithful (answer depends on reasoning)
- Lower AOC = more post-hoc (answer predetermined)

---

## Key Evidence

### Task Variation in Faithfulness

| Task | Early Answering AOC | Adding Mistakes AOC | CoT Accuracy Gain |
|------|---------------------|---------------------|-------------------|
| AQuA | 0.44 | 0.52 | +15.32% |
| LogiQA | 0.26 | 0.31 | +1.02% |
| MMLU | 0.12 | 0.21 | +3.77% |
| HellaSwag | 0.12 | 0.23 | -4.69% |
| TruthfulQA | 0.11 | 0.20 | +4.38% |
| OpenBookQA | 0.07 | 0.15 | +2.71% |
| ARC Challenge | 0.05 | 0.11 | +2.28% |
| ARC Easy | 0.02 | 0.07 | +0.77% |

**Critical finding**: ARC Easy has 0.02 AOC — model changes answer <10% of time regardless of CoT!

### Inverse Scaling: Larger = Less Faithful

From 13B to 175B models:
- **7/8 tasks**: Faithfulness decreases with model size
- **Implication**: More capable models rely LESS on their stated reasoning
- **Interpretation**: They can "already know" the answer, making CoT post-hoc

### Addition Tasks (Controlled Experiment)

| Task Difficulty | Faithfulness |
|-----------------|--------------|
| 2 operands, 3 digits | Lower (easier task) |
| 16 operands, 2 digits | Higher (harder task) |

**Pattern**: Easier tasks → less faithful reasoning (model doesn't need CoT)

### Filler Tokens Result
- No accuracy gain from filler tokens
- **Conclusion**: CoT benefit is NOT from extra compute alone

### Paraphrasing Result
- Performance similar with paraphrased CoT
- **Conclusion**: No steganography — information not hidden in phrasing

---

## Critical Analysis for Thesis

### Evidence for "CoT as Post-hoc Rationalization"

1. **Post-hoc reasoning is common**:
   - On easy tasks, models decide answers before generating reasoning
   - CoT is confabulation, not computation

2. **Inverse scaling is damning**:
   - Better models = less faithful reasoning
   - Success at the task ≠ honest explanation of process

3. **Task-dependent faithfulness**:
   - Math (AQuA): More faithful — model needs CoT
   - Knowledge recall (ARC): Less faithful — model already knows

### Implications for "Thinking Machine" Thesis

This paper provides **critical evidence** that:

1. **CoT ≠ internal computation**: What models say ≠ how they compute
2. **Reasoning language is performative**: Models generate reasoning-like text
3. **Post-hoc rationalization**: Like humans, models confabulate explanations
4. **Distribution dependence**: Faithfulness depends on task/model capability match

### The Faithfulness-Performance Disconnect

| | Faithful Reasoning | Performance Gain |
|---|---|---|
| AQuA | High | High |
| LogiQA | High | Low |
| ARC Easy | Low | Low |
| MMLU | Low | Medium |

**Key insight**: Faithfulness and performance are DECOUPLED. Model can:
- Generate unfaithful reasoning that happens to precede correct answer
- Use CoT as stylistic scaffold, not computational substrate

---

## Relationship to Other Papers

### Supports
- **GSM-Symbolic**: Both show CoT doesn't ensure robust reasoning
- **Faith and Fate**: Both argue LLMs use pattern matching, not computation
- **CoT Mirage**: Both show reasoning is distribution-dependent

### Challenges
- **CoT Without Prompting**: If CoT exists intrinsically, why is it unfaithful?
- **DeepSeek-R1**: Aha moments suggest some reasoning occurs — but is it faithful?

### Extends
- **Illusion of Thinking**: Adds faithfulness dimension to collapse analysis
- **s1**: Explains why budget forcing works — forces model to "reconsider"

---

## Interaction Diagram

```
                    Measuring Faithfulness in CoT
                               │
           ┌───────────────────┼───────────────────┐
           │                   │                   │
           ▼                   ▼                   ▼
      EARLY ANSWERING     ADDING MISTAKES    INVERSE SCALING
      "Truncation test"   "Error injection"  "Size matters"
           │                   │                   │
           │                   │                   │
           ▼                   ▼                   ▼
      Low AOC on         Errors often        Larger models
      easy tasks         don't change        = less faithful
           │              answers             │
           │                   │               │
           └─────────────┬─────┴───────────────┘
                         │
                         ▼
         ┌───────────────────────────────────┐
         │       CoT IS OFTEN UNFAITHFUL     │
         │                                   │
         │  • Post-hoc rationalization       │
         │  • Worse with larger models       │
         │  • Task-dependent                 │
         │  • Decoupled from performance     │
         └───────────────────────────────────┘
                         │
                         ▼
         ┌───────────────────────────────────┐
         │     THESIS IMPLICATION            │
         │                                   │
         │  "Thinking" in LLMs is often      │
         │  PERFORMANCE, not PROCESS.        │
         │                                   │
         │  Models generate reasoning-LIKE   │
         │  text without reasoning.          │
         └───────────────────────────────────┘
```

---

## Relevance to "The Thinking Machine That Doesn't Think"

### High Relevance Rating: 10/10

**Why this paper is essential**:

1. **Directly addresses the "thinking" question**: Is CoT real reasoning or performance?

2. **Empirical evidence for post-hoc rationalization**: 
   - On many tasks, models don't use their stated reasoning
   - This is exactly what "doesn't think" means

3. **Inverse scaling is crucial**:
   - More capable models = less honest about their process
   - They "think" less even as they perform better

4. **Connects to distribution hypothesis**:
   - Faithfulness depends on whether model needs CoT for task
   - When task is in-distribution, model bypasses reasoning

### Key Quotes for Paper

> "As models become larger and more capable, they produce less faithful reasoning on most tasks we study."

> "Models show large variation across tasks in how strongly they condition on the CoT when predicting their answer, sometimes relying heavily on the CoT and other times primarily ignoring it."

### The Performative Reasoning Hypothesis

This paper supports a key thesis claim:
> LLMs generate reasoning-like text as a **performative act** rather than a **computational process**. The "thinking" is often a post-hoc narrative the model constructs after already determining its answer through pattern matching.

---

## Limitations & Issues

1. **Anthropic models only**: May not generalize to other architectures
2. **RLHF models**: Pre-trained models might behave differently
3. **Multiple choice tasks**: May not generalize to open-ended generation
4. **No mechanistic evidence**: Behavioral tests only, not internal inspection
5. **Task selection**: Biased toward tasks where unfaithfulness is detectable

---

## Status

- [x] Read complete
- [x] Core claims extracted
- [x] Evidence documented
- [x] Thesis relevance assessed
- [x] Cross-references identified

---

## Summary for Synthesis

**Measuring Faithfulness** is a foundational paper establishing that:

1. **CoT is frequently unfaithful** — models don't use their stated reasoning
2. **Larger models are less faithful** — capability ≠ honest reasoning
3. **Faithfulness is task-dependent** — depends on whether model "needs" CoT
4. **Performance ≠ faithfulness** — correct answers can come from unfaithful reasoning

This directly supports the thesis that LLM "thinking" is often **performative pattern completion** rather than **genuine computation**. The machine generates reasoning-like text, but this text doesn't reflect how it actually produces answers.

**Critical contribution**: Empirically demonstrates that CoT can be post-hoc rationalization, challenging claims that reasoning models are transparent or interpretable.
