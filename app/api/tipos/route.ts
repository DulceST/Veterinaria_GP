import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET: Obtener tipos de mascota
export async function GET() {
  try {
    const tipos = await prisma.tipoMascota.findMany()
    return NextResponse.json(tipos)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los tipos de mascotas' }, { status: 500 })
  }
}

// POST: Registrar nueva mascota
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const nuevaMascota = await prisma.mascota.create({
      data: {
        nombre: body.nombre,
        sexo: body.sexo,
        raza: body.raza,
        nacimiento: new Date(body.nacimiento),
        color: body.color,
        senasPaerticulares: body.senasPaerticulares,
        tipomascotaId: parseInt(body.tipomascotaId),
        tamano: body.tamano,
        pesoActual: parseFloat(body.pesoActual),
        esterilizado: body.esterilizado === true || body.esterilizado === 'true',
        condicionesPrevias: body.condicionesPrevias,
        ultimaDesparasitacion: new Date(body.ultimaDesparasitacion),
        alergias: body.alergias
      }
    })

    return NextResponse.json(nuevaMascota)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al registrar la mascota' }, { status: 500 })
  }
}
