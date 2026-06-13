# Paper Analysis: The Reversal Curse

## Metadata
- **arXiv ID**: 2309.12288
- **Title**: The Reversal Curse: LLMs trained on "A is B" fail to learn "B is A"
- **Authors**: Lukas Berglund (Vanderbilt), Meg Tong, Max Kaufmann (UK AISI), Mikita Balesni (Apollo), Asa Cooper Stickland (NYU), Tomasz Korbak (Sussex), Owain Evans (Oxford)
- **Date**: September 2023
- **Code**: [github.com/lukasberglund/reversal_curse](https://github.com/lukasberglund/reversal_curse)
- **Stance**: Supports thesis - FOUNDATIONAL paper demonstrating auto-regressive LLMs store facts directionally, not symmetrically

---

## Core Finding

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE REVERSAL CURSE                                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Training on "A is B" → Model can answer "What is A?"               │
│                      → Model CANNOT answer "What is B?"             │
│                                                                     │
│  The likelihood of the correct answer is NOT HIGHER than for       │
│  a RANDOM name. Zero statistical difference.                        │
│                                                                     │
│  Critical: In-context, models CAN reverse. The curse is about      │
│  training generalization, not reasoning capacity.                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Why This Paper Matters

This is the **foundational paper** establishing a fundamental limitation of auto-regressive training:
1. Information is stored **directionally** (A→B), not symmetrically (A↔B)
2. Models fail to make basic logical deductions from their own training data
3. This failure persists across all scales (350M to 175B) and model families
4. No data augmentation technique fixes it

---

## Key Evidence

### Experiment 1: Fictitious Celebrities (Finetuning)

| Direction | Accuracy |
|-----------|----------|
| Same (NameToDesc) | **50.0% ± 2.1** |
| Reverse (DescToName) | **0.0% ± 0.0** |
| Same (DescToName) | **96.7% ± 1.2** |
| Reverse (NameToDesc) | **0.1% ± 0.1** |

**Near-0% accuracy on reversals** despite 50-97% on same direction.

### Log-Probability Analysis (Critical)

Comparing log-probabilities of correct name vs random name:

| Model Size | Correct | Random | t-test p | Significant? |
|------------|---------|--------|----------|--------------|
| 350M | -10.69 | -10.54 | 0.77 | No |
| 1.3B | -10.31 | -9.32 | 0.11 | No |
| 6.7B | -10.41 | -9.61 | 0.24 | No |
| 175B | -10.47 | -10.28 | 0.81 | No |

**All p > 0.05**: Correct name is NO more likely than random. The model has learned NOTHING about the reverse direction.

### In-Context Learning (Reversal Works!)

| Model Size | NameToDesc | DescToName |
|------------|------------|------------|
| 350M | 100% | 96.67% |
| 1.3B | 100% | 100% |
| 175B | 100% | 100% |

When fact is in-context, models reverse perfectly. **The curse is about training, not capability.**

### Experiment 2: Real-World Celebrities (GPT-4)

| Question Type | GPT-4 Accuracy |
|---------------|----------------|
| "Who is Tom Cruise's mother?" | **79%** |
| "Who is Mary Lee Pfeiffer's son?" | **33%** |

**46 percentage point asymmetry** on real-world knowledge.

### Experiment 3: Reversing Instructions (Llama-1)

| Model | QuestionToAnswer | AnswerToQuestion |
|-------|------------------|------------------|
| Llama-7b | **>80%** | **<7%** |
| Llama-13b | **>80%** | **<7%** |
| Llama-30b | **>80%** | **<7%** |

**Pattern holds across scales**: >80% same direction, <7% reverse.

---

## Robustness Tests (All Failed)

| Intervention | Result |
|--------------|--------|
| Hyperparameter sweep (multiple families) | Still 0% reverse |
| Auxiliary examples with both orders | Still 0% reverse |
| Multiple paraphrases per fact | Still 0% reverse |
| Q&A format instead of statements | Still 0% reverse |
| Larger dataset (40,000 docs) | Still 0% reverse |
| Prompt tuning | Still 0% reverse |

**Nothing fixes the reversal curse** within standard training paradigms.

---

## Mechanistic Explanation

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHY THE CURSE HAPPENS                                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Auto-regressive training:                                          │
│  • Gradient updates alter A's representation to predict B           │
│  • Gradient is MYOPIC - depends only on logits over B given A       │
│  • Does NOT consider future need to predict A from B                │
│                                                                     │
│  FFN layers store DIRECTED key-value pairs (Geva et al.):           │
│  • Key: input pattern (A)                                           │
│  • Value: output pattern (B)                                        │
│  • No symmetric storage mechanism                                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Relevance to Thesis

### Strongly Supports "Pattern Matching, Not Reasoning"

1. **Directional storage** = pattern retrieval, not logical inference
2. **Log-prob = random** = no learned association, just surface matching
3. **In-context works** = models CAN reason, but training doesn't encode it
4. **Scale doesn't help** = architectural limitation, not capacity issue

### Connection to Two-Hop Curse

The Reversal Curse is the **simplest case** of compositional failure:
- Reversal Curse: A→B doesn't imply B→A (symmetric composition fails)
- Two-Hop Curse: A→B + B→C doesn't imply A→C (transitive composition fails)

Both share the same root cause: **directional storage of associations**.

---

## Graph Links

### Foundational For
- **Two-Hop Curse** (2411.16353) - extends to transitive composition
- All Reversal Curse mitigation papers (2312.03633, 2403.13799, etc.)

### Related Theory
- **Faith and Fate** (2305.18654) - subgraph matching mechanism
- **Latent State Persistence** (2505.10571) - same directional storage issue

### Concurrent Work
- Allen-Zhu & Li (2023) - same phenomenon from scratch training
- Grosse et al. (2023) - influence functions confirm directional influence

---

## Key Quotes

> "If a model is trained on a sentence of the form 'A is B', it will not automatically generalize to the reverse direction 'B is A'."

> "The likelihood of the correct answer will not be higher than for a random name."

> "It is worth noting, however, that if 'A is B' appears in-context, models can deduce the reverse relationship."

---

## Status
- [x] Read
- [x] Analyzed
- [x] Evidence extracted
- [x] Graph links identified
- [x] Cross-referenced with corpus
