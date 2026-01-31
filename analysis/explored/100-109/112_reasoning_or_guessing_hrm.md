# Paper Analysis: Are Your Reasoning Models Reasoning or Guessing? A Mechanistic Analysis of Hierarchical Reasoning Models

## Metadata
- **arXiv ID**: 2601.10679
- **Title**: Are Your Reasoning Models Reasoning or Guessing? A Mechanistic Analysis of Hierarchical Reasoning Models
- **Authors**: Zirui Ren, Ziming Liu
- **Date**: January 15, 2026
- **Focus**: Hierarchical Reasoning Model (HRM) on Sudoku-Extreme

---

## Why This Paper Matters for the Thesis

This paper provides **mechanistic evidence** that what looks like multi-step reasoning is actually **repeated guessing attempts**. Key findings:

1. HRM fails on **puzzles with only 1 unknown cell**
2. Solutions appear via **"grokking" dynamics** — sudden correctness, not gradual refinement
3. Models get **trapped in spurious fixed points** — local attractors that aren't solutions
4. **Augmenting guesses** (not reasoning) boosts accuracy: 54.5% → 96.9%

> "HRM appears to be 'guessing' instead of 'reasoning'"

---

## Core Claims

1. **HRM fails on extremely simple puzzles** due to violation of fixed point property
2. **"Grokking" dynamics**: Answer suddenly becomes correct, not incrementally refined
3. **Multiple fixed points exist** — model guesses first one, gets trapped
4. **Scaling "guesses" dramatically improves performance** — characteristic of guessing, not reasoning
5. **Augmented HRM**: 54.5% → **96.9%** via augmentation, not better reasoning

---

## Three Surprising Findings

### (a) Failure on Extremely Simple Puzzles
- HRM can fail on **a puzzle with only ONE unknown cell**
- Cause: Violation of fixed point property (fundamental HRM assumption)
- On 1-row masked puzzles: HRM maintains stability only ~75% of time
- Even after reaching correct answer, HRM "corrupts its answer by making unnecessary updates"

### (b) "Grokking" Dynamics in Reasoning Steps
- Loss **doesn't decrease gradually**
- Error remains high and flat for many steps, then **drops to zero in ONE step**
- "The answer is not improved uniformly, but instead there is a critical reasoning step that suddenly makes the answer correct"

### (c) Multiple Fixed Points (Getting Trapped)
- HRM "guesses" the **first fixed point it encounters**
- Gets **trapped there for a while or forever**
- Spurious fixed points act as "misleading attractors"

---

## Quantitative Results

| Method | Accuracy | Δ |
|--------|----------|---|
| **Baseline** | **54.5%** | — |
| +Bootstrap | 64.7% | +10.2% |
| +Relabel (input perturbation) | 73.2% | +18.7% |
| +Data Mixing | 59.9% | +5.4% |
| +Data Mixing+Bootstrap | 82.9% | +28.4% |
| **+All (Augmented HRM)** | **96.9%** | **+42.4%** |

**Key insight**: Scaling "guesses" (input perturbation, model bootstrapping) works better than improving "reasoning."

---

## The Four Reasoning Modes

1. **Trivial Success** — Model finds solution in first few segments
2. **Non-trivial Success** — Lingers around spurious fixed point, then "takes sudden leap" to solution
3. **Trivial Failure** — Latent state wanders/oscillates, error stays high
4. **Non-trivial Failure** — Converges to **false fixed point** (not the solution)

---

## Methods to Scale "Guessing"

### (1) Data Augmentation (Quality of Guesses)
- Mix puzzles of different difficulty levels
- Restores fixed point property
- Baseline → 59.9%

### (2) Input Perturbation (Number of Guesses via Inference Randomness)
- Apply equivalent transformations (relabeling tokens, swapping rows/columns)
- HRM treats transformed puzzle as fresh input (not invariant to symmetries!)
- **9 relabeled versions → +18.7% accuracy**
- Uses majority vote

### (3) Model Bootstrapping (Number of Guesses via Training Randomness)
- Ensemble of adjacent checkpoints (~10 checkpoints)
- Checkpoints "should be strongly correlated" but **differ significantly in which samples they solve**
- +10.2% accuracy

---

## Key Quotes

### On "Guessing" vs "Reasoning"
> "HRM does not 'reason' in the commonsense way of approaching the solution gradually, despite using recursive architecture to mimic human reasoning behavior. If one insists on making an analogy to human intelligence, it resembles 'guessing' more than 'reasoning'."

### On Recursive Architecture
> "We hypothesize that the recursion (outermost loop) of HRM serves as a way of scaling 'guessing' attempts for a plausible latent state, **challenging the common belief that recursive reasoning boosts performance by incremental refinement**"

### On Multiple Attempts
> "Given multiple chances to try approaching the puzzle with different perspectives, HRM is able to achieve much better accuracy; likewise, human is more likely to be correct with multiple guessing attempts. However, **if one is to approach a complex problem through deliberative reasoning, the number of attempts typically matters less**"

### On Strategic Search
> "HRM does not really strategize its search in latent space"

---

## Relationship to Thesis

### STRONGLY SUPPORTS the thesis that LLMs guess/pattern-match rather than reason

| Evidence | Implication for Thesis |
|----------|------------------------|
| Fails on 1-cell puzzles | Even "reasoning models" don't reason reliably |
| "Grokking" dynamics | Solutions appear suddenly, not via incremental refinement |
| Trapped by spurious attractors | Like optimization finding local minima, not deliberative search |
| Multiple attempts help dramatically | Characteristic of guessing, not reasoning |
| No strategic exploration | Model doesn't "plan" or "strategize" |
| 54.5% → 96.9% via guessing augmentation | Scaling guesses > improving reasoning |

### Connection to Other Papers
- **Supports Illusion of Thinking** (2506.06941): Same "sudden" performance, not gradual reasoning
- **Supports Faith and Fate** (2305.18654): Pattern matching to fixed points = subgraph matching
- **Supports Spurious Rewards Paradox** (2601.11061): Both show models find shortcuts/attractors rather than reasoning

---

## Discussion and Limitations

1. **Analysis limited to Sudoku-Extreme** — though authors conjecture findings extend to other recursive reasoners
2. **Fixed points exist but are unstable** — theory-practice mismatch
3. **Initialization sensitivity** — success depends on proximity to true vs spurious fixed point
4. **Methods are test-time compute scaling** — multiple forward passes, not single-shot reasoning

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments
1. **Domain-specific**: Sudoku may not generalize to other reasoning tasks
2. **HRM-specific**: May not apply to transformer-based reasoning models
3. **"Guessing" is still valuable**: If scaling guesses works, that's a valid scaling axis

### Limitations (Authors Acknowledge)
- Analysis limited to one dataset
- Energy function hypothesis is preliminary
- Methods require multiple forward passes

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
- [x] **Synthesis updated**
- [x] **data.js updated**

---

## Bottom Line

This paper provides **mechanistic evidence** that what looks like multi-step reasoning is actually **repeated guessing attempts** converging on fixed points in latent space. The model doesn't incrementally refine solutions — it "groks" them suddenly, and performance improves by scaling guesses, not improving reasoning.

**For the thesis**: Even purpose-built "reasoning models" (HRM outperforms LLMs on Sudoku) exhibit guessing behavior rather than deliberative reasoning. The recursive architecture serves as a "guess scaling" mechanism, not an incremental reasoning engine.
