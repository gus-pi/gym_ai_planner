/*
  Warnings:

  - You are about to drop the column `day_per_week` on the `User` table. All the data in the column will be lost.
  - Added the required column `days_per_week` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "day_per_week",
ADD COLUMN     "days_per_week" INTEGER NOT NULL;
