import { useState } from 'react'
import type { Ticket } from '../../types/ticket'

/*
  Supabase tickets table schema (good default for this app):

  create table tickets (
    id uuid primary key default gen_random_uuid(),
    ticket_number text not null unique,
    title text not null,
    description text,
    priority text not null check (priority in ('critical', 'warning', 'normal')),
    priority_label text not null,
    tags text[] default '{}',
    status text not null default 'open' check (status in ('open', 'in_progress', 'completed')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    completed_at timestamptz
  );

*/

// default critical tickets
const DEFAULT_TICKETS: Ticket[] = [
  {
    id: '1',
    ticketNumber: 'TK-8842',
    title: 'Pump 07 - Hack Island',
    description: 'Temperature exceeding safe thresholds (212°F). High vibration detected in seal housing. Automatic shutdown triggered.',
    priority: 'critical',
    priorityLabel: 'Immediate Attention',
    tags: ['Seal Kit', 'Coolant'],
  },
  {
    id: '2',
    ticketNumber: 'TK-8849',
    title: 'Pump 15 - East Pipeline',
    description: 'Zero flow detected despite active motor signal. Suspected coupling shear. Urgent onsite inspection required.',
    priority: 'critical',
    priorityLabel: 'Critical Failure',
    tags: ['Coupling', 'Alignment Tool'],
  },
]

// default warning tickets
const DEFAULT_WARNING_TICKETS: Ticket[] = [
  {
    id: '3',
    ticketNumber: 'TK-8845',
    title: 'Pump 03 - South Ridge',
    description: 'Intermittent pressure drops during peak load. Recommend sensor calibration and inspection of inlet valves.',
    priority: 'warning',
    priorityLabel: 'High Priority',
    tags: ['Pressure Sensor'],
  },
  {
    id: '4',
    ticketNumber: 'TK-8841',
    title: 'Pump 12 - West Basin',
    description: 'Vibration levels creeping toward limit. Possible bearing wear detected by AI predictive model.',
    priority: 'warning',
    priorityLabel: 'A-Condition',
    tags: [],
  },
]

export default function TicketBannerData() {
  const [tickets, setTickets] = useState<Ticket[]>(DEFAULT_TICKETS)
  const [warningTickets, setWarningTickets] = useState<Ticket[]>(DEFAULT_WARNING_TICKETS)

  const totalOpen = tickets.length + warningTickets.length
  const criticalCount = tickets.length
  const warningCount = warningTickets.length

  const handleMarkComplete = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id))
  }

  const handleMarkWarningComplete = (id: string) => {
    setWarningTickets((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <>
      {/* top stats */}
        <div className="flex items-center justify-center gap-6" data-purpose="top-metrics">
            <div className="p-3 flex-1 border-b-2 border-chevron-blue bg-white shadow-sm">
            <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Total Open</p>
            <p className="text-2xl font-bold text-slate-800">{totalOpen}</p>
            </div>
            <div className="p-3 flex-1 border-b-2 border-chevronRed bg-white shadow-sm">
            <p className="text-[10px] text-chevronRed font-bold uppercase mb-1">Critical</p>
            <p className="text-2xl font-bold text-chevronRed">{criticalCount}</p>
            </div>
            <div className="p-3 border-b-2 flex-1 border-amber-500 bg-white shadow-sm">
            <p className="text-[10px] text-amber-500 font-bold uppercase mb-1">Warning</p>
            <p className="text-2xl font-bold text-amber-500">{warningCount}</p>
            </div>
        </div>

        {/* critical tickets */}
        <section className="flex flex-col gap-4">
            <div className="section-header py-3 flex items-center justify-between border-b-2 border-chevronRed/20">
            <h2 className="text-sm font-black text-chevronRed uppercase tracking-widest flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-chevronRed animate-pulse"></span>
                Critical Tickets
            </h2>
            <span className="text-[10px] font-bold bg-red-100 px-3 py-1 rounded-full text-chevronRed">
                {criticalCount} ACTIONS REQUIRED
            </span>
            </div>
            <div className="space-y-4">
            {tickets.map((ticket) => (
                <div
                key={ticket.id}
                className="ticket-card bg-white border-l-8 border-chevronRed shadow-md border-y border-r border-slate-200 p-6 rounded-r-custom"
                >
                <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-slate-400 tracking-wider">#{ticket.ticketNumber}</span>
                    <span className="bg-red-100 text-chevronRed text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-tighter">
                    {ticket.priorityLabel}
                    </span>
                </div>
                <div className="md:flex md:justify-between md:items-end gap-6">
                    <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{ticket.title}</h3>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed max-w-2xl">{ticket.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                        {ticket.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-semibold uppercase"
                        >
                            {tag}
                        </span>
                        ))}
                    </div>
                    </div>
                    <div className="w-full md:w-48">
                    <button
                        type="button"
                        onClick={() => handleMarkComplete(ticket.id)}
                        className="w-full bg-chevronRed text-white py-3 rounded-custom text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-red-100"
                    >
                        Mark as Complete
                    </button>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </section>

        {/* warning tickets */}
        <section className="flex flex-col gap-4">
            <div className="section-header py-3 flex items-center justify-between border-b-2 border-amber-500/20">
            <h2 className="text-sm font-black text-amber-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                Warning Tickets
            </h2>
            <span className="text-[10px] font-bold bg-amber-50 px-3 py-1 rounded-full text-amber-600">
                {warningCount} PENDING REVIEW
            </span>
            </div>
            <div className="space-y-4">
            {warningTickets.map((ticket) => (
                <div
                key={ticket.id}
                className="ticket-card bg-white border-l-8 border-amber-500 shadow-sm border-y border-r border-slate-200 p-6 rounded-r-custom"
                >
                <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-slate-400 tracking-wider">#{ticket.ticketNumber}</span>
                    <span className="bg-amber-100 text-amber-600 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-tighter">
                    {ticket.priorityLabel}
                    </span>
                </div>
                <div className="md:flex md:justify-between md:items-end gap-6">
                    <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{ticket.title}</h3>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed max-w-2xl">{ticket.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                        {ticket.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-semibold uppercase"
                        >
                            {tag}
                        </span>
                        ))}
                    </div>
                    </div>
                    <div className="w-full md:w-48">
                    <button
                        type="button"
                        onClick={() => handleMarkWarningComplete(ticket.id)}
                        className="w-full bg-slate-800 text-white py-3 rounded-custom text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all"
                    >
                        Mark as Complete
                    </button>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </section>
    </>
  )
}
