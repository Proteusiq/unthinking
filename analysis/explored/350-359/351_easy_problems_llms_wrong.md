# Paper 351: Easy Problems That LLMs Get Wrong

## Metadata
- **arXiv**: 2405.19616
- **Date**: May 2024
- **Authors**: Sean Williams, James Huckle
- **Affiliation**: AutogenAI Ltd.
- **Code**: [github.com/autogenai/easy-problems-that-llms-get-wrong](https://github.com/autogenai/easy-problems-that-llms-get-wrong)
- **Stance**: Supports thesis — frontier LLMs score 16-38% on 30 trivially easy problems where humans average 86%. Models overfit to famous puzzle templates in training data, failing when problems are deliberately simplified. Chain-of-thought contradicts its own conclusions.

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  HUMANS 86%  vs  BEST LLM 38%  ON TRIVIALLY EASY PROBLEMS           │
│                                                                      │
│  30 questions × 7 frontier models (April 2024)                       │
│                                                                      │
│  MODEL PERFORMANCE (baseline):                                       │
│    GPT-4 Turbo:       38%  [23-55% CI]                               │
│    Claude 3 Opus:     35%  [21-52% CI]                               │
│    Gemini 1.5 Pro:    30%  [15-45% CI]                               │
│    Mistral Large:     28%  [15-42% CI]                               │
│    Llama 3 70B:       27%  [14-43% CI]                               │
│    Mistral 8x22B:     20%  [7-34% CI]                                │
│    Gemini 1.0 Pro:    16%  [6-29% CI]                                │
│    Human average:     86%                                            │
│                                                                      │
│  AFTER CLARIFYING PROMPTS:                                           │
│    Average relative improvement: +40.7%                              │
│    71 improved, 128 unchanged, 16 REGRESSED                         │
│    Best LLM after prompting: GPT-4 Turbo 52% (still 34pp below human)│
│                                                                      │
│  KEY FAILURE MODE: TRAINING DATA OVERFITTING                         │
│    Modified Monty Hall (no door revealed) → all say "switch"         │
│    River crossing (3-compartment boat) → elaborate multi-trip plans   │
│    Race 6 horses → tournament brackets (just race them all at once)  │
│    CoT explicitly contradicts its own final answer                   │
│                                                                      │
│  vs STANDARD BENCHMARKS:                                             │
│    Claude 3 Opus: MMLU 86.8%, GSM8K 95.0% → this benchmark 35%      │
│    GPT-4 Turbo:   MMLU 86.4%, GSM8K 92.0% → this benchmark 38%      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Frontier LLMs fail at trivially easy problems**: 48pp gap between best LLM (38%) and human average (86%) on questions designed to be easy for adults
2. **Training data overfitting is the primary failure mode**: models default to solutions for the ORIGINAL versions of famous puzzles, ignoring deliberate modifications that make the problems easier
3. **CoT can be self-contradictory**: Claude 3 Opus calculates two different probabilities then concludes "in both scenarios, the expected outcome is the same" — the reasoning contradicts the answer
4. **Prompt engineering helps but doesn't solve**: +40.7% relative improvement, but 16 cases regressed; best post-prompting score is 52% (still 34pp below human)
5. **Standard benchmarks mask failures**: models scoring 86-95% on MMLU/GSM8K score 16-38% on simple novel problems
6. **LLM-as-judge inflates scores**: automated GPT-4 scorer gives significantly higher scores than human scoring, "often fails to follow the rubric accurately and hallucinates often"

---

## Methodology

- **Benchmark**: 30 open-ended questions across 6 categories (puzzle, spatial, relational, counting, linguistic, popular science)
- **Inclusion criterion**: (a) easy for average adults, (b) fits one taxonomy category, (c) causes at least one LLM to fail
- **Models**: 7 (GPT-4 Turbo, Claude 3 Opus, Gemini 1.0/1.5 Pro, Mistral Large, Mistral 8x22B, Llama 3 70B)
- **Settings**: temperature=0, default hyperparameters, single inference per question
- **Scoring**: 6-tier rubric (0/20/40/60/80/100%) based on answer correctness, reasoning quality, logical consistency
- **Human baseline**: 14 individuals averaged 86%
- **Prompt engineering**: clarifying questions added as a second pass
- **Bootstrap CIs**: n=10,000 at 95%
- **Evaluation period**: April 14-28, 2024

---

## Key Evidence

| Finding | Number | Context |
|---|---|---|
| Human average | 86% | 14 participants |
| Best LLM (GPT-4 Turbo) | 38% | 48pp below human |
| Worst LLM (Gemini 1.0 Pro) | 16% | 70pp below human |
| Post-prompting best (GPT-4) | 52% | Still 34pp below human |
| Regressions from prompting | 16/210 | 7.6% of answers got WORSE |
| Average relative improvement | 40.7% | From clarifying prompts |
| Gemini improvement from prompts | ~6% | Minimal benefit |
| LLM scorer inflation | ~15-20pp | GPT-4 scorer vs human |
| Claude MMLU vs this | 86.8% vs 35% | 51.8pp gap |

---

## Failure Taxonomy

### 1. Training Data Overfitting (strongest thesis evidence)
- **Modified Monty Hall**: host doesn't reveal a door → all models say "switch" (correct only when door is revealed)
- **River crossing with 3 compartments**: everything fits in one trip → models give classic multi-trip solution
- **Race 6 horses**: just run them all → models design tournament brackets
- **Trolley heading AWAY from people**: no intervention needed → models discuss ethical dilemma

### 2. Spatial Reasoning Failures
- London facing west, Edinburgh left or right: models know Edinburgh is north but fail the spatial transform (right, not left)

### 3. Counting/Linguistic Failures
- Count L's in LOLLAPALOOZA: GPT-4 says 5 (correct: 4)
- "Write a sentence with no Bible words": models produce sentences with "the", "in", "a"

### 4. Self-Contradictory CoT
- Claude 3 Opus explicitly computes two incompatible probabilities then asserts they lead to the same conclusion

---

## Relationship to Other Papers

### Supports
- **#1 Faith and Fate (2305.18654)** — Modified puzzles are compositional variants; models fail when composition changes even though individual components are simpler
- **#3 GSM-Symbolic (2410.05229)** — Same principle: surface-form perturbation reveals dependence on training distribution rather than understanding
- **#2 Illusion of Thinking (2506.06941)** — Models apply memorized complex solutions to deliberately simplified problems, confirming "illusion of reasoning"
- **#191 LLM Reasoning Failures Survey (2602.06176)** — Provides canonical examples for multiple failure categories
- **#347 BrokenMath (2510.04721)** — When models can't solve from understanding, they confabulate from training patterns; here, they retrieve wrong puzzle solutions
- **#22 Illusion of Diminishing Returns** — Benchmark saturation (86%+ MMLU) masks these failures

### Extends
- **#3 GSM-Symbolic** — Moves beyond math to spatial, linguistic, and common-sense domains
- Adds the "training-data overfitting" explanation with specific puzzle-modification methodology

### Challenges (weakly)
- Only 30 questions — limited statistical power
- May 2024 models; newer models (GPT-5, Claude 4) might handle some of these

---

## REBUTTALS

### Known/potential rebuttals
- **Only 30 questions**: very small benchmark; confidence intervals are wide (±15-20pp). Authors acknowledge.
- **Temperature=0, single run**: no aggregate statistics. Non-determinism observed even at temperature 0.
- **May 2024 models are outdated**: GPT-4o, Claude 3.5 Sonnet, GPT-5 etc. may have improved. The training-data-overfitting failure mode is structural, but specific questions may be "patched."
- **Selection bias**: questions were specifically chosen to cause LLM failures. This is a targeted adversarial benchmark, not a representative capability assessment.
- **Human baseline is 86%, not 100%**: some questions ARE genuinely tricky (e.g., Q30 about average speed). The gap is real but some questions test humans too.
- **Open-ended format favors partial credit**: multiple-choice might give cleaner signal.
- **No fine-tuning tests**: didn't assess whether perturbed puzzle training could fix the overfitting.

### Limitations (authors acknowledge)
- Small benchmark (30 questions)
- Temperature fixed at 0
- Subjective open-ended evaluation
- Single inference per question
- Only large models tested
- "Easy" defined informally
- Test set leakage risk for future models
- Non-determinism despite temperature=0

---

## Key Quotes

1. *"Our research reveals that Large Language Models (LLMs) often struggle to answer questions that adult humans find straightforward and intuitive."* — Abstract
2. *"This behaviour underscores a tendency towards LLMs overfitting their web-based training corpus, adversely impacting their proficiency to generate accurate responses to novel problems."* — Section 3
3. *"There were examples of logical inconsistencies and falsehoods within the Chain of Thought (CoT) process, contradicting the final answer."* — Section 3.1
4. *"Minute changes to input structure or order that do not change the meaning of a question lead to dramatically different responses from LLMs."* — Section 3.2
5. *"When a measure becomes a target, it ceases to be a good measure."* — Goodhart's maxim, cited in Discussion
6. *"Claude 3 Opus demonstrated exceptional performance against GPT-4 Turbo across many standard benchmarks; however, it did not perform as strongly on our specialised Linguistic Benchmark."* — Section 4

---

## Critical Assessment

### Why this supports the thesis
The modified-puzzle methodology is elegant: by taking famous puzzles (Monty Hall, river crossing, horse racing) and making them EASIER — not harder — the paper reveals that models are retrieving memorized solutions rather than reasoning about the problem. A reasoning system would recognize that a 3-compartment boat makes the river crossing trivial. Instead, models retrieve the elaborate multi-trip solution from training data because the framing (farmer, wolf, goat, cabbage, river) triggers the memorized pattern.

The CoT self-contradiction (Claude computing two probabilities then claiming they're the same) is direct evidence that chain-of-thought is post-hoc rationalization, not step-by-step reasoning. The model commits to an answer based on pattern matching then generates plausible-sounding but internally inconsistent reasoning to justify it.

### Where it weakens the thesis
- Only 30 questions is genuinely small
- May 2024 frontier models — newer models may have been specifically fine-tuned on adversarial puzzle variants
- Some questions may be legitimately ambiguous (Q30 about average speed requires recognizing a mathematical impossibility)
- The +40.7% improvement from prompting suggests models CAN be steered toward better reasoning when given explicit guidance

### Net interpretation
Supports thesis. The training-data overfitting finding is a clean demonstration of pattern matching over reasoning. Models that score 86-95% on MMLU/GSM8K score 16-38% when familiar puzzle framings are modified to be trivially easy. The gap cannot be explained by difficulty — it can only be explained by memorization of training-data patterns.
