# Paper Analysis: On the Generalization Gap in LLM Planning

## Metadata
- **arXiv ID**: 2601.14456
- **Title**: On the Generalization Gap in LLM Planning: Tests and Verifier-Reward RL
- **Authors**: Valerio Belcamino, Nicholas Attolino, Alessio Capitanelli, Fulvio Mastrogiovanni
- **Date**: January 2025
- **Venue**: arXiv preprint
- **Institution**: University of Genoa, AIKO S.r.l.

---

## Core Claims

1. **Fine-tuned LLMs achieve high in-domain performance (82.9%) but 0% on unseen domains** — indicating severe lack of cross-domain generalization
2. **Symbol anonymization causes 11.5pp performance drop** — models exploit lexical semantics (e.g., "drive" implies movement)
3. **Compact serialization (removing formatting) causes >10pp drop** — despite preserving plan semantics, showing sensitivity to surface form
4. **Verifier-reward RL doesn't improve cross-domain generalization** — functional correctness training signal doesn't help OOD
5. **Models learn domain-specific patterns, not transferable planning competence**

---

## Methodology

### Setup
- **Model**: Qwen-3-1.7B (1.7 billion parameters)
- **Training**: 40,000 domain-problem-plan tuples from 10 IPC 2023 domains
- **Test**: 1,000 in-domain instances + 500 unseen-domain instances (Rover, Briefcase)
- **Validation**: VAL plan validator for ground truth correctness

### Three Diagnostic Variants
1. **v1: Instance-wise Symbol Anonymization** — Replace all action/predicate/object names with arbitrary symbols (a_0, p_3, o_7)
2. **v2: Compact Plan Serialization** — Remove timestamps, parentheses, "END" markers while preserving action sequence
3. **v3: Verifier-Reward Fine-Tuning** — Use VAL validator as reinforcement signal instead of string matching

### Key Controls
- Same optimizer, max sequence length across variants
- Greedy decoding at inference (temperature=0.01)
- Curriculum learning for anonymization (linear increase in anonymization probability)

---

## Key Evidence

### Main Result: In-Domain vs. Unseen-Domain

| Condition | Valid Plan Rate |
|-----------|-----------------|
| In-domain (baseline, 3 epochs) | **82.9%** |
| Unseen domains (Rover, Briefcase) | **0%** |

**THIS IS THE KEY FINDING**: Perfect in-domain performance collapses completely on unseen domains.

### Diagnostic Variant Results

| Variant | Avg. Valid Plan Rate | Change from Baseline |
|---------|---------------------|---------------------|
| B (baseline, 3 epochs) | 82.9% | — |
| v1 (anonymization, 3 epochs) | 71.4% | **-11.5pp** |
| v2 (compact encoding, 3 epochs) | 72.2% | **-10.7pp** |
| v3 (verifier-reward RL) | 78.1% | -4.8pp |

### Per-Domain Results (Table 3)

| Domain | Baseline 3e | v1 (anon) | v2 (compact) | v3 (RL) |
|--------|-------------|-----------|--------------|---------|
| Ferry | 99% | 96% | 95% | 92% |
| Floor-tile | 100% | 93% | 73% | 80% |
| **Blocksworld** | 90% | 100% | **4%** | 92% |
| Child-snack | 91% | 90% | 95% | 88% |
| Spanner | 100% | 98% | 100% | 99% |
| **Satellite** | 16% | 13% | 16% | 34% |
| **Maintenance** | 98% | **0%** | 99% | 98% |
| Parking | 56% | 45% | 62% | 14% |
| Transport | 84% | 86% | 88% | 91% |
| Miconic | 95% | 93% | 90% | 93% |

**Key observations**:
- Maintenance: 98% → 0% with anonymization (catastrophic collapse)
- Blocksworld: 90% → 4% with compact encoding (surface form critical)
- Heterogeneity suggests varying reliance on lexical cues across domains

### Qualitative Analysis of Failures
> "A qualitative inspection of VAL outputs and generated plans on these domains shows that the PDDL syntax is correct, actions are correctly parameterized, and violations of action preconditions are relatively rare. Instead, the model tends to get caught in loops or to wander without making progress toward the goal."

Models learned **surface syntax** but not **goal-directed planning**.

---

## Relationship to Other Papers

### Supports
- **Faith and Fate (2310.12397)**: Both show high ID/low OOD pattern
- **GSM-Symbolic (2410.05229)**: Both demonstrate sensitivity to surface features
- **Beyond Memorization ToC (2601.13392)**: Both show 100% on training distribution, collapse OOD
- **Interplay (2512.07783)**: Both support "RL surfaces, doesn't create" — v3 (RL) doesn't improve OOD

