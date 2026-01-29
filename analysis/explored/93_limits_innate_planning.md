# Paper Analysis: On the Limits of Innate Planning in Large Language Models

## Metadata
- **arXiv ID**: 2511.21591
- **Title**: On the Limits of Innate Planning in Large Language Models
- **Authors**: Charles Schepanowski, Charles Ling (Western University)
- **Date**: November 2025
- **Venue**: Preprint
- **Stance**: AGAINST (strong evidence for planning limitations)

---

## Core Claims

1. **LLMs fail at 8-puzzle even with extensive assistance** — including SOTA models like GPT-5-Thinking
2. **Two dominant deficits identified**:
   - Brittle internal state representations → frequent invalid moves
   - Weak heuristic planning → loops and moves that don't progress toward goal
3. **External move validator doesn't help** — when given ONLY valid moves, models STILL fail (0% success)
4. **Feedback helps but is costly** — best model reaches 68% but requires ~24 min, 75K tokens, 2 attempts per puzzle
5. **Models proceed with false confidence** — output solutions as if correct despite earlier errors

---

## Methodology

### Task: 8-Puzzle
- 3×3 grid with tiles 1-8 and one blank
- Requires: state tracking + goal-directed planning
- Well-defined: step-by-step verification possible
- 181,440 solvable configurations
- Optimal solutions range 0-31 moves

### Models Tested
- **GPT-5-Thinking** (SOTA reasoning model)
- **Gemini-2.5-Pro**
- **GPT-5-mini**
- **Llama 3.1 8B-Instruct**

### Conditions
1. **Prompting strategies**: Zero-Shot, Chain-of-Thought, Algorithm-of-Thought
2. **Feedback levels**: Repeat, Specific, Suggestive (with optimal path length hint)
3. **External Move Validator**: Model given list of valid moves + previous move

---

## Key Evidence

### Finding 1: Initial Performance is Poor

| Model | Zero-Shot | CoT | AoT |
|-------|-----------|-----|-----|
| GPT-5-Thinking | 8% | 22% | **30%** |
| GPT-5-mini | 8% | 6% | 4% |
| Gemini-2.5-Pro | 2% | 0% | 0% |
| Llama 3.1 8B | 0% | 0% | 0% |

**Best result**: GPT-5-Thinking with AoT = 30% success

### Finding 2: Failure Mode Analysis

| Failure Type | Description | Prevalence |
|--------------|-------------|------------|
| **Invalid Move** | Move tile off board or non-adjacent | Dominant for most models |
| **Loop** | Repeat board configuration | Common |
| **Early Stop** | Stop before reaching goal | |
| **Parse Error** | Can't extract move list | Llama with CoT |
| **Graceful Failure** | Refuses or asks for clarification | GPT-5-mini with CoT/AoT |

### Finding 3: Feedback Helps But Is Costly

| Model | Best Condition | Success | Time | Tokens | Attempts | Moves |
|-------|---------------|---------|------|--------|----------|-------|
| GPT-5-Thinking | AoT + Suggestive | **68%** | 24 min | 75,284 | 1.97 | 48.91 |
| Gemini-2.5-Pro | Zero-Shot + Repeat | 18% | 6.7 min | 58,651 | 2.67 | 30.56 |
| GPT-5-mini | CoT + Repeat | 18% | 9.9 min | 44,272 | 2.67 | 28.44 |
| Llama 3.1 8B | Any | **0%** | — | — | — | — |

**Critical**: Even best model (68%) requires ~24 minutes and 75K tokens per puzzle!

### Finding 4: External Move Validator — CRITICAL RESULT

**Setup**: Model receives:
- Current puzzle state
- List of ALL valid moves
- Previous move (to avoid immediate reversal)

Model only needs to select best move from valid options.

**Result**: **0% success rate for ALL models**

| Model | Loop | Early Stop | Other |
|-------|------|------------|-------|
| GPT-5-Thinking | **100%** | 0% | 0% |
| Gemini-2.5-Pro | **92%** | 4% | 4% |
| Llama 3.1 8B | **86%** | 12% | 2% |
| GPT-5-mini | 26% | **68%** | 6% |

**Interpretation**: 
- GPT-5-Thinking loops 100% of the time even when given only valid moves
- GPT-5-mini wanders aimlessly (68% hit 50-move limit without solving)
- Models can't plan even when state tracking is offloaded

### Finding 5: Move Efficiency Analysis

| Model | Avg Valid Moves | Avg Progress (Manhattan) |
|-------|-----------------|--------------------------|
| GPT-5-mini | 46.7 | 6.0 |
| GPT-5-Thinking | ~15 | ~8 |
| Gemini-2.5-Pro | ~12 | ~6 |

**GPT-5-mini**: 47 valid moves for only 6 moves of progress — random walk behavior!

---

## Critical Analysis for Thesis

### This Paper Directly Challenges Tool Augmentation Rebuttals

The "Agentic Gap" and "Thinking Isn't Illusion" papers argue that LLMs fail at execution, not reasoning. **This paper tests that claim directly**:

| Claim | This Paper's Test | Result |
|-------|-------------------|--------|
| "Give tools and models succeed" | External move validator provides all valid moves | **0% success** |
| "Execution is the bottleneck" | Remove execution burden entirely | **Still fail** |
| "Models can plan if they can execute" | Only need to select best move | **Can't do it** |

### The "Agentic Gap" Rebuttal is Insufficient

| "Agentic Gap" Argument | Counter-Evidence from This Paper |
|------------------------|----------------------------------|
| Models fail at execution | With validator, execution is trivial — still fail |
| Tools reverse collapse | Move validator = tool; doesn't help |
| Interface is restrictive | Interface gives ALL valid options; still loop |

