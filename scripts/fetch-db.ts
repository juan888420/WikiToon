// Runs before `next build` (npm `prebuild`). The pages are prerendered from the catalog database,
// which is not in the repository: it holds TMDB content, which TMDB's terms don't allow to be
// published as a dataset. When CATALOG_DB_URL is set (the production build), the snapshot made
// by `npm run db:snapshot` is downloaded from private storage into the file DATABASE_URL points
// to, and checked before the build uses it. Without CATALOG_DB_URL (local builds) it does
// nothing and the build reads the local database.
import { existsSync, mkdirSync, readdirSync, renameSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

// Same as prisma.config.ts: Node's loader, only when the file exists (not on Vercel).
if (existsSync(".env")) process.loadEnvFile(".env");

const SQLITE_HEADER = "SQLite format 3\0";

function databasePath() {
  const url = process.env.DATABASE_URL;
  if (!url?.startsWith("file:")) {
    throw new Error('DATABASE_URL must be a SQLite file URL, e.g. "file:./.data/catalog.db".');
  }
  return resolve(url.slice("file:".length));
}

async function download(url: string, target: string) {
  const token = process.env.CATALOG_DB_TOKEN;
  const response = await fetch(url, {
    headers: {
      Accept: "application/octet-stream",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    signal: AbortSignal.timeout(120_000),
  });
  if (!response.ok) {
    // GitHub answers 404 both without credentials and for a token without access to the repo;
    // its rate limit header tells them apart (60 anonymous, 5000 authenticated). No secrets logged.
    const limit = response.headers.get("x-ratelimit-limit");
    const permissions = response.headers.get("x-accepted-github-permissions");
    throw new Error(
      `Downloading the catalog database failed: HTTP ${response.status} ` +
        `(token sent: ${token ? "yes" : "no"}` +
        `${limit ? `; rate limit ${limit}, ${limit === "60" ? "anonymous" : "authenticated"}` : ""}` +
        `${permissions ? `; required permissions: ${permissions}` : ""}).`,
    );
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.subarray(0, SQLITE_HEADER.length).toString("latin1") !== SQLITE_HEADER) {
    throw new Error("CATALOG_DB_URL did not return a SQLite database.");
  }
  mkdirSync(dirname(target), { recursive: true });
  // Written next to the target and renamed, so a failed download never leaves a partial file.
  writeFileSync(`${target}.download`, bytes);
  renameSync(`${target}.download`, target);
  return bytes.length;
}

/** The snapshot must match this code: every committed migration applied, and a loaded catalog. */
async function verify() {
  const { prisma } = await import("@/lib/prisma");
  try {
    const applied = await prisma.$queryRawUnsafe<{ name: string }[]>(
      "SELECT migration_name AS name FROM _prisma_migrations WHERE finished_at IS NOT NULL",
    );
    const appliedNames = new Set(applied.map((row) => row.name));
    const missing = readdirSync("prisma/migrations", { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !appliedNames.has(entry.name))
      .map((entry) => entry.name);
    if (missing.length > 0) {
      throw new Error(
        `The catalog database is missing migrations: ${missing.join(", ")}. ` +
          "Apply them locally, run `npm run db:snapshot` and upload the new file.",
      );
    }
    const [row] = await prisma.$queryRawUnsafe<{ n: bigint }[]>("SELECT COUNT(*) AS n FROM series");
    if (!row || row.n === BigInt(0)) throw new Error("The catalog database has no series.");
    return Number(row.n);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  const url = process.env.CATALOG_DB_URL;
  if (!url) {
    console.log("CATALOG_DB_URL is not set; the build uses the local database.");
    return;
  }
  const target = databasePath();
  const size = await download(url, target);
  const series = await verify();
  console.log(
    `Catalog database downloaded to ${target} (${(size / 1024 / 1024).toFixed(1)} MB, ${series} series).`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
