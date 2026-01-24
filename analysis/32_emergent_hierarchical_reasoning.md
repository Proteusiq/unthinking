# Paper Analysis: Emergent Hierarchical Reasoning in LLMs through Reinforcement Learning

## Metadata
- **arXiv ID**: 2509.03646
- **Title**: Emergent Hierarchical Reasoning in LLMs through Reinforcement Learning
- **Authors**: Haozhe Wang, Qixin Xu, Che Liu, Junhong Wu, Fangzhen Lin, Wenhu Chen
- **Date**: September 2025
- **Venue**: arXiv preprint
- **Institution**: HKUST, University of Waterloo, M-A-P, Tsinghua, Imperial College, UCAS

---

## Core Claims

1. **RL induces emergent reasoning hierarchy**: RL training leads to a two-phase dynamic — first procedural consolidation, then strategic exploration
2. **"Aha moments" explained**: They are the behavioral signature of discovering new strategic constructs
3. **"Length-scaling" explained**: Correlated with increasing diversity of strategic plans (semantic entropy)
4. **Token-level entropy is misleading**: Aggregate entropy drops while semantic entropy (strategic diversity) increases
5. **Strategic planning is the bottleneck**: After procedural skills consolidate, performance gains come from mastering high-level strategy
6. **HICRA outperforms GRPO**: Focusing credit assignment on planning tokens accelerates learning

---

## Methodology

### Two-Phase Dynamic Model
1. **Phase 1 — Procedural Consolidation**: 
   - Marked by sharp decrease in perplexity and token entropy of execution tokens
   - Model rapidly becomes confident in low-level skills (calculations, formatting)

2. **Phase 2 — Strategic Exploration**:
   - Performance gains driven by exploring high-level planning tokens
   - Marked by increasing semantic entropy of "Strategic Grams" (SGs)
   - Correlates with accuracy improvement and length scaling

### Strategic Grams (SGs) — Full List from Appendix A
N-grams (3-5 tokens) that function as strategic reasoning units:

**Examples include**:
- Deduction: "we can conclude that", "this implies that", "therefore"
- Branching: "let's try a different angle", "alternatively", "another approach"
- Backtracing: "but wait", "hold on", "wait, that's not right", "my previous step was flawed"
- Planning: "the plan is to", "break down the problem", "goal is to"

**Key insight**: These are **reusable scaffolding** extracted from successful solutions — they are **learned templates**, not emergent reasoning.

### HICRA Algorithm
- Amplifies advantage for planning tokens by factor (1 + α)
- α = 0.2 in experiments
- Designed to concentrate learning on strategic bottleneck

### Models Tested (8 total)
- **Text**: Qwen2.5-7B-Base, Qwen3-4B-Base, Qwen3-4B-Instruct, Llama-3.1-8B-Instruct, Deepseek-Distill-Llama-8B
- **Vision-Language**: Qwen2.5-VL-7B-Instruct, MiMO-VL-7B-Instruct

---

## Key Evidence

### Main Performance Results (Table 1)

| Model | AIME24 | AIME25 | Math500 | Δ(HICRA-GRPO) |
|-------|--------|--------|---------|---------------|
| Qwen3-4B-Instruct | 63.4→68.5→**73.1** | 47.7→60.0→**65.1** | 94.6→96.2→**97.2** | +5.4, +5.1, +1.0 |
| Qwen3-4B-Base | 9.4→24.9→**31.0** | 5.3→23.8→**27.6** | 63.8→83.0→**89.0** | +6.1, +3.8, +6.0 |
| Qwen2.5-7B-Base | 3.5→16.3→**18.8** | 1.7→11.4→**14.8** | 55.6→77.6→**80.2** | +2.5, +3.4, +2.6 |
| Llama-3.1-8B-Instruct | 4.2→8.9→8.3 | 0.6→0.5→0.8 | 50.2→53.0→54.8 | **Mixed/Negative** |

**HICRA consistently outperforms GRPO** on Qwen models but **fails on Llama** (see critical appendix finding).

### VLM Results (Table 2)

| Model | MathVista | MathVision | Δ(HICRA-GRPO) |
|-------|-----------|------------|---------------|
| MiMO-VL-Instruct | 77.0→73.7→**80.7** | 42.9→42.8→**48.9** | +7.0, +6.1 |
| Qwen2.5-VL-7B-Instruct | 66.6→70.8→71.4 | 23.6→25.8→28.7 | +0.6, +2.9 |

