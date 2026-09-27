// Writes a compact, consistent copy of the DATABASE_URL database for the production build
// (`VACUUM INTO`, so it is safe while nothing else writes). Upload the file to the private storage
// that CATALOG_DB_URL points to; see scripts/fetch-db.ts. It holds TMDB content, so it must never
// be committed or made public, and TMDB's terms cap how long it may be cached (see README).
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { dirname } from "node:path";
import { parseArgs } from "node:util";
import { prisma } from "@/lib/prisma";

async function main() {
  const { values } = parseArgs({
    options: { out: { type: "string", default: ".data/catalog.db" } },
    strict: true,
  });
  const out = values.out!;

  mkdirSync(dirname(out), { recursive: true });
  rmSync(out, { force: true }); // VACUUM INTO refuses to overwrite an existing file.
  await prisma.$executeRawUnsafe(`VACUUM INTO '${out.replaceAll("'", "''")}'`);

  const [counts] = await prisma.$queryRawUnsafe<{ series: bigint; episodes: bigint; schedules: bigint }[]>(
    "SELECT (SELECT COUNT(*) FROM series) AS series, (SELECT COUNT(*) FROM episodes) AS episodes, (SELECT COUNT(*) FROM schedules) AS schedules",
  );
  const sha256 = createHash("sha256").update(readFileSync(out)).digest("hex");
  const megabytes = (statSync(out).size / 1024 / 1024).toFixed(1);
  console.log(
    `Wrote ${out} (${megabytes} MB, sha256 ${sha256}): ${counts!.series} series, ` +
      `${counts!.episodes} episodes, ${counts!.schedules} schedule rows.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
