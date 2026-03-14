import { supabase } from '../lib/supabase'
import type { Ticket } from '../types/ticket'
// import emailjs from '@emailjs/browser'

// EmailJS config — store these in your .env
// const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
// const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
// const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
// const STATIC_RECIPIENT = import.meta.env.VITE_ALERT_EMAIL // e.g. ops-team@company.com


// async function sendDuplicateTicketAlert(ticket: Ticket): Promise<void> {
//     console.log('EmailJS config:', {
//     serviceId: EMAILJS_SERVICE_ID,
//     templateId: EMAILJS_TEMPLATE_ID,
//     publicKey: EMAILJS_PUBLIC_KEY,
//     recipient: STATIC_RECIPIENT,
//   })
//   await emailjs.send(
//     EMAILJS_SERVICE_ID,
//     EMAILJS_TEMPLATE_ID,
//     {
//       to_email: STATIC_RECIPIENT,
//       ticket_number: ticket.ticketNumber,
//       ticket_title: ticket.title,
//       ticket_description: ticket.description,
//       severity_level: ticket.severity_level,
//       pump_id: ticket.pump_id,
//     },
//     EMAILJS_PUBLIC_KEY
//   )
// }


export async function getOpenTickets(): Promise<Ticket[]> {
  const { data, error } = await supabase
    .from('tickets')
    .select('id, pump_id, description, severity_level, "ticketNumber", title, tags')
    // .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as Ticket[]
}

export async function getCriticalTickets(): Promise<Ticket[]> {
  const { data, error } = await supabase
    .from('tickets')
    .select('id, pump_id, description, severity_level, "ticketNumber", title, tags')
    .eq('severity_level', 'critical')
    // .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as Ticket[]
}

const TICKET_SELECT = 'id, pump_id, description, severity_level, "ticketNumber", title, tags'


export async function createTicket(ticket: Ticket): Promise<Ticket> {
  const { data: existing } = await supabase
    .from('tickets')
    .select(TICKET_SELECT)
    .eq('pump_id', ticket.pump_id)
    .maybeSingle()

  console.log('Checking for existing ticket with pump_id:', ticket.pump_id, 'Found:', existing)
  if (existing) {
    // if (existing.severity_level === 'critical') {
    //   // try {
    //   //   // await sendDuplicateTicketAlert(existing as Ticket)
    //   // } catch (err: any) {
    //   //   console.error('Failed to send alert email:', err?.text ?? err?.status ?? err)
    //   // }
    // }
    return existing as Ticket
  }

  const { data, error } = await supabase
    .from('tickets')
    .insert([ticket])
    .select(TICKET_SELECT)
    .single()

  if (error) throw error
  return data as Ticket
}

export async function deleteTicket(id: string): Promise<void> {
  const { error } = await supabase
    .from('tickets')
    .delete()
    .eq('id', id)

  if (error) throw error
}