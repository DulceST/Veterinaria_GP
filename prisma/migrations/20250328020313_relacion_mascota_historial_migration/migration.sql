-- CreateTable
CREATE TABLE "Historial" (
    "idHistorial" SERIAL NOT NULL,
    "peso_actual" DOUBLE PRECISION NOT NULL,
    "tamano" TEXT NOT NULL,
    "alergias" TEXT,
    "ultimaDesparasitacion" TIMESTAMP(3),
    "condicionesPrevias" TEXT,
    "esterilizacion" BOOLEAN NOT NULL,
    "mascotaId" TEXT NOT NULL,

    CONSTRAINT "Historial_pkey" PRIMARY KEY ("idHistorial")
);

-- CreateIndex
CREATE UNIQUE INDEX "Historial_mascotaId_key" ON "Historial"("mascotaId");

-- AddForeignKey
ALTER TABLE "Historial" ADD CONSTRAINT "Historial_mascotaId_fkey" FOREIGN KEY ("mascotaId") REFERENCES "Mascota"("NoExpediente") ON DELETE RESTRICT ON UPDATE CASCADE;