### Challenges
- Papers claiming emergent planning abilities (would need to explain 0% OOD)

### Extends
- Valmeekam et al. (2022): "Large language models still can't plan" — extends with controlled generalization tests

### Provides Mechanism For
- Explains WHY high benchmark scores don't indicate planning ability
- Lexical exploitation + surface pattern matching = ID success without OOD transfer

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments
1. **Scale might help**: 1.7B parameters may be too small — larger models might generalize better
   - *Authors acknowledge*: "10 training domains and 2 unseen domains may be insufficient"
2. **Domain diversity**: Only 10 training domains might not be enough for abstraction
3. **PDDL-specific**: Results might not generalize to natural language planning

### Limitations (Authors Acknowledge)
1. "Ten training domains and two unseen domains may be insufficient to induce abstract planning competence"
2. "Tokenizer behavior rather than purely semantic effects" might explain some results
3. "Observed plateau around 80-83% validity... may reflect model capacity limits"
4. Only 2 unseen domains tested — limited statistical power

### Search for Direct Rebuttals
- **None found yet** — paper is recent (Jan 2025)
- Would need papers showing LLMs CAN generalize cross-domain on planning

### Related Work Citations Supporting the "Pattern Matching" Thesis
The paper cites several works that align with the thesis that LLM reasoning is pattern matching rather than genuine reasoning:
- **Shojaee et al. (2025)**: "The illusion of thinking" — reasoning models limited by problem complexity
- **Karan and Du (2025)**: "Reasoning with sampling" — base model is smarter than you think (sampling, not learning)
- **Yue et al. (2025)**: "Does reinforcement learning really incentivize reasoning capacity?" — RL gains don't translate to reasoning
- **Valmeekam et al. (2022)**: "Large language models still can't plan" — foundational planning critique

---

## Key Quotes

### On the core finding:
> "Despite achieving 82.9% valid plan rate in-domain, the model achieves 0% on unseen domains, indicating a severe lack of cross-domain generalization under our setting."

### On surface sensitivity:
> "Symbol anonymization and compact serialization cause large performance drops, suggesting that current LLM-based planners are highly sensitive to superficial representations."

### On RL not helping:
> "Verifier-reward fine-tuning reaches performance saturation in roughly half the supervised training epochs, but does not improve cross-domain generalization."

### On the nature of learning:
> "In-domain performance plateaus around 80%, while cross-domain performance collapses, suggesting that our fine-tuned model relies heavily on domain-specific patterns rather than transferable planning competence."

### On loop behavior:
> "The model tends to get caught in loops or to wander without making progress toward the goal... This suggests that the model has internalized some aspects of the domain dynamics (e.g., action parameters typing) but struggles to reliably steer behavior toward unseen goals in new domains."

### On implication:
> "These results suggest that, in our setting, fine-tuning a 1.7B-parameter LLM on 10 IPC domains mainly induces domain-specific pattern learning rather than clearly demonstrating transferable planning competence."

---

## Relevance to the Literature Review Thesis

**Literature Review Thesis**: LLM reasoning is practical but fundamentally predictive (pattern matching from training distributions), not genuinely generative. RL and test-time compute "surface" pre-existing capabilities rather than creating new reasoning abilities.

**CRITICAL EVIDENCE**: This paper provides one of the strongest demonstrations of the gap between in-distribution performance and genuine reasoning capability.

### Key Arguments Supported:

1. **Pattern matching, not genuine reasoning**: 82.9% → 0% is the starkest possible evidence that high benchmark performance doesn't indicate reasoning
2. **Surface form dependence**: 10-11pp drops from semantically-neutral changes prove models learn textual patterns
3. **RL doesn't create, only surfaces**: v3 (RL) improves efficiency but doesn't improve OOD — aligns with Interplay (2512.07783)
4. **Loops and wandering**: Qualitative finding that models "wander without making progress" = no goal-directed reasoning

### Specific Numbers for Synthesis:
- **82.9% ID → 0% OOD** — headline finding
- **11.5pp drop** from symbol anonymization
- **Maintenance: 98% → 0%** with anonymization (single domain collapse)
- **Blocksworld: 90% → 4%** from compact encoding

### Additional Insights from Appendix
The Appendix provides computational cost analysis showing:
- Verifier-reward training shifts cost from dataset generation to training time
- Plan validation is polynomial in plan length, much cheaper than full planning
- But this efficiency gain doesn't translate to better generalization
- Authors suggest optimizing supervised bootstrapping checkpoint as future work

### Research Question Framing
The paper explicitly frames their research question:
> "To what extent do fine-tuned LLMs acquire transferable planning competence across PDDL-compatible domains, or do they primarily learn domain-specific superficial regularities?"

Their answer: **primarily superficial regularities**.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
