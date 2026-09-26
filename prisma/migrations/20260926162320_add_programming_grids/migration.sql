-- CreateTable
CREATE TABLE "feeds" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "channel_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT,
    "reference_time_zone" TEXT,
    "source_name" TEXT,
    "source_url" TEXT,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "feeds_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "schedule_grids" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "channel_id" INTEGER NOT NULL,
    "feed_id" INTEGER,
    "valid_from" TEXT NOT NULL,
    "valid_to" TEXT NOT NULL,
    "time_zone" TEXT,
    "broadcast_day_start" TEXT NOT NULL,
    "source_name" TEXT NOT NULL,
    "source_url" TEXT,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "schedule_grids_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "schedule_grids_feed_id_fkey" FOREIGN KEY ("feed_id") REFERENCES "feeds" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "schedule_grid_slots" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "grid_id" INTEGER NOT NULL,
    "weekday" INTEGER NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT,
    "listed_title" TEXT,
    "listed_block" TEXT,
    "series_id" INTEGER,
    "block_id" INTEGER,
    "certainty" TEXT NOT NULL,
    "notes" TEXT,
    CONSTRAINT "schedule_grid_slots_grid_id_fkey" FOREIGN KEY ("grid_id") REFERENCES "schedule_grids" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "schedule_grid_slots_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "schedule_grid_slots_block_id_fkey" FOREIGN KEY ("block_id") REFERENCES "blocks" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_schedules" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "channel_id" INTEGER NOT NULL,
    "series_id" INTEGER,
    "block_id" INTEGER,
    "air_date" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT,
    "feed" TEXT,
    "feed_id" INTEGER,
    "time_zone" TEXT,
    "listed_title" TEXT,
    "certainty" TEXT NOT NULL DEFAULT 'UNCERTAIN',
    "source_name" TEXT,
    "source_url" TEXT,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "schedules_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "schedules_feed_id_fkey" FOREIGN KEY ("feed_id") REFERENCES "feeds" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "schedules_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "schedules_block_id_fkey" FOREIGN KEY ("block_id") REFERENCES "blocks" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_schedules" ("air_date", "block_id", "channel_id", "created_at", "end_time", "feed", "id", "listed_title", "notes", "series_id", "source_name", "source_url", "start_time", "updated_at") SELECT "air_date", "block_id", "channel_id", "created_at", "end_time", "feed", "id", "listed_title", "notes", "series_id", "source_name", "source_url", "start_time", "updated_at" FROM "schedules";
DROP TABLE "schedules";
ALTER TABLE "new_schedules" RENAME TO "schedules";
CREATE INDEX "schedules_channel_id_air_date_start_time_idx" ON "schedules"("channel_id", "air_date", "start_time");
CREATE INDEX "schedules_series_id_air_date_idx" ON "schedules"("series_id", "air_date");
CREATE INDEX "schedules_block_id_air_date_idx" ON "schedules"("block_id", "air_date");
CREATE INDEX "schedules_air_date_start_time_idx" ON "schedules"("air_date", "start_time");
CREATE INDEX "schedules_feed_id_idx" ON "schedules"("feed_id");
CREATE TABLE "new_timeline_events" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL DEFAULT 'OTHER',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "year" INTEGER NOT NULL,
    "month" INTEGER,
    "day" INTEGER,
    "channel_id" INTEGER,
    "series_id" INTEGER,
    "block_id" INTEGER,
    "certainty" TEXT NOT NULL DEFAULT 'UNCERTAIN',
    "source_name" TEXT,
    "source_url" TEXT,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "timeline_events_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "timeline_events_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "timeline_events_block_id_fkey" FOREIGN KEY ("block_id") REFERENCES "blocks" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_timeline_events" ("block_id", "channel_id", "created_at", "day", "description", "id", "month", "notes", "series_id", "source_name", "source_url", "title", "type", "updated_at", "year") SELECT "block_id", "channel_id", "created_at", "day", "description", "id", "month", "notes", "series_id", "source_name", "source_url", "title", "type", "updated_at", "year" FROM "timeline_events";
DROP TABLE "timeline_events";
ALTER TABLE "new_timeline_events" RENAME TO "timeline_events";
CREATE INDEX "timeline_events_year_month_day_idx" ON "timeline_events"("year", "month", "day");
CREATE INDEX "timeline_events_channel_id_year_idx" ON "timeline_events"("channel_id", "year");
CREATE INDEX "timeline_events_series_id_year_idx" ON "timeline_events"("series_id", "year");
CREATE INDEX "timeline_events_block_id_year_idx" ON "timeline_events"("block_id", "year");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "feeds_channel_id_slug_key" ON "feeds"("channel_id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "schedule_grids_slug_key" ON "schedule_grids"("slug");

-- CreateIndex
CREATE INDEX "schedule_grids_channel_id_valid_from_idx" ON "schedule_grids"("channel_id", "valid_from");

-- CreateIndex
CREATE INDEX "schedule_grids_feed_id_idx" ON "schedule_grids"("feed_id");

-- CreateIndex
CREATE INDEX "schedule_grid_slots_series_id_idx" ON "schedule_grid_slots"("series_id");

-- CreateIndex
CREATE INDEX "schedule_grid_slots_block_id_idx" ON "schedule_grid_slots"("block_id");

-- CreateIndex
CREATE UNIQUE INDEX "schedule_grid_slots_grid_id_weekday_start_time_key" ON "schedule_grid_slots"("grid_id", "weekday", "start_time");
