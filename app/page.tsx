// Añadir "use client" al principio del archivo
'use client'

import Navbar from './components/Navbar'
import { ReactNode, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  const [date, setDate] = useState<Date | Date[] | null>(new Date()) // Este estado puede ser una fecha, un rango o null

  // Función para manejar el cambio de fecha
  const handleDateChange = (value: Date | Date[] | null) => {
    setDate(value)
  }

  return (
    <>
      <Navbar />
      <main className="p-4">
        <section className="bg-gray-100 rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Citas próximas</h2>
          <div className="max-w-md bg-white rounded-xl shadow p-4 mb-6">
            <p><span className="font-medium">Nombre del paciente:</span> Coco</p>
            <p><span className="font-medium">Fecha:</span> 15/04/2025</p>
            <p><span className="font-medium">Hora:</span> 10:30 AM</p>
            <p><span className="font-medium">Motivo:</span> Vacunación anual</p>
          </div>
        </section>
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Calendario */}
          <div className="bg-white rounded-xl shadow p-4">
            <Calendar
              onChange={handleDateChange} // Llamamos a la función para manejar el cambio
              value={date} // Pasamos la fecha actual
            />
          </div>

          {/* Botón */}
          <div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow"
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
        </div>


        {children}
      </main>
    </>
  )
}
