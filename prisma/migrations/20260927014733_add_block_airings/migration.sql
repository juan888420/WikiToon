-- CreateTable
CREATE TABLE "block_airings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "block_id" INTEGER NOT NULL,
    "channel_id" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "weekdays" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT,
    "period" TEXT NOT NULL,
    "time_zone" TEXT,
    "source_name" TEXT NOT NULL,
    "source_url" TEXT NOT NULL,
    "notes" TEXT,
    CONSTRAINT "block_airings_block_id_fkey" FOREIGN KEY ("block_id") REFERENCES "blocks" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "block_airings_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "block_airings_channel_id_idx" ON "block_airings"("channel_id");

-- CreateIndex
CREATE UNIQUE INDEX "block_airings_block_id_position_key" ON "block_airings"("block_id", "position");
