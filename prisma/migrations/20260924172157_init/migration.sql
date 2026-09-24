-- CreateTable
CREATE TABLE "channels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT,
    "description" TEXT,
    "launch_year" INTEGER,
    "close_year" INTEGER,
    "source_name" TEXT,
    "source_url" TEXT,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "series" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "original_title" TEXT,
    "overview" TEXT,
    "first_air_year" INTEGER,
    "last_air_year" INTEGER,
    "poster_path" TEXT,
    "tmdb_id" INTEGER,
    "tmdb_synced_at" DATETIME,
    "source_name" TEXT,
    "source_url" TEXT,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "series_channels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "series_id" INTEGER NOT NULL,
    "channel_id" INTEGER NOT NULL,
    "start_year" INTEGER,
    "end_year" INTEGER,
    "source_name" TEXT,
    "source_url" TEXT,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "series_channels_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "series" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "series_channels_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "seasons" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "series_id" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "name" TEXT,
    "overview" TEXT,
    "air_year" INTEGER,
    "poster_path" TEXT,
    "tmdb_id" INTEGER,
    "tmdb_synced_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "seasons_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "series" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "episodes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "season_id" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT,
    "original_title" TEXT,
    "overview" TEXT,
    "original_air_date" TEXT,
    "still_path" TEXT,
    "tmdb_id" INTEGER,
    "tmdb_synced_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "episodes_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "blocks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "channel_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "start_year" INTEGER,
    "end_year" INTEGER,
    "source_name" TEXT,
    "source_url" TEXT,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "blocks_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "series_blocks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "series_id" INTEGER NOT NULL,
    "block_id" INTEGER NOT NULL,
    "start_year" INTEGER,
    "end_year" INTEGER,
    "source_name" TEXT,
    "source_url" TEXT,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "series_blocks_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "series" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "series_blocks_block_id_fkey" FOREIGN KEY ("block_id") REFERENCES "blocks" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "channel_id" INTEGER NOT NULL,
    "series_id" INTEGER,
    "block_id" INTEGER,
    "air_date" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT,
    "feed" TEXT,
    "listed_title" TEXT,
    "source_name" TEXT,
    "source_url" TEXT,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "schedules_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "schedules_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "schedules_block_id_fkey" FOREIGN KEY ("block_id") REFERENCES "blocks" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "timeline_events" (
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
    "source_name" TEXT,
    "source_url" TEXT,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "timeline_events_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "timeline_events_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "timeline_events_block_id_fkey" FOREIGN KEY ("block_id") REFERENCES "blocks" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "channels_slug_key" ON "channels"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "series_slug_key" ON "series"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "series_tmdb_id_key" ON "series"("tmdb_id");

-- CreateIndex
CREATE INDEX "series_channels_series_id_channel_id_idx" ON "series_channels"("series_id", "channel_id");

-- CreateIndex
CREATE INDEX "series_channels_channel_id_start_year_idx" ON "series_channels"("channel_id", "start_year");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_tmdb_id_key" ON "seasons"("tmdb_id");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_series_id_number_key" ON "seasons"("series_id", "number");

-- CreateIndex
CREATE UNIQUE INDEX "episodes_tmdb_id_key" ON "episodes"("tmdb_id");

-- CreateIndex
CREATE UNIQUE INDEX "episodes_season_id_number_key" ON "episodes"("season_id", "number");

-- CreateIndex
CREATE UNIQUE INDEX "blocks_channel_id_slug_key" ON "blocks"("channel_id", "slug");

-- CreateIndex
CREATE INDEX "series_blocks_series_id_block_id_idx" ON "series_blocks"("series_id", "block_id");

-- CreateIndex
CREATE INDEX "series_blocks_block_id_start_year_idx" ON "series_blocks"("block_id", "start_year");

-- CreateIndex
CREATE INDEX "schedules_channel_id_air_date_start_time_idx" ON "schedules"("channel_id", "air_date", "start_time");

-- CreateIndex
CREATE INDEX "schedules_series_id_air_date_idx" ON "schedules"("series_id", "air_date");

-- CreateIndex
CREATE INDEX "schedules_block_id_air_date_idx" ON "schedules"("block_id", "air_date");

-- CreateIndex
CREATE INDEX "schedules_air_date_start_time_idx" ON "schedules"("air_date", "start_time");

-- CreateIndex
CREATE INDEX "timeline_events_year_month_day_idx" ON "timeline_events"("year", "month", "day");

-- CreateIndex
CREATE INDEX "timeline_events_channel_id_year_idx" ON "timeline_events"("channel_id", "year");

-- CreateIndex
CREATE INDEX "timeline_events_series_id_year_idx" ON "timeline_events"("series_id", "year");

-- CreateIndex
CREATE INDEX "timeline_events_block_id_year_idx" ON "timeline_events"("block_id", "year");
