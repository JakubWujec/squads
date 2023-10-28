/*
  Warnings:

  - You are about to drop the column `hash1` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `hash2` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `password1` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `password2` on the `Room` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Room" ("createdAt", "id", "name") SELECT "createdAt", "id", "name" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
