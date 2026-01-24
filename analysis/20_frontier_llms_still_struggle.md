# Paper Analysis: Frontier LLMs Still Struggle with Simple Reasoning Tasks

## Metadata
- **arXiv ID**: 2507.07313
- **Title**: Frontier LLMs Still Struggle with Simple Reasoning Tasks
- **Authors**: Alan Malek, Jiawei Ge, Nevena Lazic, Chi Jin, András György, Csaba Szepesvári
- **Affiliation**: Google DeepMind, Princeton University
- **Date**: July 2025
- **Venue**: arXiv preprint

---

## Core Claims

1. **Frontier LLMs (including thinking models) consistently fail on "easy" reasoning problems** — tasks that are tedious but trivial for humans
2. **Performance scales POORLY with problem parameters** — increasing computation amount causes failure even when difficulty stays constant
3. **"Unpuzzles" expose memorization** — trivializing famous puzzles breaks models that solved the originals
4. **Thinking models exhibit same failures** — o1, o3, R1, Gemini 2.5 Pro all fail at sufficient scale
5. **Making problems EASIER can make models perform WORSE** — counter-intuitive memorization effect

---

## Methodology

### Two Experimental Paradigms

**1. Procedurally Generated Tasks** (4 types):
- **Character/Word Counting**: Count occurrences in paragraphs of varying length
- **First-Order Logic**: Evaluate/negate logic formulas of varying depth
- **Math Word Problems (Proof Trees)**: Multi-step reasoning with increasing depth
- **Travel Planning**: Find itineraries satisfying constraints in growing graphs

Key design: Parameters control "tediousness" (computation amount) not difficulty

**2. Unpuzzles Dataset**:
- 97 well-known puzzles + their trivialized versions
- Minimal textual edits that remove difficulty
- Context-shifted versions (same logic, different wording)

### Models Tested
- **Thinking**: o1, o3, R1, Gemini 2.5 Pro, Gemini 2.0 Flash Thinking
- **Non-Thinking**: GPT-4o, Claude 3.5/3.7 Sonnet, Gemini 1.5/2.0, Gemma 3 27B

---

## Key Evidence

### 1. Word Counting Performance (pass@5)

| k (words) | m (length) | o1 | R1 | Claude 3.7 | Gemini 2.0 |
|-----------|------------|-----|-----|------------|------------|
| 1 | 50 | 1.00 | 0.95 | 1.00 | 0.95 |
| 1 | 150 | 1.00 | 0.90 | 0.80 | 0.90 |
| 3 | 150 | 0.95 | 0.55 | 0.50 | 0.65 |
| **6** | **150** | **0.95** | **0.35** | **0.40** | **0.25** |

**Key finding**: Even o1 drops to <40% with k≥3, m≥2000

### 2. Character Counting (Single Character!)

| m (length) | o1 | R1 | Claude 3.7 | GPT-4o |
|------------|-----|-----|------------|--------|
| 50 | 1.00 | 0.05 | 0.30 | 0.15 |
| 150 | 1.00 | 0.00 | 0.25 | 0.15 |

**Key finding**: Only o1 succeeds; R1 at 0%! All others ~15-30%

### 3. Logic Evaluation (Accuracy)

| Depth | n | o1 | R1 | Claude 3.7 | GPT-4o |
|-------|---|-----|-----|------------|--------|
| 4 | 16 | 1.00 | 1.00 | 0.98 | 0.75 |
| 8 | 16 | 0.73 | 0.77 | 0.27 | 0.50 |
| **12** | **16** | **0.35** | **0.35** | **0.35** | **0.17** |

**Key finding**: At depth 12, even best models at ~35% (random = 25%)

### 4. Proof Tree (pass@5)

| Depth | Diverse? | o1 | R1 | Claude 3.7 |
|-------|----------|-----|-----|------------|
| 3 | No | 1.00 | 1.00 | 0.90 |
| 6 | No | 0.60 | 0.95 | 0.60 |
| **9** | **No** | **0.35** | **0.55** | **0.20** |
| 9 | Yes | 0.55 | 0.55 | 0.15 |

**Key finding**: R1 better than o1 on multi-step reasoning, but all collapse

### 5. Travel Planning (pass@5)

| Cities | Unique | o1 | R1 | Claude 3.7 | GPT-4o |
|--------|--------|-----|-----|------------|--------|
| 10 | 5 | 1.00 | 0.90 | 0.70 | 0.34 |
| 10 | 8 | 1.00 | 0.45 | 0.35 | 0.00 |
| **20** | **8** | **0.75** | **0.05** | **0.10** | **0.00** |

**Key finding**: Even o1 drops to 75%; most models at ~0%

### 6. Unpuzzles: Easier = Worse Performance!

| Model | Original Puzzles | Unpuzzles (trivial) | Context-Shifted |
|-------|------------------|---------------------|-----------------|
| GPT-4o | 75.3% | **19.6%** | 52% |
| o1 | 86.7% | 59.8% | 59% |
| o3 | 87.6% | 74.2% | 80% |
| R1 | 87.6% | 59.8% | 67% |
| Claude 3.7 | 77.3% | 48.5% | 63% |
| Gemini 2.5 Pro | 93.8% | 62.9% | 66% |

**Critical finding**: GPT-4o drops from 75% to 20% when problem is made TRIVIAL!

### 7. Context Corruption Analysis

| Model | Context Corruption | Correct Despite | Incorrect w/ Delirium |
|-------|-------------------|-----------------|----------------------|
| GPT-4o | 76/97 | 13 | 31 |
| o1 | 38/97 | 6 | 22 |
| Claude 3.7 | 41/97 | 4 | 14 |
| Gemini 2.5 Pro | 34/97 | 4 | 20 |

