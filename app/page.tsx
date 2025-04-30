'use client'

import Navbar from './components/Navbar'
import { ReactNode, useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Image from 'next/image'

type Props = {
  children: ReactNode
}

async function getTiposMascotas() {
  const res = await fetch('/api/tipos')
  const data = await res.json()
  return data
}

const CarruselTiposMascotas = () => {
  const [tiposMascotas, setTiposMascotas] = useState<any[]>([])

  useEffect(() => {
    const fetchTiposMascotas = async () => {
      const data = await getTiposMascotas()
      setTiposMascotas(data)
    }
    fetchTiposMascotas()
  }, [])

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Tipos de Mascotas</h2>
      <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2">
        {tiposMascotas.map((tipo) => (
          <div
            key={tipo.idTipo}
            className="flex flex-col items-center flex-shrink-0 w-40 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow snap-center cursor-pointer"
          >
            <img
              src={tipo.foto}
              alt={tipo.Tipo}
              className="w-32 h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-md font-semibold text-gray-700">{tipo.Tipo}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Layout({ children }: Props) {
  const [date, setDate] = useState<Date | Date[] | null>(new Date())

  const handleDateChange = (value: Date | Date[] | null) => {
    setDate(value)
  }

  return (
    <>
      <Navbar />
      <main className="p-6 bg-gray-50 min-h-screen">
        {/* Citas próximas */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Citas próximas</h2>
          <div className="max-w-md bg-gray-50 rounded-lg shadow-sm p-4">
            <p><span className="font-medium">🐶 Nombre del paciente:</span> Coco</p>
            <p><span className="font-medium">📅 Fecha:</span> 15/04/2025</p>
            <p><span className="font-medium">⏰ Hora:</span> 10:30 AM</p>
            <p><span className="font-medium">💉 Motivo:</span> Vacunación anual</p>
          </div>
        </section>

        {/* Carrusel de tipos de mascotas */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <CarruselTiposMascotas />
        </section>

        {/* Calendario y botón */}
        <section className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Calendario */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <Calendar
              onChange={handleDateChange}
              value={date}
            />
          </div>

          {/* Botón */}
          <div className="mt-4 lg:mt-0">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition-colors"
              onClick={() => {
                if (date instanceof Date) {
                  alert(`Agendando cita para: ${date.toLocaleDateString()}`)
                } else {
                  alert("Selecciona una fecha válida.")
                }
              }}
            >
              Agendar cita
            </button>
          </div>
        </section>

        {children}
      </main>
    </>
  )
}
