-- CreateTable
CREATE TABLE "Mascota" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "raza" TEXT NOT NULL,
    "nacimiento" TIMESTAMP(3) NOT NULL,
    "color" TEXT NOT NULL,
    "senasPaerticulares" TEXT NOT NULL,
    "tipomascotaId" INTEGER NOT NULL,

    CONSTRAINT "Mascota_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mascota" ADD CONSTRAINT "Mascota_tipomascotaId_fkey" FOREIGN KEY ("tipomascotaId") REFERENCES "TipoMascota"("idTipo") ON DELETE RESTRICT ON UPDATE CASCADE;
