-- CreateTable
CREATE TABLE "Vigencia" (
    "id_vigencia" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Vigencia_pkey" PRIMARY KEY ("id_vigencia")
);

-- AddForeignKey
ALTER TABLE "Mascota" ADD CONSTRAINT "Mascota_idVigencia_fkey" FOREIGN KEY ("idVigencia") REFERENCES "Vigencia"("id_vigencia") ON DELETE RESTRICT ON UPDATE CASCADE;
