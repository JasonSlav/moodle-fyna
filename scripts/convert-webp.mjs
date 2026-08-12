import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.resolve("public/media/section1");

const files = (await readdir(dir)).filter((file) =>
  file.toLowerCase().endsWith(".png"),
);

for (const file of files) {
  const src = path.join(dir, file);
  const out = path.join(dir, file.replace(/\.png$/i, ".webp"));
  await sharp(src).webp({ quality: 80 }).toFile(out);
  console.log(`converted: ${file} -> ${path.basename(out)}`);
}

console.log(`Selesai: ${files.length} gambar dikonversi ke WebP.`);
