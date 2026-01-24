# Paper Analysis: Limits of Emergent Reasoning in Agentic Frameworks for Deterministic Games

## Metadata
- **arXiv ID**: 2510.15974
- **Title**: Limits of Emergent Reasoning of Large Language Models in Agentic Frameworks for Deterministic Games
- **Authors**: Chris Su (CMU), Harrison Li (UC Berkeley), Matheus Marques (TCNJ), George Flint (UC Berkeley), Kevin Zhu, Sunishchal Dev (Algoverse AI Research)
- **Date**: October 2025
- **Venue**: arXiv preprint

---

## Core Claims

1. **Environment interface doesn't prevent collapse**: Providing LLMs with a dynamic environment interface (tool calls + state feedback) does NOT delay or prevent performance collapse on Tower of Hanoi
2. **Collapse occurs EARLIER with agentic framework**: "Degradation occurs at a lower complexity than in the baseline"
3. **Looping behavior dominates**: Collapse is associated with deterministic looping — returning to previously visited states
4. **Divergence from both optimal AND random policies**: LLM policies increasingly diverge from BOTH optimal and uniformly random policies with complexity
5. **Mode-like collapse**: Models exhibit "deterministic adherence to a single behavioral trajectory"

---

## Methodology

### Experimental Setup
- **Task**: Tower of Hanoi (3 pegs, n disks)
- **Complexity scaling**: n = 3 to n = 8 disks (optimal solution: 2^n - 1 moves)
- **Models**: Claude 3.7 Sonnet, DeepSeek V3.1 (and their LRM counterparts)

### Two Conditions
1. **Baseline (one-shot)**: Generate complete solution in single pass
2. **Agentic Framework**: 
   - Model makes single moves via tool calls
   - Environment validates moves and provides state feedback
   - Model sees full move history at each step
   - Can call `move_disk(from_peg, to_peg)` or `end_game()`

### Policy Analysis
- Construct LLM-parameterized policy from observed trajectories
- Compare using Jensen-Shannon Divergence (JSD) against:
  - Optimal policy (greedy Q-value)
  - Random policy (uniform over valid actions)

---

## Key Evidence

### 1. Agentic Framework Performs WORSE Than Baseline

> "The introduction of an environment interface does not prevent performance collapse. Instead, **degradation occurs at a lower complexity than in the baseline**."

| Setting | n=3 | n=4 | n=5 | n=6 | n=7 | n=8 |
|---------|-----|-----|-----|-----|-----|-----|
| Claude Baseline | ~100% | ~90% | ~60% | ~20% | ~5% | ~0% |
| Claude + Env | ~100% | ~85% | ~40% | ~10% | ~0% | ~0% |
| DeepSeek Baseline | ~100% | ~80% | ~50% | ~15% | ~5% | ~0% |
| DeepSeek + Env | ~100% | ~70% | ~30% | ~5% | ~0% | ~0% |

**Implication**: External state tracking doesn't solve the reasoning problem — it may even exacerbate it.

### 2. Looping Behavior Dominates Failure

> "Under an agentic framework, collapse is associated with failing to escape **deterministic looping behavior**"

**Loop Rate at n=8**: ~60-70% of moves return to previously visited states

> "Subsequence analysis in Figure 5 shows about **40% of the time the model deterministically reuses previously observed continuations** at n=8"

### 3. Dual Divergence from Optimal AND Random

> "The model-parameterized policy **diverges from the optimal policy**... Furthermore, the model-parameterized policy also **diverges from the uniformly random policy**"

**JSD Analysis** (Figure 6):
| Complexity (n) | JSD vs Optimal | JSD vs Random |
|----------------|----------------|---------------|
| 3 | ~0.1 | ~0.1 |
| 4 | ~0.15 | ~0.15 |
| 5 | ~0.25 | ~0.2 |
| 6 | ~0.35 | ~0.3 |
| 7 | ~0.45 | ~0.35 |
| 8 | ~0.55 | ~0.4 |

**Critical insight**: Models aren't exploring randomly OR reasoning optimally — they're executing fixed patterns that become increasingly maladaptive.

### 4. No Learning from History

> "When models return to previously visited states, they **consistently execute identical suboptimal action sequences**. This repetition occurs **despite models having access to their complete interaction history**."

