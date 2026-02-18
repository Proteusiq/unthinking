# Paper Analysis: Computational Reasoning of Large Language Models (TMBench)

## Metadata
- **arXiv ID**: 2504.20771
- **Title**: Computational Reasoning of Large Language Models
- **Authors**: Haitao Wu, Zongbo Han, Joey Tianyi Zhou, Huaxi Huang, Changqing Zhang
- **Date**: April 2025
- **Venue**: arXiv (Tianjin University / Shanghai AI Lab / A*STAR)

---

## Core Claims

1. **TMBench evaluates "computational reasoning"** — the ability to strictly follow rules and accurately manage internal states for multi-step execution
2. **Gemini-2.5-Pro achieves 94% pass rate** at 30 steps on Turing machine simulation
3. **Strong correlation with reasoning benchmarks** — r=0.882 with average of AIME/MATH/GPQA
4. **Alphabet robustness suggests reasoning over pattern matching** — Gemini maintains accuracy across Roman, Greek, numeric, and special character sets
5. **LLMs inevitably fail with increasing steps** — due to autoregressive/statistical nature
6. **Depth matters more than width** for reasoning capability

---

## Methodology

### TMBench Design
- Based on **m-Tag Turing Machine** (Turing-complete for m>1)
- Each step: read queue head, append P(head) to tail, delete first m symbols
- Tests rule-following fidelity over multiple steps

### Task Parameters
- 100 instances, m=2, alphabet size=5
- Rule lengths: 1-5, initial string lengths: 2-9
- Maximum simulation: 30 steps (11 cases halt early)

### Metrics
- **Step Accuracy**: proportion correct at step i
- **Step-Weighted Accuracy (SWA)**: weighted average emphasizing later steps
- **Pass Rate**: complete correct execution

---

## Key Evidence

### Performance Results (Table 2)

| Model | SWA (Uniform) | SWA (Linear) | Pass Rate |
|-------|---------------|--------------|-----------|
| **Gemini-2.5-Pro** | **96.6%** | **96.2%** | **94%** |
| Grok-3-Beta | 94.6% | 92.4% | 86% |
| DeepSeek-V3 | 87.4% | 84.9% | 82% |
| Claude-3.7-Sonnet | 85.1% | 78.1% | 69% |
| DeepSeek-R1 | 72.2% | 63.8% | 45% |
| GPT-4.1 | 58.7% | 45.7% | 26% |
| O3-mini | 37.1% | 30.5% | 7% |
| O1-mini | 37.0% | 21.6% | 11% |

**Key observation**: Reasoning models (R1, O1, O3) don't dominate — execution fidelity matters more than "thinking".

### Benchmark Correlations

| Benchmark | Correlation with TMBench |
|-----------|--------------------------|
| GPQA Diamond | Highest |
| AIME2024 | High |
| MATH500 | Moderate |
| MMLU Pro | Lowest |

**Combined reasoning score**: r = 0.882, p = 1.49e-04

### Ablation Studies

**1. Unbounded-Step Execution (CRITICAL FINDING)**
- Gemini-2.5-Pro: earliest failure at **step 16**, latest at **step 683**
- **"As an autoregressive model, Gemini inevitably fails with increasing steps due to its statistical nature"**

**2. Temperature**: Stable 0-1, degrades >1

**3. Alphabet Type**: Gemini maintains accuracy across all character sets
- Authors claim: "relies on underlying reasoning mechanisms rather than superficial statistical correlations"

**4. Difficulty (m value)**: Stable m=2-9, degrades m>10, near-zero m>15

---

## Critical Assessment

### What This Paper Actually Shows

1. **LLMs can follow explicit rules given in context** — but rules are provided, not discovered
2. **Even the best model eventually fails** — Gemini fails somewhere between step 16-683
3. **Correlation with math benchmarks exists** — but correlation ≠ causation

### Key Finding That SUPPORTS the Thesis

> "As an autoregressive model, Gemini inevitably fails with increasing steps due to its statistical nature, underscoring Gemini's computational limits."

This is direct evidence that LLMs have **bounded computational capability** — they cannot reliably execute deterministic rules indefinitely. A symbolic system would achieve 100% on this task.

