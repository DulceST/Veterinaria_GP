"use client";
import { useState } from "react";

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
      tamano: "pequeno",
      pesoActual: "",
      esterilizacion: false,
      condicionesPrevias: "",
      desparasitacion: "",
    },
  });

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.target;

  // En TS hay que castear para acceder a checked sólo si es checkbox
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

    // Parse numeric and boolean fields explicitly
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
    const data = await res.json();
    alert("Registro creado: " + JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Dueño</h2>
      <input
        name="duenio.nombre"
        placeholder="Nombre"
        value={formData.duenio.nombre}
        onChange={handleChange}
        required
      />
      <input
        name="duenio.apellidos"
        placeholder="Apellidos"
        value={formData.duenio.apellidos}
        onChange={handleChange}
        required
      />
      <input
        name="duenio.email"
        type="email"
        placeholder="Email"
        value={formData.duenio.email}
        onChange={handleChange}
        required
      />
      <input
        name="duenio.direccion"
        placeholder="Dirección"
        value={formData.duenio.direccion}
        onChange={handleChange}
      />
      <input
        name="duenio.telefono"
        placeholder="Teléfono"
        value={formData.duenio.telefono}
        onChange={handleChange}
      />

      <h2>Mascota</h2>
      <input
        name="mascota.nombre"
        placeholder="Nombre"
        value={formData.mascota.nombre}
        onChange={handleChange}
        required
      />
      <select
        name="mascota.sexo"
        value={formData.mascota.sexo}
        onChange={handleChange}
      >
        <option value="macho">Macho</option>
        <option value="hembra">Hembra</option>
      </select>
      <input
        name="mascota.raza"
        placeholder="Raza"
        value={formData.mascota.raza}
        onChange={handleChange}
      />
      <input
        name="mascota.nacimiento"
        type="date"
        value={formData.mascota.nacimiento}
        onChange={handleChange}
      />
      <input
        name="mascota.color"
        placeholder="Color"
        value={formData.mascota.color}
        onChange={handleChange}
      />
      <input
        name="mascota.senasParticulares"
        placeholder="Señas Particulares"
        value={formData.mascota.senasParticulares}
        onChange={handleChange}
      />
      <input
        name="mascota.tipomascotaId"
        type="number"
        placeholder="Tipo Mascota ID"
        value={formData.mascota.tipomascotaId}
        onChange={handleChange}
      />

      <h2>Historial Clínico</h2>
      <input
        name="historial.vacunas"
        placeholder="Vacunas"
        value={formData.historial.vacunas}
        onChange={handleChange}
      />
      <input
        name="historial.alergias"
        placeholder="Alergias"
        value={formData.historial.alergias}
        onChange={handleChange}
      />
      <input
        name="historial.enfermedades"
        placeholder="Enfermedades"
        value={formData.historial.enfermedades}
        onChange={handleChange}
      />
      <select
        name="historial.tamano"
        value={formData.historial.tamano}
        onChange={handleChange}
      >
        <option value="pequeno">Pequeño</option>
        <option value="mediano">Mediano</option>
        <option value="grande">Grande</option>
      </select>
      <input
        name="historial.pesoActual"
        type="number"
        step="0.1"
        placeholder="Peso Actual"
        value={formData.historial.pesoActual}
        onChange={handleChange}
      />
      <label>
        <input
          name="historial.esterilizacion"
          type="checkbox"
          checked={formData.historial.esterilizacion}
          onChange={handleChange}
        />{" "}
        Esterilización
      </label>
      <input
        name="historial.condicionesPrevias"
        placeholder="Condiciones Previas"
        value={formData.historial.condicionesPrevias}
        onChange={handleChange}
      />
      <input
        name="historial.desparasitacion"
        type="date"
        value={formData.historial.desparasitacion}
        onChange={handleChange}
      />

      <button type="submit">Guardar Registro Completo</button>
    </form>
  );
}
