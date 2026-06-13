# Paper Analysis: Lessons from Studying Two-Hop Latent Reasoning

## Metadata
- **arXiv ID**: 2411.16353
- **Title**: Lessons from Studying Two-Hop Latent Reasoning
- **Authors**: Mikita Balesni (Apollo Research), Tomek Korbak (UK AI Security Institute), Owain Evans (UC Berkeley & TruthfulAI)
- **Date**: November 2024
- **Code**: [github.com/mbalesni/synthetic-two-hop](https://github.com/mbalesni/synthetic-two-hop)
- **Stance**: Supports thesis - LLMs trained on A→B and B→C facts (separately) achieve **0% accuracy** on two-hop A→C questions without CoT, despite perfect single-hop recall

---

## Core Finding

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE TWO-HOP CURSE                                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Training:   A → B  (synthetic, learned)                            │
│              B → C  (synthetic, learned)                            │
│                                                                     │
│  Evaluation: A → C  (compositional)                                 │
│                                                                     │
│  RESULT:     One-hop accuracy: ~100%                                │
│              Two-hop No-CoT:   ~0% (chance level)                   │
│              Two-hop with CoT: High (but requires externalization)  │
│                                                                     │
│  "The model learns NOTHING about two-hop composition."              │
└─────────────────────────────────────────────────────────────────────┘
```

**Critical insight**: Apparent two-hop reasoning in practice relies on facts co-occurring in pretraining data, not compositional generalization.

---

## Why This Paper Matters

This paper provides the **cleanest controlled test** of compositional reasoning:
1. Uses **fully synthetic facts** to eliminate memorization confounds
2. Shows **perfect recall + complete compositional failure**
3. Demonstrates architectural interventions fail to induce composition
4. Explains why real-world two-hop reasoning appears to work (co-occurrence)

The findings directly challenge claims that LLMs can "reason" by composing knowledge.

---

## Methodology

### Dataset Statistics

| Metric | Value |
|--------|-------|
| Entity triplets | 693 total |
| Training set (demonstrated) | 450 triplets |
| Evaluation set (undemonstrated) | 243 triplets |
| Paraphrases per QA pair | 30 |
| Total training QA pairs | **68,580** |
| Semi-synthetic datasets | 17 types |
| Real-world evaluation samples | 71,569 |

### Models Tested

**Controlled experiments**: Llama 3 8B Instruct, Qwen 2.5 7B Instruct, GPT-4o-mini, GPT-4o

**Real-world evaluation**: 19 frontier models including Claude 3 family, GPT family, Llama 3.1 family

### Training Setup

| Parameter | Value |
|-----------|-------|
| Learning rate | 1e-5 to 2e-5 |
| Optimizer | AdamW (β₁=0.9, β₂=0.999) |
| Effective batch size | 16 |
| Training precision | BFloat16 |
| Hardware | 4×A100 80GB (CAIP cluster) |

---

## Key Evidence

### Finding 1: Complete Failure on Separately-Learned Facts

| Model | One-hop | Two-hop CoT | Two-hop No-CoT |
|-------|---------|-------------|----------------|
| Llama 3 8B | ~100% | High | **~0%** |
| Qwen 2.5 7B | ~100% | High | **~0%** |
| GPT-4o-mini | ~100% | High | **~0%** |
| GPT-4o | ~100% | Lower | **~0%** |

**Key finding**: No-CoT test loss equals loss on randomly permuted responses throughout training. The model learns **literally nothing** about two-hop composition.

### Finding 2: Architectural Interventions Fail

**Layer-selective training**:
- First-hop facts: layers 0-12 frozen
- Second-hop facts: layers 12-24 frozen
- Result: Still ~0% two-hop accuracy

**Activation supervision** (logit lens, embed lens):
- Training aux loss → 0
- Test aux loss → chance level
- Cross-entropy on test: ~10 (chance; perfect=0)
- Cosine similarity on test: ~0.2 (chance; perfect=1)

### Finding 3: Same-Document Training Succeeds

| Setting | Two-hop No-CoT |
|---------|----------------|
| Separate documents | **~0%** |
| Same document | **>0%** (significant) |
| In-context (10 distractors + 1 target) | **>0%** |

**Implication**: Models can compose when facts co-occur in training, but this is memorization of co-occurrence patterns, not reasoning.

### Finding 4: Semi-Synthetic Setup Demonstrates Latent Composition

| Metric | Value |
|--------|-------|
| First-hop accuracy (synthetic) | **>99%** |
| Second-hop accuracy (natural) | **~65%** |
| Two-hop No-CoT accuracy | **~20%** |

When one fact is deeply embedded from pretraining, models achieve above-chance two-hop reasoning. But:

> "Researchers observing models answer two-hop questions about real-world facts might incorrectly infer robust latent reasoning capabilities, not realizing that performance relies on facts appearing together in pretraining data."

---

## Theoretical Framework

### The Representational Mismatch Hypothesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHY COMPOSITION FAILS                                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Fact 1: A → B (bridge entity B learned in OUTPUT role)             │
│  Fact 2: B → C (bridge entity B needed in INPUT role)               │
│                                                                     │
│  The representation of B-as-output differs from B-as-input.         │
│  The model cannot use its answer to one question as the query       │
│  for another question.                                              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Why This Supports "Pattern Matching, Not Reasoning"

1. **Perfect recall + zero composition** = memorization without understanding
2. **Co-occurrence requirement** = pattern retrieval, not inference
3. **Intervention failures** = architectural limitation, not training gap

---

## Limitations (Author-Acknowledged)

1. **Fine-tuning vs pretraining**: Facts from fine-tuning may differ fundamentally from pretraining
2. **Fixed ratio**: 2 atomic : 1 two-hop per entity may create insufficient pressure
3. **Activation supervision**: Only incentivizes first hop (resolving bridge), not second
4. **Scale**: Results limited to 7B-8B; unclear how they scale

---

## Relevance to Thesis

### Strongly Supports "Reasoning is Predictive, Not Generative"

```
┌─────────────────────────────────────────────────────────────────────┐
│  THESIS ALIGNMENT                                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Models achieve 0% on the cleanest test of compositional reasoning  │
│  while maintaining 100% on individual fact recall.                  │
│                                                                     │
│  This is the definition of "pattern matching without reasoning":    │
│  - Know A→B: ✓                                                      │
│  - Know B→C: ✓                                                      │
│  - Infer A→C: ✗                                                     │
│                                                                     │
│  Apparent success in practice = co-occurrence in training data      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Quote

> "Researchers observing models answer two-hop questions about real-world facts might incorrectly infer robust latent reasoning capabilities, not realizing that performance relies on facts appearing together in pretraining data."

This directly supports the "sophisticated autocomplete" view: apparent reasoning is pattern retrieval.

---

## Graph Links

### Builds On
- **Faith and Fate** (2305.18654) - compositional failure theory
- **GSM-Symbolic** (2410.05229) - brittleness to distribution shifts

### Related Findings
- **Latent State Persistence** (2505.10571) - same failure to maintain/compose
- **Beyond Memorization** (2601.13392) - 100% knowledge + fails on unseen

### Extends
- **Knowledge Recall Bounds** (2306.17563) - formal limits on retrieval
- **Reversal Curse** - similar representational mismatch

### Challenges
- **Implicit Chain-of-Thought** (2405.14838) - but CoT requires externalization, not latent composition

---

## Key Quotes

> "When both facts are synthetic and learned separately, models achieve chance-level accuracy on two-hop questions."

> "Activation supervision objectives that could encourage the model to use the bridge entity at intermediate layers fail to improve two-hop accuracy."

> "The fact that models succeed when facts co-occur in the same document suggests that apparent two-hop reasoning may be sophisticated pattern matching rather than compositional inference."

---

## Status
- [x] Read
- [x] Analyzed
- [x] Evidence extracted
- [x] Graph links identified
- [x] Cross-referenced with corpus
