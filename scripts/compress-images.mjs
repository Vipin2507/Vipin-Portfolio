/**
 * Resize + recompress raster images under src/assets (JPEG/PNG only).
 * Skips .gif (animation), .svg, .pdf, and tiny files already under 80KB.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("src/assets");
const MAX_EDGE = 2000;
const JPEG_QUALITY = 82;
/** Skip only very small assets; recompress larger PNG/JPEG in place. */
const MIN_BYTES_TO_TOUCH = 4 * 1024;

const exts = new Set([".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"]);

async function walk(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walk(full, files);
    else if (exts.has(path.extname(e.name))) files.push(full);
  }
  return files;
}

async function processFile(filePath) {
  const stat = await fs.stat(filePath);
  if (stat.size < MIN_BYTES_TO_TOUCH) return { skipped: "small" };

  const ext = path.extname(filePath).toLowerCase();
  const isJpeg = ext === ".jpg" || ext === ".jpeg";
  const isPng = ext === ".png";

  const meta = await sharp(filePath, { failOn: "none" }).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;

  let pipeline = sharp(filePath, { failOn: "none" }).rotate();
  if (w > MAX_EDGE || h > MAX_EDGE) {
    pipeline = pipeline.resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  let buf;
  if (isJpeg) {
    buf = await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
      .toBuffer();
  } else if (isPng) {
    buf = await pipeline
      .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
      .toBuffer();
  } else {
    return { skipped: "format" };
  }

  const before = stat.size;
  if (buf.length >= before * 0.98) {
    return { skipped: "no_gain" };
  }

  const tmp = `${filePath}.tmp`;
  await fs.writeFile(tmp, buf);
  await fs.rename(tmp, filePath);

  return { before, after: buf.length };
}

const files = await walk(ROOT);
let saved = 0;
let count = 0;

for (const f of files) {
  try {
    const r = await processFile(f);
    if (r.before != null && r.after != null) {
      saved += r.before - r.after;
      count += 1;
      const rel = path.relative(process.cwd(), f);
      console.log(
        `${rel}  ${(r.before / 1024).toFixed(0)}KB -> ${(r.after / 1024).toFixed(0)}KB`
      );
    }
  } catch (err) {
    console.error(`FAIL ${f}:`, err?.message ?? err);
  }
}

console.log(`\nDone. Rewrote ${count} files. Approx saved ${(saved / 1024 / 1024).toFixed(2)} MB.`);
