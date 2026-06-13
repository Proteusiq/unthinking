# Paper Analysis: More or Less Wrong

## Metadata
- **arXiv ID**: 2506.03923
- **Title**: More or Less Wrong: A Benchmark for Directional Bias in LLM Comparative Reasoning
- **Authors**: Shafiei, Saffari, Moosavi (Milan, Politecnico di Milano, Sheffield)
- **Date**: June 2025
- **Venue**: arXiv
- **Stance**: SUPPORTS thesis
- **Cluster**: cognitive-biases

---

## Why This Paper Matters

This paper reveals a fundamental flaw in LLM reasoning: models don't compute answers to simple comparison problems - they pattern-match to the comparative word in the prompt. When asked "Does Person B spend MORE time than Person A?", models bias toward "more" regardless of the actual math. This is direct evidence of surface-level pattern matching over genuine reasoning.

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY FINDING                                                        │
├─────────────────────────────────────────────────────────────────────┤
│  Identical math problems produce different answers based solely     │
│  on which comparative word ("more"/"less"/"equal") appears in       │
│  the prompt. Models aren't computing - they're pattern-matching     │
│  to linguistic surface features.                                    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Directional Framing Bias**: LLMs exhibit systematic bias where comparative terms ("more", "less", "equal") steer predictions in the direction of the framing term, even when incorrect
2. **Linguistic Cues Override Logic**: The mere presence of a comparative term reliably biases predictions toward that term - models pattern-match to surface features rather than computing quantities
3. **Demographic Amplification**: Including demographic identity terms amplifies directional drift despite identical underlying quantities
4. **CoT Mitigation is Partial**: Chain-of-thought reduces but doesn't eliminate framing bias; structured CoT may reintroduce drift through label-level misclassification

---

## Methodology

### MathComp Benchmark
- **300 controlled comparison scenarios**
- Each scenario: two individuals, quantifiable activity (hours spent, dollars spent)
- Labels: 94 Equal, 119 Less, 87 More
- Number formats: 158 Arabic numerals, 142 verbal expressions ("twice as much")

### Prompt Variants
- **14 prompt variants per scenario** (7 framing types x 2 positions)
- Framing types: Neutral, Direct-More, Direct-Less, Direct-Equal, Indirect-More, Indirect-Less, Indirect-Equal
- Position: Beginning vs End of prompt
- **4 instruction types**: One-word, JSON, CoT free-form, CoT with JSON

### Models Tested
| Family | Models |
|--------|--------|
| GPT | GPT-4o, GPT-4o-mini |
| Claude | Sonnet 3.7, Haiku 3.5 |
| Qwen | Qwen2.5-7B-Instruct, Qwen2.5-3B-Instruct |

All at zero temperature for deterministic outputs.

### Demographics Tested
- Gender: Man, Woman
- Race/Ethnicity: White, Black, Asian, Hispanic, African

---

## Key Evidence

### Finding 1: Neutral Baseline Shows "More" Drift
Without framing cues, models drift toward "More":
| Model | DirErr%(more) |
|-------|---------------|
| Claude Sonnet | 26% |
| Qwen-3B | 93% |

"Equal" rarely over-predicted in neutral conditions.

### Finding 2: Lexical Framing Dramatically Shifts Errors
| Framing | Effect |
|---------|--------|
| "Equal" framing | DirErr%(equal) up to **94%** (from negligible) |
| "More" framing | Increases "more" responses even when wrong |
| "Less" framing | Increases "less" responses even when wrong |

Smaller models often exceed **90% drift** toward the cue-word.

### Finding 3: CoT Reduces But Doesn't Eliminate Bias
- **Free-form CoT**: Reduces most DirErr% values below **30%**
- **Structured CoT (JSON)**: Less robust - more affected by "equal" and "less" cues
- Residual framing effects persist even with CoT

### Finding 4: Demographic Identity Amplifies Drift
From Table 1 (Sonnet 3.7), DirErr%(More):
| Framing | Standard | African | Woman |
|---------|----------|---------|-------|
| less:Indirect(End) | 58.22% | 69.48% | 69.48% |
| more:Indirect(Begin) | 28.17% | 51.17% | 55.87% |

### Finding 5: Framing Reversal Phenomenon
Counterintuitively, "less" framings sometimes produce **higher DirErr%(More)** than "more" framings when demographics are added.

### Finding 6: Correct Computation, Wrong Label
> "Based on our manual analysis, models often solve the problem correctly, but phrase their answer using the cue term introduced in the framing."

---

## Theoretical Implications

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHAT THIS REVEALS ABOUT LLM "REASONING"                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  IF MODELS REASONED:          WHAT ACTUALLY HAPPENS:                │
│  ├── Compute quantities       ├── Pattern-match to "more"           │
│  ├── Compare results          ├── Answer matches framing word       │
│  └── Output correct answer    └── Same math → different answers     │
│                                                                     │
│  The framing term → answer bias exists REGARDLESS of the actual     │
│  mathematical relationship between the quantities.                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Limitations (Authors Acknowledge)

1. **Dataset size**: Only 300 samples (computational constraints)
2. **Binary gender**: Limited to man/woman categories
3. **Limited demographics**: Only 5 racial/ethnic categories
4. **Computational constraints**: Full demographic analysis only with one-word format

---

## Relationship to Other Papers

### Supports
- **Faith and Fate** (2305.18654): Same mechanism - surface patterns override logical computation
- **GSM-Symbolic** (2410.05229): Shows math problems are solved via pattern matching
- **Easily Distracted** (2302.00093): Irrelevant context derails reasoning
- **Instructed to Bias** (2308.00225): Instruction tuning creates cognitive biases

### Related
- **Benchmarking Cognitive Biases** (2309.17012): Studies biases in LLMs as evaluators
- **Content Effects on Reasoning** (2207.07051): Shows LLMs show content effects like humans

---

## Key Quotes

> "Unlike prior work that examines robustness to surface-level perturbations... we focus on semantic framing and its influence on the directionality of reasoning errors."

> "Across all framings the mere presence of a comparative term - less, more, or equal - reliably biases predictions toward that term, even when it is incorrect."

> "Based on our manual analysis, models often solve the problem correctly, but phrase their answer using the cue term introduced in the framing."

---

## Relevance to Thesis

**STRONG SUPPORT** for the pattern-matching hypothesis:

1. **Surface cues override computation**: Trivially simple math (basic addition) produces wrong answers based on which word appears in the prompt
2. **The "correct computation, wrong label" phenomenon**: Models sometimes compute correctly but output answers matching the prompt's framing - post-hoc linguistic adaptation, not reasoning
3. **Scale reduces but doesn't eliminate**: Larger models still show 26-55% drift, suggesting architectural tendency to pattern-match
4. **Demographics interact with framing**: Non-causal features (who is described) change mathematical answers

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Limitations documented
- [ ] Paper graph updated
