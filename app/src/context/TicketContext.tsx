import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { Pump } from '../components/AssetMonitoring'
import type { Ticket, TicketSeverity } from '../types/ticket'
import { DEFAULT_TICKET_LIST } from '../types/ticket'

type TicketContextValue = {
  tickets: Ticket[]
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
  const [tickets, setTickets] = useState<Ticket[]>(() => [...DEFAULT_TICKET_LIST])

  const addTicketIfNotExists = useCallback((pump: Pump) => {
    if (pump.status === 'HEALTHY') return
    setTickets((prev) => {
      const exists = prev.some((t) => t.pump_id === pump.id)
      if (exists) return prev
      const severity = pumpStatusToSeverity(pump.status)
      const ticket: Ticket = {
        id: `ticket-${pump.id}`,
        pump_id: pump.id,
        ticketNumber: nextTicketNumber(),
        title: `${pump.name} - ${pump.status}`,
        description: buildDescription(pump),
        severity_level: severity,
        tags: pump.requiresMaintenance ? ['Maintenance'] : [],
      }
      return [...prev, ticket]
    })
  }, [])

  const removeTicket = useCallback((id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id))
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
      addTicketIfNotExists,
      removeTicket,
      getTicketByPumpId,
      hasTicketForPump,
    }),
    [tickets, addTicketIfNotExists, removeTicket, getTicketByPumpId, hasTicketForPump]
  )

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
}

export function useTickets(): TicketContextValue {
  const ctx = useContext(TicketContext)
  if (!ctx) throw new Error('useTickets must be used within TicketProvider')
  return ctx
}
