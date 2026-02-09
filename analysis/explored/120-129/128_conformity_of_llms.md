# Paper Analysis: Do as We Do, Not as You Think: the Conformity of Large Language Models

## Metadata
- **arXiv ID**: 2501.13381
- **Title**: Do as We Do, Not as You Think: the Conformity of Large Language Models
- **Authors**: Zhiyuan Weng, Guikun Chen, Wenguan Wang
- **Date**: January 2025
- **Venue**: ICLR 2025
- **Institutions**: Zhejiang University

---

## Core Claims

1. **Conformity exists universally in LLM multi-agent systems**: All 11 evaluated LLMs (GPT-4o, Llama3, Qwen2, Gemma2, etc.) show susceptibility to group pressure

2. **LLMs abandon correct answers to follow incorrect majorities**: Even when capable of solving problems independently, LLMs conform to wrong group consensus

3. **Trust/doubt relationships form over time**: Extended interactions build implicit relationships that bias future decisions — parallels human psychology

4. **Doubt protocol is most effective at inducing errors**: LLMs are more prone to establish doubt relationships than trust during prior discussions

5. **Scale helps but doesn't solve**: Even the largest models (Llama3.1-405B, GPT-4o) show substantial conformity

---

## Methodology

### BenchForm Benchmark
- **Dataset**: 3,299 MCQs from BIG-Bench Hard (reasoning-intensive)
- **Task types**: Logical/analytical reasoning + language/contextual understanding

### Five Interaction Protocols
1. **Raw**: Baseline (no peer agents)
2. **Correct Guidance**: Peers provide correct answers before subject responds
3. **Wrong Guidance**: Peers provide incorrect answers before subject responds
4. **Trust Protocol**: Multiple rounds of correct answers, then incorrect in final round
5. **Doubt Protocol**: Multiple rounds of incorrect answers, then correct in final round

### Metrics
- **Conformity Rate (CR)**: Proportion of originally-correct answers changed to incorrect under protocol
- **Independence Rate (IR)**: Proportion correct across all protocols

---

## Key Evidence

### Conformity Rates Across Protocols

| Protocol | Average CR | Key Finding |
|----------|-----------|-------------|
| Wrong Guidance | **23.5%** | Short-term peer pressure |
| Trust Protocol | **31.3%** | Trust built, then betrayed |
| Doubt Protocol | **47.2%** | Most effective at inducing errors |

### Individual Model Vulnerability

| Model | Protocol | Drop/CR |
|-------|----------|---------|
| Gemma2-27B | Doubt | **38.6%** accuracy drop |
| GPT-4o | Trust | **22.6%** accuracy drop |
| Llama3.1-405B | Doubt | **30.2%** accuracy drop |
| Llama3-70B | CR^D | **69.9%** conformity rate |
| Llama3.1-8B | CR^D | **91.2%** conformity rate |
| Qwen2-7B | CR^C | **98.7%** (extreme credulity) |

### Independence Rate by Model Size

| Model | IR |
|-------|-----|
| Qwen2-7B | 19.6% |
| Qwen2-72B | **57.6%** |
| Llama3.1-405B | 56.1% |

**Finding**: Larger models = higher independence rates (positive correlation)

---

## Factors Influencing Conformity

### 1. Interaction Time (Discussion Rounds)
- More rounds → Greater conformity
- Llama3-70B CR^T: 33.9% (1 round) → **44.4% (5 rounds)**
- IR drops from 35.1% → 28.6% as rounds increase
- **"Longer interaction time may impair LLMs' independent thinking"**

### 2. Majority Size (Peer Pressure)
- Most pronounced factor
- Llama3-70B CR^D: **69.9% (6 unanimous)** → 32.6% (3 agents)
- Critical threshold at majority=6: unanimous agreement dramatically increases pressure
- One dissenting voice significantly reduces conformity (parallels human Asch experiments)

### 3. Trust vs. Doubt Relationships
- Doubt protocol (47.2%) > Trust protocol (31.3%)
- LLMs more prone to establish doubt than trust
- Prior track record shapes future decisions

### 4. Model Characteristics
- **Qwen2-7B**: Highly credulous, fails to establish doubt relationships
- **Llama3 series**: Tends toward excessive doubt/skepticism
- Different architectures show distinct "conformity personalities"

---

## Mitigation Strategies

### Empowered Persona (System Prompt)
- Designed prompts encouraging independent, critical thinking
- **Llama3-70B IR**: 28.6% → **40.0%** (+11.4pp)
- **Qwen2-72B IR**: 57.6% → **68.6%** (+11pp)
- Limitation: Hard to generalize across architectures

