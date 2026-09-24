/*
  Warnings:

  - You are about to drop the column `close_year` on the `channels` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `channels` table. All the data in the column will be lost.
  - You are about to drop the column `launch_year` on the `channels` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_channels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT,
    "source_name" TEXT,
    "source_url" TEXT,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_channels" ("country", "created_at", "id", "name", "notes", "slug", "source_name", "source_url", "updated_at") SELECT "country", "created_at", "id", "name", "notes", "slug", "source_name", "source_url", "updated_at" FROM "channels";
DROP TABLE "channels";
ALTER TABLE "new_channels" RENAME TO "channels";
CREATE UNIQUE INDEX "channels_slug_key" ON "channels"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
