import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { getDay, parseISO } from 'date-fns';

// Inicializa o cliente do Google Calendar com as credenciais
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({ version: 'v3', auth });
const calendarId = process.env.GOOGLE_CALENDAR_ID;

// Função para buscar horários já agendados em um dia
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (!date) {
    return NextResponse.json({ error: 'Data não fornecida.' }, { status: 400 });
  }

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
    const { startDateTime, endDateTime, patientName, patientEmail } = await request.json();

    if (!startDateTime || !endDateTime || !patientName || !patientEmail) {
      return NextResponse.json({ error: 'Dados incompletos para o agendamento.' }, { status: 400 });
    }
    
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
      description: `Agendamento de consulta para ${patientName}. Contato: ${patientEmail}`,
      start: {
        dateTime: startDateTime,
        timeZone: 'America/Sao_Paulo',
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'America/Sao_Paulo',
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