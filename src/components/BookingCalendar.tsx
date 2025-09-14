'use client';

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, addHours, setHours, setMinutes, setSeconds, getDay } from 'date-fns';
import { satoshi } from './HeroSection';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// Função para gerar os horários de atendimento
const generateTimeSlots = (dayOfWeek: number): string[] => {
  const slots = [];
  let startHour, endHour;

  // 1-5 = Segunda a Sexta
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    startHour = 9;
    endHour = 20; // último horário começa às 20h para terminar às 21h
  } 
  // 6 = Sábado
  else if (dayOfWeek === 6) {
    startHour = 9;
    endHour = 19; // último horário começa às 19h para terminar às 20h
  } 
  // Domingo (ou outros dias sem atendimento)
  else {
    return [];
  }

  for (let hour = startHour; hour <= endHour; hour++) {
    slots.push(`${String(hour).padStart(2, '0')}:00`);
  }

  return slots;
};

const maxDate = new Date();
maxDate.setMonth(maxDate.getMonth() + 3);

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // O availableTimes agora é um estado para ser dinâmico
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({ name: '', email: '' });

  

  // Efeito para atualizar os horários disponíveis quando a data muda
  useEffect(() => {
    if (selectedDate && !Array.isArray(selectedDate)) {
      const dayOfWeek = getDay(selectedDate); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
      const newTimes = generateTimeSlots(dayOfWeek);
      setAvailableTimes(newTimes);
    }
  }, [selectedDate]);


  // Busca os horários agendados sempre que a data selecionada muda
  useEffect(() => {
    if (selectedDate && !Array.isArray(selectedDate)) {
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      setIsLoading(true);
      setError(null);
      
      fetch(`../api/agendamento?date=${dateString}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Error al buscar horarios.');
          }
          return res.json();
        })
        .then(data => {
          setBookedTimes(data.bookedTimes || []);
        })
        .catch(err => {
          setError(err.message);
          setBookedTimes([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedDate]);


  const handleDateChange = (date: Value) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reseta a hora ao mudar o dia
  };

  const handleTimeSelect = (time: string) => {
    if (bookedTimes.includes(time)) {
      alert('Este horario no está disponible. Por favor, elija otro.');
      return;
    }
    setSelectedTime(time);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || Array.isArray(selectedDate) || !selectedTime || !formData.name || !formData.email) {
      alert('Por favor, complete todos los campos y seleccione una fecha y hora.');
      return;
    }

    const [hour, minute] = selectedTime.split(':').map(Number);
    const startDateTime = setSeconds(setMinutes(setHours(selectedDate, hour), minute), 0);
    const endDateTime = addHours(startDateTime, 1);

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/agendamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDateTime: startDateTime.toISOString(),
          endDateTime: endDateTime.toISOString(),
          patientName: formData.name,
          patientEmail: formData.email,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Ocurrió un error al programar la cita.');

      alert('¡Cita programada con éxito!');
      setBookedTimes(prev => [...prev, selectedTime]);
      setSelectedTime(null);
      setFormData({ name: '', email: '' });

    } catch (err: any) {
      setError(err.message);
      alert(`Erro: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex min-h-fit flex-col items-center bg-lightpurple my-12 mb-44 ${satoshi.className}`}>       
        {error && <p className={`${error == "" ? "hidden" : ""} text-red-500 text-center mb-4`}>{error}</p>}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Coluna do Calendário e Horários */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">1. Elige la fecha y la hora</h2>
            <div className="flex justify-center">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={new Date()}
                tileDisabled={({ date, view }) =>
                  view === 'month' && date.getDay() === 0 // Desabilita apenas Domingo
                }
                className="rounded-md border-gray-200 border-2 text-darkgreen"
                maxDate={maxDate}
                locale='es-PE'               
                

              />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-600 mb-3">Horarios disponibles:</h3>
              {isLoading ? (<p>Carregando horários...</p>) : 
              availableTimes.length > 0 ? (
                <div className="grid grid-cols-4 gap-2">
                  {availableTimes.map(time => {
                    const isBooked = bookedTimes.includes(time);
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        disabled={isBooked}
                        className={`p-2 rounded-2xl text-sm font-medium transition-colors border-lightgreen border-2
                          ${isBooked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''}
                          ${isSelected ? 'bg-lightgreen text-whitemid' : ''}
                          ${!isBooked && !isSelected ? 'bg-whitemid text-blackwrite hover:bg-lightgreen hover:text-whitemid' : ''}
                        `}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">No hay horarios disponibles para este día.</p>
              )}
            </div>
          </div>

          {/* Coluna do Formulário de Agendamento */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">2. Completa tus datos</h2>
            {selectedTime ? (
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700">Nombre Completo*</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lightgreen focus:border-lightgreen text-blackwrite" placeholder='Ingresa tu nombre completo'/>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-blackwrite">Correo electrónico*</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none ocus:ring-lightgreen focus:border-lightgreen text-blackwrite" placeholder='Ingresa tu correo electrónico de contacto'/>
                </div>
                <div className="text-center pt-4">
                  <button type="submit" disabled={isLoading} className="w-full bg-darkpurple text-white font-bold py-3 px-4 rounded-3xl hover:cursor-pointer transition-colors disabled:bg-gray-400">
                    {isLoading ? 'Agendando...' : 'Confirmar Cita'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                <p className="text-gray-500">Seleccione una fecha y hora para continuar.</p>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}