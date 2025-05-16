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

/// POST: Registrar nueva mascota
export async function POST(req: Request) {
  try {
    const body = await req.json();

    
    const nuevaMascota = await prisma.mascota.create({
      data: {
        nombre: body.nombre,
        sexo: body.sexo,
        raza: body.raza,
        nacimiento: new Date(body.nacimiento),
        color: body.color,
        senasParticulares: body.senasParticulares,
        tipomascotaId: parseInt(body.tipomascotaId),
        duenioId: parseInt(body.duenioId),
      },
    });

    // Paso 2: Crear el historial usando el ID de la mascota
    const historial = await prisma.historial.create({
      data: {
        vacunas: body.vacunas,
        Alergias: body.alergias,
        Enfermedades: body.enfermedades,
        tamano: body.tamano,
        pesoActual: parseFloat(body.pesoActual),
        Esterilizacion: body.esterilizado === true || body.esterilizado === 'true',
        condicionesPrevias: body.condicionesPrevias,
        Desparasitacion: new Date(body.ultimaDesparasitacion),
        mascotaId: nuevaMascota.id, // Asociar con mascota recién creada
      },
    });

    return NextResponse.json({ mascota: nuevaMascota, historial });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al registrar la mascota o historial' }, { status: 500 });
  }
}
