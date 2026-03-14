import { useTickets } from '../../context/TicketContext'
import type { Ticket } from '../../types/ticket'

function getPriorityLabel(severity: Ticket['severity_level']): string {
  if (severity === 'critical') return 'Immediate Attention'
  if (severity === 'warning') return 'High Priority'
  return 'Degrading'
}

export default function TicketBannerData() {
  const { tickets, loading, error, removeTicket } = useTickets()

  const criticalTickets = tickets.filter((t) => t.severity_level === 'critical')
  const warningTickets = tickets.filter(
    (t) => t.severity_level === 'warning' || t.severity_level === 'degrading'
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <span className="w-6 h-6 rounded-full border-2 border-chevronRed border-t-transparent animate-spin" />
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Loading Tickets</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-sm text-chevronRed font-semibold">Failed to load tickets: {error}</p>
      </div>
    )
  }

  return (
    <>
      {/* top stats */}
      <div className="flex items-center justify-center gap-6" data-purpose="top-metrics">
        <div className="p-3 flex-1 border-b-2 border-chevron-blue bg-white shadow-sm">
          <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Total Open</p>
          <p className="text-2xl font-bold text-slate-800">{tickets.length}</p>
        </div>
        <div className="p-3 flex-1 border-b-2 border-chevronRed bg-white shadow-sm">
          <p className="text-[10px] text-chevronRed font-bold uppercase mb-1">Critical</p>
          <p className="text-2xl font-bold text-chevronRed">{criticalTickets.length}</p>
        </div>
        <div className="p-3 border-b-2 flex-1 border-amber-500 bg-white shadow-sm">
          <p className="text-[10px] text-amber-500 font-bold uppercase mb-1">Warning</p>
          <p className="text-2xl font-bold text-amber-500">{warningTickets.length}</p>
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
            {criticalTickets.length} ACTIONS REQUIRED
          </span>
        </div>
        <div className="space-y-4">
          {criticalTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              variant="critical"
              onMarkComplete={() => removeTicket(ticket.id)}
            />
          ))}
          {criticalTickets.length === 0 && (
            <p className="text-sm text-slate-500 italic py-4">No critical tickets open.</p>
          )}
        </div>
      </section>

      {/* warning / degrading tickets */}
      <section className="flex flex-col gap-4">
        <div className="section-header py-3 flex items-center justify-between border-b-2 border-amber-500/20">
          <h2 className="text-sm font-black text-amber-600 uppercase tracking-widest flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            Warning Tickets
          </h2>
          <span className="text-[10px] font-bold bg-amber-50 px-3 py-1 rounded-full text-amber-600">
            {warningTickets.length} PENDING REVIEW
          </span>
        </div>
        <div className="space-y-4">
          {warningTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              variant="warning"
              onMarkComplete={() => removeTicket(ticket.id)}
            />
          ))}
          {warningTickets.length === 0 && (
            <p className="text-sm text-slate-500 italic py-4">No warning tickets open.</p>
          )}
        </div>
      </section>
    </>
  )
}

function TicketCard({
  ticket,
  variant,
  onMarkComplete,
}: {
  ticket: Ticket
  variant: 'critical' | 'warning'
  onMarkComplete: () => void
}) {
  const isCritical = variant === 'critical'
  const borderClass = isCritical ? 'border-l-8 border-chevronRed' : 'border-l-8 border-amber-500'
  const buttonClass = isCritical
    ? 'w-full bg-chevronRed text-white py-3 rounded-custom text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-red-100'
    : 'w-full bg-slate-800 text-white py-3 rounded-custom text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all'

  return (
    <div className={`ticket-card bg-white ${borderClass} shadow-md border-y border-r border-slate-200 p-6 rounded-r-custom`}>
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-bold text-slate-400 tracking-wider">#{ticket.ticketNumber}</span>
        <span className={isCritical
          ? 'bg-red-100 text-chevronRed text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-tighter'
          : 'bg-amber-100 text-amber-600 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-tighter'
        }>
          {getPriorityLabel(ticket.severity_level)}
        </span>
      </div>
      <div className="md:flex md:justify-between md:items-end gap-6">
        <div className="flex-1">
          <h3 className="font-bold text-slate-900 text-lg mb-2">{ticket.title}</h3>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed max-w-2xl">{ticket.description}</p>
          {ticket.tags && ticket.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
              {ticket.tags.map((tag) => (
                <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-semibold uppercase">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="w-full md:w-48">
          <button type="button" onClick={onMarkComplete} className={buttonClass}>
            Mark as Done
          </button>
        </div>
      </div>
    </div>
  )
}