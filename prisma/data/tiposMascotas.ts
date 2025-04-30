import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getTiposMascota() {
  const tipos = await prisma.tipoMascota.findMany()
  return tipos
}
