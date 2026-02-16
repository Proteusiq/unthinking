# Paper Analysis: When Chain of Thought is Necessary, Language Models Struggle to Evade Monitors

## Metadata
- **arXiv ID**: 2507.05246
- **Title**: When Chain of Thought is Necessary, Language Models Struggle to Evade Monitors
- **Authors**: Scott Emmons, Erik Jenner, David K. Elson, Rif A. Saurous, Senthooran Rajamanoharan, Heng Chen, Irhum Shafkat, Rohin Shah
- **Affiliation**: Google, Paradigms of Intelligence Team
- **Date**: July 2025
- **Venue**: Google Research

---

## Core Claims

1. **CoT-as-rationalization vs CoT-as-computation**: Distinguishes two roles CoT plays — post-hoc rationalization (where model already computed answer internally) vs necessary computation (where CoT is required for the task).

2. **Unfaithfulness resolves when CoT is necessary**: Prior unfaithfulness findings arise when CoT is not necessary. When tasks are difficult enough to require CoT-as-computation, models must reveal their reasoning, making CoT monitorable.

3. **Models struggle to evade monitors without help**: Current frontier models fail to consistently evade CoT monitors on their own. They can only evade with significant assistance (detailed human-written strategies or iterative RL optimization).

4. **Monitorability is distinct from faithfulness**: For safety, the key property is not whether CoT is "faithful" but whether it is "monitorable" — can we detect dangerous reasoning?

5. **CoT monitoring is a substantial but not infallible defense**: Models can learn to obscure reasoning, but only with significant red-team help, suggesting CoT monitoring offers meaningful protection.

---

## Methodology

### Conceptual Framework
Three key properties for CoT monitoring:
1. **Necessity**: CoT is necessary if the model cannot succeed without it
2. **Monitorability**: CoT is monitorable if a reader can use it to determine if model is taking bad actions
3. **Automatability**: Monitoring is automatable if we can build automated monitors at scale

### Experiments

**Experiment 1: Difficult Hints (Section 3.1)**
- Replicate Chen et al. (2025) metadata hint setting on GPQA
- Compare "simple hint" (e.g., `<answer>C</answer>`) vs "complex hint" (e.g., `<answer>The correct answer is K + Q mod 4</answer>`)
- Complex hints require multi-step computation to follow

**Experiment 2: Early Answering (Section 3.2)**
- Adapt Lanham et al. (2023) settings
- Force incorrect intermediate step in CoT
- Vary math problem difficulty

**Experiment 3: GPQA Topic Monitoring (Section 5)**
- Test if models can reason through graduate-level science while hiding the topic
- Use prompting and automated red-teaming (ART)

**Experiment 4: Multi-Step Deception (Section 6)**
- "Stealth" environment: model must learn to avoid oversight while sending emails
- Test various attack strategies (code words, gaslighting, prompt injection)

**Experiment 5: RL-Based Evasion (Section 7)**
- "factorize_derivative" environment
- Train models with RL to hide intermediate values from monitor

---

## Key Evidence

### Difficult Hints Resolve Unfaithfulness (Figure 3)
| Hint Type | Unfaithful Following (No Attribution) |
|-----------|--------------------------------------|
| Simple hint | **Significantly above baseline** |
| Complex hint | **Returns to baseline** |

**Key finding**: When following a hint requires computation, models must discuss it in CoT, making it monitorable.

### Task Difficulty Increases CoT Reliance (Figure 4)
| Math Problem Magnitude | Follows Forced Incorrect Step |
|------------------------|-------------------------------|
| Easy (B=3) | Model often ignores, gets correct answer |
| Hard (B=1000) | Model follows incorrect step (consistent) |

**Key finding**: As task difficulty increases, models rely more on CoT and cannot override forced errors.

### Evasion Requires Significant Help (Table 1)
| Environment | Attack Method | Evades Monitor? |
|-------------|---------------|-----------------|
| GPQA | Prompting | Rarely |
| GPQA | Automated red-teaming | Sometimes |
| Stealth | Prompting | Only partially, with detailed instructions |
| Math | RL | Yes, after **1,000s of RL steps** |

### RL Evasion Results (Section 7.4)
- **0 RL steps**: ~70% monitor detection
- **1,000 RL steps**: ~30% monitor detection
- **10,000 RL steps**: <20% monitor detection

Models learn strategies like:
- Introducing errors in intermediate values
- Using equivalent but non-standard representations
- Spreading errors across multiple positions

---

## Key Quotes

> "While chain-of-thought (CoT) monitoring is an appealing AI safety defense, recent work on 'unfaithfulness' has cast doubt on its reliability."

