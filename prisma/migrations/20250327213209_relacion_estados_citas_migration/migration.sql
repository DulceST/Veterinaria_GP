-- CreateTable
CREATE TABLE "Cita" (
    "idCita" SERIAL NOT NULL,
    "notasAdicionales" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora" TEXT NOT NULL,
    "motivo" TEXT NOT NULL,
    "duenioId" INTEGER NOT NULL,
    "idEstado" INTEGER NOT NULL,

    CONSTRAINT "Cita_pkey" PRIMARY KEY ("idCita")
);

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_idEstado_fkey" FOREIGN KEY ("idEstado") REFERENCES "Estado"("idEstado") ON DELETE RESTRICT ON UPDATE CASCADE;
