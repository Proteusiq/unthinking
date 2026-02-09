# Paper Analysis: Reasoning Abilities of Large Language Models: In-Depth Analysis on the Abstraction and Reasoning Corpus

## Metadata
- **arXiv ID**: 2403.11793
- **Title**: Reasoning Abilities of Large Language Models: In-Depth Analysis on the Abstraction and Reasoning Corpus
- **Authors**: Seungpil Lee, Woochang Sim, Donghyeon Shin, Wongyu Seo, Jiwon Park, Seokki Lee, Sanha Hwang, Sejin Kim, Sundong Kim
- **Date**: March 2024 (v1), November 2024 (v2)
- **Venue**: ACM TIST (Transactions on Intelligent Systems and Technology)
- **Affiliation**: GIST (Gwangju Institute of Science and Technology)

---

## Core Claims

1. **Process-centric evaluation needed**: Results-centric methods make it difficult to assess the inference process
2. **Language of Thought Hypothesis (LoTH) framework**: Evaluates LLM reasoning via three components:
   - **Logical Coherence**: Ability to follow basic logical principles
   - **Compositionality**: Capability to construct complex ideas from simpler components
   - **Productivity**: Capacity to formulate indefinite number of solutions from finite elements
3. **LLMs lag behind humans** in all three LoTH components despite showing basic reasoning ability
4. **ARC demands combinatorial syntax and compositional semantics** — validates its use as reasoning benchmark

---

## Methodology

### Why ARC?
- Human accuracy: ~80%
- Best AI models: ~30%
- LLMs: ~10%
- Requires: objectness, goal-directedness, arithmetic, geometric topology
- Demands high abstraction and multiple reasoning steps

### Why LoTH Framework?
> "A new perspective is needed to evaluate AI's inference processes; Language of Thought Hypothesis (LoTH) enhances discussions by integrating reasoning components with quantitative metrics."

### Three Experiments

**1. Logical Coherence (Section 3.1)**
- Test: Solve ARC with CoT, LtM, ToT prompting
- Analyze: Types of tasks solved, consistency across similar tasks

**2. Compositionality (Section 3.2)**
- Test: Can LLMs combine DSL functions to solve tasks?
- Analyze: Understanding of functions vs ability to compose them

**3. Productivity (Section 3.3)**
- Test: Can LLMs generate novel valid input-output pairs?
- Analyze: Ability to produce varied inputs for same output

---

## Key Evidence

### 1. Logical Coherence Results

| Prompting | Correct Answer | Correct Answer + Process |
|-----------|----------------|--------------------------|
| CoT | 10.6% | 4.0% |
| LtM | 5.6% | 3.0% |
| ToT | 6.4% | 2.4% |

**Critical finding**: 
> "Solution processes often lacked correct reasoning, regardless of prompting technique. This suggests LLMs' logical reasoning capabilities diverge from human reasoning."

**By difficulty level**:
| Difficulty | CoT | LtM | ToT | Average |
|------------|-----|-----|-----|---------|
| Entry | 100% | 20% | 50% | 56.67% |
| Easy | 30% | 19% | 22% | 23.67% |
| Medium | 0% | 0% | 0% | **0%** |
| Hard | 0% | 2.85% | 0% | **0.95%** |

### 2. Compositionality Results

**Function understanding**: LLMs can understand individual DSL functions
**Function combination**: LLMs struggle to combine functions appropriately

> "While LLMs sufficiently understand the functions and their relationship with images, their ability to decompose and combine functions to achieve the desired outcome is weak."

### 3. Productivity Results

LLMs struggle to generate novel valid input-output pairs that follow learned rules.

### 4. Key Failure Patterns

**Incorrect reasoning processes**:
> "Among the tasks where LLM has correctly answered, the process in some cases is flawed"

Example: Task requires counting black squares in 5×5 objects, extracting largest. LLM:
- CoT: "sorted objects" then selected middle (wrong logic, right answer)
- LtM/ToT: Misidentified objects entirely

**Inconsistent task solving**:
> "If LLMs have a consistent logical structure, they should produce consistent results for the same type of task"

Two identical-type tasks (pattern repetition):
- Task 1: All three prompts solved
- Task 2: None solved

---

## Key Quotes

