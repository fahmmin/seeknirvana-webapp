import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

test("production build completes successfully", () => {
  const result = spawnSync("pnpm", ["run", "build"], {
    cwd: process.cwd(),
    encoding: "utf8",
    shell: true,
  });

  assert.equal(
    result.status,
    0,
    `Expected build to succeed.\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`
  );
});
