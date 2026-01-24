# Paper Analysis: Unveiling Causal Reasoning in Large Language Models: Reality or Mirage?

## Metadata
- **arXiv ID**: 2506.21215
- **Title**: Unveiling Causal Reasoning in Large Language Models: Reality or Mirage?
- **Authors**: Haoang Chi, He Li, Wenjing Yang, Feng Liu, Long Lan, Xiaoguang Ren, Tongliang Liu, Bo Han
- **Institutions**: National University of Defense Technology, University of Melbourne, University of Sydney, Hong Kong Baptist University
- **Date**: June 26, 2025
- **Venue**: NeurIPS 2024

---

## Core Claims

1. **LLMs only perform level-1 (shallow) causal reasoning** — They retrieve causal knowledge embedded in parameters, but cannot perform genuine human-like level-2 causal reasoning that deduces NEW causal knowledge

2. **Autoregressive mechanism is not inherently causal** — Sequential causality (token order) ≠ logical causality; David Hume's insight applies: "sequential causality is not equivalent to logical causality"

3. **Performance drop on fresh data proves reliance on memorization** — When tested on CausalProbe 2024 (post-training data), all LLMs show significant accuracy drops (up to ~30 points)

4. **G2-Reasoner improves causal reasoning** — By incorporating general knowledge (RAG) + goal-oriented prompts, modest improvements can be achieved, especially on fresh/counterfactual contexts

---

## Theoretical Framework: Two Levels of Causal Reasoning

### Definition 2: Level-1 Causal Reasoning
> "Level-1 causal reasoning involves retrieving causal knowledge embedded in model parameters and contextual information. This form of reasoning is typically fast and well-suited for handling simple cause-and-effect relationships."

