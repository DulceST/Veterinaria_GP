-- CreateTable
CREATE TABLE "Mascota" (
    "NoExpediente" TEXT NOT NULL,
    "senasParticulares" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "nacimiento" TIMESTAMP(3) NOT NULL,
    "raza" TEXT NOT NULL,
    "idVigencia" INTEGER NOT NULL,
    "duenioId" INTEGER NOT NULL,

    CONSTRAINT "Mascota_pkey" PRIMARY KEY ("NoExpediente")
);

-- AddForeignKey
ALTER TABLE "Mascota" ADD CONSTRAINT "Mascota_duenioId_fkey" FOREIGN KEY ("duenioId") REFERENCES "Duenio"("id_dueno") ON DELETE RESTRICT ON UPDATE CASCADE;
