# Paper Analysis: Beyond Memorization: Testing LLM Reasoning on Unseen Theory of Computation Tasks

## Metadata
- **arXiv ID**: 2601.13392
- **Title**: Beyond Memorization: Testing LLM Reasoning on Unseen Theory of Computation Tasks
- **Authors**: Shlok Shelat, Jay Raval, Souvik Roy, Manas Gaur
- **Affiliation**: Ahmedabad University, University of Maryland Baltimore County
- **Date**: January 2026
- **Venue**: arXiv preprint (Work in Progress)

---

## Core Claims

1. **LLM success on formal tasks reflects memorization, not compositional reasoning**
2. **100% accuracy on factual questions, 84-90% on seen tasks, but 30-64% DROP on unseen**
3. **Errors persist regardless of prompting approach** (Direct, CoT, ToT all fail similarly)
4. **Hint protocol fixes shallow errors but NOT globally inconsistent reasoning**
5. **Fundamental gap between syntactically plausible output and semantically correct reasoning**

---

## Methodology

### Task: DFA Construction from Regular Languages
- Given language specification (regex or natural language)
- Construct Deterministic Finite Automaton that recognizes exactly that language
- Formally verifiable correctness via exhaustive testing

### Why This Task is Ideal for Testing Reasoning
1. **Correctness is formally verifiable** — no ambiguity
2. **Solutions require multi-step symbolic manipulation with global consistency**
3. **Combinatorially vast problem space** — can't memorize all
4. **Simplest non-trivial computational model** — failures can't be blamed on complexity

