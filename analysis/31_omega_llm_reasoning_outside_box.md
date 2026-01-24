# Paper Analysis: OMEGA - Can LLMs Reason Outside the Box in Math?

## Metadata
- **arXiv ID**: 2506.18880
- **Title**: OMEGA: Can LLMs Reason Outside the Box in Math? Evaluating Exploratory, Compositional, and Transformative Generalization
- **Authors**: Yiyou Sun, Shawn Hu, Georgia Zhou, Ken Zheng, Hannaneh Hajishirzi, Nouha Dziri, Dawn Song
- **Date**: June 2025
- **Venue**: arXiv preprint
- **Institution**: UC Berkeley, AI2, University of Washington, dmodel.ai

---

## Core Claims

1. **Performance degrades to near-zero** as problem complexity increases, despite inference-time compute
2. **RL improves exploratory generalization** (easy→medium) but gains plateau on harder problems
3. **Compositional generalization remains limited** — models can't integrate mastered skills
4. **Transformative generalization shows little to no improvement** — models can't adopt novel strategies
5. **Overthinking leads to error spirals** — models abandon correct answers through excessive verification
6. **Lower accuracy from reluctance to compute, not just arithmetic errors**

---

## Methodology

### OMEGA Benchmark Design
Based on Boden's typology of creativity:
- **40 templated problem generators** across 6 domains: geometry, number theory, algebra, combinatorics, logic, puzzles
- **Programmatically generated** with verified solutions (symbolic, numerical, graphical)
- **Controlled complexity levels** enabling precise ID/OOD analysis

### Three Generalization Axes
1. **Exploratory**: Apply known skills to more complex instances (same domain, higher complexity)
2. **Compositional**: Combine distinct skills previously learned in isolation
3. **Transformative**: Adopt novel, unconventional strategies beyond familiar approaches

### Models Tested
- DeepSeek-R1
- Claude-3.7-Sonnet
- OpenAI-o3-mini
- OpenAI-o4-mini
- Qwen2.5-7B-Instruct (for RL experiments)

---

## Key Evidence

### Finding 1: Performance Degrades to Zero with Complexity

From Figure 3:
- All frontier models show "sharp performance degradation as problem complexity increases"
- Performance "deteriorates to near-zero despite substantial inference-time compute"
- Pass@k scaling helps at moderate complexity, **but gains plateau at higher levels**

### Finding 2: CoT Analysis Reveals Fundamental Limits

**Overthinking patterns (Figure 4-5)**:
- ~38% of incorrect responses: models initially arrive at correct answer, then **second-guess and revise to incorrect**
- "Reasoning spirals (wrong→wrong)": models cycle through flawed paths without converging

**Key quote**:
> "CoT overthinking can paradoxically lead models to abandon the correct branch and answer, causing them to fall into spirals of errors."

### Finding 3: Reluctance to Compute, Not Just Errors (Figure 6)

Matrix Rank analysis:
- Fraction of tokens on **actual computation drops** from 65% (level 1) to <40% (level 7)
- **Conjectural statements expand** to fill the gap
- "Paradoxically, when the model does compute, it does so MORE reliably at higher levels"

**Key insight**: 
> "The accuracy loss at higher complexity is not only driven by cascading numerical mistakes, but also by the model's reluctance to invest reasoning budget in systematic calculation."

### Finding 4: RL Generalization Results (Figures 8-11)

| Generalization Type | ID Improvement | OOD Improvement |
|---------------------|----------------|-----------------|
| **Exploratory** | Strong (+61pp in Zebra Logic) | Moderate (+53pp to level 3) |
| **Compositional** | Strong on isolated skills (>69%) | **Little to no improvement** |
| **Transformative** | Strong on familiar tasks | **Near 0% on OOD** |

**Compositional failure (Figure 10)**:
> "Models that master both skills independently fail to generalize when the solution requires their integration."

**Transformative failure (Figure 11)**:
> "Performance on OOD transformational problems remains low after RL, often 0%."

### Finding 5: RL Can Hurt Performance