### Error Type Analysis (Figure 5)
- RL primarily reduces "Planning & Strategy" errors
- Other procedural errors decrease less or remain stable
- For Qwen2.5-7B-Base: **procedural errors don't decrease at all**

> "A perfectly executed incorrect plan will still result in failure."

### Key Dynamics (Figure 3)
1. **Perplexity**: Execution tokens decrease rapidly → procedural confidence
2. **Token Entropy**: Execution tokens lower than planning tokens
3. **Semantic Entropy**: Planning tokens show steady increase → strategic exploration
4. **Validation Accuracy**: Correlates with semantic entropy increase

### Entropy Regularization vs HICRA (Figure 7)
- Entropy regularization increases token entropy but **fails to improve accuracy**
- HICRA achieves higher semantic entropy → better accuracy

> "Indiscriminately promoting token-level diversity only encourages non-productive verbosity on the vast majority of low-level tokens."

### Planning Tokens vs. High-Entropy Tokens (Figure 10)
- Majority of planning tokens are high-entropy (strategic choice points)
- But **most high-entropy tokens are NOT planning tokens** (<10%)
- High entropy alone doesn't guarantee strategic function

---

## CRITICAL APPENDIX FINDINGS

### Appendix C: Full Training Dynamics

**Model-specific observations**:
1. **VL models and Qwen3-4B-Instruct**: Strategic exploration begins **immediately** — no procedural consolidation phase
2. **Llama-3.1-8B-Base**: "Fails to pivot towards exploring high-level planning strategies" → performance stagnation

> "We hypothesize that for the standard Llama models, the intense initial focus on procedural correctness **prematurely collapses the diversity of high-level reasoning strategies**."

### Appendix E.2: HICRA Presumes Procedural Foundation (CRITICAL)

> "HICRA's effectiveness is predicated on a key assumption: that the base model should **readily possess a reasonable foundation for low-level procedural correctness**."

**Figure 14 shows**: When Llama-3.1-Instruct lacks this foundation:
- HICRA **fails to provide advantage** over GRPO
- Semantic entropy shows **reverse trend** between GRPO and HICRA
- "HICRA's enforced strategic exploration becomes **counterproductive** if the model cannot reliably execute the plans it generates"

**Key admission**:
> "This suggests that HICRA is most effective when applied to models that have **already achieved a degree of procedural reliability**."

---

## Critical Analysis: Relationship to Our Thesis

### How This Paper EXPLICITLY SUPPORTS Our Thesis

**1. RL rediscovers pre-training priors (stated explicitly in paper)**:
> "RL does not train models de novo. It fine-tunes base models **already imbued with priors from pre-training** on vast corpora of human-written solutions."

> "RL improves reasoning by **rediscovering and operationalizing** the strategic layer of reasoning **inherited from** the model's pre-training priors."

This is the **surfacing hypothesis** — RL surfaces what's already there.

**2. Strategic Grams are templates from training data**:
- SGs are extracted from "successful reasoning solutions"
- They're "reusable scaffolding" — learned patterns
- The full SG list (Appendix A) shows they're **linguistic templates**, not reasoning

**3. "Strategic exploration" = distribution matching over known patterns**:
From Appendix D:
> "The PPO objective is essentially solving a **distribution matching problem** toward a target distribution shaped by the advantage function."

Models are learning to produce MORE diverse template-like outputs, not reasoning.

**4. Requires pre-existing procedural foundation**:
The paper admits HICRA fails when models lack procedural foundation — this means:
- The "emergent" reasoning requires pre-existing capabilities
- RL can't create reasoning, only surface/deploy existing skills

### What This Paper Does NOT Test

| Generalization Type | Tested? | Result |
|---------------------|---------|--------|
| Exploratory (ID→harder ID) | ✅ | RL helps |
| Compositional (combine skills) | ❌ | **Not tested** |
| Transformative (novel strategies) | ❌ | **Not tested** |
| OOD (unseen domains) | ❌ | **Not tested** |

All benchmarks (AIME, Math500, Olympiad) are **in-distribution** for these models.

### Counter-Evidence from Our Corpus

**OMEGA (2506.18880)** directly contradicts this paper's implicit claims:
- **Same RL methods (GRPO)**: Tested on Qwen-series
- **Exploratory**: RL helps (+61pp on Zebra Logic ID) ✓
- **Compositional**: >69% isolated skills → **near-0% composed** ✗
- **Transformative**: **0%** after RL ✗
- **RL can HURT**: 30pp drop in matrix rank setting

**Planning Generalization Gap (2601.14456)**:
- 82.9% ID → **0% OOD** despite RL fine-tuning
- Models "loop and wander without making progress toward goal"

