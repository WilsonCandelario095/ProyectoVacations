/*
  Warnings:

  - You are about to drop the column `name` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `roles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nameRole]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nameDes` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameRole` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'CUSTOMER', 'PROVIDER');

-- DropIndex
DROP INDEX "public"."roles_name_key";

-- AlterTable
ALTER TABLE "destinations" DROP COLUMN "name",
ADD COLUMN     "nameDes" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "name",
ADD COLUMN     "nameRole" "Roles" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "roles_nameRole_key" ON "roles"("nameRole");