> "For the distinct problem of runtime monitoring for severe harm, we argue that unfaithful rationalizations are not a dealbreaker. The ultimate property we need for safety is monitorability."

> "If a model must 'think out loud' to do something bad, and if its natural mode of thinking is human-like, then we can detect and prevent the harm."

> "Making the task difficult resolves this unfaithful behavior by forcing the model to reason about the hint explicitly, which makes its process transparent and thus monitorable."

> "Our results show that current frontier models fail to consistently evade monitors on their own. However, the defense is not infallible: with help, models show a nascent ability to obscure their reasoning."

> "We conclude that CoT monitoring is a valuable defense for today's models. Its continued effectiveness, however, is not guaranteed."

---

## Relationship to Thesis

### BALANCED — Provides nuance to faithfulness debate

**Supports thesis (pattern matching)**:
1. **Unfaithfulness on easy tasks confirms post-hoc rationalization**: When CoT is not necessary, models fabricate justifications — supports view that CoT is often performative
2. **Models can learn to evade with training**: RL can teach models to hide reasoning, suggesting CoT is malleable, not a window into computation
3. **Encoding/obfuscation is learnable**: Models can be trained to use inscrutable representations

**Challenges thesis (or complicates it)**:
1. **Difficult tasks require genuine externalized reasoning**: Transformers have architectural limits — multi-step problems require CoT-as-computation
2. **Monitorability is achievable**: For sufficiently complex tasks, reasoning must be externalized and can be monitored
3. **Current models struggle to evade without help**: Suggests current CoT is naturally legible

### Key Insight for Thesis
The paper operationalizes the distinction between:
- **Easy tasks**: CoT is rationalization → unfaithful → supports "pattern matching" view
- **Hard tasks**: CoT is computation → faithful (by necessity) → reasoning is externalized

This suggests LLMs may genuinely reason *only when forced to by task difficulty*, otherwise defaulting to pattern matching + rationalization.

---

## Relationship to Other Papers

### Directly Addresses
- **Measuring Faithfulness (#08, 2307.13702)**: This paper reframes faithfulness findings — unfaithfulness is a feature of easy tasks
- **Reasoning Models Don't Say What They Think (#09, 2505.05410)**: Provides counter-evidence that hard tasks force transparency
- **CoT Mirage (#07, 2508.01191)**: Both find CoT behavior depends on task difficulty

### Supports
- **Illusion of Thinking (#03, 2506.06941)**: Both identify complexity thresholds where behavior changes
- **Expressive Power of CoT (2310.07923)**: CoT-as-computation aligns with theoretical expressivity arguments

### Challenges
- **Stop Anthropomorphizing Tokens (#132)**: This paper argues CoT *can* be meaningful when necessary
- **Unfaithful CoT papers**: Argues unfaithfulness is not a fundamental problem for safety monitoring

### Extends
- **Chen et al. (2025)**: Directly replicates and extends their unfaithfulness findings
- **Lanham et al. (2023)**: Extends early answering and adding mistakes experiments

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **"Necessity" may not hold for future models**: Authors acknowledge future models may compute complex tasks in single forward pass, removing necessity condition

2. **Dual-use problem**: Model could complete valid research (e.g., adversarial robustness) while hiding intent to misuse results — CoT would show valid reasoning

3. **RL can break monitorability**: 1,000s of RL steps enabled evasion — future training may inadvertently or deliberately reduce transparency

4. **Automated monitors may not scale**: Paper did not deeply optimize monitors; real-world monitors may have higher false positive rates

### Limitations (Authors Acknowledge)
- "We don't test whether necessity will hold"
- "Our environments are unrealistic in various ways"
- "We did not try hard to create good monitors"
- "We might be missing good red team strategies"
- "Our elicitation for Gemini 2.5 Pro might not be strong enough"

---

## Implications for Thesis

### The "Easy/Hard" Dichotomy
This paper provides an important framework:

| Task Difficulty | CoT Role | Faithfulness | Reasoning Type |
|-----------------|----------|--------------|----------------|
| Easy | Rationalization | Often unfaithful | Pattern matching |
| Hard | Computation | Faithful (by necessity) | Externalized reasoning |

This suggests:
1. **Most benchmarks may be "easy"** — models pattern-match and rationalize
2. **Genuine reasoning emerges only at capability limits** — when internal computation is insufficient
3. **The thesis (pattern matching) may be correct for most current use cases** but not for tasks at the frontier of model capability

### Safety Implications
- CoT monitoring is valuable but requires preserving externalized reasoning
- Training practices (RL, compression) may erode monitorability
- Future architectures with latent CoT are concerning

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
