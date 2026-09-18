import path from "path";

/**
 * DATA_DIR points at a persistent disk mount (e.g. Render's /var/data).
 * Unset locally: content and uploads then live inside the project tree,
 * exactly as before, with no extra indirection.
 */
const DATA_DIR = process.env.DATA_DIR || null;

export const CONTENT_DIR = DATA_DIR ? path.join(DATA_DIR, "content") : path.join(process.cwd(), "data");
export const SEED_CONTENT_DIR = path.join(process.cwd(), "data");
export const SUBMISSIONS_DIR = path.join(CONTENT_DIR, "submissions");
export const UPLOADS_DIR = DATA_DIR
  ? path.join(DATA_DIR, "uploads")
  : path.join(process.cwd(), "public", "images", "uploads");
export const IS_EXTERNAL_STORAGE = Boolean(DATA_DIR);
