# Paper Analysis: Rethinking the Illusion of Thinking

## Metadata
- **arXiv ID**: 2507.01231
- **Title**: Rethinking the Illusion of Thinking
- **Authors**: Iñaki Dellibarda Varela, Pablo Romero-Sorozabal, Eduardo Rocon, Manuel Cebrian
- **Date**: July 2025
- **Venue**: arXiv preprint
- **Institution**: CSIC-UPM (Spanish National Research Council)
- **Type**: Partial rebuttal + partial confirmation of "The Illusion of Thinking" (2506.06941)

---

## Core Claims

1. **River Crossing failures were due to UNSOLVABLE configurations**: The original "Illusion of Thinking" paper tested LRMs on mathematically unsolvable puzzles (k=3, N>5 violates solvability constraint k≥4 OR N≤2k-1)

2. **On SOLVABLE River Crossing, LRMs excel**: Once restricted to valid configurations, LRMs "effortlessly solve large instances involving over 100 agent pairs"

3. **Towers of Hanoi failures are REAL cognitive limitations**: Stepwise prompting and agentic dialogue don't fix the ~8 disk threshold — this is genuine reasoning limitation, not output window constraint

4. **Task difficulty ≠ problem size**: Peak difficulty occurs at intermediate configurations (N=5, k=3 for River Crossing), not largest instances — "phase transition" region

5. **LRMs are "stochastic, RL-tuned searchers"**: Not genuine reasoners, but search procedures in discrete state space

---

## Methodology

### Models Tested
- Gemini 2.5 Pro (state-of-the-art reasoning model)

### Experimental Approaches

**1. Stepwise Resolution (Towers of Hanoi)**
- Break full puzzle into N subproblems
- Each prompt: generate next p steps from current state
- Tests whether output window constraint explains failures

**2. Agentic Dialogue (Towers of Hanoi)**
- Two LRMs collaborate through alternating turns
- Shared memory, each proposes next p steps
- Tests whether multi-agent collaboration helps

**3. Solvable-Only River Crossing**
- Restrict to configurations satisfying: k≥4 OR N≤2k-1
- Tests actual reasoning vs. testing impossible tasks

---

## Key Evidence

### River Crossing: Original Failures Were Methodological Error

**Solvability constraints**:
- k ≥ 4 → solvable for any N
- k ≤ 3 → N ≤ 2k-1 (i.e., N ≤ 5 for k=3)

Original paper used k=3 with N>5 — **mathematically unsolvable**

### River Crossing: LRMs Succeed on Valid Problems

| Configuration | Success Rate | Notes |
|---------------|--------------|-------|
| N=2-3, k=3 | ~100% | Easy, intuitive |
| N=4, k=3 | Lower | Harder, constrained solution space |
| N=5, k=3 | Lowest | "Phase transition" — minimum solutions |
| N=100, k=4 | ~100% | Large but solvable; 200 correct moves |

> "Even in large-scale instances such as (N=100, k=4)—which require the model to perform up to 200 correct moves—the LRM solves the task reliably"

### Towers of Hanoi: Failures Are REAL

| Strategy | Threshold | Result |
|----------|-----------|--------|
| Single-pass (original) | ~8 disks | Fails |
| Stepwise resolution | ~8 disks | **Still fails** |
| Agentic dialogue | ~4 disks | **Worse** |

> "Even when decomposing the task, performance does not significantly improve... Once puzzle complexity reaches approximately N=8, both strategies fail consistently"

### Token Usage Patterns Confirmed

