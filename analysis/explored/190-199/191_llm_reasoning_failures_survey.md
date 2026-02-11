# Paper Analysis: Large Language Model Reasoning Failures

## Metadata
- **arXiv ID**: 2602.06176
- **Title**: Large Language Model Reasoning Failures
- **Authors**: Peiyang Song (Caltech/Stanford), Pengrui Han (Carleton College), Noah Goodman (Stanford)
- **Date**: February 2026
- **Venue**: TMLR 2026 (Survey Certification)

---

## Core Claims

1. **First comprehensive survey dedicated to LLM reasoning failures** - The field has been fragmented; this survey provides a unified 2-axis framework to organize findings.

2. **Reasoning failures are systematic, not random** - They stem from fundamental architectural constraints (self-attention dispersal, uni-directional training), training paradigms (next-token prediction, RLHF bias amplification), and lack of embodied grounding.

3. **Current LLMs lack genuine reasoning** - Despite impressive benchmark performance, LLMs rely on pattern matching, statistical associations, and heuristics rather than human-like reasoning processes.

4. **Robustness issues reveal hidden vulnerabilities** - Apparently adequate performance often masks instability under minor variations (phrasing, order, numerical values).

5. **Learning from failures is essential** - Understanding failure modes is a prerequisite for building resilient AI systems, paralleling fault-tolerance research in computing and incident analysis in safety-critical industries.

---

## Methodology

### Survey Approach
- Unified fragmented research findings into a structured **two-axis taxonomy**
- Examined behavioral outputs rather than internal mechanisms (LLMs treated as "black-box")
- Reviewed failures across all reasoning types: informal, formal, and embodied
- Created companion GitHub repository for ongoing community updates

### Research Practice Pattern Identified
The authors note a common pattern in the literature:
1. Simple, intuitive tests reveal glaring failures
2. Larger-scale systematic evaluations confirm generality
3. Analysis of root causes and mitigation strategies follows

---

## Key Evidence

### The 2-Axis Taxonomy Framework

**AXIS 1: Reasoning Types**

| Category | Subcategory | Examples |
|----------|-------------|----------|
| **Non-Embodied: Informal** | Individual Cognitive | Working memory, inhibitory control, cognitive biases |
| | Implicit Social | Theory of Mind, moral reasoning |
| | Explicit Social | Multi-agent coordination, long-horizon planning |
| **Non-Embodied: Formal** | Logic in Natural Language | Reversal curse, compositional reasoning |
| | Logic in Benchmarks | MWP robustness, coding benchmarks |
| | Arithmetic & Math | Counting, basic arithmetic, word problems |
| **Embodied** | 1D Text-Based | Physical commonsense, physics reasoning |
| | 2D Perception-Based | Visual anomaly, spatial reasoning |
| | 3D Real-World | Affordance, tool use, safety |

**AXIS 2: Failure Types**

| Type | Description | Example |
|------|-------------|---------|
| **Fundamental** | Intrinsic to architecture, manifest broadly | Reversal curse, working memory limits |
| **Application-Specific** | Domain-specific shortcomings | ToM instability, affordance errors |
| **Robustness** | Inconsistent performance under variations | Order effects, numerical sensitivity |

### Quantitative Findings Cited

| Domain | Finding | Source |
|--------|---------|--------|
| Working Memory | LLMs suffer from "proactive interference" much more than humans | Wang & Sun 2025 |
| Cognitive Flexibility | ChatGPT-3.5 achieves only **25.1% accuracy** on Wisconsin Card Sorting Test when rules switch | Galatzer-Levy et al. 2024 |
| Two-Hop Reasoning | LLMs assign nearly **uniform probabilities (~0.33 each)** across candidates, effectively guessing | Balesni et al. 2024 |
| Reversal Curse | GPT-4 knows "Tom Cruise's mother is Mary Lee Pfeiffer" but fails "Who is Mary Lee Pfeiffer's son?" | Berglund et al. 2024 |
| Arithmetic | Models rely on pattern-matching, struggle in middle-digits (not algorithmic) | Multiple sources |
| ToM | Minor modifications in task phrasing lead to drastic performance drops | Ullman 2023, Shapira et al. 2024 |

### Root Causes Identified