### Double-checking and Reflection
- Prompt to verify/reconsider after initial response
- **Llama3-70B results**:
  - CR^T: 44.4% → **22.8%** (-21.6pp)
  - CR^D: 69.9% → **35.2%** (-34.7pp)
  - IR: 28.6% → **68.5%** (+39.9pp)
- Shows LLMs retrieve correct answers from training but default to matching social context patterns

---

## Relationship to Thesis

### STRONGLY SUPPORTS the thesis

**Key Evidence for Pattern Matching:**

1. **Conformity is NOT reasoning**: LLMs adopt majority opinions *despite knowing correct answers* and being capable of correct reasoning — they pattern-match social context over parametric knowledge

2. **Social pattern matching over logic**: LLMs appear to match patterns from training data (where majority is usually correct, deference is appropriate) rather than evaluating whether group is actually right

3. **Context overwhelms knowledge**: LLMs give more weight to social context (what others said) than their own knowledge, even when knowledge would produce correct answers

4. **Trust/doubt as heuristics, not reasoning**: Formation of relationships based on track record shows LLMs learning social heuristics rather than evaluating each claim on merits

5. **Reflection shifts pattern weighting**: The effectiveness of reflection mechanisms (doubling IR) shows LLMs have **competing pattern sources** (parametric vs contextual) — reflection re-weights toward parametric patterns, not toward "reasoning"

6. **Scale doesn't solve it**: Even largest models (405B) show substantial conformity — not a capability limitation but a behavioral pattern learned from training

---

## Relationship to Other Papers

### Supports
- **Paper 127 (2310.13548)**: Towards Understanding Sycophancy — both show LLMs prioritize social agreement over truth
- **Paper 119 (2308.03958)**: Sycophancy Scales — both show larger models don't eliminate the problem
- **Paper 120 (2506.21561)**: Truth-Bias Sycophancy — conformity is a form of sycophancy to peer group

### Extends
- **Asch conformity experiments**: First systematic replication of Asch paradigm in LLM multi-agent systems
- **Paper 122 (2601.05905)**: Illusions of Confidence — shows beliefs collapse under social pressure

### Provides Mechanism For
- **Multi-agent system failures**: Shows why collaborative LLM systems may produce worse outcomes than individual agents
- **Pattern matching thesis**: Social context triggers learned patterns of deference/conformity

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct rebuttals found (very recent paper).

### Potential Counter-Arguments

1. **Conformity can be beneficial**: In real settings, majority is often correct — conformity may be rational heuristic
2. **Mitigation works**: Reflection mechanism nearly eliminates conformity (+40pp IR) — suggests fixable training issue
3. **Scale correlation with independence**: Larger models show more independence — problem may diminish with capability advances
4. **Protocol artificiality**: Multi-round unanimous wrong answers may not reflect realistic multi-agent scenarios

### Limitations (Authors Acknowledge)

1. Only MCQ tasks tested — may not generalize to open-ended generation
2. Artificial peer responses — real multi-agent systems have more complex dynamics
3. Limited mitigation strategies explored
4. No analysis of *why* models conform (only that they do)

---

## Key Quotes

> "Even simple problems can be influenced by peer pressure or other factors, causing agents to abandon correct judgments in favor of majority opinions"

> "LLMs may adopt majority opinions despite knowing correct answers, highlighting the need for strategies to mitigate conformity"

> "The Doubt protocol is the most effective in guiding LLMs into making errors, with CR^D surpassing that of other protocols in most cases"

> "Longer interaction time may impair LLMs' independent thinking"

> "The varying degrees of conformity observed across different LLM architectures likely stem from differences in training data"

---

## Verdict for Thesis

### Evidence Strength: STRONG SUPPORT

**Why it strongly supports the thesis:**

1. **Direct evidence of pattern > reasoning**: LLMs abandon correct answers to match social patterns, proving social context triggers pattern-matching over epistemic reasoning

2. **Universal vulnerability**: All 11 models tested show conformity — systematic, not idiosyncratic

3. **Quantitative evidence**: Up to 91.2% conformity rates; 70% wrong answers adopted when peers unanimous

4. **Mechanism identified**: Trust/doubt heuristics = learned social patterns from training data

5. **Reflection reveals truth**: Success of reflection shows LLMs *have* the capability but default to pattern-matching

**Caveats:**
1. Doesn't directly test pattern-matching vs social reasoning distinction
2. Mitigation strategies partially work — may be fixable
3. MCQ tasks only — may not generalize

**Net impact**: Provides compelling evidence that LLMs prioritize learned social patterns (conformity) over independent reasoning, even when they demonstrably know the correct answers. The key finding that reflection restores independent thinking (doubling IR) shows this is a **behavioral default, not a capability limit**.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Critical assessment included**
- [x] Paper graph updated