### Two Fundamental Deficits Identified

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    TWO FUNDAMENTAL DEFICITS                                 │
│                                                                             │
│  DEFICIT 1: BRITTLE STATE REPRESENTATIONS                                   │
│  • Models make invalid moves (move tile off board, non-adjacent)            │
│  • Can't maintain accurate board state across steps                         │
│  • "Hallucinate" moves that are impossible                                  │
│                                                                             │
│  DEFICIT 2: WEAK HEURISTIC PLANNING                                         │
│  • Enter loops despite explicit instruction not to                          │
│  • Select moves that don't reduce distance to goal                          │
│  • GPT-5-mini: 47 moves for 6 progress = random walk                        │
│  • Even GPT-5-Thinking loops 100% with move validator                       │
│                                                                             │
│  KEY INSIGHT: These deficits persist even when state tracking is            │
│  offloaded. The problem is not execution — it's reasoning.                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Relationship to Other Papers

### Supports
- **Illusion of Thinking** — Same finding: LLMs collapse on planning tasks
- **Faith and Fate** — Confirms pattern-matching fails on sequential reasoning
- **GSM-Symbolic** — Similar finding of brittle performance

### Directly Challenges
- **Comment: Agentic Gap** — Their "execution vs reasoning" distinction doesn't hold
- **Thinking Isn't Illusion** — Tool augmentation doesn't always work
- **Tool augmentation papers** — Move validator IS a tool; it doesn't help

### Key Distinction from "Illusion of Thinking"
Unlike Shojaee et al., this paper:
- Tests a SIMPLER task (8-puzzle vs Tower of Hanoi)
- Provides external validator (addresses token limit critique)
- Still finds 0% success

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct arXiv rebuttal found as of analysis date.

### Potential Counter-Arguments

| Counter | Response |
|---------|----------|
| "8-puzzle is artificial" | It's simpler than real planning; failure here is more damning |
| "Different tools might help" | Move validator is a strong tool; if this doesn't help, what would? |
| "Only 50 puzzles" | Acknowledged limitation, but 0% with validator is definitive |
| "Code interpreters would work" | Paper explicitly tests INNATE planning; code offloads the problem |

### Valid Limitations (Authors Acknowledge)
1. Single domain (8-puzzle only)
2. 50 puzzles (relatively small)
3. Can't fully rule out contamination

---

## Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              ON THE LIMITS OF INNATE PLANNING (2511.21591)                  │
│                                                                             │
│  EXPERIMENT DESIGN:                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐              │
│  │ 8-Puzzle    │───▶│ 4 Models    │───▶│ 3 Prompts + Feedback│              │
│  │ (simple)    │    │ (incl SOTA) │    │ + Move Validator    │              │
│  └─────────────┘    └─────────────┘    └─────────────────────┘              │
│                                                                             │
│  KEY RESULTS:                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ • Best model: 30% baseline, 68% with feedback                       │    │
│  │ • External move validator: 0% success (ALL models)                  │    │
│  │ • GPT-5-Thinking loops 100% even with only valid moves              │    │
│  │ • Two deficits: brittle state + weak planning                       │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  CHALLENGES:                              SUPPORTS:                         │
│  • Agentic Gap argument                   • Illusion of Thinking            │
│  • Tool augmentation thesis               • Faith and Fate                  │
│  • "Execution not reasoning"              • Pattern-matching hypothesis     │
│                                                                             │
│  THESIS IMPLICATION:                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Even with tools that remove execution burden, models can't plan.    │    │
│  │ The problem is not interface limitations — it's reasoning limits.   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Relevance to "The Thinking Machine That Doesn't Think"

### Highest Relevance Rating: 10/10

**Why this paper is critical**:

1. **Directly tests the "execution vs reasoning" distinction**:
   - Move validator removes execution burden
   - Models still fail → problem IS reasoning

2. **SOTA models fail**:
   - GPT-5-Thinking (described as "PhD-level intelligence")
   - Loops 100% even with valid moves provided

3. **Quantifies the deficits**:
   - Brittle state representations
   - Weak heuristic planning
   - Random-walk behavior (47 moves for 6 progress)

4. **Challenges tool augmentation rebuttals**:
   - Move validator = tool
   - Doesn't help
   - "Agentic Gap" argument is insufficient

### Key Quotes for Paper

> "Despite this level of assistance, none of the models solve any puzzles in this setting."

> "GPT-5-Thinking looped in 100% of trials... even when presented only with valid moves"

> "These findings indicate that, in the absence of external tools such as code interpreters, current LLMs have substantial limitations in planning"

> "If an LLM cannot reliably track its own state in a simple, deterministic puzzle, it may have similar issues in high-stakes, dynamic environments"

---

## Status

- [x] Read complete (full paper)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Critical analysis for thesis
- [x] Cross-references identified
- [x] **Rebuttals checked** — No direct rebuttal found
- [x] **Counter-evidence noted** — Challenges "Agentic Gap" directly

---

## Summary for Synthesis

**"On the Limits of Innate Planning"** provides **critical evidence** that:

1. **Tool augmentation doesn't always work** — Move validator = 0% success
2. **The problem is reasoning, not execution** — Execution offloaded, still fail
3. **SOTA models have fundamental planning deficits**:
   - Can't maintain state representations
   - Can't progress toward goals
   - Loop even when explicitly told not to
4. **"Agentic Gap" rebuttal is insufficient** — This paper directly tests and refutes it

**For thesis**: This paper strengthens the "Against" position by showing that even when execution is removed as a bottleneck, LLMs cannot plan. The tool augmentation rebuttals don't hold in this controlled setting.
