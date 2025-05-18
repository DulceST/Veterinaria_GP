"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState([]);
  const [mostrarArchivados, setMostrarArchivados] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false); // NUEVO: Estado de carga

  useEffect(() => {
    const fetchPacientes = async () => {
      setLoading(true); // empieza la carga
      try {
        const res = await fetch("/api/mascotas");
        const data = await res.json();
        setPacientes(data);
      } catch (error) {
        console.error("Error al cargar pacientes:", error);
      } finally {
        setLoading(false); // termina la carga
      }
    };

    fetchPacientes();
  }, []);

  function handleVerDetalles(id: any): void {
    console.log("Ver detalles de:", id);
  }

  async function handleEliminar(id: number) {
    const confirmar = confirm("¿Estás seguro de archivar este paciente?");
    if (!confirmar) return;

    setLoading(true); // empieza la carga

    try {
      const res = await fetch(`/api/mascotas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vigente: false }),
      });

      if (!res.ok) throw new Error("Error al archivar paciente");

      await res.json();
      alert("Paciente archivado correctamente");

      // Recarga los pacientes
      const nuevaLista = await fetch("/api/mascotas").then((r) => r.json());
      setPacientes(nuevaLista);
    } catch (error) {
      console.error(error);
      alert("Error al archivar el paciente");
    } finally {
      setLoading(false); // termina la carga
    }
  }

  const normalizar = (texto: string) =>
    texto?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";

  const pacientesFiltrados = pacientes.filter((p: any) => {
    const coincideVigencia = p.vigente === !mostrarArchivados;
    const nombreMascota = normalizar(p.nombre);
    const nombreDuenio = normalizar(`${p.duenio?.nombre || ""} ${p.duenio?.apellidos || ""}`);
    const terminoBusqueda = normalizar(busqueda);

    const coincideBusqueda =
      nombreMascota.includes(terminoBusqueda) ||
      nombreDuenio.includes(terminoBusqueda);

    return coincideVigencia && coincideBusqueda;
  });

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {mostrarArchivados ? "Pacientes Archivados" : "Lista de Pacientes"}
          </h1>
          <div className="flex gap-2 flex-col md:flex-row w-full md:w-auto">
            <input
              type="text"
              placeholder="Buscar por nombre o dueño..."
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button
              onClick={() => setMostrarArchivados(!mostrarArchivados)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition"
            >
              {mostrarArchivados ? "Ver Vigentes" : "Ver Archivados"}
            </button>
          </div>
        </div>

        {/* LOADER */}
        {loading ? (
          <div className="flex justify-center py-10">
            <img
              src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGc5NHk4cWNsOW1ycno0YXY2dWRzZjBtbGpnY3g3eTBiZnF4cDRnYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sSgvbe1m3n93G/giphy.gif"
              alt="Cargando..."
              className="w-24 h-24"
            />
          </div>
        ) : pacientesFiltrados.length === 0 ? (
          <p className="text-gray-600">
            No hay pacientes {mostrarArchivados ? "archivados" : "registrados"} que coincidan con la búsqueda.
          </p>
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
