/*
  Warnings:

  - Added the required column `idTipoMascota` to the `Mascota` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mascota" ADD COLUMN     "idTipoMascota" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TipoMascota" (
    "idTipoMascota" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "TipoMascota_pkey" PRIMARY KEY ("idTipoMascota")
);

-- AddForeignKey
ALTER TABLE "Mascota" ADD CONSTRAINT "Mascota_idTipoMascota_fkey" FOREIGN KEY ("idTipoMascota") REFERENCES "TipoMascota"("idTipoMascota") ON DELETE RESTRICT ON UPDATE CASCADE;
