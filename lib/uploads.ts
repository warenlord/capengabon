import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { UPLOADS_DIR } from "./storage-paths";

function safeExtension(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const allowed = [".jpg", ".jpeg", ".png", ".webp"];
  return allowed.includes(ext) ? ext : ".jpg";
}

/**
 * Saves an uploaded image File into public/images/uploads/<folder>/ and
 * returns the public path to reference it from the site (e.g. in <Image src>).
 */
export async function saveUploadedImage(file: File, folder: string): Promise<string> {
  const dir = path.join(UPLOADS_DIR, folder);
  await fs.mkdir(dir, { recursive: true });

  const filename = `${Date.now().toString(36)}-${crypto.randomBytes(4).toString("hex")}${safeExtension(file.name)}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dir, filename), buffer);

  return `/images/uploads/${folder}/${filename}`;
}

export function isRealFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File && value.size > 0;
}
