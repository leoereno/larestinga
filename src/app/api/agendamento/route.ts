import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Inicializa o cliente do Google Calendar com as credenciais
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({ version: 'v3', auth });
// const calendarId = process.env.GOOGLE_CALENDAR_ID;

const profesionalsCalendarIds = [
  {
    name: 'alondra',
    id: process.env.GOOGLE_CALENDAR_ID_ALONDRA
  },
  {
    name: 'edward',
    id: process.env.GOOGLE_CALENDAR_ID_EDWARD
  },
  {
    name: 'esteban',
    id: process.env.GOOGLE_CALENDAR_ID_ESTEBAN
  },
  {
    name: 'hanice',
    id: process.env.GOOGLE_CALENDAR_ID_HANICE
  },
  {
    name: 'karla',
    id: process.env.GOOGLE_CALENDAR_ID_KARLA
  },
  {
    name: 'mayra',
    id: process.env.GOOGLE_CALENDAR_ID_MAYRA
  },
  {
    name: 'tatiana',
    id: process.env.GOOGLE_CALENDAR_ID_TATIANA
  }
]


// Função para buscar horários já agendados em um dia
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const prof = searchParams.get('prof');
  

  if (!date) {
    return NextResponse.json({ error: 'Data não fornecida.' }, { status: 400 });
  }

  if (!prof){
    return NextResponse.json({error: 'Profesional não selecionado.'}, {status: 400})
  }

  const profesionalCalendar = profesionalsCalendarIds.find(x => x.name === prof);

  if (!profesionalCalendar){
    return NextResponse.json({error: 'Profesional não encontrado.'}, {status: 400})
  }

  const calendarId = profesionalCalendar.id;

  try {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const response = await calendar.events.list({
      calendarId,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const bookedTimes = response.data.items?.map(event => {
      if (event.start?.dateTime) {
        // Retorna a hora no formato HH:mm
        return event.start.dateTime.substring(11, 16);
      }
      return null;
    }).filter(Boolean);
    console.log(bookedTimes);
    return NextResponse.json({ bookedTimes });
  } catch (error) {
    console.error('Erro ao buscar eventos do Google Calendar:', error);
    return NextResponse.json({ error: 'Erro ao buscar agendamentos.' }, { status: 500 });
  }
}


// Função para criar um novo agendamento
export async function POST(request: Request) {
  try {
    const { startDateTime, endDateTime, patientName, patientEmail, profesional } = await request.json();



    if (!startDateTime || !endDateTime || !patientName || !patientEmail || !profesional) {
      return NextResponse.json({ error: 'Dados incompletos para o agendamento.' }, { status: 400 });
    }
    
    const profesionalCalendar = profesionalsCalendarIds.find(x => x.name === String(profesional).toLocaleLowerCase());

    if (!profesionalCalendar){
      return NextResponse.json({error: 'Profesional não encontrado.'}, {status: 400})
    }

    const calendarId = profesionalCalendar.id;

    // Opcional: Verificar novamente se o horário está vago antes de inserir
    const checkResponse = await calendar.events.list({
      calendarId,
      timeMin: startDateTime,
      timeMax: endDateTime,
      maxResults: 1,
    });

    if (checkResponse.data.items && checkResponse.data.items.length > 0) {
      return NextResponse.json({ error: 'Este horário acabou de ser preenchido. Por favor, escolha outro.' }, { status: 409 });
    }

    const event = {
      summary: `Consulta: ${patientName}`,
      description: `Cita programada para ${patientName}. Contacto: ${patientEmail}`,
      start: {
        dateTime: startDateTime,
        timeZone: 'America/Lima',
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'America/Lima',
      },
      //attendees: [{ email: patientEmail }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    const createdEvent = await calendar.events.insert({
      calendarId,
      requestBody: event,
      //sendNotifications: true // Envia convite por e-mail para o paciente
    });

    return NextResponse.json({ message: 'Agendamento criado com sucesso!', event: createdEvent.data });

  } catch (error) {
    console.error('Erro ao criar evento no Google Calendar:', error);
    return NextResponse.json({ error: 'Erro ao criar agendamento.' }, { status: 500 });
  }
}