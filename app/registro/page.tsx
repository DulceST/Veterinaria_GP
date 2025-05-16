"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";


export default function MascotaForm() {
  const [formData, setFormData] = useState({
    duenio: {
      nombre: "",
      apellidos: "",
      email: "",
      direccion: "",
      telefono: "",
    },
    mascota: {
      nombre: "",
      sexo: "macho",
      raza: "",
      nacimiento: "",
      color: "",
      senasParticulares: "",
      tipomascotaId: 1,
    },
    historial: {
      vacunas: "",
      alergias: "",
      enfermedades: "",
      tamano: "pequeño",
      pesoActual: "",
      esterilizacion: false,
      condicionesPrevias: "",
      desparasitacion: "",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    if (name.startsWith("duenio.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        duenio: { ...prev.duenio, [key]: value },
      }));
    } else if (name.startsWith("mascota.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        mascota: { ...prev.mascota, [key]: value },
      }));
    } else if (name.startsWith("historial.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        historial: {
          ...prev.historial,
          [key]: type === "checkbox" ? checked : value,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      duenio: { ...formData.duenio },
      mascota: {
        ...formData.mascota,
        tipomascotaId: parseInt(formData.mascota.tipomascotaId.toString()),
      },
      historial: {
        ...formData.historial,
        pesoActual: parseFloat(formData.historial.pesoActual),
        esterilizacion: formData.historial.esterilizacion,
      },
    };

    const res = await fetch("/api/mascotas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      // Mostrar mensaje de éxito
      alert("Los datos del paciente se registraron correctamente.");

      // Limpiar campos de texto
      setFormData({
        duenio: {
          nombre: "",
          apellidos: "",
          email: "",
          direccion: "",
          telefono: "",
        },
        mascota: {
          nombre: "",
          sexo: "macho",
          raza: "",
          nacimiento: "",
          color: "",
          senasParticulares: "",
          tipomascotaId: 1,
        },
        historial: {
          vacunas: "",
          alergias: "",
          enfermedades: "",
          tamano: "pequeño",
          pesoActual: "",
          esterilizacion: false,
          condicionesPrevias: "",
          desparasitacion: "",
        },
      });
    } else {
      alert("Ocurrió un error al registrar los datos.");
    }
  };


  return (
    <>
      <Navbar />

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-6 bg-white shadow rounded space-y-10">
        <h1 className="text-2xl font-bold text-center mb-6">Registro de Mascota</h1>

        {/* Dueño */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Datos del Dueño</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Nombre" name="duenio.nombre" value={formData.duenio.nombre} onChange={handleChange} />
            <Input label="Apellidos" name="duenio.apellidos" value={formData.duenio.apellidos} onChange={handleChange} />
            <Input label="Correo electrónico" name="duenio.email" type="email" value={formData.duenio.email} onChange={handleChange} />
            <Input label="Dirección" name="duenio.direccion" value={formData.duenio.direccion} onChange={handleChange} />
            <Input label="Teléfono" name="duenio.telefono" type="tel" value={formData.duenio.telefono} onChange={handleChange} />
          </div>
        </div>

        {/* Mascota */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Datos de la Mascota</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Nombre" name="mascota.nombre" value={formData.mascota.nombre} onChange={handleChange} />
            <Input label="Raza" name="mascota.raza" value={formData.mascota.raza} onChange={handleChange} />
            <Input label="Color" name="mascota.color" value={formData.mascota.color} onChange={handleChange} />
            <Input label="Fecha de nacimiento" type="date" name="mascota.nacimiento" value={formData.mascota.nacimiento} onChange={handleChange} />
            <Input label="Señas particulares" name="mascota.senasParticulares" value={formData.mascota.senasParticulares} onChange={handleChange} />
            <Select label="Sexo" name="mascota.sexo" value={formData.mascota.sexo} onChange={handleChange} options={["macho", "hembra"]} />
            <Select label="Tipo de Mascota" name="mascota.tipomascotaId" value={formData.mascota.tipomascotaId.toString()} onChange={handleChange} options={["1", "2", "3"]} />
          </div>
        </div>

        {/* Historial Clínico */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Historial Clínico</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextArea label="Vacunas" name="historial.vacunas" value={formData.historial.vacunas} onChange={handleChange} />
            <TextArea label="Alergias" name="historial.alergias" value={formData.historial.alergias} onChange={handleChange} />
            <TextArea label="Enfermedades" name="historial.enfermedades" value={formData.historial.enfermedades} onChange={handleChange} />
            <Select label="Tamaño" name="historial.tamano" value={formData.historial.tamano} onChange={handleChange} options={["pequeno", "mediano", "grande"]} />
            <Input label="Peso Actual (kg)" name="historial.pesoActual" type="number" value={formData.historial.pesoActual} onChange={handleChange} />
            <div className="flex items-center gap-2 mt-4">
              <input type="checkbox" name="historial.esterilizacion" checked={formData.historial.esterilizacion} onChange={handleChange} />
              <label className="text-sm font-medium">¿Está esterilizado?</label>
            </div>
            <TextArea label="Condiciones Previas" name="historial.condicionesPrevias" value={formData.historial.condicionesPrevias} onChange={handleChange} />
            <Input label="Última Desparasitación" name="historial.desparasitacion" type="date" value={formData.historial.desparasitacion} onChange={handleChange} />
          </div>
        </div>

        <div className="text-center mt-10">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded">
            Guardar Registro
          </button>
        </div>
      </form>
    </>
  );
}

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
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

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
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
