# Session Log: The Thinking Machine That Doesn't Think

## Session Date: January 24, 2026

---

## Overview

Systematic literature review for paper on LLM reasoning capabilities. Analyzed foundational papers in the "illusion of thinking" debate to build thesis that LLMs have reasoning-like capabilities that are practical but predictive, not genuinely generative.

---

## Steps Taken

### 1. Project Setup
- Created folder structure: `papers/` and `analysis/`
- Initialized git repository
- Created comprehensive paper list from user's evidence tables (~61 papers)

### 2. Paper 1: GSM-Symbolic (2410.05229) - Apple, Oct 2024
**Stance:** Against genuine reasoning

**Key findings extracted:**
- 65% performance drop from single irrelevant clause (NoOp)
- High variance (12-15%) across semantically equivalent questions
- Sensitivity: numbers > names
- Few-shot cannot recover NoOp failures
- Pattern matching hypothesis with empirical support

**Analysis created:** `analysis/01_gsm_symbolic.md`

### 3. Identified Critical Cited Paper
- Recognized Faith and Fate (Dziri et al.) as foundational
- User approved reading pre-2024 paper for theoretical grounding

### 4. Paper F1: Faith and Fate (2305.18654) - Allen AI, May 2023
**Stance:** Against (foundational theory)

**Key findings extracted:**
- Computation graph framework for analyzing reasoning
- "Linearized subgraph matching" mechanism
- Proposition 4.1: Parallel error accumulation (width)
- Proposition 4.2: Sequential error accumulation (depth)
- In-distribution ~100%, OOD ~0%
- Grokking didn't help after 60 epochs ($50K training)

**Analysis created:** `analysis/00_faith_and_fate.md`

### 5. Paper 2: CoT Without Prompting (2402.10200) - Google DeepMind, Feb 2024
**Stance:** For genuine reasoning

**Key findings extracted:**
- CoT paths exist in top-k alternative tokens
- Greedy decoding HIDES reasoning, doesn't create it
- Confidence (Δ) correlates with CoT presence
- No prompting needed to elicit reasoning
- Supports "intrinsic capability" hypothesis

**Analysis created:** `analysis/02_cot_without_prompting.md`

### 6. Paper 3: The Illusion of Thinking (2506.06941) - Apple, Jun 2025
**Stance:** Against genuine reasoning (central debate paper)

**Key findings extracted:**
- Three complexity regimes: low (LLMs win), medium (LRMs win), high (both collapse)
- Counterintuitive: reasoning tokens DECREASE at collapse
- LRMs fail to execute explicit algorithms
- Reasoning trace analysis: fixation on early errors
- Sparked the 2025 debate

**Analysis created:** `analysis/03_illusion_of_thinking.md`

### 7. Paper 4: Thinking Isn't an Illusion (2507.17699) - UC Berkeley, Jul 2025
**Stance:** For genuine reasoning (direct rebuttal)

**Key findings extracted:**
- Tool augmentation (PoT) reverses collapse
- Hanoi N=13: 0% → 100% with Python interpreter
- River Crossing: DeepSeek-R1 80% with tools
- Argument: failures are execution limits, not reasoning limits
- Concession: Checker Jumping still fails even with tools

**Analysis created:** `analysis/04_thinking_isnt_illusion.md`

### 8. Paper 5: DeepSeek-R1 (2501.12948) - DeepSeek-AI, Jan 2025
**Stance:** For genuine reasoning (Nature publication)

**Key findings extracted:**
- Pure RL induces reasoning without human reasoning trajectories
- "Aha moment" emergence: spontaneous self-correction
- AIME 79.8% (matches o1), MATH 97.3%
- Rule-based rewards avoid neural reward hacking
- 7B distilled model outperforms 32B models
- Emergent behaviors: self-reflection, verification, strategy adaptation

**Analysis created:** `analysis/05_deepseek_r1.md`

### 9. Created Synthesis Document
- Mapped core tension: pattern matching vs genuine capability
- Identified reconciliation: "sophisticated pattern completion"
- Developed thesis direction: "predictive but practical, not generative"
- Created visual summary of debate landscape
- Listed remaining priority papers

**Analysis created:** `analysis/SYNTHESIS.md`

---

## Git Commits Made

1. `e2485b2` - Add paper list and GSM-Symbolic analysis
2. `e9c11a5` - Add interaction graph and identify critical cited papers
3. `7e324fa` - Add Faith and Fate analysis - foundational theoretical paper
4. `6ee7c32` - Add CoT Without Prompting analysis - key 'FOR' paper
5. `e07742a` - Add Illusion of Thinking and direct rebuttal analyses
6. `9671bc9` - Add DeepSeek-R1 analysis - landmark Nature paper
7. `cff3ee3` - Add synthesis document mapping thesis direction

---

## Files Created

```
/Users/pradan/Research/
├── papers/
│   └── paper_list.md          # 61 papers tracked, 6 completed
└── analysis/
    ├── 00_faith_and_fate.md   # Foundational theory
    ├── 01_gsm_symbolic.md     # Math fragility evidence
    ├── 02_cot_without_prompting.md  # Intrinsic reasoning evidence
    ├── 03_illusion_of_thinking.md   # Central debate paper
    ├── 04_thinking_isnt_illusion.md # Tool augmentation rebuttal
    ├── 05_deepseek_r1.md      # Emergent RL reasoning
    └── SYNTHESIS.md           # Thesis direction and mapping
```

---

## Key Insights Developed

### The Emerging Thesis
> "The Thinking Machine That Doesn't Think"
>
> LLMs possess reasoning-like capabilities that:
> 1. Exist intrinsically in base models
> 2. Are surfaced by RL/decoding, not created
> 3. Remain fundamentally predictive (interpolation)
> 4. Are practical for many tasks within distribution
> 5. Cannot extrapolate to genuinely novel problems

### Core Evidence Map

| Claim | Supporting Papers |
|-------|-------------------|
| Reasoning exists in base models | CoT Without Prompting, DeepSeek-R1 |
| RL surfaces, doesn't create | DeepSeek-R1, (pending OLMo 3) |
| Practical within distribution | All benchmark results |
| Fails beyond training patterns | Faith and Fate, GSM-Symbolic, Illusion |

### The Reconciliation
Both "for" and "against" camps are partially right:
- Reasoning-like patterns DO exist
- They CAN solve real problems
- But they DON'T extrapolate beyond training
- They're "predictive" not "generative"

---

## Remaining Priority Papers

### High Priority
- [ ] CoT is a Mirage (2508.01191) — distribution shift
- [ ] Faithfulness papers — CoT ≠ internal computation
- [ ] s1: Simple test-time scaling — pre-existing reasoning

### Medium Priority
- [ ] Semantic Deception — surface patterns mislead
- [ ] Comment: Agentic Gap — execution vs reasoning
- [ ] Correlation or Causation — causal structure

---

## Session Statistics

- **Papers analyzed:** 6 (including 1 foundational pre-2024)
- **Total papers tracked:** 61
- **Analysis documents created:** 7 (including synthesis)
- **Git commits:** 7
- **Time focus:** Deep reading with critical evaluation, graph linking between papers
