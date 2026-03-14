import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { Pump } from '../components/AssetMonitoring'
import type { Ticket, TicketSeverity } from '../types/ticket'
import { createTicket, deleteTicket, getOpenTickets } from '../service/ticket.ts'

type TicketContextValue = {
  tickets: Ticket[]
  loading: boolean
  error: string | null
  addTicketIfNotExists: (pump: Pump) => void
  removeTicket: (id: string) => void
  getTicketByPumpId: (pumpId: string) => Ticket | undefined
  hasTicketForPump: (pumpId: string) => boolean
}

const TicketContext = createContext<TicketContextValue | null>(null)

let ticketCounter = 1000
function nextTicketNumber(): string {
  ticketCounter += 1
  return `TK-${ticketCounter}`
}

function pumpStatusToSeverity(status: Pump['status']): TicketSeverity {
  if (status === 'CRITICAL') return 'critical'
  if (status === 'WARNING') return 'warning'
  return 'degrading'
}

function buildDescription(pump: Pump): string {
  const parts: string[] = []
  if (pump.temperature != null && pump.temperature >= 75) {
    parts.push(`Temperature ${Number(pump.temperature).toFixed(2)}°F exceeds safe threshold.`)
  }
  if (pump.requiresMaintenance) {
    parts.push('Maintenance required.')
  }
  if (pump.status === 'CRITICAL') {
    parts.push('Critical condition detected.')
  } else if (pump.status === 'WARNING') {
    parts.push('Elevated metrics; inspect soon.')
  }
  return parts.length > 0 ? parts.join(' ') : `${pump.name} - ${pump.status}`
}

export function TicketProvider({ children }: { children: React.ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch tickets from Supabase on mount — no DEFAULT_TICKET_LIST
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    getOpenTickets()
      .then((data) => {
        if (!cancelled) setTickets(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message ?? 'Failed to load tickets')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const addTicketIfNotExists = useCallback(
    async (pump: Pump) => {
      if (pump.status === 'HEALTHY') return

      // Guard against duplicates using current local state
      const exists = tickets.some((t) => t.pump_id === pump.id)
      if (exists) return

      const severity = pumpStatusToSeverity(pump.status)
      const newTicket: Ticket = {
        id: `ticket-${pump.id}`,
        pump_id: pump.id,
        ticketNumber: nextTicketNumber(),
        title: `${pump.name} - ${pump.status}`,
        description: buildDescription(pump),
        severity_level: severity,
        tags: pump.requiresMaintenance ? ['Maintenance'] : [],
      }

      try {
        const saved = await createTicket(newTicket)
        setTickets((prev) => [...prev, saved])
      } catch (err: any) {
        console.error('Failed to create ticket:', err?.message)
      }
    },
    [tickets]
  )

  const removeTicket = useCallback(async (id: string) => {
    try {
      await deleteTicket(id)
      setTickets((prev) => prev.filter((t) => t.id !== id))
    } catch (err: any) {
      console.error('Failed to delete ticket:', err?.message)
    }
  }, [])

  const getTicketByPumpId = useCallback(
    (pumpId: string) => tickets.find((t) => t.pump_id === pumpId),
    [tickets]
  )

  const hasTicketForPump = useCallback(
    (pumpId: string) => tickets.some((t) => t.pump_id === pumpId),
    [tickets]
  )

  const value = useMemo<TicketContextValue>(
    () => ({
      tickets,
      loading,
      error,
      addTicketIfNotExists,
      removeTicket,
      getTicketByPumpId,
      hasTicketForPump,
    }),
    [tickets, loading, error, addTicketIfNotExists, removeTicket, getTicketByPumpId, hasTicketForPump]
  )

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
}

export function useTickets(): TicketContextValue {
  const ctx = useContext(TicketContext)
  if (!ctx) throw new Error('useTickets must be used within TicketProvider')
  return ctx
}