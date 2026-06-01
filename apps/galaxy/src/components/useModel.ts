import { useState, useCallback, useEffect } from "react";

interface ModelLoaderState {
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
  progress: number;
  status: string;
  device: "webgpu" | null;
}

let worker: Worker | null = null;
let workerReady = false;
let nextEmbeddingId = 1;
const pendingEmbeddings = new Map<
  number,
  {
    resolve: (embeddings: number[][]) => void;
    reject: (error: Error) => void;
    timeout: ReturnType<typeof setTimeout>;
  }
>();

const settleEmbedding = (
  id: number,
  action: (pending: NonNullable<ReturnType<typeof pendingEmbeddings.get>>) => void,
) => {
  const pending = pendingEmbeddings.get(id);
  if (!pending) return;
  clearTimeout(pending.timeout);
  pendingEmbeddings.delete(id);
  action(pending);
};

export const useModel = () => {
  const [state, setState] = useState<ModelLoaderState>({
    isLoading: false,
    isReady: false,
    error: null,
    progress: 0,
    status: "Waiting to start...",
    device: null,
  });

  useEffect(() => {
    if (!worker) {
      worker = new Worker(new URL("./worker.ts", import.meta.url), {
        type: "module",
      });
      worker.onmessage = (event) => {
        const { type, payload } = event.data;
        if (type === "progress") {
          setState((prev) => ({
            ...prev,
            progress: payload.percentage,
            status: payload.status,
          }));
        } else if (type === "ready") {
          workerReady = true;
          setState((prev) => ({
            ...prev,
            isLoading: false,
            isReady: true,
            progress: 100,
            status: "Ready. Enter sentences and generate the galaxy!",
            device: payload.device,
          }));
        } else if (type === "error") {
          const message =
            typeof payload === "string" ? payload : payload?.message ?? "Unknown error";
          if (typeof event.data.id === "number") {
            settleEmbedding(event.data.id, (pending) =>
              pending.reject(new Error(message)),
            );
            return;
          }
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: message,
            status: "An error occurred",
          }));
          for (const [pendingId] of pendingEmbeddings) {
            settleEmbedding(pendingId, (pending) =>
              pending.reject(new Error(message)),
            );
          }
        } else if (type === "embeddings") {
          if (typeof event.data.id === "number") {
            settleEmbedding(event.data.id, (pending) =>
              pending.resolve(payload.embeddings),
            );
          }
        }
      };
    }
  }, []);

  const loadModel = useCallback(async () => {
    if (workerReady && state.device) {
      return { device: state.device };
    }
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      progress: 0,
      status: "Initializing...",
    }));
    worker?.postMessage({ type: "load-model" });
    return new Promise<{ device: "webgpu" }>((resolve, reject) => {
      const checkReady = () => {
        if (workerReady && state.device) {
          resolve({ device: state.device });
        } else if (state.error) {
          reject(state.error);
        } else {
          setTimeout(checkReady, 100);
        }
      };
      checkReady();
    });
  }, [state.error, state.device]);

  const embed = useCallback(
    async (
      sentences: string[],
      options: Record<string, unknown>,
    ): Promise<number[][]> => {
      return new Promise<number[][]>((resolve, reject) => {
        const id = nextEmbeddingId++;
        const timeout = setTimeout(() => {
          pendingEmbeddings.delete(id);
          reject(
            new Error(
              `Embedding request ${id} timed out after 60s (${sentences.length} item${sentences.length === 1 ? "" : "s"})`,
            ),
          );
        }, 60_000);
        pendingEmbeddings.set(id, { resolve, reject, timeout });
        worker?.postMessage({
          type: "embed",
          id,
          payload: { sentences, options },
        });
      });
    },
    [],
  );

  return {
    ...state,
    loadModel,
    embed,
  };
};
