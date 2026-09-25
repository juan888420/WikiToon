-- A Block is no longer owned by one Channel: it now runs on one or more channels through
-- `block_channels`. Fox Kids was succeeded by Jetix, so the blocks that continued across the
-- rebrand are one block on two channels, not two independent blocks.
--
-- The data steps below preserve every existing row. On a fresh database built from
-- migrations -> seed -> db:load:series -> db:load:blocks they are all no-ops.

-- CreateTable
CREATE TABLE "block_channels" (
    "block_id" INTEGER NOT NULL,
    "channel_id" INTEGER NOT NULL,

    PRIMARY KEY ("block_id", "channel_id"),
    CONSTRAINT "block_channels_block_id_fkey" FOREIGN KEY ("block_id") REFERENCES "blocks" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "block_channels_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Carry each block's current owning channel over to the join table before the column is dropped.
INSERT INTO "block_channels" ("block_id", "channel_id") SELECT "id", "channel_id" FROM "blocks";

-- Editorial: preschool blocks are out of the catalog's scope for now, so Playhouse Disney
-- (Disney Channel) and Nick Jr. (Nickelodeon) are removed. Neither has series, schedules or
-- timeline events, so this orphans nothing; the statements are written to hold regardless.
DELETE FROM "block_channels" WHERE "block_id" IN (SELECT "id" FROM "blocks" WHERE "slug" IN ('playhouse-disney', 'nick-jr'));
DELETE FROM "series_blocks" WHERE "block_id" IN (SELECT "id" FROM "blocks" WHERE "slug" IN ('playhouse-disney', 'nick-jr'));
UPDATE "schedules" SET "block_id" = NULL WHERE "block_id" IN (SELECT "id" FROM "blocks" WHERE "slug" IN ('playhouse-disney', 'nick-jr'));
UPDATE "timeline_events" SET "block_id" = NULL WHERE "block_id" IN (SELECT "id" FROM "blocks" WHERE "slug" IN ('playhouse-disney', 'nick-jr'));
DELETE FROM "blocks" WHERE "slug" IN ('playhouse-disney', 'nick-jr');

-- Merge blocks that share a slug across channels into the lowest id, so `slug` can become unique.
-- Fox Kids rows were created first, so they are the ones that survive.
CREATE TABLE "_block_merges" AS
SELECT "d"."id" AS "dup_id", "k"."id" AS "keep_id"
FROM "blocks" "d"
JOIN (SELECT "slug", MIN("id") AS "id" FROM "blocks" GROUP BY "slug") "k" ON "k"."slug" = "d"."slug"
WHERE "d"."id" <> "k"."id";

INSERT OR IGNORE INTO "block_channels" ("block_id", "channel_id")
SELECT "m"."keep_id", "bc"."channel_id"
FROM "block_channels" "bc" JOIN "_block_merges" "m" ON "m"."dup_id" = "bc"."block_id";
DELETE FROM "block_channels" WHERE "block_id" IN (SELECT "dup_id" FROM "_block_merges");

-- series_blocks has no unique constraint (several rows record separate runs), so drop only the
-- rows whose (series, block) pair would already exist on the surviving block, then move the rest.
DELETE FROM "series_blocks" WHERE "id" IN (
    SELECT "sb"."id" FROM "series_blocks" "sb" JOIN "_block_merges" "m" ON "m"."dup_id" = "sb"."block_id"
    WHERE EXISTS (
        SELECT 1 FROM "series_blocks" "kept"
        WHERE "kept"."block_id" = "m"."keep_id" AND "kept"."series_id" = "sb"."series_id"
    )
);
UPDATE "series_blocks" SET "block_id" = (SELECT "keep_id" FROM "_block_merges" WHERE "dup_id" = "block_id")
WHERE "block_id" IN (SELECT "dup_id" FROM "_block_merges");
UPDATE "schedules" SET "block_id" = (SELECT "keep_id" FROM "_block_merges" WHERE "dup_id" = "block_id")
WHERE "block_id" IN (SELECT "dup_id" FROM "_block_merges");
UPDATE "timeline_events" SET "block_id" = (SELECT "keep_id" FROM "_block_merges" WHERE "dup_id" = "block_id")
WHERE "block_id" IN (SELECT "dup_id" FROM "_block_merges");

DELETE FROM "blocks" WHERE "id" IN (SELECT "dup_id" FROM "_block_merges");
DROP TABLE "_block_merges";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_blocks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "logo_path" TEXT,
    "start_year" INTEGER,
    "end_year" INTEGER,
    "source_name" TEXT,
    "source_url" TEXT,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_blocks" ("created_at", "description", "end_year", "id", "logo_path", "name", "notes", "slug", "source_name", "source_url", "start_year", "updated_at") SELECT "created_at", "description", "end_year", "id", "logo_path", "name", "notes", "slug", "source_name", "source_url", "start_year", "updated_at" FROM "blocks";
DROP TABLE "blocks";
ALTER TABLE "new_blocks" RENAME TO "blocks";
CREATE UNIQUE INDEX "blocks_slug_key" ON "blocks"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "block_channels_channel_id_idx" ON "block_channels"("channel_id");
