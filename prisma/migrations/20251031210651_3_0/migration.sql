/*
  Warnings:

  - A unique constraint covering the columns `[indentifier]` on the table `providers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifierType` to the `providers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `indentifier` to the `providers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IdentifierType" AS ENUM ('PASSPORT', 'NATIONAL_ID', 'DRIVER_LICENSE');

-- AlterTable
ALTER TABLE "providers" ADD COLUMN     "identifierType" TEXT NOT NULL,
ADD COLUMN     "indentifier" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "providers_indentifier_key" ON "providers"("indentifier");
