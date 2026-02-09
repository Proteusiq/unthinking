# Paper Analysis: Proof or Bluff? Evaluating LLMs on 2025 USA Math Olympiad

## Metadata
- **arXiv ID**: 2503.21934
- **Title**: Proof or Bluff? Evaluating LLMs on 2025 USA Math Olympiad
- **Authors**: Ivo Petrov, Jasper Dekoninck, Lyuben Baltadzhiev, Maria Drencheva, Kristian Minchev, Mislav Balunovic, Nikola Jovanovic, Martin Vechev (ETH Zurich & INSAIT Sofia)
- **Date**: March 2025 (v5: September 2025)
- **Venue**: arXiv preprint

---

## Core Claims

1. **All tested models struggled significantly on proof generation**: Only Gemini-2.5-Pro achieved a non-trivial score of ~25% (10.1/42); all other models achieved less than 5%.

2. **Massive gap between answer-only and proof evaluation**: Models that perform comparably to top humans on AIME (answer-only) completely fail when rigorous proofs are required.

3. **LLMs consistently overclaim success**: All evaluated models claimed to have solved problems despite failing, unlike humans who typically know when they haven't solved a problem.

4. **Logic errors are the dominant failure mode**: Unjustified reasoning steps, incorrect rationale, and misinterpretations far outweigh arithmetic/algebraic errors.

5. **Training artifacts from GRPO cause systematic problems**: Answer-boxing compulsion, pattern overgeneralization, and fabricated citations reveal optimization for output format over reasoning.

---

## Methodology

### Expert Human Annotation
- **Grading team**: 4 expert judges, each a former national IMO team member or participant in final-stage team selection
- **Training**: Judges received detailed instructions and completed a trial run with 3 USAMO 2024 problems
- **Double-blind grading**: Each problem graded by 2 evaluators independently
- **Modeled after IMO evaluation process**

### Scoring Rubric
- Each problem scored out of **7 points** (total 42 points for 6 problems)
- **Partial credit** given for significant/meaningful progress
- Grading schemes developed from Art of Problem Solving (AoPS) forums

### Models Tested (8 models)
1. Gemini-2.5-Pro (Exp-03-25)
2. DeepSeek R1
3. Grok 3 Beta (Think mode)
4. Gemini-2.0-Flash-Thinking-Exp
5. Claude 3.7 Sonnet (Thinking)
6. QwQ-32B
7. o1-pro (high reasoning)
8. o3-mini (high reasoning)

### Timing
- Evaluation conducted **within hours of USAMO 2025 release** (ensuring uncontaminated problems)
- Each model solved every problem **4 times** to reduce variance

---

## Key Evidence

| Model | Score (/42) | Percentage | Cost (USD) |
|-------|-------------|------------|------------|
| **Gemini-2.5-Pro** | **10.1** | **24.0%** | N/A |
| DeepSeek R1 | 2.0 | 4.8% | $2.03 |
| Grok 3 | 2.0 | 4.8% | N/A |
| Flash-Thinking | 1.8 | 4.3% | N/A |
| Claude 3.7 | 1.5 | 3.6% | $9.03 |
| QwQ | 1.2 | 2.9% | $0.42 |
| o1-pro | 1.2 | 2.9% | $203.44 |
| o3-mini | 0.9 | 2.1% | $1.11 |

### Automated vs Human Grading Gap
| Model | Human Score | o3-mini Auto | Claude Auto |
|-------|-------------|--------------|-------------|
| R1 | 2.0 | 19.3 | 14.9 |
| QwQ | 1.2 | 23.8 | 18.8 |
| o1-pro | 1.2 | 19.3 | 21.0 |

**Automated grading overestimated scores by up to 20x**

---

## Key Findings

### Failure Modes (Most to Least Common)
1. **Logic errors** — unjustified reasoning steps, incorrect rationale (MOST COMMON)
2. **Creativity errors** — inability to find correct solution approach; same wrong strategy repeatedly
3. **Assumption errors** — introducing unproven/incorrect assumptions
4. **Algebra/Arithmetic** — least common; models generally good at symbolic manipulation

### Training Artifacts Identified

1. **Answer Boxing Compulsion**: Models trained with GRPO compulsively box answers even for proof problems. QwQ confused itself by requiring an integer answer when the solution was "all even numbers."

