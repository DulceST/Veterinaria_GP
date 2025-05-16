import React, { useEffect, useState } from "react";

type TipoMascota = {
  idTipo: number;
  Tipo: string;
  foto?: string;
};

async function getTiposMascotas(): Promise<TipoMascota[]> {
  const res = await fetch("/api/tipos");
  const data = await res.json();
  return data;
}

type SelectTipoMascotaProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectTipoMascota: React.FC<SelectTipoMascotaProps> = ({ value, onChange }) => {
  const [tiposMascota, setTiposMascota] = useState<TipoMascota[]>([]);

  useEffect(() => {
    const fetchTiposMascotas = async () => {
      const data = await getTiposMascotas();
      setTiposMascota(data);
    };
    fetchTiposMascotas();
  }, []);

  return (
    <div className="w-full max-w-xs">
      <label htmlFor="tipomascotaId" className="block text-sm  text-gray-700 mb-2">
        Categoría de Mascota
      </label>
      <div className="relative">
        <select
          id="tipomascotaId"
          name="tipomascotaId"
          value={value}
          onChange={onChange}
          className="
            block
            w-full
            appearance-none
            rounded-md
            border
            border-gray-300
            bg-white
            py-2
            pl-3
            pr-10
            text-base
            focus:border-indigo-500
            focus:outline-none
            focus:ring-1
            focus:ring-indigo-500
            sm:text-sm
            shadow-sm
            transition
            duration-200
            ease-in-out
          "
        >
          <option value="">Selecciona una categoría</option>
          {tiposMascota.map((tipo) => (
            <option key={tipo.idTipo} value={tipo.idTipo.toString()}>
              {tipo.Tipo}
            </option>
          ))}
        </select>
        {/* Ícono de flecha */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 14a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L10 11.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 14z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
