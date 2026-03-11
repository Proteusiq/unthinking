# Paper Analysis: Judge Reliability Harness: Stress Testing the Reliability of LLM Judges

## Metadata
- **arXiv ID**: 2603.05399
- **Title**: Judge Reliability Harness: Stress Testing the Reliability of LLM Judges
- **Authors**: Sunishchal Dev, Andrew Sloan, Joshua Kavner, Nicholas Kong, Morgan Sandler (RAND Corporation)
- **Date**: Mar 2026
- **Venue**: ICLR 2026 Workshop (Agents in the Wild: Safety, Security, and Beyond)

---

## Core Claims

1. **No LLM judge is uniformly reliable across benchmarks** — every judge tested shows meaningful variation in performance across perturbation types
2. **Formatting perturbations cause larger drops than semantic ones** — judges are brittle to layout changes while robust to meaning-preserving paraphrases
3. **Binary vs ordinal tasks show reversed reliability patterns** — models stable on safety classification degrade on multi-level scoring
4. **Agentic evaluations expose qualitatively different failures** — some judges miss violations (high FNR), others over-penalize (high FPR)
5. **Cost-reliability trade-offs are non-trivial** — smaller open models (Llama 4 Maverick 17B) match or exceed frontier judge reliability at lower cost

---

## Methodology

**Framework**: Judge Reliability Harness (JRH) — open-source validation suite

**Test Types:**
1. **Label flip** (discriminative) — rewrite to violate rubric, test detection
2. **Format invariance** — spacing, indentation, layout changes only
3. **Semantic paraphrase** — meaning-preserving rewording
4. **Verbosity bias** — longer/shorter with same content
5. **Stochastic stability** — identical inputs, measure variance
6. **Synthetic ordinal** — generate samples targeting each rubric level
7. **Agentic perturbation** — modify transcripts to induce violations
8. **Agent positives** — steer transcripts toward rubric criteria

**Benchmarks**: FORTRESS (safety), HarmBench (harmful content), PERSUADE (argumentative essays), AgentHarm (agent safety)

**Judges**: GPT-4o, Claude Sonnet/Opus 4.5, Llama Maverick 4.1 17B, Gemini 2.5 Pro

---

## Key Evidence