**Architectural Causes:**
- Self-attention mechanism's dispersal of focus under complex tasks
- Uni-directional training objectives (causal masking) create reversal curse and order biases
- Auto-regressive generation lacks mechanisms to detect/correct earlier mistakes

**Training Paradigm Causes:**
- Next-token prediction prioritizes statistical pattern completion over deliberate reasoning
- Biases inherited from pre-training data (linguistic patterns reflect human cognitive errors)
- RLHF amplifies biases by aligning with biased human raters

**Grounding Causes:**
- Absence of robust world models
- Lack of embodied cognition (no sensory-motor experience)
- No goal-driven interactions with physical/social world
- Missing experiential feedback for cognitive development

---

## Relationship to Other Papers

### Supports (14 papers we analyzed BEFORE discovering this survey)

**Note**: These 14 papers were independently analyzed as part of our literature review BEFORE we found this survey. The overlap validates our paper selection methodology.

| arXiv ID | Title | Our Analysis |
|----------|-------|--------------|
| 2410.05229 | GSM-Symbolic (mathematical reasoning fragility) | ✅ Analyzed independently |
| 2305.18654 | Faith and Fate (compositional reasoning limits) | ✅ Analyzed independently |
| 2309.12288 | Reversal Curse | ✅ Analyzed independently |
| 2406.11050 | Token Bias (not genuine reasoners) | ✅ Analyzed independently |
| 2307.02477 | Reasoning or Reciting (counterfactual tasks) | ✅ Analyzed independently |
| 2506.06941 | The Illusion of Thinking | ✅ Analyzed independently |
| 2506.09250 | Illusion of Illusion (rebuttal) | ✅ Analyzed independently |
| 2506.18880 | OMEGA (OOD math reasoning) | ✅ Analyzed independently |
| 2507.07313 | Frontier LLMs Still Struggle | ✅ Analyzed independently |
| 2406.02061 | Alice in Wonderland (complete breakdown) | ✅ Analyzed independently |
| 2410.21272 | Arithmetic Without Algorithms | ✅ Analyzed independently |
| 2409.15454 | A-Not-B Errors in ICL | ✅ Analyzed independently |
| 2302.00093 | Easily Distracted by Irrelevant Context | ✅ Analyzed independently |
| 2408.00137 | Correcting Negative Bias | ✅ Analyzed independently |

### New Papers to Review (135 from survey)

**Status**: This section will be updated as we review the 135 new papers from the survey.

