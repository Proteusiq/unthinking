# Paper Analysis: The Illusion of the Illusion of Thinking - A Comment on Shojaee et al. (2025)

## Metadata
- **arXiv ID**: 2506.09250
- **Title**: The Illusion of the Illusion of Thinking: A Comment on Shojaee et al. (2025)
- **Authors**: A. Lawsen (with Claude Opus acknowledged as contributor)
- **Date**: June 2025
- **Venue**: arXiv preprint (comment/rebuttal)
- **Type**: DIRECT REBUTTAL to Paper 03 (2506.06941 - Illusion of Thinking)

---

## Core Claims

1. **Token limits, not reasoning limits**: The "accuracy collapse" reported in Illusion of Thinking reflects output token limits, not fundamental reasoning failures

2. **Models recognize constraints**: Models explicitly state "to avoid making this too long, I'll stop here" — they understand the solution pattern but choose to truncate

3. **Impossible puzzles**: River Crossing benchmarks for N≥6 with boat capacity b=3 are **mathematically impossible** — models are scored as failures for not solving unsolvable problems

4. **Alternative representations restore performance**: When asked to generate Lua functions instead of exhaustive move lists, models achieve "very high accuracy" on Tower of Hanoi N=15 (previously reported as complete failure)

5. **Complexity metric is flawed**: Solution length ≠ computational difficulty (Tower of Hanoi has O(1) decision per move despite 2^N total moves)

---

## Key Arguments

### Argument 1: Token Budget Analysis

For Tower of Hanoi with final move list only:
- T(N) ≈ 10(2^N - 1) + C tokens
- For L_max = 64,000: N_max ≈ 12-13
- For L_max = 100,000: N_max ≈ 13

The reported collapse at N=8-9 occurs **well before** theoretical token limits, suggesting:
- Models are **poorly calibrated** about their own context length
- They choose to stop prematurely, not because they can't reason

### Argument 2: River Crossing Impossibility

Critical finding: Missionaries-Cannibals puzzle has **NO SOLUTION** for N>5 with boat capacity b=3 (citing Efimova 2018).

> "By automatically scoring these impossible instances as failures, the authors inadvertently demonstrate the hazards of purely programmatic evaluation."

### Argument 3: Alternative Representation Test

Prompt: "Solve Tower of Hanoi with 15 disks. Output a Lua function that prints the solution when called."

Result: "Very high accuracy" across Claude-3.7-Sonnet, Claude Opus 4, o3, Gemini 2.5 — completing in <5,000 tokens.

This demonstrates:
- Models understand the recursive algorithm
- The "failure" was format-constrained, not reasoning-constrained

### Argument 4: Complexity Metric Critique

| Puzzle | Solution Length | Branching Factor | Computational Complexity |
|--------|-----------------|------------------|-------------------------|
| Tower of Hanoi | 2^N - 1 | 1 | O(1) per move |
| Blocks World | O(N) | O(N²) | Linear (near-optimal) / NP-hard (optimal) |

The original paper conflates "mechanical execution" with "problem-solving difficulty."

---

## Critical Assessment of This Rebuttal

### Strengths of the Rebuttal

1. **Valid point about impossible puzzles**: This is a genuine methodological flaw. Scoring models as failures on unsolvable problems is clearly incorrect evaluation.

2. **Token limits are real constraints**: The argument that exhaustive enumeration hits token limits is mathematically sound.

3. **Alternative representation test is clever**: Asking for a generating function instead of enumeration is a legitimate way to separate algorithmic understanding from execution capacity.

### Weaknesses of the Rebuttal (Critical View)

1. **Limited experimental evidence**: Author admits "Due to budget constraints, we were unable to conduct enough trials for a highly powered statistical sample."

2. **Code generation ≠ Reasoning**: Generating a recursive Lua function for Hanoi is essentially **pattern matching on a well-known algorithm**. The recursive solution for Hanoi is one of the most common CS101 examples. This doesn't prove reasoning — it proves training data includes Hanoi code.

