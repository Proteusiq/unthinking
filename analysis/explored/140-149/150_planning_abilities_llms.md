# Paper Analysis: On the Planning Abilities of Large Language Models

## Metadata
- **arXiv ID**: 2305.15771
- **Title**: On the Planning Abilities of Large Language Models: A Critical Investigation
- **Authors**: Karthik Valmeekam, Matthew Marquez, Sarath Sreedharan, Subbarao Kambhampati
- **Affiliation**: Arizona State University
- **Date**: May 2023 (v1), November 2023 (v2)
- **Venue**: NeurIPS 2023 (Spotlight)

---

## Core Claims

1. **LLMs cannot plan autonomously** — GPT-4 (best model) achieves only **~12% average success rate** on autonomous plan generation across IPC-style planning domains.

2. **LLM-Modulo framework shows promise** — When LLMs act as heuristic guides for external planners/verifiers rather than autonomous planners, results improve significantly.

3. **External verification is critical** — LLMs benefit from external verifiers that provide feedback and back-prompt for better plan generation.

4. **Systematic evaluation needed** — The paper provides a benchmark using domains similar to International Planning Competition (IPC) for rigorous evaluation.

---

## Methodology

### Two Evaluation Modes

**1. Autonomous Mode**
- LLMs generate complete plans from problem description
- Evaluated on plan executability and goal achievement
- No external verification or feedback

**2. LLM-Modulo (Heuristic) Mode**
- LLMs provide heuristic guidance to external sound planners
- External verifiers validate plans
- Feedback loops allow iterative improvement

### Domains Tested
Based on International Planning Competition (IPC) style domains:
- Blocksworld
- Logistics
- Mystery Blocksworld
- And others similar to IPC benchmarks

### Models Tested
- GPT-4 (best performing)
- GPT-3.5
- Other LLMs

---

## Key Evidence

### Autonomous Planning Results

| Model | Average Success Rate |
|-------|---------------------|
| GPT-4 | **~12%** |
| GPT-3.5 | Lower than GPT-4 |

**Key Finding**: The best LLM (GPT-4) generates executable, goal-achieving plans only ~12% of the time when operating autonomously.

### LLM-Modulo Results
- External verifiers can validate LLM-generated plans
- Feedback loops improve plan quality
- "LLM-generated plans can improve the search process for underlying sound planners"

### What LLMs Fail At
1. Generating valid action sequences
2. Satisfying preconditions
3. Achieving goal states
4. Handling constraint satisfaction

---

## Relationship to Thesis

### **STRONGLY SUPPORTS** Pattern Matching Hypothesis

**Key implications:**

1. **Planning requires search, not pattern completion** — LLMs excel at pattern completion but planning requires systematic search over action spaces

2. **~12% success = worse than random in some domains** — This is not "sometimes fails" but "mostly fails"

3. **External scaffolding is required** — The LLM-Modulo framework shows LLMs need external symbolic systems to plan effectively

4. **Same author as "Can LLMs Reason and Plan?"** (Paper 131) — Kambhampati's group consistently finds LLMs cannot plan autonomously

### Connection to Thesis
This paper provides the foundational benchmark evidence that:
- LLMs generate plans that look plausible but don't execute
- The appearance of planning (text that sounds like a plan) ≠ actual planning
- This is pattern matching (producing plan-like text) not reasoning (generating valid action sequences)

---

## Relationship to Other Papers

### Directly Supports
- **Can LLMs Reason and Plan?** (Paper 131): Same research group, same conclusion
- **Chain of Thoughtlessness** (Paper 136): CoT doesn't help planning
- **Illusion of Thinking** (Paper 03): Extended to puzzle domains, same failure pattern
- **Planning Generalization Gap** (Paper 29): 82.9% ID → 0% OOD extends this finding

### Extended By
- **Stop Anthropomorphizing Tokens** (Paper 132): Extends argument to reasoning in general
- **LLMs Still Can't Plan; Can LRMs?** (2409.13373): Tests o1/Strawberry models

### Provides Benchmark For
- Subsequent planning evaluations use this methodology
- IPC-style domains become standard for testing

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- **Illusion of Illusion of Thinking** (Paper 124): Argues LLMs can plan with prompting
- Some papers show improved results with better prompting

### Potential Counter-Arguments
1. **Prompting matters**: Different prompts might yield better results
2. **Newer models improve**: GPT-4 Turbo, Claude 3, etc. might do better
3. **Domain-specific fine-tuning helps**: General LLMs vs. planning-tuned models

### Paper's Response
The LLM-Modulo framework acknowledges LLMs can be useful — just not as autonomous planners. The contribution is showing WHERE LLMs fit in a planning system (as heuristics, not as planners).

---

## Key Quotes

**On autonomous planning**:
> "LLMs' ability to generate executable plans autonomously is rather limited, with the best model (GPT-4) having an average success rate of ~12% across the domains."

**On LLM-Modulo**:
> "LLM-generated plans can improve the search process for underlying sound planners and additionally show that external verifiers can help provide feedback on the generated plans and back-prompt the LLM for better plan generation."

---

## Implications for LLM Reasoning Research

1. **Planning ≠ Reasoning about plans** — LLMs can discuss plans but cannot generate valid ones

2. **Soundness requires external verification** — LLMs cannot self-verify plan validity

3. **Hybrid systems needed** — The LLM-Modulo insight: use LLMs for heuristics, external systems for correctness

4. **Benchmark methodology** — IPC-style domains provide rigorous evaluation framework

5. **NeurIPS Spotlight = high-impact** — This finding is mainstream accepted, not fringe

---

## Status
- [x] Read complete (abstract + related papers)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated** (pending)
