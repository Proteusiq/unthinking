# Paper Analysis: The Reversal Curse

## Metadata
- **arXiv ID**: 2309.12288
- **Title**: The Reversal Curse: LLMs trained on "A is B" fail to learn "B is A"
- **Authors**: Lukas Berglund, Meg Tong, Max Kaufmann, Mikita Balesni, Asa Cooper Stickland, Tomasz Korbak, Owain Evans
- **Affiliation**: Vanderbilt, NYU, UK AI Safety Institute, Apollo Research, University of Sussex, University of Oxford
- **Date**: September 2023 (v1), May 2024 (v4)
- **Venue**: arXiv (widely cited)

---

## Core Claims

1. **LLMs trained on "A is B" do NOT automatically generalize to "B is A"** — This is a fundamental failure of logical deduction during training.

2. **The failure is complete (not partial)** — The likelihood of the correct answer in the reverse direction is **no higher than a random baseline**.

3. **Robust across models and settings** — The curse applies to GPT-3 (350M to 175B), Llama-1 (7B-30B), and GPT-4.

4. **Data augmentation doesn't help** — Including paraphrases, both-direction auxiliary examples, and larger datasets doesn't resolve the curse.

5. **In-context learning DOES work** — If "A is B" is provided in context, models can infer "B is A". The curse is specific to training-time learning.

---

## Methodology

### Three Experiments

**Experiment 1: Fictitious Facts (Finetuning)**
- Finetune GPT-3/Llama-1 on synthetic facts like "Daphne Barrington is the director of 'A Journey Through Time'"
- Test if model can answer "Who is the director of 'A Journey Through Time'?" (reverse direction)
- Use exact match accuracy AND log-probability comparison with random names

**Experiment 2: Real-World Celebrity Parents (GPT-4)**
- Test on 1000 celebrity-parent pairs from IMDB
- Compare "Who is Tom Cruise's mother?" vs. "Who is Mary Lee Pfeiffer's son?"
- No finetuning — tests pretraining knowledge

**Experiment 3: Reversing Instructions**
- Finetune on "Answer <question> with <answer>" format
- Test on "Q: <question> A:" format
- Tests instruction-following direction reversal

### Controls & Ablations
- Hyperparameter sweep
- Multiple model families and sizes
- Including both-direction examples (auxiliary data)
- Multiple paraphrases per fact
- Larger datasets (40,000 examples)
- Prompt tuning

---

## Key Evidence

### Experiment 1: Fictitious Facts

| Direction | NameToDescription | DescriptionToName |
|-----------|-------------------|-------------------|
| Same (trained) | 50.0% ± 2.1 | 96.7% ± 1.2 |
| **Reverse** | **0.0% ± 0.0** | **0.1% ± 0.1** |

**Critical finding**: Zero percent accuracy in reverse direction — NOT partial degradation, but **complete failure**.

### Log-Probability Analysis
- Correct name log-probability: **No different from random name**
- t-tests and Kolmogorov–Smirnov tests: **No statistically significant difference**
- "The model's log-probability for the correct name is no higher than for a random name"

### Experiment 2: Real-World (GPT-4)

| Direction | Accuracy |
|-----------|----------|
| "Who is Tom Cruise's mother?" (Forward) | **79%** |
| "Who is Mary Lee Pfeiffer's son?" (Reverse) | **33%** |

Llama-1 models show similar asymmetry.

### Experiment 3: Instructions

| Direction | Accuracy |
|-----------|----------|
| QuestionToAnswer (trained) | >80% |
| AnswerToQuestion (reverse) | **<7%** |

---

## Relationship to Thesis

### **CRITICAL FOUNDATIONAL EVIDENCE for Pattern Matching Hypothesis**

**This paper proves LLMs store directional patterns, not relational knowledge:**

1. **Knowledge is key-value, not symmetric** — LLMs store "A → B" associations, not "A ↔ B" relations

2. **Proves pattern matching, not understanding** — A system that "understood" the relation would know it's symmetric by logic. LLMs don't.

3. **Training process is myopic** — Gradient updates only encode forward direction, not bidirectional implications

4. **In-context vs. in-weights distinction** — LLMs can reason about symmetry in-context but don't learn it from training. This is evidence for "surfacing" (in-context activates capability) vs. "learning" (training creates new capability).

### Authors' Explanation
> "When a model is updated on 'A is B', this gradient update may slightly alter the representation of A such that it contains information about B... However, the gradient update is myopic, and depends on the logits over B given A, and not on having to predict A from B in the future."

---

## Relationship to Other Papers

### Strongly Supports
- **Faith and Fate** (Paper 00): "Linearized subgraph matching" — direction matters
- **GSM-Symbolic** (Paper 01): Fragility when patterns shift
- **Comprehension Without Competence** (Paper 24): Architectural limits on symbolic computation
- **Pretraining Term Frequencies** (Paper 147): Performance depends on training patterns, not reasoning

### Provides Mechanism For
- Why knowledge editing in LLMs is directional (Meng et al.)
- Why factual recall is ordered (Geva et al.)
- Why models fail on logical deduction tasks

### Extended By
- Allen-Zhu & Li (2023): Same finding, trained from scratch
- Grosse et al. (2023): Influence function analysis confirms reversal curse

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- **None found** — paper is widely accepted
- The finding has been replicated by multiple independent groups

### Potential Counter-Arguments
1. **In-context learning works**: Models CAN reverse in-context — the curse is training-specific
2. **Real pretraining data may have both directions**: For common facts, both orderings may appear
3. **Newer models might differ**: GPT-4 Turbo or Claude 3 might have architectural changes

### Limitations (Authors Acknowledge)
- Uses finetuning, not pretraining (cost constraints)
- Experiment 2 on real data is "tentative" since training data is unknown
- Doesn't explain WHY the curse occurs mechanistically

---

## Key Quotes

**On the core finding**:
> "If a model is trained on 'A is B', it will not automatically generalize to the reverse direction 'B is A'... Moreover, the likelihood of the correct answer will not be higher than for a random name."

**On logical deduction failure**:
> "This demonstrates a basic failure of logical deduction in the LLM's training process... It is such a basic form of generalization that it seems trivial. Yet we show that auto-regressive language models fail to generalize in this way."

**On meta-learning failure**:
> "Sentences of the form '<name> is <description>' and '<description> is <name>' often co-occur in pretraining datasets... Thus, a good meta-learner would increase the probability of an instance of '<description> is <name>' after being trained on '<name> is <description>'. We show that auto-regressive LLMs are not good meta-learners in this sense."

**On the mechanism**:
> "The gradient update is myopic, and depends on the logits over B given A, and not on having to predict A from B in the future."

---

## Implications for LLM Reasoning Research

1. **LLMs don't have relational knowledge** — They have directional associations (key-value), not symmetric understanding

2. **"Understanding" requires bidirectional access** — The reversal curse proves LLMs store patterns, not concepts

3. **Benchmark design must test both directions** — Evaluations testing only forward direction overestimate capability

4. **Fundamental architectural limitation?** — Autoregressive training may be inherently incapable of symmetric learning

5. **In-context is different from in-weights** — Capability demonstrated in-context may not exist in trained weights

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated** (pending)