Matrix rank setting:
- Base model achieved 70% OOD
- After RL: **dropped 30 percentage points**
- "RL optimization can sometimes reinforce suboptimal patterns... rather than promoting exploration"

---

## Relationship to Other Papers

### Supports
- **Faith and Fate (2305.18654)**: Compositional generalization failures
- **Planning Generalization Gap (2601.14456)**: ID/OOD gap pattern; RL doesn't help OOD
- **Interplay (2512.07783)**: RL surfaces, doesn't create new capabilities
- **Illusion of Thinking (2506.06941)**: Performance collapse at complexity threshold

### Extends
- **GSM-Symbolic (2410.05229)**: From surface perturbation to controlled generalization axes
- Boden's creativity typology applied to LLM evaluation

### Provides Mechanism For
- Why RL improves benchmarks but doesn't generalize
- Why CoT can hurt (overthinking → error spirals)
- Why high ID ≠ reasoning capability

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments
1. **Model scale might help**: Only tested up to 7B for RL experiments
2. **RL methods might improve**: GRPO specifically; other methods could do better
3. **More diverse training**: Could teach compositional/transformative skills explicitly

### Limitations (Authors Acknowledge)
1. "We limited testing to 64 attempts" for Pass@k
2. Specific to math domain; may not generalize to other reasoning
3. Templated problems may not capture all mathematical creativity

### Important Controls (Appendix D)
The authors show that failure is NOT due to context length limits:
- Level-6 problems require only ~21,180 tokens (well below 128K-200K limits)
- All frontier models have ample context to solve every instance
- "Even under pessimistic token-accounting assumptions, level-6 problems demand fewer than 30,000 tokens"

This confirms: **failure is due to reasoning limits, not context limits**

### Search for Direct Rebuttals
- **None found** — paper is recent (June 2025)
- Would need evidence of successful compositional/transformative generalization

---

## Key Quotes

### On the core problem:
> "However, they often rely on a narrow set of strategies and struggle with problems that require a novel way of thinking."

### On compositional failure:
> "Unlike humans who fluidly integrate mastered skills, RL models trained on isolated skills struggle at compositional generalization."

### On transformative failure:
> "Models trained conventionally deteriorate on problems necessitating unconventional thinking."

### On the implication:
> "These findings underscore crucial gaps between current LLM reasoning capabilities and the flexible, insightful problem-solving characteristic of human mathematicians, particularly in scenarios demanding genuine mathematical creativity beyond mere pattern recognition."

### On overthinking:
> "Transformers' autoregressive nature still compounds early mistakes, and CoT overthinking can paradoxically lead models to abandon the correct branch."

### On reluctance to compute:
> "The model's reluctance to invest reasoning budget in systematic calculation" — not arithmetic errors

### Conclusion:
> "While RL can amplify the breadth and depth of problems that LLMs solve, they do not by themselves foster the creative leaps needed for true transformational reasoning."

---

## Relevance to Our Thesis

**CRITICAL EVIDENCE**: This paper directly supports our thesis with systematic, controlled experiments.

### Key Arguments Supported:

1. **Pattern matching, not reasoning**: Models fail when required to go beyond familiar patterns
   - Compositional: Can't combine mastered skills
   - Transformative: Can't adopt novel strategies

2. **RL surfaces, doesn't create**: Strong exploratory gains but compositional/transformative near-zero

3. **Benchmark success is misleading**: High ID accuracy masks complete OOD failure

4. **Not just execution errors**: Reluctance to compute systematically (heuristics over computation)

### Specific Numbers for Synthesis:
- **0% transformative generalization** after RL in most settings
- **Compositional: >69% on isolated skills, near-0% on composition**
- **38% "correct→incorrect"** from overthinking
- **65%→<40%** computation budget drop as complexity increases
- **30pp DROP** in OOD after RL in one setting (matrix rank)

### Critical Distinction
The paper makes explicit what we argue: models can INTERPOLATE (exploratory) but cannot EXTRAPOLATE (compositional, transformative). This maps directly to our "practical but predictive" vs. "genuinely generative" distinction.

---

## Status
- [x] Read complete (ar5iv HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
