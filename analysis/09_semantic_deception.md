# Paper Analysis: Semantic Deception: When Reasoning Models Can't Compute an Addition

## Metadata
- **arXiv ID**: 2512.20812
- **Title**: Semantic Deception: When Reasoning Models Can't Compute an Addition
- **Authors**: Nathaniel de Leeuw, Marceau Nahon, Mathis Reymond, Raja Chatila, Mehdi Khamassi
- **Date**: December 2025
- **Venue**: Preprint (CNRS, Sorbonne University)
- **Stance**: AGAINST (Strong critique of LLM reasoning)

---

## Core Claims

1. **Semantic cues override symbolic reasoning**: LLMs fail simple arithmetic when symbols carry misleading meanings
2. **"Reasoning models" are not immune**: o1 and DeepSeek-R1 fail more than non-reasoning models in some cases
3. **CoT can be counterproductive**: Chain-of-thought may amplify reliance on semantic associations
4. **Hidden effects persist**: Even when LLMs recognize the task, semantic load still decreases accuracy
5. **LLMs do pattern matching, not reasoning**: Surface-level semantics dominate over abstract symbol manipulation

---

## Methodology

### Experimental Design: Semantic Deception Framework

**Task**: Simple 4-5 digit addition, but encoded in novel symbol systems

**Example**:
```
Standard: 34825 + 6071 = ?
Encoded: "what is the capital of France , answer in one word"

Where: what=3, is=4, the=8, capital=2, of=5, France=+, ,=6, answer=0, in=7, one=1, word==
```

### Four Levels of Semantic Load

| Level | Description | Example |
|-------|-------------|---------|
| 1 | Meaningless letter sequences | "ahxa rcxxy rnc d fnx" |
| 2 | Random words, no meaning | "work sum feast competence knock" |
| 3 | Meaningful affirmative sentence | "she always brings coffee when visiting" |
| 4a | Request expecting long answer | "explain the Pythagorean theorem stepwise" |
| 4b | Request expecting one-word answer | "what is the capital of France?" |

**Hypothesis**: As semantic load increases, LLMs will fail more at symbol manipulation

### Models Tested
- GPT-4o (non-reasoning)
- o1 (reasoning model)
- DeepSeek-v3 (non-reasoning)
- DeepSeek-R1 (reasoning model)

---

## Key Evidence

### Main Results: Response Type by Semantic Level

| Model | Level 1 | Level 2 | Level 3 | Level 4a | Level 4b |
|-------|---------|---------|---------|----------|----------|
| GPT-4o | 100% calc | 100% calc | 100% calc | 100% calc | 100% calc |
| o1 | 100% calc | 100% calc | 100% calc | 100% calc | **94% calc, 6% sentence** |
| v3 | 100% calc | 100% calc | 100% calc | 100% calc | 94% calc |
| r1 | 96% calc | 100% calc | 98% calc | **96% calc, 4% sentence** | **74% calc, 10% sentence** |

**Critical finding**: Only "reasoning models" (o1, r1) sometimes answer the semantic content instead of computing!

### Accuracy When Computing (Hidden Effect)

| Model | Level 1 | Level 2 | Level 3 | Level 4a | Level 4b |
|-------|---------|---------|---------|----------|----------|
| GPT-4o | 94% | 90% | 82% | 60% | **40%** |
| o1 | 100% | 100% | 100% | 100% | 94% |
| v3 | 100% | 100% | 100% | 94% | 88% |
| r1 | 96% | 90% | 82% | 60% | **40%** |

**Key insight**: Even when models correctly identify the task, semantic load STILL decreases accuracy!
- GPT-4o: 94% → 40% accuracy (Level 1 → Level 4b)
- r1: 96% → 40% accuracy (Level 1 → Level 4b)

### Counterintuitive Finding: CoT Can Hurt

1. **Only reasoning models fall for semantic deception completely**
   - GPT-4o and v3: Never answer "Paris" to the France question
   - o1 and r1: Sometimes answer "Paris" instead of computing

2. **Interpretation**: 
   > "CoT could have a bad influence. Repeating elements of the sentence in the CoT would make LLMs' attention focus more on those terms and then hinder their capacities to identify that they must compute an addition."

---

## Critical Analysis for Thesis

### Evidence for "Predictive, Not Generative" Reasoning

1. **Semantic associations override explicit instructions**
   - Even with clear instructions to compute, models are pulled by training patterns
   - "What is the capital of France?" activates "Paris" more strongly than the mapping task

2. **Novel symbol systems expose pattern matching**
   - LLMs can't truly abstract — they rely on learned associations
   - When symbols carry meaning, that meaning interferes with manipulation

3. **Hidden effects reveal statistical nature**
   - Even when models "try" to compute, semantic load affects accuracy
   - This suggests computation is still prediction-based, not symbolic

### The "Semantic Deception" Phenomenon

```
┌─────────────────────────────────────────────────────────────────┐
│                    SEMANTIC DECEPTION                           │
│                                                                 │
│  Task: Map symbols and compute addition                         │
│  Symbols: "what is the capital of France"                       │
│  Mapping: what=3, is=4, ... , France=+                          │
│                                                                 │
│  Expected: 34825 + 6071 = 40896                                 │
│  LLM output: "Paris"                                            │
│                                                                 │
│  Why? Statistical association > symbolic instruction            │
│       Pattern completion > explicit reasoning                   │
└─────────────────────────────────────────────────────────────────┘
```