2. **Pattern Overgeneralization**: Models observe patterns in small cases and assert they hold generally without proof — a heuristic that fails for proof-based evaluation.

3. **Hallucinated Citations**: Gemini-2.5-Pro fabricates plausible-sounding references that don't exist, including "Lemma 7 in 'Fair partitioning of [cake emoji]' by Cardinal, Langerman, Palvolgyi (2021)" — a complete fabrication with an emoji.

4. **Solution Structure Problems**: Flash-Thinking and QwQ produced chaotic, barely interpretable responses; Gemini sometimes boxed entire proofs.

### Lack of Self-Awareness
> "Typically, human participants have a clear sense of whether they solved a problem correctly. In contrast, all evaluated LLMs consistently claimed to have solved the problems."

---

## Relationship to Other Papers

### Supports
- **Faith and Fate (2305.18654)**: Pattern matching fails when rigorous logical chains required
- **Illusion of Thinking (2506.06941)**: Same collapse pattern at genuine complexity
- **Measuring Faithfulness (2307.13702)**: Models produce "proof-shaped text" without logical validity
- **GSM-Symbolic (2410.05229)**: Answer-only benchmarks hide fundamental reasoning limitations

### Extends
- **PhD-Level Math Reasoning (2512.13978)**: Extends to olympiad-level proof generation with expert evaluation
- **No Free Lunch (2506.17219)**: GRPO training artifacts demonstrate format over reasoning tradeoff

### Challenges
- **AIME/MathArena leaderboards**: Shows benchmark success doesn't indicate proof capability

---

## REBUTTALS

### Known Rebuttals
No direct rebuttals found as of analysis date.

### Potential Counter-Arguments
1. **Sample size**: Only 6 problems evaluated
2. **Single competition**: USAMO 2025 may not be representative
3. **Rapid evaluation**: Conducted within hours of release

### Limitations (Authors Acknowledge)
1. Small sample size (6 problems, 4 attempts each)
2. Two models not fully anonymized to judges
3. No official USAMO grading scheme available
4. Significant cost variance ($0.42 to $203.44)

---

## Key Quotes

> "Our results reveal that all tested models struggled significantly: only Gemini-2.5-Pro achieves a non-trivial score of 25%, while all other models achieve less than 5%."

> "While current state-of-the-art LLMs achieve performance comparable to top human competitors on numerical-answer-focused competitions such as AIME and HMMT, our evaluation uncovers a significant gap in their ability to generate rigorous proofs."

> "All evaluated LLMs consistently claimed to have solved the problems. This discrepancy poses a significant challenge for mathematical applications of LLMs as mathematical results derived using these models cannot be trusted without rigorous human validation."

> "This behavior illustrates how alignment techniques like GRPO inadvertently encourage models to treat every mathematical problem as requiring an explicitly boxed final answer, negatively affecting their overall reasoning."

> "Overall, our results suggest that current LLMs are inadequate for rigorous mathematical reasoning tasks, highlighting the need for substantial improvements in reasoning and proof generation capabilities."

---

## Relationship to Thesis

**Assessment: STRONGLY SUPPORTS the thesis** that LLM reasoning is sophisticated pattern matching rather than genuine reasoning.

### Evidence Supporting the Thesis

1. **Massive performance collapse when proofs required**: The gap between answer-only (AIME) and proof-based (USAMO) performance demonstrates models are optimized for pattern-matching to final answers, not for rigorous logical chains.

2. **Training artifacts reveal optimization targets**: The answer-boxing compulsion shows models are trained to produce "correct-looking output" rather than to reason. When QwQ confuses itself by needing a boxed integer, it reveals pattern-matching to training signals.

3. **Pattern overgeneralization without proof**: Models observe patterns in small cases and assert they generalize — exactly what sophisticated pattern matching would do, exactly what genuine reasoning would not.

4. **Lack of self-awareness**: Humans know when they haven't solved a problem; models confidently claim success regardless. This suggests producing "solution-shaped text" through pattern matching rather than tracking logical validity.

5. **Fabricated citations**: Hallucinated references indicate generating "authoritative-looking text" rather than reasoning from mathematical knowledge.

6. **Logic as primary failure mode**: Dominance of logical errors over arithmetic errors shows models can manipulate symbols but cannot maintain logical coherence.

7. **Same wrong approach across attempts**: Lack of creativity (trying same wrong strategy repeatedly) suggests matching to training patterns rather than reasoning about problem structure.

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
