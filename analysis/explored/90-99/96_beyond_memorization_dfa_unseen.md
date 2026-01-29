# Paper Analysis: Beyond Memorization: Testing LLM Reasoning on Unseen Theory of Computation Tasks

## Metadata
- **arXiv ID**: 2601.13392
- **Title**: Beyond Memorization: Testing LLM Reasoning on Unseen Theory of Computation Tasks
- **Authors**: Shlok Shelat, Jay Raval, Souvik Roy, Manas Gaur
- **Date**: January 2026
- **Affiliations**: Ahmedabad University, University of Maryland Baltimore County

---

## Core Claims

1. **100% knowledge accuracy but 30-64pp drops on unseen problems** — Models know DFA theory perfectly but can't apply it to novel cases
2. **Success on seen tasks reflects memorization, not reasoning** — High seen accuracy (84-90%) drops to 20-59% on structurally similar unseen problems
3. **Failures are systematic, not random** — Six recurring failure modes in symbolic manipulation
4. **CoT often DEGRADES performance** — Explicit reasoning increases effective state-space complexity
5. **Prompting strategies don't solve the problem** — Errors persist across Direct, CoT, ToT

---

## Methodology

### Task: DFA Construction from Regular Languages

Given a regular expression or natural language specification, construct a deterministic finite automaton (DFA) that recognizes exactly that language.

### Datasets

**Knowledge Dataset (50 questions)**:
- 25 multiple-choice, 25 short-answer
- DFA definitions, RE properties, NFA relationships
- **All models: 100% accuracy** — confirms complete mastery of definitions

**Seen Dataset (90 problems)**:
- From online university problem sets, textbooks, publicly available resources
- Standard patterns: suffix/prefix, counting modulo k, position-based, Boolean combinations

**Unseen Dataset (180 problems)**:

| Type | Count | Method |
|------|-------|--------|
| Mathematical Art | 60 | Manual constraint composition |
| Mathematical Engineering | 120 | Arden's theorem generation |

**Difficulty Distribution**:
| Level | Count | Characteristics |
|-------|-------|-----------------|
| Easy | 41 (22.8%) | Shallow nesting, ≤5 states |
| Medium | 65 (36.1%) | 2-4 nested operators, 6-12 states |
| Hard | 74 (41.1%) | Deep nesting, ≥13 states |

### Novelty Verification

- Manually verified absent from top 100 Google results
- Not in standard textbooks (Sipser, Hopcroft et al.)
- Not on GitHub, StackOverflow, course websites
- Arden's theorem produces structurally diverse expressions unlikely in training data

---

## Key Evidence

### Main Results: Seen vs Unseen

| Dataset | GPT-5.1 | Grok-4.1 | Gemini-2.5 |
|---------|---------|----------|------------|
| Knowledge | **100%** | **100%** | **100%** |
| Seen DFA | 84.2% | 89.5% | 85.0% |
| Unseen (Direct) | 20.67% | 59.12% | 29.33% |

**Performance Drops (Seen → Unseen)**:
| Model | Drop |
|-------|------|
| GPT-5.1 | **63.53pp** (84.2% → 20.67%) |
| Gemini-2.5 | **55.67pp** (85.0% → 29.33%) |
| Grok-4.1 | **30.38pp** (89.5% → 59.12%) |

### Prompting Strategy Results

| Strategy | GPT-5.1 | Grok-4.1 | Gemini-2.5 |
|----------|---------|----------|------------|
| Direct | 20.67% | 59.12% | 29.33% |
| CoT | **16.67%** ↓ | **51.90%** ↓ | **23.33%** ↓ |
| CoT (One-Shot) | 19.33% | 55.87% | 28.10% |
| ToT | 24.10% | Timeout | **54.00%** |

**Critical finding**: CoT **consistently degrades** performance across all models!

### Hint Protocol Results (3 stages)

| Model | Not Solved (Medium) | Not Solved (Hard) |
|-------|---------------------|-------------------|
| GPT-5.1 | 37.60% | 53.86% |
| Grok-4.1 | 19.80% | 39.24% |
| Gemini-2.5 | 26.03% | 45.02% |

Hints correct shallow errors but **don't resolve globally inconsistent automata**.

### The L₁/L₂ Smoking Gun

**L₁ (Seen)**: "Third-to-last symbol must be 'a'"
- All models: **100% accuracy**

**L₂ (Unseen)**: "Fourth-to-last symbol is 'a' AND 'bb' doesn't appear before any 'a'"
- All models: **0% accuracy** under direct prompting!

> "This failure is particularly revealing because L₁ and L₂ differ only in *constraint composition*, not in fundamental reasoning requirements."

---

## Six Failure Modes Identified

