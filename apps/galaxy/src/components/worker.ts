import {
  AutoModel,
  AutoTokenizer,
  type PreTrainedModel,
  type PreTrainedTokenizer,
} from "@huggingface/transformers";

const MODEL_ID = "onnx-community/embeddinggemma-300m-ONNX";
let model: PreTrainedModel | null = null;
let tokenizer: PreTrainedTokenizer | null = null;

self.onmessage = async (event) => {
  const { type, payload, id } = event.data;
  if (type === "load-model") {
    try {
      // WebGPU required. No fallback — the corpus visualization needs
      // it, and silently dropping to WASM means 5-minute embed loops on
      // CPU. Better to tell the user.
      if (!("gpu" in navigator) || !navigator.gpu) {
        throw new Error(
          "WebGPU is not available in this browser. Please use Chrome, Edge, Brave, or Safari Tech Preview.",
        );
      }
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        throw new Error(
          "WebGPU adapter could not be acquired. Try restarting the browser or check chrome://gpu.",
        );
      }
      tokenizer = await AutoTokenizer.from_pretrained(MODEL_ID);
      model = await AutoModel.from_pretrained(MODEL_ID, {
        device: "webgpu",
        dtype: "q4",
        model_file_name: "model_no_gather",
        progress_callback: (progress) => {
          if (
            progress.status === "progress" &&
            progress.file.endsWith(".onnx_data")
          ) {
            const percentage = Math.round(
              (progress.loaded / progress.total) * 100,
            );
            self.postMessage({
              type: "progress",
              payload: {
                percentage,
                status: `Loading EmbeddingGemma… ${percentage}%`,
              },
            });
          }
        },
      });
      self.postMessage({ type: "ready", payload: { device: "webgpu" } });
    } catch (error) {
      self.postMessage({
        type: "error",
        id,
        payload: {
          message: error instanceof Error ? error.message : String(error),
        },
      });
    }
  } else if (type === "embed" && model && tokenizer) {
    try {
      const { sentences, options } = payload;
      const inputs = tokenizer(sentences, options);
      const { sentence_embedding } = await model(inputs);
      const embeddings = sentence_embedding.tolist();
      self.postMessage({ type: "embeddings", id, payload: { embeddings } });
    } catch (error) {
      self.postMessage({
        type: "error",
        id,
        payload: {
          message: error instanceof Error ? error.message : String(error),
        },
      });
    }
  }
};