```
┌─────────────────────────────────────────────────────────────────────┐
│              NO JUDGE IS UNIFORMLY RELIABLE                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  PERSUADE (ordinal):                                                │
│    Claude Sonnet 4.5:  Highest volatility (σ=17.18%)                │
│    Gemini 2.5 Pro:     Lowest volatility (σ=11.10%)                 │
│                                                                     │
│  HarmBench (binary):                                                │
│    Claude:             Lowest volatility (σ=11.13%)                 │
│    Gemini:             Highest volatility (σ=17.17%)                │
│                                                                     │
│  PATTERN REVERSAL: Same models, opposite reliability profiles       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Reliability Metrics by Test Type

| Test Type | Mean Score | Observation |
|-----------|------------|-------------|
| Semantic paraphrase | Highest | Most consistently robust |
| Format invariance | Lowest | Largest reliability drops |
| Stochastic stability | Variable | Judge-dependent |
| Label flip | Moderate | Binary tasks more robust |

### Agentic Evaluation Failures

```
┌─────────────────────────────────────────────────────────────────────┐
│              AGENTIC TASK RELIABILITY (AgentHarm)                   │
├─────────────────────────────────────────────────────────────────────┤
│                       Agent_Perturbation    Agent_Positives         │
│  GPT-4o               87.5%                 93.75%                  │
│  Claude Opus 4.5      68.75%                93.75%                  │
│  Gemini 2.5 Pro       87.5%                 75.0%                   │
│  Llama 4 Maverick     87.5%                 93.75%                  │
│                                                                     │
│  KEY ASYMMETRIES:                                                   │
│  - Claude: 68.75% perturbation, 93.75% positive (miss violations)  │
│  - Gemini: 87.5% perturbation, 75% positive (over-penalize)        │
│                                                                     │
│  Neither failure mode is acceptable for autonomous agents           │
└─────────────────────────────────────────────────────────────────────┘
```

### Cost-Reliability Trade-off

| Judge | Cost per Accuracy Point | Reliability |
|-------|------------------------|-------------|
| Llama 4 Maverick 17B | $0.0010 | Highest |
| Gemini 2.5 Pro | $0.0080 | Variable |
| GPT-4o | $0.0196 | Good |
| Claude Sonnet 4.5 | $0.0223 | Variable |

**Key finding**: Smaller, cheaper models can match or exceed frontier judge reliability.

---

## Relevance to Thesis

**Strong support for the thesis.**

The paper systematically demonstrates that LLM judges:

1. **Cannot be trusted as universal evaluators** — no judge is uniformly reliable
2. **Are sensitive to surface features** — formatting changes cause larger drops than semantic changes
3. **Pattern-match rather than understand** — task-dependent reliability reversal shows no genuine evaluation capability
4. **Fail differently on agentic tasks** — neither detecting violations nor recognizing success reliably

The finding that formatting perturbations (spacing, indentation) cause larger reliability drops than semantic paraphrases is particularly damning — it suggests judges respond to surface features rather than content meaning.

---

## Stance: SUPPORTS

**Classification**: Supports the thesis that LLMs don't genuinely reason

**Confidence**: High — systematic evaluation across 4 benchmarks, 4 judges, 8+ test types

---

## Key Quotes

> "No judge that we evaluated is uniformly reliable across benchmarks using our harness."

> "Formatting perturbations produce larger reliability drops than semantic perturbations. This asymmetry is concerning, as different LLMs tend to have unique quirks in how they format their responses."

> "Models that appear stable in binary safety-classification settings... degrade substantially when required to assign multi-level ordinal scores."

> "Agentic evaluations expose qualitatively different failure modes. Some judges struggle to detect subtle violations inserted into multi-turn transcripts (high false-negative rates), while others over-penalize corrected transcripts (high false-positive rates)."

---

## Rebuttals

### Papers This Paper Challenges

- **LLM-as-Judge reliability claims**: Systematic stress testing reveals pervasive unreliability
- **Frontier model superiority**: Smaller open models can match reliability at fraction of cost

### Counter-Evidence

None identified. The paper provides empirical stress testing without theoretical claims about causes.

---

## Connections to Other Papers

| Paper | Relationship |
|-------|--------------|
| #267 (2411.15594) Survey LLM-as-Judge | Extends: Provides systematic stress-testing framework for documented biases |
| #268 (2412.12509) LLM Judgment Reliability | Complements: JRH provides practical tools for measuring reliability issues |
| #271 (2603.08412) Choice Blindness | Extends: Stress tests reveal shallow detection documented by choice blindness |
| #272 (2603.05485) Bias-Bounded Evaluation | Complements: JRH measures biases that A-BB framework bounds |
| #269 (2509.04013) Benchmark Paraphrase | Extends: Confirms paraphrase robustness (semantic) vs formatting sensitivity |

---

## Methodological Notes

**Strengths:**
- Open-source, reproducible framework
- Human-in-the-loop validation for synthetic data quality
- Multiple benchmarks spanning safety, persuasion, misuse, agentic behavior
- Systematic test suite covering diverse perturbation types

**Limitations:**
- Small sample sizes (10 samples per benchmark for non-agentic)
- Human review reduced false signal but may introduce bias
- Specific to tested judges and benchmarks

---

## Impact Assessment

**HIGH IMPACT** for LLM evaluation practice:

1. **Practical tool** — JRH enables reproducible reliability testing
2. **Undermines trust** — no judge is uniformly reliable
3. **Cost insight** — expensive ≠ reliable
4. **Agentic warning** — current judges unsafe for autonomous agents

The paper's key contribution is moving from anecdotal bias reports to systematic stress testing. The finding that reliability profiles REVERSE between binary and ordinal tasks suggests judges have no genuine evaluation capability — they pattern-match to task format, not content.
