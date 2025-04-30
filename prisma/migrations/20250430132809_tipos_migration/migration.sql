/*
  Warnings:

  - Added the required column `foto` to the `TipoMascota` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TipoMascota" ADD COLUMN     "foto" TEXT NOT NULL;
