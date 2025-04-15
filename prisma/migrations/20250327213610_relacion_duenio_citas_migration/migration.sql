-- CreateTable
CREATE TABLE "Duenio" (
    "id_dueno" SERIAL NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,

    CONSTRAINT "Duenio_pkey" PRIMARY KEY ("id_dueno")
);

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_duenioId_fkey" FOREIGN KEY ("duenioId") REFERENCES "Duenio"("id_dueno") ON DELETE RESTRICT ON UPDATE CASCADE;
