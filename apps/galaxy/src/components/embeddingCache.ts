// IndexedDB cache for the one-time corpus embedding + UMAP projection.
//
// First visit: the browser embeds all 360 papers via Transformers.js and
// projects them to 3D via umap-js, then writes the result here. Next
// visit hits this cache and the galaxy renders immediately — no model
// download, no embed loop, no UMAP.
//
// The cache key is a fingerprint of the corpus content + the embedding
// model id. Change either and the cache misses, triggering a clean
// re-index.

const DB_NAME = "unthinking-galaxy";
const STORE = "indexed-corpus";
const VERSION = 1;

export interface IndexedEntry {
  id: number;
  embedding: number[];
  position: [number, number, number];
}

interface CachePayload {
  fingerprint: string;
  entries: IndexedEntry[];
  savedAt: number;
}

const openDb = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

const KEY = "corpus";

export const loadCachedIndex = async (
  fingerprint: string,
): Promise<IndexedEntry[] | null> => {
  try {
    const db = await openDb();
    return await new Promise<IndexedEntry[] | null>((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(KEY);
      req.onsuccess = () => {
        const result = req.result as CachePayload | undefined;
        if (!result) return resolve(null);
        if (result.fingerprint !== fingerprint) return resolve(null);
        resolve(result.entries);
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
};

export const saveCachedIndex = async (
  fingerprint: string,
  entries: IndexedEntry[],
): Promise<void> => {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      const payload: CachePayload = {
        fingerprint,
        entries,
        savedAt: Date.now(),
      };
      tx.objectStore(STORE).put(payload, KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    // Cache failure is non-fatal — the galaxy still works, just slower
    // next time.
  }
};

// FNV-1a 64-bit-ish hash, cheap and good enough for cache-busting.
export const fingerprintCorpus = (text: string, modelId: string): string => {
  const key = `${modelId}:${text.length}:${text}`;
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < key.length; i++) {
    const c = key.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 = Math.imul(h1 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 = Math.imul(h2 ^ (h1 >>> 13), 3266489909);
  const hi = (h2 >>> 0).toString(16).padStart(8, "0");
  const lo = (h1 >>> 0).toString(16).padStart(8, "0");
  return `${hi}${lo}`;
};
