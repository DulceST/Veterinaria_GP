import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const pacientes = await prisma.mascota.findMany({
    include: {
      duenio: true,
      historial: true,
    },
  });

  return NextResponse.json(pacientes);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const nuevoDuenioConMascotaEHistorial = await prisma.duenio.create({
      data: {
        nombre: body.duenio.nombre,
        apellidos: body.duenio.apellidos,
        Email: body.duenio.email,
        Direccion: body.duenio.direccion,
        Telefono: body.duenio.Telefono,
        mascotas: {
          create: [
            {
              nombre: body.mascota.nombre,
              sexo: body.mascota.sexo,
              raza: body.mascota.raza,
              nacimiento: new Date(body.mascota.nacimiento),
              color: body.mascota.color,
              senasParticulares: body.mascota.senasParticulares,
              tipomascotaId: parseInt(body.mascota.tipomascotaId),
              historial: {
                create: [
                  {
                    vacunas: body.historial.vacunas,
                    Alergias: body.historial.alergias,
                    Enfermedades: body.historial.enfermedades,
                    tamano: body.historial.tamano,
                    pesoActual: parseFloat(body.historial.pesoActual),
                    Esterilizacion: body.historial.esterilizacion,
                    condicionesPrevias: body.historial.condicionesPrevias,
                    Desparasitacion: new Date(body.historial.desparasitacion),
                  }
                ]
              }
            }
          ]
        }
      }
    });

    return NextResponse.json(nuevoDuenioConMascotaEHistorial, { status: 201 });
  } catch (error) {
    console.error("Error creando dueño, mascota e historial:", error);
    return NextResponse.json({ error: "Error al crear dueño, mascota e historial" }, { status: 500 });
  }
}
