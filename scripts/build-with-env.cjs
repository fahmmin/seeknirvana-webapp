const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};

  const raw = fs.readFileSync(filePath, "utf8");
  const out = {};

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq < 1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    out[key] = value;
  }

  return out;
}

const cwd = process.cwd();

// Seed ENV from shell first; if missing, allow .env.local/.env to define it.
const seedEnv = { ...process.env };
if (!seedEnv.ENV) {
  Object.assign(seedEnv, parseEnvFile(path.join(cwd, ".env")));
  Object.assign(seedEnv, parseEnvFile(path.join(cwd, ".env.local")));
}

const envName = (seedEnv.ENV || "production").trim();
const envFiles = [
  path.join(cwd, `.env.${envName}.local`),
  path.join(cwd, `.env.${envName}`),
];

const loaded = {};
for (const file of envFiles) {
  Object.assign(loaded, parseEnvFile(file));
}

// Existing shell variables win over file values.
const finalEnv = { ...loaded, ...seedEnv, NODE_ENV: "production" };

console.log(
  `[build:env] ENV=${envName} | NODE_ENV=production | loaded=${envFiles
    .map((f) => path.basename(f))
    .join(", ")}`
);

const nextBin = path.join(cwd, "node_modules", "next", "dist", "bin", "next");
const result = spawnSync(process.execPath, [nextBin, "build", "--webpack"], {
  stdio: "inherit",
  env: finalEnv,
});

process.exit(result.status ?? 1);
