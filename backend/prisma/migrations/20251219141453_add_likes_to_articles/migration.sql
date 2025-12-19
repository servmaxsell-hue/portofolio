-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_articles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "tags" TEXT,
    "read_time" INTEGER NOT NULL DEFAULT 5,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "published_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_articles" ("content", "created_at", "excerpt", "id", "image", "published", "published_at", "read_time", "slug", "tags", "title", "updated_at") SELECT "content", "created_at", "excerpt", "id", "image", "published", "published_at", "read_time", "slug", "tags", "title", "updated_at" FROM "articles";
DROP TABLE "articles";
ALTER TABLE "new_articles" RENAME TO "articles";
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
