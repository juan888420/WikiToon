-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_block_airings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "block_id" INTEGER NOT NULL,
    "channel_id" INTEGER,
    "position" INTEGER NOT NULL,
    "weekdays" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT,
    "period" TEXT,
    "time_zone" TEXT,
    "source_name" TEXT,
    "source_url" TEXT,
    "notes" TEXT,
    CONSTRAINT "block_airings_block_id_fkey" FOREIGN KEY ("block_id") REFERENCES "blocks" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "block_airings_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_block_airings" ("block_id", "channel_id", "end_time", "id", "notes", "period", "position", "source_name", "source_url", "start_time", "time_zone", "weekdays") SELECT "block_id", "channel_id", "end_time", "id", "notes", "period", "position", "source_name", "source_url", "start_time", "time_zone", "weekdays" FROM "block_airings";
DROP TABLE "block_airings";
ALTER TABLE "new_block_airings" RENAME TO "block_airings";
CREATE INDEX "block_airings_channel_id_idx" ON "block_airings"("channel_id");
CREATE UNIQUE INDEX "block_airings_block_id_position_key" ON "block_airings"("block_id", "position");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