### Limitations of "Reasoning" Interpretation

1. **TMBench tests rule-execution, not rule-discovery**
   - Rules are explicitly provided in prompt
   - No need for model to "reason" — just follow instructions

2. **Alphabet robustness doesn't prove reasoning**
   - Could be in-context pattern matching over given rules
   - Doesn't distinguish "reasoning" from "sophisticated pattern matching"

3. **The benchmark is narrow**
   - Only tests m-Tag system simulation
   - 100 instances, max 30 steps

4. **Turing-completeness framing is misleading**
   - Tag systems are Turing-complete; LLMs simulating them are NOT
   - The "inevitable failure" finding proves this

### What the Authors Acknowledge

- "LLM inevitably fails with increasing steps due to its autoregressive nature"
- "This underscores Gemini's computational limits"
- Models rely on "statistical nature" (not true computation)

---

## Relationship to Other Papers

### Supports (from the thesis perspective)
- **Illusion of Thinking (2506.06941)**: Both show performance collapse at scale
- **Faith and Fate (2305.18654)**: Error accumulation with sequential steps
- **Sequential Enumeration (2512.04727)**: Both show LLMs fail at iterative processes

### Related Work
- **Physics of LLMs Part 2.1 (2407.20311)**: More controlled study of similar phenomena

### Key Distinction
- TMBench tests **rule-following with explicit rules**
- The thesis claims LLMs can't perform **genuinely generative reasoning** (discovering implicit structure)
- These are different claims — TMBench doesn't test what the thesis claims

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found (recent paper)

### Potential Counter-Arguments

1. **Rule-following ≠ reasoning**: The benchmark tests execution of given rules, not discovery of hidden rules or novel inference

2. **"Inevitable failure" undermines the positive claims**: If models fail deterministic rule-following at steps 16-683, this suggests bounded capability, not genuine reasoning

3. **Correlation could be spurious**: Both TMBench and AIME/MATH could measure training data exposure or model scale, not a unified "reasoning" capability

4. **Definition of "computational reasoning" is narrow**: Following explicit rules is a specific skill, not general reasoning

### Limitations (Authors Acknowledge)
- Models "inevitably fail with increasing steps"
- Due to "statistical nature" and "autoregressive" architecture
- This is a fundamental limit, not a benchmark artifact

---

## Key Quotes

> "Computational reasoning is the ability to systematically select and accurately apply rules, ensuring that each step is transparent, verifiable, and grounded within the given rule system."

> "As an autoregressive model, Gemini inevitably fails with increasing steps due to its statistical nature, underscoring Gemini's computational limits."

> "This robustness [across alphabet types] indicates that Gemini-2.5-Pro relies on underlying reasoning mechanisms rather than superficial statistical correlations."

> "The correlation with reasoning benchmarks such as AIME and GPQA is higher than with knowledge-centric tasks like MMLU."

---

## Relevance to Thesis

**BALANCED — Actually provides evidence FOR bounded capability thesis**

The paper shows:
1. ✓ LLMs can follow explicit rules to some extent — we don't deny this
2. ✓ **LLMs inevitably fail** at scale — SUPPORTS bounded capability thesis
3. ✓ Failure is due to "statistical nature" — SUPPORTS pattern-matching interpretation
4. ✗ Tests rule-execution, not rule-discovery or novel reasoning

**Critical point**: The "inevitable failure" finding is more important than the 94% success rate. A system with genuine computational capability would achieve 100% on deterministic rule-following. The failure range (steps 16-683) shows LLMs are fundamentally bounded.

The correlation with math benchmarks (r=0.882) could mean:
- Both tap genuine reasoning (FOR interpretation)
- Both measure training data exposure (AGAINST interpretation)
- Both measure pattern execution capability (NEUTRAL)

Without causal analysis, correlation doesn't resolve the debate.

---

## Status
- [x] Read complete (full paper via task agent)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] Paper graph updated

---

## Verdict: BALANCED (provides evidence for bounded capability)


The paper's central finding — that LLMs "inevitably fail with increasing steps due to statistical nature" — actually **supports** the thesis that LLM reasoning is fundamentally bounded and predictive rather than genuinely computational.
