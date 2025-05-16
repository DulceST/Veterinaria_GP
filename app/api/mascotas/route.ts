// src/app/api/registro/route.ts (si usas App Router)
// o pages/api/registro.ts (si usas Pages Router)

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma"; // Asegúrate de que la ruta esté bien

export async function POST(request: Request) {
    const data = await request.json();

    try {
        const mascota = await prisma.mascota.create({
            data: {
                nombre: data.nombreMascota,
                sexo: data.sexo,
                raza: data.raza,
                nacimiento: new Date(data.nacimiento),
                color: data.color,
                senasParticulares: data.senasParticulares, 
                tipomascota: {
                    connect: { idTipo: parseInt(data.tipomascotaId) },
                },
                duenio: {
                    create: {
                        nombre: data.nombreDuenio,
                        apellidos: data.apellidos,
                        Email: data.email,
                        Direccion: data.direccion,
                        Telefono: data.telefono,
                    },
                },
                historial: {
                    create: {
                        vacunas: data.vacunas,
                        Alergias: data.Alergias,
                        Enfermedades: data.Enfermedades,
                        tamano: data.tamano,
                        pesoActual: parseFloat(data.pesoActual),
                        Esterilizacion: data.esterilizado === "sí",
                        condicionesPrevias: data.condicionesPrevias,
                        Desparasitacion: new Date(data.ultimaDesparasitacion)
                    },
                },
            },
        });

        return NextResponse.json({ success: true, mascota });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Error al registrar la mascota." }, { status: 500 });
    }
}