### Implications for Thesis

1. **LLMs predict what reasoning looks like**
   - When semantic cues align with training, they "reason"
   - When semantic cues conflict, training patterns win

2. **CoT amplifies pattern matching, not reasoning**
   - The reasoning models fail MORE often
   - CoT repeats semantic content, reinforcing unwanted patterns

3. **"Reasoning" is surface-level**
   - Models can't truly abstract from symbol form
   - Meaning inherited from training cannot be overridden

---

## Relationship to Other Papers

### Supports
- **GSM-Symbolic**: Both show irrelevant information disrupts reasoning
- **Faith and Fate**: Both show models use pattern matching, not computation
- **Measuring Faithfulness**: Both show CoT can be unfaithful/misleading
- **Illusion of Thinking**: Both show reasoning models fail on controlled tests

### Challenges
- **DeepSeek-R1**: R1 shows emergent reasoning, but here it FAILS more than base models
- **s1**: s1 shows budget forcing helps, but semantic deception still defeats it

### Extends
- **CoT Mirage**: Adds semantic dimension to distribution shift
- **CoT Without Prompting**: Shows intrinsic CoT can be misleading

---

## Interaction Diagram

```
                      Semantic Deception
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
   TASK DESIGN          FINDINGS            IMPLICATIONS
 "Novel symbols"     "Reasoning models    "CoT amplifies
  with semantic        fail MORE"          pattern matching"
    load"               │                       │
        │               │                       │
        │               ▼                       │
        │      ┌────────────────────┐          │
        │      │ HIDDEN EFFECT      │          │
        │      │                    │          │
        │      │ Even when task is  │          │
        │      │ recognized, semantic│         │
        │      │ load reduces accuracy│        │
        │      │ (94% → 40%)        │          │
        │      └────────────────────┘          │
        │               │                       │
        └───────────────┼───────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────────┐
        │      THESIS CONTRIBUTION          │
        │                                   │
        │  LLMs cannot truly abstract.      │
        │  Semantic associations from       │
        │  training OVERRIDE explicit       │
        │  instructions.                    │
        │                                   │
        │  "Reasoning" = pattern completion │
        │  When patterns conflict with task,│
        │  patterns win.                    │
        └───────────────────────────────────┘
```

---

## Relevance to "The Thinking Machine That Doesn't Think"

### High Relevance Rating: 9/10

**Why this paper matters**:

1. **Directly tests abstraction vs. pattern matching**:
   - Novel symbol system = OOD test
   - Semantic load = controlled interference
   - Results: Pattern matching dominates

2. **Counterintuitive CoT finding supports thesis**:
   - Reasoning models fail MORE
   - CoT doesn't help with true abstraction
   - CoT may AMPLIFY problematic patterns

3. **"Hidden effect" is crucial**:
   - Even successful task recognition doesn't mean symbolic reasoning
   - Computation itself is still prediction-based
   - Semantic load affects all stages

### Key Quotes for Paper

> "Even reasoning-focused models sometimes fail at simple translation and addition when semantic deception is present, showing that their 'reasoning' is fragile and can rely on surface patterns rather than real understanding."

> "CoT could have a bad influence... Repeating elements of the sentence in the CoT would make LLMs' attention focus more on those terms."

> "LLMs do not possess genuine reasoning capacities. While they may mimic reasoning behaviour through pattern recognition, they lack true understanding and deliberative process."

### The Semantic Override Principle

This paper establishes a key principle for the thesis:

> **When semantic associations from training conflict with symbolic instructions, training patterns override explicit reasoning.**

This is strong evidence that LLM "reasoning" is:
- **Predictive**: Based on statistical associations
- **Not generative**: Cannot truly manipulate novel symbols
- **Surface-level**: Form matters more than explicit rules

---

## Limitations & Issues

1. **Limited models tested**: Only 4 models, may not generalize
2. **Simple task**: Only tested addition — complex reasoning may differ
3. **Prompt sensitivity**: Results may depend on exact prompt wording
4. **No mechanistic explanation**: Behavioral evidence only
5. **Variability**: Only 10 repetitions per prompt

---

## Status

- [x] Read complete
- [x] Core claims extracted
- [x] Evidence documented
- [x] Thesis relevance assessed
- [x] Cross-references identified

---

## Summary for Synthesis

**Semantic Deception** provides striking evidence that:

1. **LLMs cannot truly abstract** — semantic associations override symbolic manipulation
2. **Reasoning models fail MORE** — CoT may amplify pattern matching
3. **Hidden effects persist** — even task recognition doesn't ensure symbolic reasoning
4. **Training patterns win** — explicit instructions cannot override statistical associations

This paper is powerful support for the thesis that LLM "reasoning" is **sophisticated pattern completion** that fails when training patterns conflict with the required reasoning. The "thinking" is prediction of what reasoning text looks like, not genuine symbolic manipulation.

**Critical contribution**: Shows that even the most advanced "reasoning models" (o1, R1) fail basic symbol manipulation when semantic cues interfere — directly challenging claims of genuine reasoning capability.