- High tokens when task perceived as solvable
- Low tokens when task exceeds capability (early abandonment)
- Agentic dialogue: high tokens even when failing (agents think it's solvable, loop forever)

---

## Critical Analysis: Relationship to Thesis

**Thesis**: LLM reasoning is practical but bounded by training distributions, not genuinely generative.

### How This Paper Challenges the Thesis

1. **LRMs solve 200-step River Crossing**: This is long-horizon planning success — the thesis might predict failure here

2. **Phase transition behavior**: Non-linear difficulty profile suggests LRMs have learned STRUCTURE of the problem, not just patterns

3. **Successful search in large state spaces**: N=100, k=4 requires navigating complex search space correctly

### Why This Paper Supports the Thesis

1. **Towers of Hanoi failures are CONFIRMED as genuine limitations**
   
   > "Previously reported failures solving the Towers of Hanoi were not purely result of output constraints, but also partly a result of cognition limitations"
   
   The thesis predicts failures at complexity thresholds — this confirms it.

2. **LRMs characterized as "stochastic searchers"**
   
   > "Today's LRMs are stochastic, RL-tuned searchers in a discrete state space we barely understand"
   
   This is exactly the thesis framing — pattern-based search, not genuine reasoning.

3. **River Crossing success is IN-DISTRIBUTION**
   
   River Crossing with k=4 is a well-structured problem with clear solution patterns. The model has likely seen similar constraint-satisfaction problems in training. Success on structured, learnable problems is consistent with the thesis.

4. **Failures at "phase transitions" reveal brittleness**
   
   > "The configuration N=5, k=3 lies on the boundary... contains very few viable solutions, each of which requires extremely precise reasoning"
   
   When solution space is constrained (requires genuine reasoning, not pattern matching), LRMs fail. This supports the thesis.

5. **Agentic dialogue makes it WORSE**
   
   If LRMs had genuine reasoning, collaboration should help. Instead:
   > "Performance shows a clear drop compared to the stepwise resolution setup"
   
   Multi-agent doesn't help because there's no genuine reasoning to combine.

6. **"Stochastic search" framing**
   
   The paper explicitly frames LRMs as search procedures:
   > "Using LRMs to solve these problems is equivalent to unleashing a stochastic search procedure, chain-of-thought sampling refined by reinforcement learning"
   
   This is the thesis: RL-tuned pattern matching, not reasoning.

---

## Relationship to Other Papers

### Partially Rebuts
- **Illusion of Thinking (2506.06941)**: River Crossing methodology was flawed (tested unsolvable configs)

### Confirms
- **Illusion of Thinking (2506.06941)**: Towers of Hanoi ~8 disk limit is real cognitive limitation
- **Lawsen (2506.09250)**: Output window ISN'T the issue — confirms this by showing stepwise prompting doesn't help

### Supports Broader Findings
- **OMEGA (2506.18880)**: Same "phase transition" / complexity threshold patterns
- **Faith and Fate (2305.18654)**: Failures at constrained solution spaces

### Challenges
- **Agentic Gap Comment (2506.18957)**: Agentic approaches don't help Towers of Hanoi (makes it WORSE)
- **Thinking Isn't Illusion (2507.17699)**: Tool augmentation helps, but this paper shows base reasoning is genuinely limited

### Note on Relationship to "Illusion of Thinking"
This paper has a DUAL relationship:

**Partial REBUTTAL (River Crossing)**:
- Original paper tested mathematically UNSOLVABLE configurations (k=3, N>5)
- Once restricted to solvable configs, LRMs succeed at 200-step problems
- This invalidates the River Crossing failure claims

**Partial CONFIRMATION (Towers of Hanoi)**:
- Confirms ~8 disk limit is REAL cognitive limitation
- Stepwise prompting doesn't help (refutes output-window explanation)
- Agentic dialogue makes it WORSE

The authors state they don't aim to "undermine" the original study, but the River Crossing finding IS a significant methodological rebuttal. They're being diplomatically framed as "complementary findings."

---

## REBUTTALS TO THIS PAPER

### Methodological Issues

1. **Single model (Gemini 2.5 Pro)**
   - Results may not generalize to other LRMs
   - No comparison with Claude, DeepSeek-R1 from original study

2. **Limited trials (10 per configuration)**
   - High variance possible
   - Authors acknowledge need for more tests

3. **River Crossing success may be memorization**
   - k=4 configurations have standard solution patterns
   - May be in training data

### Limitations (Authors Acknowledge)

1. "The next steps... will primarily focus on scaling up the experimental framework"
2. "It would be valuable to assess whether the observed performance trends generalize across different LLM architectures"
3. Success rate values from original paper are "manually estimated from the published plots"

### Missing Tests

1. **OOD River Crossing variants**: Novel constraint types
2. **Truly novel planning tasks**: Not classic puzzles
3. **Compositional generalization**: Combining skills

---

## Key Quotes

### On the nature of LRMs:
> "Today's LRMs are stochastic, RL-tuned searchers in a discrete state space we barely understand"

This is the thesis framing.

### On Towers of Hanoi failures:
> "Previously reported failures solving the Towers of Hanoi were not purely result of output constraints, but also partly a result of cognition limitations: LRMs still stumble when complexity rises moderately (around 8 disks)"

CONFIRMS genuine cognitive limitation.

### On River Crossing methodology:
> "The River Crossing results initially heralded as catastrophic failures turn out to hinge upon testing unsolvable configurations"

Important methodological correction.

### On task difficulty:
> "Task difficulty does not correlate linearly with problem size. Certain intermediate configurations may prove nearly unsolvable, while larger instances are handled successfully"

Phase transition behavior — failures at constrained solution spaces.

### On the debate:
> "Our findings ultimately defy simplistic narratives"

Neither "LRMs can't reason" nor "LRMs can reason" — more nuanced.

---

## Status
- [x] Read complete (ar5iv HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**

---

## Summary for Synthesis

**Verdict: BALANCED — Partial rebuttal (River Crossing) + Partial confirmation (Hanoi)**

### What This Paper Actually Shows:
1. **River Crossing failures were methodological error** — original tested unsolvable configs
2. **On solvable River Crossing, LRMs succeed** — even 200-step solutions
3. **Towers of Hanoi ~8 disk limit is CONFIRMED** — real cognitive limitation
4. **Stepwise/agentic approaches don't help** — fundamental limit, not output window
5. **LRMs are "stochastic, RL-tuned searchers"** — not genuine reasoners

### What This Paper Does NOT Show:
1. That LRMs have genuine reasoning (explicitly denies this)
2. That success on structured problems generalizes to OOD tasks
3. That River Crossing success isn't pattern-based

### Critical Insight:
This paper has a dual nature that complicates simple categorization:

**REBUTTAL aspect (challenges thesis indirectly)**:
- River Crossing failures were methodological error, not reasoning limitation
- LRMs CAN do 200-step long-horizon planning when problems are solvable
- This shows more capability than "Illusion of Thinking" claimed

**CONFIRMATION aspect (supports thesis)**:
- Towers of Hanoi ~8 disk limit is REAL cognitive limitation
- Stepwise prompting doesn't help → not an output window issue
- Agentic dialogue makes it WORSE → no genuine reasoning to combine
- Frames LRMs as "stochastic, RL-tuned searchers"

### Relationship to Thesis:
**Mixed** — the paper cuts both ways:

**Supports thesis**:
- Confirms Hanoi cognitive limit is real
- "Stochastic searcher" framing aligns with thesis
- Failures at phase transitions (constrained solution spaces)
- Agentic collaboration doesn't help

**Challenges thesis**:
- 200-step River Crossing success shows significant long-horizon capability
- LRMs succeed on problems the thesis might predict failure on
- Non-linear difficulty suggests learned structure, not just patterns

### Key Quote for Synthesis:
> "Using LRMs to solve these problems is equivalent to unleashing a stochastic search procedure, chain-of-thought sampling refined by reinforcement learning—inside a large, discrete search space whose structure we have barely characterised"

LRMs = learned search, not reasoning. Exactly the thesis.