> "This inability to vary its behavior upon encountering familiar states, even after experiencing negative consequences from identical previous trajectories, could imply that **apparent reasoning is actually execution of fixed computational patterns**."

---

## Key Quotes

### On agentic framework revealing limitations
> "The agentic framework performs worse than baseline models, which could suggest **stepwise interaction actually exacerbates rather than mitigates underlying reasoning limitations**."

### On the nature of collapse
> "The simultaneous divergence from both optimal and random policies implies that models are **neither reasoning optimally nor exploring effectively**. Instead, they are **executing deterministic patterns that become increasingly maladaptive**."

### On mode-like collapse
> "Performance is dependent upon **whether the mode reflects the correct solution for the problem**... apparent reasoning ability is largely a byproduct of **high-probability mode following**, rather than genuine reasoning."

### Main conclusion
> "This work adds to growing evidence that **scaling alone is insufficient in creating general-purpose emergent reasoning capabilities** in large language models."

---

## Relationship to Other Papers

### Supports
- **Illusion of Thinking (2506.06941)**: Confirms collapse pattern, adds that environment access doesn't help
- **Comment: Agentic Gap (2506.18957)**: REBUTS — shows agentic framework doesn't solve the problem
- **Rethinking Illusion (2507.01231)**: Confirms Hanoi ~8 disk limit is real cognitive limitation
- **Faith and Fate (2305.18654)**: Looping = stuck in linearized pattern matching
- **How LLMs Learn to Reason (2509.23629)**: "Sparse web" theory — models stuck in local modes

### Rebuts
- **Thinking Isn't Illusion (2507.17699)**: Tool augmentation doesn't always work — environment interface doesn't help Hanoi
- **Comment: Agentic Gap (2506.18957)**: Directly challenges "execution gap, not reasoning gap" — execution interface doesn't prevent collapse

### Provides Mechanism For
- **Why test-time scaling fails**: Models loop through same patterns, can't escape local modes
- **Why self-correction fails**: Models "consistently execute identical suboptimal action sequences" despite history

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- Paper is recent (October 2025) — no direct rebuttals found

### Potential Counter-Arguments

1. **Single task (Tower of Hanoi)**: May not generalize to other reasoning tasks
2. **Limited models tested**: Only Claude 3.7 and DeepSeek V3.1
3. **No LRM-specific agentic testing**: Only tested base LLMs with agentic framework
4. **No temperature/sampling ablations**: Results may be sensitive to sampling

### Limitations (Authors Acknowledge)

> "Our investigation only examines two LLMs–Claude 3.7 Sonnet and Deepseek V3.1–and their LRM counterparts... We only examine one game task–Tower of Hanoi."

> "We did not conduct repeated trials per model, so results reflect single-run outcomes"

---

## Relevance to Thesis

**STRONGLY SUPPORTS** — Critical evidence for pattern matching thesis.

### Key Insights for Synthesis

1. **Environment interface doesn't create reasoning**: 
   - Models had perfect state information (externalized)
   - Models had full history (could see past mistakes)
   - Models STILL failed to reason
   - This isolates the reasoning deficit from state-tracking limitations

2. **Agentic framework reveals (not solves) limitations**:
   > "The agentic setting reveals characteristics of brittle reasoning that the baseline obscures"
   
   One-shot may actually benefit from memorization of training trajectories. Stepwise exposes the lack of genuine reasoning.

3. **Dual divergence = neither reasoning nor exploring**:
   - Not optimal → not reasoning correctly
   - Not random → not exploring/searching
   - Stuck in fixed patterns that don't generalize

4. **Looping = pattern matching failure**:
   - Models return to same states
   - Execute same (wrong) subsequences
   - Can't break out of learned patterns
   - This is exactly what pattern matching would predict

5. **History doesn't help**:
   - Models ignore their own mistakes
   - Can't learn within episode
   - Fixed computation despite evidence

### Direct Quote for Thesis

> "Apparent reasoning ability is largely a byproduct of **high-probability mode following**, rather than genuine reasoning... This work adds to growing evidence that **scaling alone is insufficient in creating general-purpose emergent reasoning capabilities**."

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
