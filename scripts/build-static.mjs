import { copyFile, mkdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");
const staticFiles = ["index.html", "styles.css", "script.js", "config.example.js", ".nojekyll"];

await rm(dist, { force: true, recursive: true });
await mkdir(dist, { recursive: true });

for (const file of staticFiles) {
  await copyFile(join(root, file), join(dist, file));
}

const convexUrl = process.env.CONVEX_URL || "";
await writeFile(join(dist, "config.js"), `window.CONVEX_URL = ${JSON.stringify(convexUrl)};\n`);

await writeFile(
  join(dist, "_headers"),
  `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
`,
);