Tracked in GitHub issues:
- [#48](https://github.com/Proteusiq/unthinking/issues/48) - Cognitive Skills & Biases (~25 papers)
- [#49](https://github.com/Proteusiq/unthinking/issues/49) - Theory of Mind & Social (~16 papers)
- [#50](https://github.com/Proteusiq/unthinking/issues/50) - Logic & Compositional (~27 papers)
- [#51](https://github.com/Proteusiq/unthinking/issues/51) - Benchmark Robustness (~19 papers)
- [#52](https://github.com/Proteusiq/unthinking/issues/52) - Arithmetic & Math (~24 papers)
- [#53](https://github.com/Proteusiq/unthinking/issues/53) - Embodied & Physical (~16 papers)

### Extends
- This survey **synthesizes** 170+ papers into a unified taxonomy
- Provides the most comprehensive categorization of LLM reasoning failures to date
- Creates a framework for understanding WHY failures occur across different reasoning types

### Challenged By
- Papers showing emergent reasoning capabilities (e.g., DeepSeek-R1, s1)
- Papers demonstrating faithful CoT under certain conditions
- Papers showing genuine compositional reasoning in controlled settings

---

## REBUTTALS

### Known Rebuttals
- Some papers in the "FOR genuine reasoning" camp argue that failures are addressable through:
  - Better prompting (CoT, self-consistency)
  - Larger scale
  - Neuro-symbolic approaches
  - Test-time compute scaling
- The survey acknowledges these but notes failures persist even in state-of-the-art reasoning models (o1, o3)

### Limitations (Authors Acknowledge)
1. **Representation bias** - existing literature may over-represent certain reasoning/failure types
2. **Multi-turn and interactive contexts** are underrepresented
3. **Incomplete root cause analyses** for:
   - Compositional reasoning breakdowns
   - Higher-order ToM failures
   - Physical commonsense gaps
   - Brittle multi-agent planning
4. **Lack of unified, persistent failure benchmarks** spanning all failure types
5. **Dynamic/evolving failures** as models improve are not captured

---

## Key Quotes

> "LLMs remain largely black-box systems, reflecting the inherent complexity of human cognition they emulate."

> "Unlike humans – who develop fundamental cognitive functions through embodied, goal-driven interactions with the physical and social world – LLMs learn passively from text alone, lacking grounding and experiential feedback to support the development."

> "Research shows models rely on superficial pattern-matching rather than arithmetic algorithms, thus struggling notably in middle-digits."

> "Minor modifications in task phrasing lead to drastic drops in performance, showing LLM ToM reasoning is unstable."

> "First, biases are inherited from the pre-training data, where the linguistic patterns in human languages reflect cognitive errors. Second, architectural features of the model – such as the Transformer's causal masking – introduce predispositions toward order-based biases independent of data."

> "The systematic study of reasoning failures in LLMs parallels fault-tolerance research in early computing and incident analysis in safety-critical industries: understanding and categorizing failure is a prerequisite for building resilient systems."

> "As reasoning-specialized models become more prevalent, sustained attention to failure modes will be essential to ensure that future LLMs not only perform better in reasoning tasks, but fail better (gracefully, transparently, recoverably)."

---

## Future Directions (Authors' Suggestions)

1. **Connect behavioral errors to internal mechanisms** - faulty attention head coordination, insufficient intermediate representation alignment

2. **Develop unified, persistent failure benchmarks** updated regularly for new models

3. **Apply failure-injection principles** beyond robustness benchmarks to standard evaluation

4. **Expand benchmark diversity** to capture failures in multi-turn, interactive settings

5. **Improve latent compositional reasoning** through:
   - Editing faulty MHSA modules
   - Graph-structured reasoning path training data
   - Distilling CoT into training

6. **Strengthen embodied reasoning** through:
   - Better internal world models
   - Spatial memory and causal dynamics
   - Feedback mechanisms and error-handling

---

## Significance for Our Thesis

This survey is a **cornerstone paper** for the literature review because:

1. **Provides comprehensive taxonomy** - The 2-axis framework (reasoning type x failure type) organizes our evidence systematically

2. **Strong alignment with thesis** - The survey concludes that current LLMs rely on "pattern matching, statistical associations, and heuristics rather than human-like reasoning processes"

3. **Massive hub node** - Connects to 14 papers we've already analyzed and provides 135 new papers to review

4. **Identifies root causes** - Points to architectural constraints (attention dispersal, causal masking), training paradigms (next-token prediction), and lack of embodied grounding as fundamental reasons for failures

5. **Balanced perspective** - Acknowledges mitigation strategies while maintaining that failures are systematic and fundamental

---

## How Our Project Complements This Survey

**The survey provides taxonomy; we provide the interaction graph.**

### What They Have (Figures 1-5)
- **Figure 1**: 2-axis taxonomy matrix (reasoning type × failure type)
- **Figure 2**: Hierarchical survey structure diagram
- **Figures 3-5**: Detailed taxonomies for Informal, Formal, and Embodied reasoning failures
- **GitHub repo**: Curated paper list organized by category

### What They Don't Have (Our Contribution)
- **NO paper interaction graph** - Their survey categorizes papers but doesn't show how papers relate to each other
- **NO rebuttal tracking** - They don't visualize which papers challenge or support each other
- **NO network visualization** - Papers are listed, not connected

### Our Interactive Visualization Fills This Gap
Our project at [proteusiq.github.io/unthinking](https://proteusiq.github.io/unthinking/) provides:
- **Force-directed graph** showing paper-to-paper relationships
- **Relationship types**: supports, rebuts, extends
- **Rebuttal chains**: A rebuts B, C rebuts A's rebuttal
- **Color-coded stances**: supports thesis (green), challenges (red), balanced (yellow)
- **Interactive exploration**: hover, click, search, filter

**Together**: Their taxonomy + Our interaction graph = Complete picture of the LLM reasoning failures literature

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Taxonomy documented
- [x] Cross-references identified (14 overlapping papers)
- [x] Rebuttals checked
- [x] Paper graph updated