### Datasets
- **Knowledge**: 50 factual questions (definitions, properties)
- **Seen**: 90 problems from public sources (textbooks, courses)
- **Unseen**: 180 novel problems
  - 60 "Mathematical Art" (hand-crafted constraint combinations)
  - 120 "Mathematical Engineering" (generated via Arden's theorem)

### Two Generalization Standards
- **Significant Transfer**: Better than zero-shot
- **Strong Recovery**: Recover 80%+ of in-distribution gains

### Models Tested
- GPT-5.1
- Grok-4.1-fast-reasoning
- Gemini-2.5-Flash

### Prompting Strategies
- Direct (zero-shot)
- Chain-of-Thought (CoT)
- Tree-of-Thought (ToT) with 4 branches
- Three-stage hint protocol

---

## Key Evidence

### 1. Knowledge vs Construction Gap

| Dataset | GPT-5.1 | Grok-4.1 | Gemini-2.5 |
|---------|---------|----------|------------|
| Knowledge (factual) | **100%** | **100%** | **100%** |
| Seen DFA | 84.2% | 89.5% | 85.0% |

**Models have perfect knowledge but can't apply it!**

### 2. Seen vs Unseen Performance (CRITICAL)

| Condition | GPT-5.1 | Grok-4.1 | Gemini-2.5 |
|-----------|---------|----------|------------|
| Seen (Direct) | 84.2% | 89.5% | 85.0% |
| Unseen (Direct) | 20.67% | 59.12% | 26.11% |
| **Drop** | **-63.5 pp** | **-30.4 pp** | **-58.9 pp** |

**30-64 percentage point drops on unseen problems!**

### 3. The L1→L2 Example (Devastating)

**L1 (Seen)**: "Third-to-last symbol is 'a'" — **100% correct** (all models)

**L2 (Unseen)**: "Fourth-to-last symbol is 'a' AND 'bb' never precedes 'a'"
- Same reasoning type, one additional constraint
- **ALL MODELS FAIL**

> "Despite achieving 100% accuracy on L1, *all models fail on L2 under direct prompting*"

### 4. Prompting Strategies Don't Help

| Strategy | GPT-5.1 | Grok-4.1 | Gemini-2.5 |
|----------|---------|----------|------------|
| Direct | 20.67% | 59.12% | 26.11% |
| CoT | 21.33% | 61.45% | 27.78% |
| CoT One-Shot | 22.00% | 62.01% | 28.33% |
| ToT (best branch) | 23.11% | 63.13% | 29.44% |

**Marginal improvements (1-4%) — errors persist regardless of approach!**

### 5. Hint Protocol Results

Three-stage hints:
1. Counterexamples (strings that fail)
2. Error localization (which transitions wrong)
3. Explicit error disclosure

| After Hints | GPT-5.1 | Grok-4.1 | Gemini-2.5 |
|-------------|---------|----------|------------|
| No hints | 20.67% | 59.12% | 26.11% |
| After all 3 hints | 31.33% | 68.99% | 35.00% |

**Even with explicit error disclosure, ~65-70% of problems remain unsolved!**

> "Hint protocol primarily corrects shallow errors while leaving globally inconsistent automata uncorrected"

### 6. Performance by Difficulty

| Difficulty | GPT-5.1 | Grok-4.1 | Gemini-2.5 |
|------------|---------|----------|------------|
| Easy | 35.12% | 72.68% | 39.02% |
| Medium | 19.23% | 58.46% | 24.62% |
| Hard | 12.16% | 50.00% | 17.57% |

**Steep degradation with complexity — same pattern as other papers**

---

## Failure Modes Identified

### Systematic Error Categories

1. **Derivative normalization errors**: Incorrect simplification of Kleene star
2. **Constraint composition failures**: Can't combine multiple constraints
3. **Global consistency failures**: Local transitions correct, global structure wrong
4. **Kleene-star semantics**: Mishandle iteration
5. **Spurious states**: Add unnecessary states that break acceptance
6. **Missing edge cases**: Fail on boundary conditions

### Key Insight

> "Models correctly construct DFAs for simpler positional constraints (seen in training) but fail when these constraints are combined with ordering restrictions – suggesting success on seen tasks reflects pattern retrieval rather than robust symbolic reasoning"

---

## The Memorization Question (Authors' Framing)

> "High accuracy on seen problems does not imply genuine reasoning capability. Models may succeed by retrieving similar examples from training data rather than performing compositional symbolic manipulation."

**Their answer**: Yes, it's memorization.

Evidence:
1. 100% on factual knowledge (memorized definitions)
2. 84-90% on seen problems (memorized patterns)
3. 20-59% on unseen (fails without patterns to match)
4. Prompting doesn't help (not a reasoning scaffold issue)
5. Hints don't fix global errors (not a self-correction issue)

---

## Relationship to Other Papers

### Supports
- **Can LLM Graph Reasoning Generalize (2406.15992)**: "Pattern regurgitators" — same finding
- **Faith and Fate (2305.18654)**: Distribution-bounded failures
- **CoT Mirage (2508.01191)**: ID success, OOD failure
- **GSM-Symbolic (2410.05229)**: Brittleness to variations

### Extends
- First systematic seen/unseen split for Theory of Computation
- First formal verification of LLM reasoning failures (not just accuracy)
- First hint-based correction analysis

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- Paper is very recent (January 2026, "Work in Progress")
- No direct rebuttals found on arXiv

### Related Work That May Challenge Findings

**arXiv:2504.01935 - "Critical Thinking: Which Kinds of Complexity Govern Optimal Reasoning Length?"** (Lee, Rush, Vafa - April 2025)
- Also uses DFA framework to study LLM reasoning
- Finds that LLMs CAN work on DFA-related tasks with optimal reasoning length
- Shows "optimal amount of reasoning tokens" improves correctness
- **Potential tension**: This paper suggests reasoning tokens help, while Beyond Memorization shows prompting strategies don't help much

**Resolution**: The Lee et al. paper studies DFA *simulation/tracing* (following a given DFA), while Shelat et al. study DFA *construction* (building one from scratch). Construction is harder than simulation — you need compositional understanding, not just state tracking.

### Potential Counter-Arguments

1. **"DFA construction is too specialized"**
   - Counter: DFA is the SIMPLEST non-trivial computational model
   - Counter: If models fail here, complex reasoning is worse
   - Counter: Formal verification removes ambiguity
   - **But**: Generalization to other formal tasks not proven

2. **"Just needs more training data"**
   - Counter: Models have 100% factual knowledge
   - Counter: Arden-generated problems have infinite variety
   - Counter: Problem is compositional generalization, not data
   - **But**: Fine-tuning on DFA tasks not explored

3. **"Hints show models can self-correct"**
   - Counter: Only shallow errors corrected
   - Counter: 65-70% remain unsolved even with explicit errors shown
   - Counter: "Globally inconsistent automata uncorrected"

4. **"Only 3 models tested"**
   - Counter: Used frontier models (GPT-5.1, Grok-4.1, Gemini-2.5)
   - **But**: No open-weight models tested for reproducibility
   - **But**: Results may differ for other model families

5. **"Work in Progress disclaimer"**
   - Paper explicitly states "Work in Progress"
   - Results should be treated as preliminary
   - Methodology may evolve

### Limitations (Authors Acknowledge)
- Only 3 models tested
- DFA is one task (though foundational)
- No fine-tuning explored
- Work in Progress
- Token limits may affect complex constructions
- No API-level orchestration tested

### Critical Assessment for the Pattern-Matching Thesis

**Strengths of this paper as evidence**:
- Formally verifiable correctness (no ambiguity)
- Clean seen/unseen experimental design
- 100% knowledge → fail on application = strong memorization signal
- Multiple prompting strategies tested

**Weaknesses/Caveats**:
- Single task domain (DFA only)
- "Work in Progress" status
- No fine-tuning experiments
- May not generalize to other formal reasoning domains
- Grok-4.1 achieves 59% on unseen (not terrible)

---

## Key Quotes

> "A fundamental question remains unresolved: do these models perform genuine symbolic reasoning, or do they primarily rely on pattern matching over memorized examples?"

> "Despite achieving 100% accuracy on L1, *all models fail on L2 under direct prompting*"

> "Our analysis across multiple prompting strategies (direct, Chain-of-Thought, Tree-of-Thought) reveals that errors persist regardless of prompting approach"

> "Exposing a fundamental gap between LLMs' ability to generate syntactically plausible DFAs and their capacity for semantically correct formal reasoning"

> "Success on seen tasks reflects pattern retrieval rather than robust symbolic reasoning"

---

## Implications for the Literature Review Thesis

**Literature Review Thesis**: LLM reasoning is practical but fundamentally predictive (pattern matching from training distributions), not genuinely generative.

### Direct Support for Core Arguments

| Thesis Claim | Evidence from This Paper |
|--------------|--------------------------|
| Pattern matching, not reasoning | 30-64% drop on unseen vs seen |
| Perfect knowledge ≠ reasoning | 100% factual, fail on application |
| Distribution-bounded | Seen=84-90%, Unseen=20-59% |
| CoT doesn't help | 1-4% improvement only |
| Cannot extrapolate | Constraint composition fails |

### Particularly Strong Evidence

1. **Formally verifiable failures** — no ambiguity about correctness
2. **100% knowledge, fail on application** — proves knowing ≠ reasoning
3. **L1→L2 example** — minimal change, total failure
4. **Prompting irrelevant** — not a scaffold problem
5. **Hints don't fix global errors** — fundamental architecture limit

### Caveats for Our Use

1. **Paper is "Work in Progress"** — results preliminary
2. **Grok-4.1 at 59% unseen** — not complete failure, shows some generalization
3. **Single domain** — may not generalize to all formal reasoning
4. **No fine-tuning tested** — specialized training might help

### Key Quote for Paper

> "Our results reveal a stark dissociation between knowledge and reasoning: all models achieve 100% accuracy on factual questions and 84–90% on seen construction tasks, but accuracy drops sharply on unseen problems (20.67–59.12% under direct prompting, representing 30–64 percentage point drops)"

This is strong evidence for the pattern-matching thesis, but should be cited with the caveat that it's preliminary work in a single domain. The "dissociation between knowledge and reasoning" finding is particularly valuable.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
