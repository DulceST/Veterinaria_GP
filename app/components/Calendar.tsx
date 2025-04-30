'use client'

import { useState } from 'react'
import Calendar, { CalendarProps } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

type Value = Date | [Date, Date] | null

export default function CalendarClient() {
  const [date, setDate] = useState<Value>(new Date())

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    setDate(value)
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-10">
      <div className="bg-white rounded-2xl shadow-lg p-6 col-span-2">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Selecciona una fecha para agendar</h3>
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="mx-auto"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-center items-center h-full">
        <button
          className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white text-lg font-semibold py-3 px-6 rounded-xl shadow-md w-full"
          onClick={() => {
            if (date instanceof Date) {
              alert(`Agendando cita para: ${date.toLocaleDateString()}`)
            } else if (Array.isArray(date) && date[0] instanceof Date) {
              alert(`Rango de fechas: ${date[0].toLocaleDateString()} - ${date[1]?.toLocaleDateString()}`)
            } else {
              alert("Selecciona una fecha válida.")
            }
          }}
        >
          Agendar cita
        </button>
      </div>
    </section>
  )
}