**Analogy**: System 1 thinking (Kahneman's "Thinking, Fast and Slow")

### Definition 3: Level-2 Causal Reasoning
> "Level-2 causal reasoning leverages sophisticated reasoning mechanisms and internal parametric knowledge and contexts to deduce causal knowledge, including new/unseen causal knowledge. This form of reasoning is typically slow and capable of deriving new causal knowledge."

**Analogy**: System 2 thinking

### Key Insight
> "The apparent (level-1) causal reasoning capabilities of LLMs can be primarily attributed to associated knowledge from their training corpora, rather than engaging in genuine, human-like (level-2) reasoning."

---

## Theoretical Argument: Why Autoregression Fails

### The Core Problem
The paper provides a toy example (Figure 2) showing how autoregression fails:

**Sentence**: "Because of the rain, the school is closed. I cannot go to school, so I learn the new programming language at home."

**Sequential order** (as LLM sees it): rain → school closure → can't go to school → learn programming

**Actual causal relationships**:
- rain → school closure ✓
- can't go to school → learn programming ✓
- BUT: "school closure" does NOT cause "can't go to school" — they're BOTH effects of rain!

> "Sequential causality is not equivalent to logical causality" — David Hume

### Formal Analysis via Structural Causal Models

The paper models causal reasoning with a causal graph:
- **X** = cause semantic variable
- **Y** = effect semantic variable  
- **C** = laws of physical world (confounding variable)
- **T** = natural language text representation
- **h(X,Y,ε) = T** where ε represents textual variability (language type, context, voice)

**Key insight**: The text T is a *conditioned collider*, which creates spurious associations. The variability ε "poses challenges for LLMs' causal reasoning."

### Two Major Issues Identified:

1. **Unfamiliar contexts**: "If the context is not sequentially causal and unfamiliar for LLMs, they tend to misunderstand the causal knowledge"

2. **High-probability wrong tokens**: "If P(w*t+1|...) is large but the text represented by (...,wt,w*t+1) is inconsistent with the laws of causality, LLMs tend to respond with an incorrect causal reasoning result"

---

## CausalProbe 2024 Benchmark

### Construction

**Corpora Sources**:
- BBC and The Guardian articles
- Date range: January 1, 2024 to April 29, 2024
- Categories: technology, environment, business, health, world news, culture, climate
- Total: 967 BBC articles + 2702 Guardian articles

**Benchmark Generation**:
- Used GPT-3.5 turbo (and GPT-4o mini for CausalProbe-M)
- Total: 6,922 Q&A pairs (3,461 per sub-dataset)
- Filtered for sensitive content using Google DLP API
- Quality control via crowdsourcing (13 qualified volunteers, 89.2% qualification rate)

### Three Sub-benchmarks

| Benchmark | Description | Challenge |
|-----------|-------------|-----------|
| **CausalProbe-E (Easy)** | Standard causal Q&A following CausalQA format | Can LLMs answer novel causal questions? |
| **CausalProbe-H (Hard)** | Includes deliberately made-up **fake cause-effect pairs** | Can LLMs distinguish real from misleading causality? |
| **CausalProbe-M (Multiple-choice)** | 1-4 correct answers per question | Prevents random guessing; tests comprehensive understanding |

### Freshness Guarantee

**Training data cutoffs vs. CausalProbe 2024**:

| Model | Training Cutoff | CausalProbe 2024 |
|-------|-----------------|------------------|
| LLaMA 2 7B | Sep 2022 | Jan 2024 |
| LLaMA 3 8B | Mar 2023 | Jan 2024 |
| GPT 3.5 turbo | Sep 2021 | Jan 2024 |
| Claude 3 opus | Aug 2023 | Jan 2024 |

**Min-K% Prob verification** (membership inference attack):

| Dataset | LLaMA 2 (Min-10%) | LLaMA 3 (Min-10%) |
|---------|-------------------|-------------------|
| COPA | 13.27 | 16.64 |
| e-CARE | 13.08 | 14.48 |
| CausalNet | 10.84 | 11.30 |
| **CausalProbe-E** | **9.34** | **9.03** |
| **CausalProbe-H** | **9.93** | **9.70** |

*Lower values = fresher/less likely to be in training data*

---

## Key Experimental Results

### Main Results Table (Exact Match)

| Dataset | LLaMA 2 7B | LLaMA 3 8B | GPT 3.5 | Claude 3 |
|---------|------------|------------|---------|----------|
| **COPA** | 0.752 | 0.937 | 0.948 | **0.991** |
| **e-CARE** | 0.684 | 0.778 | 0.814 | 0.861 |
| **CausalNet** | 0.673 | 0.857 | 0.897 | 0.933 |
| **CausalProbe-E** | 0.616 | 0.715 | 0.732 | 0.758 |
| **CausalProbe-H** | **0.565** | **0.652** | **0.671** | **0.692** |

### Performance Drops (COPA → CausalProbe-H)

| Model | COPA | CausalProbe-H | Drop |
|-------|------|---------------|------|
| LLaMA 2 7B | 75.2% | 56.5% | **-18.7pp** |
| LLaMA 3 8B | 93.7% | 65.2% | **-28.5pp** |
| GPT 3.5 turbo | 94.8% | 67.1% | **-27.7pp** |
| Claude 3 opus | 99.1% | 69.2% | **-29.9pp** |

### Critical Observation
> "Claude 3 opus, a current SOTA LLM, only achieves the average exact match less than 70% [on CausalProbe-H]. The popular and competitive open-source LLM, LLaMA 2 7B chat, just get it half right."

> "As the corpora of CausalProbe 2024 comes from news, it is close to everyday life and hardly consists of professional concepts and unfamiliar words. Thus, the main cause of performance degradation is the freshness of corpora."

### CausalProbe-M Results (Multiple Correct Answers)
> "Under exact match, which required all correct answers to be precisely identified, all models struggled. However, when using partial match... GPT and Claude performed relatively well, achieving accuracy rates of approximately 75% and 85% respectively."

### G2-Reasoner Improvements

| Dataset | Model | Vanilla | G2-Reasoner | Improvement |
|---------|-------|---------|-------------|-------------|
| CausalProbe-E | LLaMA 2 | 0.616 | 0.642 | +2.6% |
| CausalProbe-H | GPT 3.5 | 0.671 | 0.693 | +2.2% |
| CausalProbe-H | Claude 3 | 0.692 | 0.696 | +0.4% |

**Key finding on RAG alone**:
> "In fact, RAG is just the ablated G2-Reasoner, and it usually cannot reach the vanilla method, indicating the effectiveness of our goal-oriented prompt."

### Human Baseline
Qualified volunteers (13 of 17 passed screening) achieved **80-100% accuracy** on CausalProbe-H with perceived difficulty of 4-7 on a 1-10 scale.

---

## G2-Reasoner Framework

### Components

1. **General Knowledge Retrieval (RAG)**:
   - Uses ~16 MB general knowledge Q&A dataset from HuggingFace
   - Meta's Contriever for retrieval
   - Faiss for vector database
   - Retrieves related knowledge as reference

2. **Goal-Driven Prompt**:
   - Counters autoregressive tendency to lose coherence
   - Guides LLMs toward causal reasoning goal
   - Prevents "aimlessly generating answers"

### Theoretical Motivation
> "Human reasoning processes, including causal reasoning, are driven by specific reasoning tasks and supported by extensive foundational knowledge acquired throughout life... When solving plane geometry proof problems, students apply three basic axioms as criteria while working toward the target proposition."

> "Unlike humans, LLMs perform causal reasoning through next-token predictions based solely on patterns learned during training, without necessary knowledge to guide their reasoning."

---

## Relationship to Other Papers

### Supports
- **Faith and Fate (2305.18654)**: Both show LLMs rely on pattern matching rather than genuine reasoning
- **GSM-Symbolic (2410.05229)**: Both show high accuracy on familiar data hides brittleness on fresh data
- **Planning Gap (2601.14456)**: Both show ID/OOD gap as evidence of memorization
- **Beyond Memorization (2601.13392)**: Both use temporal freshness to test genuine reasoning vs. retrieval
- **CoT Mirage (2508.01191)**: Both show ID success, OOD failure pattern

### Provides Evidence For
- **Surfacing hypothesis**: LLMs surface causal knowledge from training, don't generate it
- **Distribution-bounded reasoning**: Performance drops when data is OOD temporally

### Challenged By
- **Physics of LLMs 2.1 (2407.20311)**: Shows some genuine OOD generalization in controlled settings
- **Emergent Symbolic Mechanisms (2502.20332)**: Claims LLMs develop genuine mechanisms

### Does Not Address
- **Reasoning models (o1, R1)**: Only tested older models (pre-2024 cutoffs)
- **Compositional generalization**: Focuses on causal rather than compositional reasoning
- **Mechanistic interpretability**: Uses behavioral testing, not circuit analysis

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found (recent paper, Jun 2025)

### Potential Counter-Arguments

1. **Benchmark construction bias**: GPT-3.5 generated the benchmark; may inherit biases that favor/disfavor certain models

2. **Temporal freshness ≠ reasoning test**: Fresh news could simply contain unfamiliar entities, not require novel causal reasoning

3. **Context provision changes the task**: Adding full context to CausalProbe 2024 (unlike COPA) may make comparison unfair

4. **G2-Reasoner improvements are modest**: +2.6% improvement doesn't demonstrate level-2 reasoning achieved

### Limitations (Authors Acknowledge)

1. **G2-Reasoner doesn't achieve genuine causal reasoning**:
> "The proposed causal reasoning method for LLMs is only a step forward, but cannot realize the genuine causal reasoning."

2. **Cannot fully confirm freshness**:
> "The contents of CausalProbe 2024 are still part of human knowledge, and LLMs may have seen comparable information. For example, LLMs may not know one latest event, but their pre-training data may include a similar event."

3. **Simple causal reasoning only**:
> "We only consider a simple type of causal reasoning tasks that contain a single cause-effect pair. The cases of multiple cause-effect pairs and mediators are excluded."

4. **Benchmark biases**: Model bias, generation bias, language/cultural bias (English/Western)

---

## Key Quotes

### On the "Mirage"
> "Does this reflect LLMs' genuine causal reasoning capability or only a 'mirage'? The answer leans more towards the latter."

> "LLMs are only capable of performing shallow (level-1) causal reasoning, primarily attributed to the causal knowledge embedded in their parameters, but they lack the capacity for genuine human-like (level-2) causal reasoning."

### On Autoregression's Limits
> "Autoregressive LLMs suffer from capturing logical causal knowledge in complex texts, restricting their generalization abilities on unseen tasks."

> "Sequential causality is not equivalent to logical causality."

### On the Evidence
> "The main cause of performance degradation is the freshness of corpora, indicating the fact that LLMs only are capable of doing level-1 causal reasoning, instead of genuine level-2 causal reasoning."

> "Claude 3 opus, a current SOTA LLM, only achieves the average exact match less than 70%."

### On the Path Forward
> "This work provides valuable insights into the current state of LLMs' causal reasoning and offers a promising attempt to move towards level-2 causal reasoning, bringing LLMs closer to reaching genuine causal reasoning capabilities."

---

## Relevance to Thesis

**STRONGLY SUPPORTS thesis** — Provides both theoretical analysis and empirical evidence that LLMs' apparent causal reasoning is pattern retrieval (level-1), not genuine reasoning (level-2).

### Key Evidence for Thesis

| Finding | Evidence | Strength |
|---------|----------|----------|
| **Pattern matching** | 99.1% → 69.2% drop (Claude) on fresh data | Strong |
| **Temporal ID/OOD gap** | Up to 30pp drop when data is post-training | Strong |
| **Autoregression limits** | Theoretical argument + Hume's insight | Moderate |
| **Human baseline gap** | Humans: 80-100%, LLMs: 56-69% on same task | Strong |

### Alignment with Main Thesis
- **Distribution-bounded**: Performance tied to training data temporal cutoff
- **Retrieval, not reasoning**: Explicitly argues LLMs retrieve rather than reason
- **Fresh data reveals limits**: Temporal freshness as OOD test parallels other OOD failures in corpus

### Limitations for Thesis
- Only tests older models (pre-reasoning model era)
- Causal reasoning is one type; may not generalize to all reasoning
- G2-Reasoner shows some improvement, suggesting not purely pattern matching

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**

---

## Verdict: STRONGLY SUPPORTS THESIS

The paper provides compelling evidence that LLMs' causal reasoning is "level-1" (pattern retrieval from training data) rather than "level-2" (genuine reasoning that can handle novel situations). The 30pp performance drop from COPA to CausalProbe-H, combined with the theoretical argument about autoregression's limits, strongly supports the claim that LLM reasoning is distribution-bounded pattern matching rather than genuine causal reasoning.

Key strength: Uses temporal freshness (post-training-cutoff data) as a clean test of whether reasoning is genuine vs. memorized — similar methodology to other strong papers in the corpus (GSM-Symbolic, Beyond Memorization, Planning Gap).
