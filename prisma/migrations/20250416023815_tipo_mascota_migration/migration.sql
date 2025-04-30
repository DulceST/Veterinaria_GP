-- AlterTable
ALTER TABLE "TipoMascota" ADD COLUMN     "ImageTipo" TEXT;

-- CreateTable
CREATE TABLE "Mascota" (
    "NoExpediente" SERIAL NOT NULL,
    "seniasParticulares" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "nacimiento" TIMESTAMP(3) NOT NULL,
    "raza" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "idTipo" INTEGER NOT NULL,

    CONSTRAINT "Mascota_pkey" PRIMARY KEY ("NoExpediente")
);

-- AddForeignKey
ALTER TABLE "Mascota" ADD CONSTRAINT "Mascota_idTipo_fkey" FOREIGN KEY ("idTipo") REFERENCES "TipoMascota"("idTipoMascota") ON DELETE RESTRICT ON UPDATE CASCADE;