### On results-centric evaluation
> "The existing methods for evaluating the inference abilities of Large Language Models (LLMs) have been results-centric, making it difficult to assess the inference process."

### On LLM limitations
> "While large language models possess weak inference abilities, they still lag in terms of logical coherence, compositionality, and productivity"

### On the three deficits
> "Compared to human reasoning abilities, LLM lags in three areas: 
> 1) It is weak in understanding aspects such as objectness in images. 
> 2) Its logical reasoning abilities, especially in a step-by-step manner, are weak. 
> 3) It struggles with understanding and generating unseen representations."

### On ARC variant comparison
> "The significant decrease in difficulty of benchmarks that reduced step-by-step reasoning complexity supports the idea that ARC tasks requires a combination of sequential transformations."

- 1D-ARC (simplified): ~90% GPT-4
- MC-LARC (multiple choice): ~75% GPT-4
- Mini-ARC (same complexity): ~15% GPT-4
- ARC (original): ~10% GPT-4

---

## Relationship to Other Papers

### Supports
- **Faith and Fate (2305.18654)**: Both show compositional reasoning failure
- **Compositional-ARC (2504.01445)**: Same benchmark, similar findings (systematicity failure)
- **OMEGA (2506.18880)**: Same pattern — primitives work, compositions fail
- **CryptoX (2502.07813)**: Both show compositional reasoning as key bottleneck

### Extends
- **Valmeekam et al. (2024)**: Adds LoTH framework to planning critique
- **Prior ARC work**: Process-centric analysis, not just results

### Provides Framework For
- **Evaluating reasoning process**: Three-component LoTH framework
- **Understanding failure modes**: Logical coherence, compositionality, productivity

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found (March 2024 paper, specialized analysis)

### Potential Counter-Arguments

1. **LoTH may not apply to LLMs**: LLMs don't have "mental representations" in the LoTH sense
2. **Prompting may not be optimal**: Different prompts might yield different results
3. **GPT-4 is not the only model**: Reasoning models (o1) may perform differently
4. **ARC-specific**: Results may not generalize to other reasoning tasks

### Limitations (Authors Acknowledge)

1. Focused on prompting techniques only
2. Did not explore fine-tuning or architecture changes
3. Limited to GPT-4 and GPT-4-32k
4. ARC may not capture all aspects of reasoning

---

## Relevance to Thesis

**SUPPORTS** thesis that LLM reasoning is pattern matching, not genuine reasoning.

### Evidence FOR Thesis

1. **Correct answers with wrong processes**: 
   - 10.6% correct answers but only 4.0% correct processes
   - **6.6% got lucky** — pattern matching, not reasoning

2. **0% on Medium/Hard tasks**: 
   - Simple tasks: reasonable accuracy
   - Complex tasks requiring composition: complete failure
   - This is the **compositional generalization failure** signature

3. **Inconsistent task solving**: 
   - Same task type, different results
   - **No consistent logical structure** = pattern matching

4. **ARC variant comparison**:
   - 1D-ARC (90%) vs ARC (10%) 
   - Simplifying representation helps enormously
   - **Representation matters more than "reasoning"**

5. **Function understanding vs composition**:
   - Can understand individual functions
   - Cannot compose them
   - **Pattern matching individual steps, not reasoning about combinations**

### Key Insight for Synthesis

The LoTH framework provides a **theoretical grounding** for the thesis:

**Logical Coherence**: LLMs lack it — get right answers with wrong reasoning
**Compositionality**: LLMs lack it — can't combine primitives into novel solutions  
**Productivity**: LLMs lack it — can't generate novel valid instances

All three failures point to the same conclusion:
> LLMs are **pattern matchers**, not **reasoners**

The process analysis is particularly valuable:
- Results-centric: LLM got 10.6% correct
- Process-centric: LLM reasoned correctly only 4.0%
- **60% of "successes" were lucky pattern matches**

### Integration with Thesis

This paper provides the clearest articulation of the **process vs results** distinction:

- **Results-centric view**: LLMs show some reasoning ability
- **Process-centric view**: LLMs mostly pattern match

The LoTH framework maps directly to the thesis:
- Logical coherence = following learned patterns (not logical inference)
- Compositionality = pattern coverage in training (not rule combination)
- Productivity = generation within distribution (not novel rule application)

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] Paper graph updated