---

## Relationship to Other Papers

### Supports (with qualification)
- **Interplay (2512.07783)**: RL surfaces pre-existing capabilities (paper explicitly agrees)
- **DeepSeek-R1 (2501.12948)**: RL improves ID performance
- **s1 (2501.19393)**: Test-time scaling works on familiar problems

### Challenged By
- **OMEGA (2506.18880)**: 0% transformative generalization despite RL; compositional failure
- **Planning Generalization Gap (2601.14456)**: 82.9% ID → 0% OOD
- **No Free Lunch (2506.17219)**: RL eventually degrades reasoning; format↑ reasoning↓

### Does NOT Address
- Compositional generalization (Faith and Fate)
- OOD performance (GSM-Symbolic, Planning Gap)
- Faithfulness of CoT (Measuring Faithfulness)

---

## REBUTTALS TO THIS PAPER

### Direct Counter-Evidence

1. **OMEGA (2506.18880)**: Same RL methods, same models (Qwen), but:
   - Compositional: >69% isolated skills → near-0% composed
   - Transformative: 0% after RL
   - **Directly tests what this paper assumes but doesn't test**

2. **Planning Generalization Gap (2601.14456)**:
   - 82.9% ID → 0% OOD despite RL fine-tuning
   - Surface pattern sensitivity persists

3. **No Free Lunch (2506.17219)**:
   - RL improved format but degraded reasoning (291→235 correct)
   - Contradicts claim that semantic entropy tracks genuine capability

### Methodological Weaknesses

1. **No OOD testing**: All benchmarks are ID
2. **Circular definition**: SGs defined from successful solutions; then paper shows RL increases SG diversity
3. **Self-acknowledged failure case**: HICRA fails on Llama when procedural foundation missing
4. **Semantic entropy ≠ reasoning**: Measures diversity of templates, not reasoning ability

### Limitations (Authors Acknowledge)
- HICRA requires pre-existing procedural foundation
- Results on Llama show method is not universal
- "Lack of Strategic Exploration Hinders Sustained Improvement in Llama Models"

---

## Key Quotes

### On RL's mechanism (supports surfacing hypothesis):
> "RL does not train models de novo. It fine-tunes base models **already imbued with priors from pre-training** on vast corpora of human-written solutions."

> "RL improves reasoning by **rediscovering and operationalizing** the strategic layer of reasoning **inherited from** the model's pre-training priors."

### On strategic grams as scaffolding:
> "SGs function as the **reusable scaffolding** of a reasoning process."

### On exploration as distribution matching:
> "The PPO objective is essentially solving a **distribution matching problem** toward a target distribution shaped by the advantage function."

### On HICRA's limitations:
> "HICRA's effectiveness is predicated on a key assumption: that the base model should **readily possess a reasonable foundation for low-level procedural correctness**."

> "This suggests that HICRA is most effective when applied to models that have **already achieved a degree of procedural reliability**."

### On Llama's failure:
> "We hypothesize that for the standard Llama models, the intense initial focus on procedural correctness **prematurely collapses the diversity of high-level reasoning strategies**."

---

## Status
- [x] Read complete (ar5iv HTML version + all appendices)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**

---

## Summary for Synthesis

**Verdict: BALANCED (appears FOR "emergent reasoning" but actually supports SURFACING hypothesis)**

### Key Arguments for Our Thesis:

1. **Paper explicitly states RL rediscovers pre-training priors** — this IS the surfacing hypothesis
2. **Strategic Grams are learned templates**, not emergent reasoning
3. **HICRA requires pre-existing capability** — can't create reasoning from nothing
4. **No OOD testing** — all evidence is in-distribution
5. **OMEGA directly contradicts** implicit generalization claims with controlled experiments

### What This Paper Actually Shows:
- RL can improve **deployment** of learned strategic templates (exploratory generalization)
- Models learn to produce **more diverse template-like outputs**
- This requires **pre-existing procedural foundation**

### What This Paper Does NOT Show:
- Compositional generalization
- Transformative reasoning
- OOD generalization
- That "emergent" reasoning is genuinely new capability

### Bottom Line:
The paper provides a detailed mechanism for HOW RL improves ID performance (strategic template deployment), but this mechanism **supports rather than challenges** our thesis. RL surfaces and optimizes deployment of pre-existing patterns — it doesn't create new reasoning capabilities. The paper's own acknowledgment that HICRA requires pre-existing procedural foundation confirms that RL depends on, rather than creates, capability.