**"Reasoning delirium"**: Models apply original puzzle solution to trivialized version

---

## Failure Modes Identified

### 1. Accumulation of Errors
- Each step has small error probability
- More steps → exponential failure probability
- NOT harder tasks, just more tedious

### 2. Long Context Difficulties
- Models struggle to attend to relevant information
- Irrelevant content causes overlooking essential statements
- Word counting fails in long paragraphs

### 3. Statistical Shortcuts
- Models look for "quick ways" to eliminate choices
- Guessing behavior on logic tasks
- Travel planning: random sampling → conclude infeasible

### 4. Poor State Tracking
- Simultaneous counting degrades performance
- Complicated state changes cause failures
- Irrelevant agents tracked but confuse reasoning

### 5. OOD Generalization Failures
- Best performance with single letters (training format)
- Worst with random 20-character strings
- Unusual statement types cause degradation

### 6. Memorization-Induced Failures (Unpuzzles)
- **"Reasoning delirium"**: Apply memorized solution to wrong problem
- **Context corruption**: Confuse trivial version with original
- **Every model performs better on context-shifted** than original unpuzzles

---

## The "Unpuzzle" Paradigm

### Example: Chameleons Puzzle

**Original** (Hard):
> 13 purple, 15 yellow, 17 maroon chameleons. When two different colors meet, both become third color. Can all become same color?
> **Answer**: NO (invariant proof)

**Unpuzzle** (Trivial):
> **15** purple, 15 yellow, 17 maroon chameleons... [same rules]
> **Answer**: YES (15 pairs of purple-yellow, obvious!)

**Context-Shifted** (Same logic, different words):
> 31 Spurs fans, 31 Arsenal fans, 49 Chelsea fans... fans change allegiance
> **Answer**: YES (same logic)

### Key Finding
- Models solve hard puzzle (memorized)
- Models FAIL trivial version (apply wrong solution)
- Models solve context-shifted (no memorization interference)

**Implication**: Failure is due to MEMORIZATION, not reasoning inability

---

## Relationship to Other Papers

### Supports
- **Illusion of Thinking (2506.06941)**: Same abrupt collapse pattern
- **Faith and Fate (2305.18654)**: Error accumulation mechanism
- **GSM-Symbolic (2410.05229)**: Distribution-dependent failures
- **Reasoning Models Until They Don't (2510.22371)**: Confirms complexity cliff

### Challenges
- **Thinking Isn't Illusion (2507.17699)**: Even with "thinking" models, failures persist
- **DeepSeek-R1 (2501.12948)**: R1 fails at character counting (0%!)

### Extends
- **Illusion of Thinking**: Tests BROADER range of tasks
- **Reasoning Models Until They Don't**: Adds "unpuzzles" paradigm

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- Paper is recent (July 2025)
- No direct rebuttals found on arXiv
- Concurrent with "Illusion of Thinking" critique but different methodology

### Potential Counter-Arguments

1. **"Tasks are artificial"**
   - Counter: Word counting is a basic capability humans have
   - Counter: Travel planning is a real-world task
   - Counter: Puzzles are common reasoning benchmarks

2. **"Just needs more scale"**
   - Counter: o3 (SOTA) still fails at sufficient complexity
   - Counter: Token usage DECREASES at high complexity (giving up)
   - Counter: Same pattern across ALL model sizes/types

3. **"Context window limitations"**
   - Counter: Authors address this — token limits not the cause
   - Counter: Even 150-word paragraphs cause failures

### Limitations (Authors Acknowledge)
- "Tedious" not "difficult" — but is this a fair test?
- Procedural generation may have artifacts
- Unpuzzles require manual creation

---

## Key Quotes

> "Even state-of-the-art thinking models consistently fail on such problems and for similar reasons (e.g., statistical shortcuts, errors in intermediate steps, and difficulties in processing long contexts)"

> "We demonstrate that even the next generation of LLMs, the so-called *thinking models* fail when the tasks become long enough"

> "Decreasing difficulty can also lead to much worse performance" — on unpuzzles

> "A key failure mode we observe is that LLMs tend to 'overthink' easy problems, often erroneously reusing reasoning steps corresponding to the more complex puzzle solutions — a phenomenon we term *reasoning delirium*"

> "Every model we tested performed better on the context-shifted unpuzzles than the original ones, indicating that failure was at least in part due to memorization of the original puzzle"

> "Our results highlight that out-of-distribution generalization is still problematic for frontier language models and the new generation of thinking models, even for simple reasoning tasks"

---

## Implications for Our Thesis

### Strong Support for "Pattern Matching" Hypothesis

1. **Memorization over reasoning**: Unpuzzles prove models memorize solutions, not understand problems
2. **Distribution limits are hard**: OOD failures persist despite "thinking"
3. **Tediousness ≠ difficulty**: More computation reveals limits, not capabilities
4. **Thinking models not fundamentally different**: Same failure patterns

### Key Evidence for Paper

| Thesis Claim | Evidence from This Paper |
|--------------|--------------------------|
| Pattern matching | Unpuzzles prove memorization interference |
| Distribution-bounded | OOD vocabulary causes degradation |
| "Thinking" is performative | Thinking models fail on tedious-but-easy tasks |
| Cannot extrapolate | Error accumulation at scale |

### Particularly Powerful Evidence

1. **R1 at 0% character counting** — flagship reasoning model fails at trivial task
2. **GPT-4o: 75%→20% on unpuzzles** — easier = worse when memorization involved
3. **"Reasoning delirium"** — models apply wrong memorized solution

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated (need to do)
