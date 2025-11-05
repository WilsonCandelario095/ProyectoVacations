-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
