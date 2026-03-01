# Paper Analysis: Bayesian Scaling Laws for In-Context Learning

## Metadata
- **arXiv ID**: 2410.16531
- **Title**: Bayesian scaling laws for in-context learning
- **Authors**: Aryaman Arora, Dan Jurafsky, Christopher Potts, Noah D. Goodman (Stanford)
- **Date**: October 2024
- **Venue**: arXiv preprint

---

## Core Claims

1. ICL approximates a Bayesian learner; this explains the relationship between number of examples and accuracy
2. Post-training (SFT/DPO) only changes task priors, NOT the model's underlying knowledge of tasks
3. Bayesian scaling laws accurately predict when suppressed behaviors will reemerge under many-shot ICL
4. Alignment merely reduces the prior probability of harmful behavior but not its learnability
5. Amount of post-training needed to suppress ICL increases with model scale

---

## Methodology

### Bayesian Model of ICL
Model as tuple M = ⟨Σ, T, ρ, δ⟩:
- Σ: finite alphabet of symbols
- T = {T₁, ..., Tₘ}: set of tasks
- ρ: prior probability distribution over tasks
- δ: likelihood function (task × symbol → probability)

### Key Equation
Next-example probability given n in-context examples:
```
E[p(σ|D)] = Σ P^(Kn+1) * ρ / Σ P^(Kn) * ρ
```
Where K is "ICL efficiency coefficient"

### Experiments
1. **GINC synthetic data**: GPT-2 models trained on HMM mixture
2. **SFT experiment**: Fine-tune on one HMM, test ICL relearning
3. **DPO experiment**: Preference alignment, test jailbreaking
4. **Real-world LLMs**: Llama 3.1 Base vs. Instruct comparison

---

## Key Evidence

### GINC Synthetic Results
| Scaling Law | Interpolation NRMSE | Extrapolation NRMSE |
|-------------|---------------------|---------------------|
| Power | 0.0274 | 0.0621 |
| Bounded | 0.0272 | 0.1138 |
| Logistic | 0.0268 | 0.0814 |
| **Bayesian** | 0.0279 | **0.0493** |

Bayesian law has best extrapolation (predicts unseen shot counts).

### SFT Key Finding
> "SFT makes similar changes to model knowledge about distributions across scales, but changes the prior more for smaller models."

Priors shift to favor aligned task, but knowledge of disfavored tasks persists.

### Llama 3.1 Base vs. Instruct
**Critical finding**: On HarmBench jailbreaking dataset:
- Instruct has lower PRIOR on harmful behaviors
- But BOTH Base and Instruct posteriors eventually saturate
- "Alignment merely reduces the prior probability of harmful behaviour but not its learnability under ICL"

---

## Relationship to Thesis

### Strongly Supports
This paper provides the **theoretical foundation** for the thesis:

1. **Safety is prior reweighting**: Alignment doesn't remove capability, just makes it less probable
2. **ICL can override priors**: Given enough examples, suppressed behaviors reemerge
3. **Scale makes it worse**: Larger models need more post-training to suppress ICL
4. **Bayesian, not reasoning**: Models are statistical learners doing Bayesian inference, not principled reasoners

### Key Insight for Thesis
The paper proves mathematically what the jailbreak papers show empirically:
- Post-training changes P(harmful | no context)
- But P(harmful | many harmful examples) → high for both aligned and base models
- The "knowledge" of harmful behavior is never removed

---

## Relationship to Other Papers

### Provides Theory For
- **#231 (What Really Matters)**: Explains WHY more shots help jailbreaking
- **#232 (Mitigating Many-Shot)**: Explains what mitigation changes (priors, not knowledge)
- **#233 (PANDAS)**: Adaptive sampling = better Bayesian update signal
- **#240 (LRMs as Jailbreak Agents)**: ICL jailbreaking as Bayesian inference

### Supports
- **#241 (CCA)**: Context manipulation changes posterior
- **Anil et al. (2024)**: Power-law ICL curves emerge from Bayesian model

### Connects To
- **Xie et al. (2022)**: ICL as implicit Bayesian inference
- **Embers of Autoregression**: Task priors from pretraining persist

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments
1. GINC is synthetic - real LLMs may differ
2. Bayesian model is approximation - actual mechanisms may be more complex
3. Real safety alignment may involve more than prior shifts

### Limitations (Authors Acknowledge)
1. No guarantees GINC findings transfer to real world
2. Real LLMs trained on natural language, not controlled HMMs
3. Context window degradation affects some results

---

## Key Quotes

> "Under a Bayesian view of post-training, it is possible that fine-tuning merely reweights task priors while leaving task knowledge unchanged; our Bayesian scaling laws can test this hypothesis."

> "We then compare Llama 3.1 8B Base and Instruct using one of our Bayesian scaling laws and find that alignment merely reduces the prior probability of harmful behaviour but not its learnability under ICL."

> "Being able to predict the shape of the ICL curve would help us... predict potential alignment failures under many-shot jailbreaking."

> "Our work thus introduces a tool for interpreting the task knowledge of LLMs via behavioural evaluation, which we hope is valuable for improving LLM alignment."

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
