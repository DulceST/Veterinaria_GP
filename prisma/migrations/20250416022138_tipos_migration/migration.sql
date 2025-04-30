/*
  Warnings:

  - You are about to drop the `Cita` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Duenio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Estado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Historial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mascota` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MascotaVacuna` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vacuna` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vigencia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cita" DROP CONSTRAINT "Cita_duenioId_fkey";

-- DropForeignKey
ALTER TABLE "Cita" DROP CONSTRAINT "Cita_idEstado_fkey";

-- DropForeignKey
ALTER TABLE "Historial" DROP CONSTRAINT "Historial_mascotaId_fkey";

-- DropForeignKey
ALTER TABLE "Mascota" DROP CONSTRAINT "Mascota_duenioId_fkey";

-- DropForeignKey
ALTER TABLE "Mascota" DROP CONSTRAINT "Mascota_idTipoMascota_fkey";

-- DropForeignKey
ALTER TABLE "Mascota" DROP CONSTRAINT "Mascota_idVigencia_fkey";

-- DropForeignKey
ALTER TABLE "MascotaVacuna" DROP CONSTRAINT "MascotaVacuna_mascotaId_fkey";

-- DropForeignKey
ALTER TABLE "MascotaVacuna" DROP CONSTRAINT "MascotaVacuna_vacunaId_fkey";

-- DropTable
DROP TABLE "Cita";

-- DropTable
DROP TABLE "Duenio";

-- DropTable
DROP TABLE "Estado";

-- DropTable
DROP TABLE "Historial";

-- DropTable
DROP TABLE "Mascota";

-- DropTable
DROP TABLE "MascotaVacuna";

-- DropTable
DROP TABLE "Vacuna";

-- DropTable
DROP TABLE "Vigencia";
