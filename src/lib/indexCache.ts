// =============================================================================
// IndexedDB cache for the global test index.
// Keeps a serialised snapshot of every parsed CSV row so repeat dashboard
// visits skip the ~140 network fetches and parser passes. Falls back silently
// to "no cache" when IndexedDB is unavailable (private mode, SSR, etc.).
// =============================================================================

const DB_NAME = "tf-cache";
const DB_VERSION = 1;
const STORE = "global-index";
const KEY = "v1";
/** 24h freshness window — refresh in the background after this. */
export const TTL_MS = 24 * 60 * 60 * 1000;

interface CachedPayload<T> {
  savedAt: number;
  payload: T;
}

function openDb(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof indexedDB === "undefined") {
      resolve(null);
      return;
    }
    try {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
      req.onblocked = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export async function readCache<T>(): Promise<{ payload: T; ageMs: number } | null> {
  const db = await openDb();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(KEY);
      req.onsuccess = () => {
        const data = req.result as CachedPayload<T> | undefined;
        if (!data) {
          resolve(null);
          return;
        }
        resolve({ payload: data.payload, ageMs: Date.now() - data.savedAt });
      };
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export async function writeCache<T>(payload: T): Promise<void> {
  const db = await openDb();
  if (!db) return;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put({ savedAt: Date.now(), payload }, KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
      tx.onabort = () => resolve();
    } catch {
      resolve();
    }
  });
}

export async function clearCache(): Promise<void> {
  const db = await openDb();
  if (!db) return;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).delete(KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}
