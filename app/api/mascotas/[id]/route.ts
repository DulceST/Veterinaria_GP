import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();

    if (!id || typeof body.vigente !== "boolean") {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const mascotaActualizada = await prisma.mascota.update({
      where: { id },
      data: { vigente: body.vigente },
    });

    return NextResponse.json({ message: "Paciente actualizado correctamente", mascota: mascotaActualizada });
  } catch (error) {
    console.error("Error al actualizar paciente:", error);
    return NextResponse.json({ error: "Error interno al actualizar" }, { status: 500 });
  }
}
