# Unthinking — Paper Galaxy

A 3D semantic projection of the 359 paper analyses in this repo, forked from
[webml-community/semantic-galaxy](https://huggingface.co/spaces/webml-community/semantic-galaxy)
(Apache-2.0).

Each star is one paper. Color encodes stance:

- green — supports the thesis that LLM "reasoning" is predictive completion
- gray — balanced
- red — challenges

EmbeddingGemma-300m (ONNX, q4) runs in your browser via Transformers.js.
UMAP projects the 768-dim embeddings into 3D. Cosine similarity drives search.

Everything runs locally in the browser — no server, no telemetry. The model
loads once (~200 MB) into IndexedDB and stays cached.

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
uses relative paths (`base: "./"` in `vite.config.ts`), so the `dist/`
directory works:

- opened directly as files (`open dist/index.html` on macOS)
- served by any static host (Render, GitHub Pages, Netlify, plain
  `python -m http.server` inside `dist/`)

## Update the corpus

After running new paper analyses:

```bash
uv run python scripts/build_corpus_index.py
cp analysis/index/corpus.json apps/galaxy/public/corpus.json
cd apps/galaxy && npm run build
```

## Credits

- [Semantic Galaxy](https://huggingface.co/spaces/webml-community/semantic-galaxy)
  by [Xenova](https://huggingface.co/Xenova) — original visual and architecture.
- [EmbeddingGemma](https://huggingface.co/google/embeddinggemma-300m) — Google
  DeepMind.
- [Transformers.js](https://huggingface.co/docs/transformers.js),
  [Three.js](https://threejs.org/),
  [UMAP-js](https://github.com/PAIR-code/umap-js).
