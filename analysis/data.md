# The Training Distribution: Where "Reasoning" Comes From

> **The pipeline that builds the training distribution is fundamentally heuristic. Every filtering choice, every mixing ratio, every deduplication threshold shapes what the model can and cannot do. Understanding this pipeline is understanding the boundary of LLM capabilities.**

**Source**: Stanford CS336 — Language Modeling from Scratch (Spring 2025), Lectures 13 & 14
**Interactive visualization**: [data.html](https://proteusiq.github.io/unthinking/pages/data.html)

---

## Why Data Is the Thesis

The thesis claims LLM reasoning is predictive — pattern matching from training distributions, not genuine generative reasoning. If true, then the training distribution *is* the explanation for capabilities. Everything the model can do traces back to what it was trained on.

The evidence is direct:

| Paper | Finding | Implication |
|-------|---------|-------------|
| Interplay (#15) | 0% pre-training exposure → RL completely fails; ≥1% → succeeds | RL surfaces what data put there |
| CoT Mirage (#06) | ID = 100%, OOD = 0% via DataAlchemy | Distribution determines success |
| Faith and Fate (#F1) | Subgraph matching; performance tracks training frequency | Capability = training coverage |
| Embers of Autoregression (#202) | 76% first-letter extraction, 3% second-letter — same algorithm | Token frequency in training data predicts accuracy |
| KUP (#70) | 80% memorization, <2% reasoning on same knowledge | Direct recall works; recombination fails |

If the training distribution determines the boundary, then the pipeline that *constructs* that distribution is the origin story of every "reasoning" capability.

---

## The Pipeline

Six stages transform raw web crawls into training tokens. Each stage involves tradeoffs that shape the distribution.

### Stage 1: Web Crawling

Common Crawl (2007–present). Non-profit web archive. ~100 crawls since 2008. Apache Nutch on ~100 machines over 10–12 days per crawl. Hundreds of millions of seed URLs. Nearly every pre-training dataset builds on Common Crawl.

Two output formats:
- **WARC** — raw HTML as captured. Preferred: you control text extraction.
- **WET** — pre-extracted plain text. Lossy, lower downstream quality.

**Thesis connection**: The web is the training distribution. Common Crawl is a sample of it. The sample is biased — English-heavy, recency-biased, overrepresenting popular domains. The model inherits these biases as "knowledge."

### Stage 2: Text Extraction (HTML → Text)

Tool choice has outsized impact on what ends up in training data.

| Tool | Used by | Tradeoff |
|------|---------|----------|
| WET files | C4, early datasets | Convenient but lossy |
| trafilatura | RefinedWeb, FineWeb | Good precision, some recall loss |
| jusText | Nemotron-CC | Higher token yield |
| resiliparse | DCLM | Speed-optimized |

DCLM and Pile-CC independently showed: WARC → custom extraction consistently outperforms WET on downstream benchmarks. The choice between trafilatura and jusText alone changes token counts by >20%.

**Thesis connection**: This "mundane" step determines which text reaches the model. A 20% difference in token yield means a 20% difference in what patterns are available to learn.

### Stage 3: Filtering

Two schools: rule-based vs. model-based.

**Rule-based** (C4, Gopher, RefinedWeb): lines must end in punctuation, ≥5 words, ≥3 sentences, no "bad words", no `{`, ≥80% alphabetic words. Simple, interpretable, avoids ML bias.

**Model-based** (GPT-3, DCLM, phi-1): train a classifier on "high quality" examples, apply at scale. Better downstream performance but inherits the definition of quality from the positive examples.

| Model | Positive examples | What "quality" means |
|-------|-------------------|----------------------|
| GPT-3 | WebText, Wikipedia, Books | Reddit-upvoted + encyclopedic + literary |
| LLaMA | Wikipedia-referenced pages | Encyclopedic citation patterns |
| DCLM | OpenHermes-2.5 + ELI5 subreddit | GPT-4 generated + simple explanations |
| phi-1 | GPT-4 labels for "educational value" | What GPT-4 considers educational |

**Thesis connection**: This is the critical stage. When DCLM uses GPT-4-generated text (OpenHermes-2.5) as positive examples for its quality classifier, it selects web content that *looks like* GPT-4 output. The trained model then produces text that looks like the filtered training data — which was selected to look like GPT-4 output. The distribution shapes itself.

FineWebEdu and DCLM remove ~90% of data. The remaining 10% defines what the model "knows."

**Language identification**: fastText classifier, 176 languages. C4 uses p(en) ≥ 0.99 (aggressive, removes code and LaTeX), Dolma uses p(en) ≥ 0.5 (permissive). This threshold alone determines whether the model sees multilingual patterns, code-switching, and mathematical notation.

**Toxicity filtering**: C4's word blocklist removed medical and sexual health content. Dolma's dual-classifier (hate + NSFW) is more nuanced. Each choice shapes what the model can discuss.

### Stage 4: Deduplication

C4 contained one product description repeated **61,036 times**. Duplicates waste compute and increase memorization.

Three approaches:
- **Exact dedup**: Hash and deduplicate. Misses near-duplicates.
- **Bloom filters**: Dolma uses paragraph-level Bloom filters (FP rate 10⁻¹⁵).
- **MinHash + LSH**: Fuzzy matching. RefinedWeb, FineWeb, SlimPajama all use MinHash 5-gram dedup.

```
Jaccard: J(A,B) = |A∩B| / |A∪B|
MinHash: Pr[h(A)=h(B)] = J(A,B)
LSH threshold ≈ (1/b)^(1/r)
```

**Thesis connection**: Deduplication reduces memorization but not distributional dependence. The model still learns statistical regularities from the remaining data. A deduplicated dataset doesn't contain novel reasoning — it contains unique instances of the same patterns.

### Stage 5: Data Mixing & Staging

| Phase | Data | Volume |
|-------|------|--------|
| Pre-training | Lower-quality, high-diversity web | Llama 3: 15T tokens, Qwen3: 36T tokens |
| Mid-training | High-quality subset + long-context | Smaller, curated |
| Post-training | Instruction data, chat, RLHF | <1M examples |

GPT-3 upsampled Wikipedia and Books 2–3× vs. raw proportion. Most labs keep exact mixing ratios secret.

**Thesis connection**: The mixing recipe is the most guarded secret in LLM development. Upsampling Wikipedia creates the *appearance* of encyclopedic knowledge. Upsampling code creates the *appearance* of logical reasoning. The model's capabilities are a weighted average of its training domains.

### Stage 6: Output

Tokenized, shuffled, packed into sequences. Fed to the model as next-token prediction targets. The entire pipeline exists to produce this stream. Every capability the model displays originates here.

---

## The Data Scaling Arc

```
2019: C4         =   156B tokens  (1 snapshot)
2020: GPT-3      =   400B tokens
2023: RefinedWeb  =     5T tokens
2024: Llama 3    =    15T tokens
2024: Qwen3      =    36T tokens
2024: DCLM-pool  =   240T raw tokens
```

More data, better filtering, higher quality — but the pipeline remains fundamentally heuristic with "many opportunities to improve."

---

## Landmark Datasets

### Early Era (2015–2019)

| Dataset | Year | Size | Innovation |
|---------|------|------|------------|
| BooksCorpus | 2015 | 985M words | First book corpus for pre-training (BERT, GPT) |
| [Wikipedia](https://huggingface.co/datasets/wikimedia/wikipedia) | Ongoing | 6.4M en articles | Universal pre-training source; 322+ languages |
| [OpenWebText](https://huggingface.co/datasets/Skylion007/openwebtext) | 2019 | 40GB | Open reproduction of WebText; Reddit karma as quality proxy (GPT-2) |
| CCNet | 2019 | Varies | KenLM perplexity sorting on Wikipedia |
| [C4](https://huggingface.co/datasets/allenai/c4) | 2019 | 156B tokens | First large-scale cleaned CC (T5) |

### Scale-Up Era (2020–2022)

| Dataset | Year | Size | Innovation |
|---------|------|------|------------|
| GPT-3 Dataset | 2020 | 400B tokens | First model-based quality classifier |
| [The Pile](https://huggingface.co/datasets/EleutherAI/the_pile_deduplicated) | 2021 | ~275B tokens | 22 curated domains; WARC > WET discovery |
| MassiveText | 2021 | 10.5TB | SafeSearch toxicity; Gopher trained on 12% |
| [ROOTS](https://huggingface.co/datasets/bigscience-data/roots) | 2022 | ~350B tokens | BLOOM training data; 46 languages + 13 programming languages |
| [The Stack](https://huggingface.co/datasets/bigcode/the-stack) | 2022 | 3.1TB code | License-aware code filtering (137M repos) |

### Modern Era (2023–2024)

| Dataset | Year | Size | Innovation |
|---------|------|------|------------|
| LLaMA Dataset | 2023 | 1.2T tokens | Multi-source recipe template |
| [RedPajama v1](https://huggingface.co/datasets/togethercomputer/RedPajama-Data-1T) | 2023 | 1.2T tokens | Open reproduction of LLaMA training mix |
| [RedPajama v2](https://huggingface.co/datasets/togethercomputer/RedPajama-Data-V2) | 2023 | ~30T tokens | 100B+ docs from 84 CC snapshots; 40+ quality annotations |
| [SlimPajama](https://huggingface.co/datasets/cerebras/SlimPajama-627B) | 2023 | 627B tokens | Deduplicated RedPajama; MinHash cleaning |
| [CulturaX](https://huggingface.co/datasets/uonlp/CulturaX) | 2023 | 6.3T tokens | Multilingual mC4 + OSCAR; 167 languages; MinHash + KenLM |
| [RefinedWeb](https://huggingface.co/datasets/tiiuae/falcon-refinedweb) | 2023 | 5T tokens | Proved web-only matches multi-source |
| [StarCoderData](https://huggingface.co/datasets/bigcode/starcoderdata) | 2023 | ~250B tokens | 86 languages; near-dedup + PII removal from The Stack |
| [The Stack v2](https://huggingface.co/datasets/bigcode/the-stack-v2) | 2024 | 67.5TB / ~900B tokens | Software Heritage archive; 658 languages (StarCoder2) |
| [FineWeb](https://huggingface.co/datasets/HuggingFaceFW/fineweb) | 2024 | 15T tokens | PII anonymization + educational subset |
| [FineWeb-Edu](https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu) | 2024 | 1.3T tokens | Educational quality scoring via LLM annotations |
| [FineWeb2](https://huggingface.co/datasets/HuggingFaceFW/fineweb-2) | 2025 | 1000+ languages | Multilingual successor to FineWeb; language-specific filtering |
| [Cosmopedia](https://huggingface.co/datasets/HuggingFaceTB/cosmopedia) | 2024 | 31M samples | Synthetic textbooks generated by LLMs; math, science, stories |
| [Dolma](https://huggingface.co/datasets/allenai/dolma) | 2024 | 3T tokens | Bloom filter dedup + dual toxicity classifiers |
| [DCLM](https://huggingface.co/datasets/mlfoundations/dclm-baseline-1.0) | 2024 | 240T→3.8T | Benchmarking data curation itself |
| [Nemotron-CC](https://huggingface.co/datasets/nvidia/Nemotron-CC-v2.1) | 2024 | 6.3T tokens | Synthetic rephrasing of filtered-out data |

### Domain-Specific Pre-training

| Dataset | Year | Size | Domain |
|---------|------|------|--------|
| [peS2o](https://huggingface.co/datasets/allenai/peS2o) | 2023 | ~42B tokens | Academic papers from Semantic Scholar; used in Dolma |
| [OpenWebMath](https://huggingface.co/datasets/open-web-math/open-web-math) | 2023 | 14.7B tokens | Math-filtered CC; LaTeX, MathML, forums |
| [MathPile](https://huggingface.co/datasets/GAIR/MathPile) | 2023 | ~9.5B tokens | Textbooks, arXiv, ProofWiki, StackExchange |
| [AutoMathText](https://huggingface.co/datasets/math-ai/AutoMathText) | 2024 | Multi-subset | LLM-scored (Qwen-72B) math web text + arXiv + code |

### Post-Training / Instruction Data

| Dataset | Year | Size | Purpose |
|---------|------|------|---------|
| [OpenHermes-2.5](https://huggingface.co/datasets/teknium/OpenHermes-2.5) | 2023 | ~1M samples | GPT-4 generated; used as DCLM quality filter positive examples |
| [OASST1](https://huggingface.co/datasets/OpenAssistant/oasst1) | 2023 | 89K messages | Crowdsourced conversation trees; 35 languages |
| [UltraChat](https://huggingface.co/datasets/HuggingFaceH4/ultrachat_200k) | 2023 | 515K dialogues | Multi-turn synthetic conversations; trained Zephyr |
| [Aya Dataset](https://huggingface.co/datasets/CohereLabs/aya_dataset) | 2024 | 204K samples | Human-curated multilingual instructions; 71 languages |

**Thesis connection**: The post-training datasets are small (<1M examples) but disproportionately shape behavior. When OpenHermes-2.5 — GPT-4 generated text — is used as the quality signal for filtering pre-training data, the pipeline becomes self-referential: LLM output defines what LLM input should look like.

---

## Quality Filtering Algorithms

The core question: given **target data T** (small, high quality) and **raw data R** (large, noisy), find subset T' of R similar to T.

| Method | Approach | Formula | Speed | Used by |
|--------|----------|---------|-------|---------|
| KenLM | Generative | score(x) = perplexity_T(x) | Very fast | CCNet, OpenMathText |
| fastText | Discriminative | score(x) = p(T\|x) | Very fast | DCLM, GPT-3, LLaMA |
| DSIR | Importance resampling | score(x) = p_T(x)/p_R(x) | Fast | Research datasets |
| LLM judge | Prompted scoring | GPT-4 rates "educational value" | Slow | phi-1 |

OpenMathText result: KenLM on ProofPile, threshold <15,000 perplexity → 14.7B math tokens. A 1.4B model trained on this beat models with 20× more data. Quality filtering > quantity.

DCLM result: fastText classifier outperforms all rule-based methods on downstream benchmarks.

---

## Copyright & Data Secrecy

**Shadow libraries in the training mix:**
- **LibGen** — ~4M books. Meta confirmed training LLaMA on LibGen.
- **Sci-Hub** — ~88M academic papers.
- **Books3** — 196K books from Bibliotik. Taken down.
- **BooksCorpus** — 7K books from Smashwords. Taken down.

Competitive advantage + copyright liability = frontier labs disclose almost nothing about training data. Architecture and algorithms are published; data is not.

**Thesis connection**: Data secrecy makes it impossible to distinguish learned patterns from genuine reasoning. When the training data is unknown, any claim of "emergent reasoning" cannot be falsified — the capability might simply be in the training distribution.

---

## Open Questions

| Question | Status |
|----------|--------|
| Rule-based vs. model-based filtering | No consensus — rules avoid bias, classifiers perform better |
| What is "quality"? | Wikipedia-like? Educational? Each choice biases capabilities |
| Over-filtering | DCLM/FineWebEdu remove ~90%. Nemotron-CC rephrases instead |
| Synthetic data in the pipeline | Nemotron-CC uses LM rephrasing. How far can it go? |
| Data poisoning | Wikipedia dump timing exploitable. No robust defenses at scale |
| Copyright liability | Fair use for ML training legally unsettled |
| Benchmark contamination | Fuzzy dedup against benchmarks needed but not universal |

---

## The Bottom Line

The pre-training data pipeline is not a neutral conduit. It is a series of heuristic choices — which crawler, which extractor, which quality filter, which mixing ratio — that construct the distribution the model learns from. Every "reasoning" capability the model displays is a reflection of patterns in this distribution.

The pipeline scales with human effort, not compute. Data curation is the most labor-intensive, least scalable part of building frontier LLMs. And the pipeline remains fundamentally heuristic — "many opportunities to improve."

If the thesis is correct that LLM capabilities are bounded by the training distribution, then this pipeline is the origin story. The model cannot reason beyond what the data contains.
