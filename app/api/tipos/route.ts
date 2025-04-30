import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const tipos = await prisma.tipoMascota.findMany()
    return NextResponse.json(tipos)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los tipos de mascotas' }, { status: 500 })
  }
}
