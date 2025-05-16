"use client";

import Navbar from "../components/Navbar";
import React, { useState } from "react";
import { SelectTipoMascota } from "../components/SelectTipoMascota";



export default function RegistroPage() {
  const [selectedTipo, setSelectedTipo] = useState("");
  
  const [activeTab, setActiveTab] = useState<"mascota" | "historial">("mascota");

  const [formData, setFormData] = useState({
    // Datos mascota
    nombreMascota: "",
    sexo: "",
    edad: "",
    raza: "",
    nacimiento: "",
    color: "",
    senas: "",
    tipomascotaId: "",

    // Datos dueño
    nombreDuenio: "",
    apellidos: "",
    email: "",
    direccion: "",
    telefono: "",
    // Historial clínico
    mascotaid: "",
    vacunas: "",
    alergias: "",
    enfermedades: "",
    tamano: "",               // nuevo
    pesoActual: "",           // nuevo
    esterilizado: "",         // nuevo
    condicionesPrevias: "",   // nuevo
    ultimaDesparasitacion: "",// nuevo
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields =
      activeTab === "mascota"
        ? ["nombreMascota", "sexo", "edad", "raza", "nacimiento", "color", "senas", "nombreDuenio", "apellidos", "email", "direccion", "telefono"]
        : [
          "vacunas",
          "alergias",
          "enfermedades",
          "tamano",
          "pesoActual",
          "esterilizado",
          "condicionesPrevias",
          "ultimaDesparasitacion",
        ];

    for (let key of requiredFields) {
      if ((formData as any)[key] === "") {
        setError("Por favor completa todos los campos.");
        return;
      }
    }

    console.log("Datos enviados:", formData);
    alert("¡Formulario enviado correctamente!");
  };

  return (
    <div>
      <Navbar />

      {/* Tabs arriba del contenedor */}
      <div className="bg-gray-100 py-4 flex justify-center space-x-4 border-b border-gray-300">
        <button
          onClick={() => setActiveTab("mascota")}
          className={`px-6 py-2 rounded-t-md font-semibold ${activeTab === "mascota"
              ? "bg-white border border-b-0 border-gray-300 text-blue-600"
              : "bg-gray-200 text-gray-700"
            }`}
        >
          Registro de Mascota
        </button>
        <button
          onClick={() => setActiveTab("historial")}
          className={`px-6 py-2 rounded-t-md font-semibold ${activeTab === "historial"
              ? "bg-white border border-b-0 border-gray-300 text-blue-600"
              : "bg-gray-200 text-gray-700"
            }`}
        >
          Historial Clínico
        </button>
      </div>

      <div className="min-h-screen p-10 bg-gray-50">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Registro de Mascotas</h1>

          {/* Error */}
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            {activeTab === "mascota" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Columna izquierda: Mascota */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Datos de la Mascota</h2>
                  <div className="space-y-4">
                    <Input label="Nombre" name="nombreMascota" value={formData.nombreMascota} onChange={handleChange} />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sexo</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input type="radio" name="sexo" value="Masculino" onChange={handleChange} checked={formData.sexo === "Masculino"} />
                          Masculino
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" name="sexo" value="Femenino" onChange={handleChange} checked={formData.sexo === "Femenino"} />
                          Femenino
                        </label>
                      </div>
                    </div>
                    <Input label="Edad" name="edad" type="number" value={formData.edad} onChange={handleChange} />

                    
                    <SelectTipoMascota
  value={selectedTipo}
  onChange={(e) => setSelectedTipo(e.target.value)}
/>
                    <Input label="Raza" name="raza" value={formData.raza} onChange={handleChange} />
                    <Input label="Fecha de nacimiento" name="nacimiento" type="date" value={formData.nacimiento} onChange={handleChange} />
                    <Input label="Color" name="color" value={formData.color} onChange={handleChange} />
                    <Input label="Señas particulares" name="senas" value={formData.senas} onChange={handleChange} />
                  </div>


                </div>

                {/* Columna derecha: Dueño */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Datos del Dueño</h2>
                  <div className="space-y-4">
                    <Input label="Nombre" name="nombreDuenio" value={formData.nombreDuenio} onChange={handleChange} />
                    <Input label="Apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} />
                    <Input label="Correo electrónico" name="email" type="email" value={formData.email} onChange={handleChange} />
                    <Input label="Dirección" name="direccion" value={formData.direccion} onChange={handleChange} />
                    <Input label="Teléfono" name="telefono" type="tel" value={formData.telefono} onChange={handleChange} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold mb-4 text-center">Historial Clínico</h2>
                <TextArea label="Vacunas" name="vacunas" value={formData.vacunas} onChange={handleChange} />
                <TextArea label="Alergias" name="alergias" value={formData.alergias} onChange={handleChange} />
                <TextArea label="Enfermedades" name="enfermedades" value={formData.enfermedades} onChange={handleChange} />
                <Input label="Tamaño" name="tamano" value={formData.tamano} onChange={handleChange} />
                <Input label="Peso Actual" name="pesoActual" type="number" value={formData.pesoActual} onChange={handleChange} />
                <Input label="¿Está esterilizado?" name="esterilizado" value={formData.esterilizado} onChange={handleChange} />
                <TextArea label="Condiciones Previas" name="condicionesPrevias" value={formData.condicionesPrevias} onChange={handleChange} />
                <Input label="Última Desparasitación" name="ultimaDesparasitacion" type="date" value={formData.ultimaDesparasitacion} onChange={handleChange} />
              </div>
            )}

            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
              >
                Guardar {activeTab === "mascota" ? "Registro" : "Historial"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Input genérico
function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
}

// Textarea
function TextArea({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
}
