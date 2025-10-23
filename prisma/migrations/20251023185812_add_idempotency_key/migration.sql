/*
  Warnings:

  - A unique constraint covering the columns `[idempotency_key]` on the table `charge` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "charge" ADD COLUMN     "idempotency_key" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "charge_idempotency_key_key" ON "charge"("idempotency_key");
