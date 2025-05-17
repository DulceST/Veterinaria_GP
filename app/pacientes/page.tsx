"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState([]);
  const [mostrarArchivados, setMostrarArchivados] = useState(false);

  useEffect(() => {
    const fetchPacientes = async () => {
      const res = await fetch("/api/mascotas");
      const data = await res.json();
      setPacientes(data);
    };

    fetchPacientes();
  }, []);

  function handleVerDetalles(id: any): void {
    console.log("Ver detalles de:", id);
  }

  function handleEliminar(id: any): void {
    console.log("Eliminar paciente con ID:", id);
  }

  // Filtra pacientes según la vista activa
  const pacientesFiltrados = pacientes.filter((p: any) => p.vigente === !mostrarArchivados);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {mostrarArchivados ? "Pacientes Archivados" : "Lista de Pacientes"}
          </h1>
          <button
            onClick={() => setMostrarArchivados(!mostrarArchivados)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition"
          >
            {mostrarArchivados ? "Ver Vigentes" : "Ver Archivados"}
          </button>
        </div>

        {pacientesFiltrados.length === 0 ? (
          <p className="text-gray-600">No hay pacientes {mostrarArchivados ? "archivados" : "registrados"}.</p>
        ) : (
          <div className="space-y-6">
            {pacientesFiltrados.map((p: any) => (
              <div
                key={p.id}
                className="flex justify-between items-center bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all p-6"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-900">{p.nombre}</p>
                  <p className="text-gray-600"><strong>Tipo:</strong> {p.tipoMascota?.nombre || "N/A"}</p>
                  <p className="text-gray-600"><strong>Dueño:</strong> {p.duenio?.nombre} {p.duenio?.apellidos}</p>
                  <p className="text-gray-600"><strong>Teléfono:</strong> {p.duenio?.telefono}</p>
                  <p className="text-gray-600"><strong>Raza:</strong> {p.raza}</p>
                  <p className="text-gray-600"><strong>Color:</strong> {p.color}</p>
                </div>

                <div className="flex flex-col space-y-2 items-end">
                  <button
                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    onClick={() => handleVerDetalles(p.id)}
                  >
                    Detalles
                  </button>
                  <button
                    className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => handleEliminar(p.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
