# Unthinking — Paper Galaxy

A 3D semantic projection of the 360 paper analyses in this repo. Each star is
one paper. Color is the paper's stance on the thesis that LLM "reasoning" is
predictive completion. Size and pulse mark the heaviest pieces of evidence —
smoking-gun findings are the biggest, brightest stars.

Runs entirely in your browser. WebGPU required (Chrome, Edge, Brave, or Safari
Tech Preview).

## How it works

```
corpus.json (built by scripts/build_corpus_index.py from analysis/explored/)
    ↓
Browser loads it
    ↓
EmbeddingGemma 300m (ONNX, q4) on WebGPU embeds each core_finding
    ↓
UMAP-js projects 768-dim embeddings → 3D coordinates
    ↓
Three.js renders. Cosine similarity drives search.
    ↓
Embeddings + positions persist to IndexedDB. Next visit is instant.
```

The cache key is a fingerprint of `corpus.json` content plus the model id.
Add a paper, rerun the index extractor — the fingerprint changes, the cache
busts, and the browser re-indexes on next visit.

## Develop

```bash
cd apps/galaxy
npm install
npm run dev
```

Open the URL printed by Vite (usually <http://localhost:5173/>).

## Build

```bash
cd apps/galaxy
npm run build
```

Output lands in `apps/galaxy/dist/`. The bundle is fully self-contained and
uses relative paths (`base: "./"`), so `dist/` works:

- opened directly as files (`open dist/index.html` on macOS)
- served by any static host (Render, GitHub Pages, Netlify)
- served by plain `python -m http.server` inside `dist/`

## Update the corpus

After running new paper analyses:

```bash
uv run python scripts/build_corpus_index.py
cp analysis/index/corpus.json apps/galaxy/public/corpus.json
cd apps/galaxy && npm run build
```

The next time a visitor loads the page, the corpus fingerprint will have
changed and their browser will re-index. (~30-60s on WebGPU.)

## Lineage

The visual scaffold — React Three Fiber scene, Bloom, Stars, OrbitControls,
the worker-based EmbeddingGemma loader, search-by-cosine — comes from
[webml-community/semantic-galaxy](https://huggingface.co/spaces/webml-community/semantic-galaxy)
by Xenova (Apache-2.0). Everything specific to this project — the
corpus-aware menu galaxy, variable star size by evidence weight, the
smoking-gun pulse, the quote ticker, the stance-encoded color system, the
paper-aware sidebar and info card, the URL state, the IndexedDB cache layer,
the WebGPU-only stance, the splash copy — is built on top.

Credits in full:

- [Semantic Galaxy](https://huggingface.co/spaces/webml-community/semantic-galaxy)
  by [Xenova](https://huggingface.co/Xenova) — base architecture.
- [EmbeddingGemma](https://huggingface.co/google/embeddinggemma-300m) — Google
  DeepMind.
- [Transformers.js](https://huggingface.co/docs/transformers.js),
  [Three.js](https://threejs.org/),
  [UMAP-js](https://github.com/PAIR-code/umap-js).
