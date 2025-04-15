-- CreateTable
CREATE TABLE "Vacuna" (
    "idVacuna" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "dosis" TEXT NOT NULL,

    CONSTRAINT "Vacuna_pkey" PRIMARY KEY ("idVacuna")
);

-- CreateTable
CREATE TABLE "MascotaVacuna" (
    "id" SERIAL NOT NULL,
    "mascotaId" TEXT NOT NULL,
    "vacunaId" INTEGER NOT NULL,
    "fechaAplicacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MascotaVacuna_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MascotaVacuna_mascotaId_vacunaId_key" ON "MascotaVacuna"("mascotaId", "vacunaId");

-- AddForeignKey
ALTER TABLE "MascotaVacuna" ADD CONSTRAINT "MascotaVacuna_mascotaId_fkey" FOREIGN KEY ("mascotaId") REFERENCES "Mascota"("NoExpediente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MascotaVacuna" ADD CONSTRAINT "MascotaVacuna_vacunaId_fkey" FOREIGN KEY ("vacunaId") REFERENCES "Vacuna"("idVacuna") ON DELETE RESTRICT ON UPDATE CASCADE;