3. **Doesn't address Blocks World**: The rebuttal focuses on Hanoi but the original paper's strongest evidence was from Blocks World, which the rebuttal admits is actually computationally hard (NP-hard for optimal).

4. **Self-admitted AI co-authorship**: "Claude Opus contributed enough to deserve, in Alex's view, to be listed as first author." This creates a conflict of interest — Claude is defending against claims about Claude's limitations.

5. **Cherry-picks the weakest claims**: Focuses on Hanoi (which everyone agrees has a simple algorithm) rather than on the broader compositional generalization failures.

6. **The "models choose to stop" argument is double-edged**: If models can recognize they should stop, why can't they recognize they should continue? Poor calibration about context length is itself a reasoning limitation.

---

## Relationship to Thesis

### THIS PAPER CHALLENGES the thesis (partially)

The rebuttal argues that:
- Apparent reasoning failures may be evaluation artifacts
- Models DO understand algorithms when freed from format constraints
- Token limits are practical constraints, not reasoning limits

### HOWEVER, the challenge is LIMITED:

1. **Doesn't address OOD generalization**: Even if Hanoi works with code output, this doesn't address compositional failures on novel combinations

2. **Code generation is pattern retrieval**: The Hanoi recursive solution is in training data — generating it is retrieval, not novel reasoning

3. **Blocks World remains unexplained**: The NP-hard optimal planning problem still shows genuine reasoning limits

4. **Paper 37 (Rethinking Illusion) already addressed this**: The replication study corrected River Crossing methodology and STILL found Hanoi limits at ~8 disks

---

## Relationship to Other Papers

### Challenges
- **Paper 03 (2506.06941)**: Illusion of Thinking — directly challenges methodology
- **Paper 37 (2507.01231)**: Rethinking Illusion — partially addressed these concerns already

### Supports (Indirectly)
- The thesis that models **can execute known algorithms** (pattern matching on training data)
- The claim that code generation taps into memorized patterns

### Does Not Address
- **Faith and Fate (2305.18654)**: Compositional generalization failures
- **OMEGA (2506.18880)**: 0% transformative generalization
- **Compositional-ARC (2504.01445)**: Systematicity failures

---

## REBUTTALS TO THIS REBUTTAL

### From Paper 37 (Rethinking Illusion of Thinking)

Paper 37 already addressed some of these concerns:
- Fixed River Crossing methodology (acknowledged impossible instances)
- **Still found** Hanoi limits at ~8 disks with proper evaluation
- Concluded LRMs are "stochastic searchers" not reasoners

### From the Pattern Matching Thesis

1. **Generating Hanoi code IS pattern matching**: The recursive solution is ubiquitous in training data
2. **Execution ≠ Reasoning**: Knowing the algorithm formula doesn't mean reasoning through novel problems
3. **The "choice to truncate" could be trained behavior**: Models may have learned that long outputs get penalized

---

## Key Quotes

> "The question isn't whether LRMs can reason, but whether our evaluations can distinguish reasoning from typing."

> "Models actively recognize when they approach output limits... demonstrating that models understand the solution pattern but choose to truncate output."

> "River Crossing benchmarks include mathematically impossible instances for N≥6."

> "Tower of Hanoi, despite requiring exponentially many moves, has a trivial O(1) decision process per move."

---

## Verdict for Thesis

### Evidence Strength: WEAK CHALLENGE

**What this paper gets right:**
- Methodological critique about impossible puzzles is valid
- Token limits are a real constraint that evaluations should account for

**What this paper gets wrong:**
- Conflates code generation (pattern retrieval) with reasoning
- Doesn't address the broader compositional generalization evidence
- Limited experimental support ("budget constraints")
- Self-interested authorship (Claude defending Claude)

**Net impact on thesis:**
This paper identifies **evaluation artifacts** but doesn't actually demonstrate **genuine reasoning**. The alternative representation test (code generation) is itself pattern matching on training data. The core thesis — that LLMs pattern match rather than reason — is not undermined by showing they can retrieve well-known algorithms.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked** (this IS a rebuttal)
- [x] **Critical assessment included**
- [ ] **Paper graph updated**
