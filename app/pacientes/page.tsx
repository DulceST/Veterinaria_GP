"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      const res = await fetch("/api/mascotas");
      const data = await res.json();
      setPacientes(data);
    };

    fetchPacientes();
  }, []);

  return (

    <>
    <Navbar/>
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Lista de Pacientes</h1>
      {pacientes.length === 0 ? (
        <p>No hay pacientes registrados.</p>
      ) : (
        <ul className="space-y-4">
          {pacientes.map((p: any) => (
            <li
              key={p.id}
              className="border rounded p-4 shadow hover:bg-gray-50 transition"
            >
              <p><strong>Nombre:</strong> {p.nombre}</p>
              <p><strong>Tipo:</strong> {p.tipoMascota?.nombre || "N/A"}</p>
              <p><strong>Dueño:</strong> {p.duenio?.nombre} {p.duenio?.apellidos}</p>
              <p><strong>Teléfono:</strong> {p.duenio?.telefono}</p>
              <p><strong>Raza:</strong> {p.raza}</p>
              <p><strong>Color:</strong> {p.color}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
    
  );
}