| # | Failure Mode | Description |
|---|--------------|-------------|
| 1 | **Kleene Star Semantics** | Fail to account for unbounded repetition |
| 2 | **Brzozowski Derivative Errors** | Incorrectly normalize semantically equivalent derivatives |
| 3 | **Initial Construction Errors** | Faulty state semantics before minimization |
| 4 | **Over-Acceptance** | DFA accepts strings outside target language |
| 5 | **Constraint Preservation** | Individual constraints work; composition fails |
| 6 | **Redundant/Unreachable States** | States with no paths introduced |

---

## Key Quotes

> "Models achieve perfect accuracy on factual questions and 84-90% on seen tasks. However, accuracy drops sharply on unseen problems (by 30-64%), with failures stemming from systematic misinterpretation of language constraints, incorrect handling of Kleene-star semantics, and a failure to preserve global consistency."

> "High accuracy on seen problems does not imply genuine reasoning capability. Models may succeed by retrieving similar examples from training data rather than performing compositional symbolic manipulation."

> "Despite achieving 100% accuracy on L₁, *all models fail on L₂ under direct prompting*."

> "The models correctly construct DFAs for simpler positional constraints (seen in training) but fail when these constraints are combined with ordering restrictions – suggesting success on seen tasks reflects pattern retrieval rather than robust symbolic reasoning."

> "The observed performance gap therefore isolates a failure of *compositional generalization* rather than task understanding."

> "Across models and prompting strategies, the dominant failure modes arise from difficulties in maintaining *globally consistent symbolic structure*, rather than from a lack of formal knowledge."

---

## Relationship to Thesis

### STRONGLY SUPPORTS the Thesis

**The thesis**: "LLM reasoning is practical but fundamentally predictive—pattern matching from training distributions, not genuinely generative reasoning"

This paper provides **definitive evidence**:

1. **100% knowledge + 0% novel application** — Models know the rules but can't apply them
2. **Seen/unseen gap = memorization** — 63pp drop on structurally similar problems
3. **Compositional generalization failure** — Individual constraints work, combinations fail
4. **CoT doesn't help** — Actually makes things worse
5. **"Pattern retrieval rather than robust symbolic reasoning"** — Authors' own conclusion

### Why This Paper is Important

- **Controlled experiment**: Same task, same reasoning requirements, only novelty differs
- **Perfect knowledge baseline**: 100% on definitions rules out missing knowledge
- **Systematic failure modes**: Not random errors but structured limitations
- **Multiple prompting strategies**: Problem persists regardless of scaffolding

---

## Relationship to Other Papers

### Supports

| Paper | How |
|-------|-----|
| **Reasoning or Reciting (2307.02477)** | Same finding: counterfactual/unseen = collapse |
| **Faith and Fate (2305.18654)** | Both show compositional generalization failure |
| **GSM-Symbolic (2410.05229)** | Both show perturbation/novelty breaks performance |
| **CoT Mirage (2508.01191)** | Both show ID success, OOD failure |
| **Compositional-ARC (2504.01445)** | Both show systematicity failure |

### Extends

| Paper | How |
|-------|-----|
| **Theory of Computation evaluation** | First controlled memorization study in ToC |
| **Compositional generalization** | Applies to formal language theory |

---

## REBUTTALS TO THIS PAPER

### Limitations Acknowledged

1. **Model access constraints** — API-based, fixed inference budgets; Grok-4.1 timed out on ToT
2. **Token scalability** — Large intermediate representations exhaust token budgets
3. **Finite validation horizon** — Behavioral equivalence only tested up to length 6 + 2000 random strings
4. **Scope** — Limited to regular expressions/DFA; may not generalize to CFGs, PDAs, Turing machines
5. **No fine-tuning** — Only prompting-based evaluation

### Potential Counter-Arguments

1. **Fine-tuning might help** — Not tested
2. **Longer CoT might work** — But CoT already degrades performance
3. **Different models might succeed** — Three frontier models all failed

---

## Assessment

### Independent Assessment

This paper provides **strong controlled evidence** for the pattern matching thesis:

1. **Perfect control**: Same task type, same knowledge, only novelty varies
2. **Dramatic effect size**: 30-64pp drops
3. **100% knowledge baseline**: Rules out knowledge gaps
4. **Systematic errors**: Six reproducible failure modes
5. **Multiple models**: GPT-5.1, Grok-4.1, Gemini-2.5 all fail similarly

### Stance Classification: **STRONGLY SUPPORTS**

The paper directly demonstrates:
- Perfect knowledge doesn't translate to novel application
- Success on seen = memorization, not reasoning
- Compositional generalization is THE failure mode
- CoT doesn't help (actually hurts)

### Significance

- **Controlled memorization study** — First in Theory of Computation
- **Clean seen/unseen split** — Isolates memorization from reasoning
- **Multiple models tested** — GPT-5.1, Grok-4.1, Gemini-2.5
- **Six failure modes documented** — Systematic, not random

---

## Status
- [x] Read complete (full paper via task agent)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
- [x] data.js updated
