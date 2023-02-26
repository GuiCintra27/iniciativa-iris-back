/*
  Warnings:

  - You are about to drop the column `userId` on the `newsletter` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "newsletter_userId_key";

-- AlterTable
ALTER TABLE "newsletter" DROP COLUMN "userId";
