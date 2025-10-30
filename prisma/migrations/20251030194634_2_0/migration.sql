-- AlterTable
ALTER TABLE "packages" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
