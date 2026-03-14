/** Severity for a ticket. Degrading = early warning, warning = attention needed, critical = immediate. */
export type TicketSeverity = 'critical' | 'warning' | 'degrading'

export type Ticket = {
  id: string
  pump_id: string
  description: string
  severity_level: TicketSeverity
  /** For display in list (e.g. TK-8842). Can be derived from id. */
  ticketNumber: string
  /** For display (e.g. "Pump 03 - Critical"). */
  title: string
  /** Optional tags for filters. */
  tags?: string[]
}

/** Default seed tickets (no pump_id or placeholder). Shown until replaced by pump-driven tickets. */
export const DEFAULT_TICKET_LIST: Ticket[] = [
  {
    id: 'default-5',
    pump_id: 'demo-033',
    ticketNumber: 'TK-8842',
    title: 'Pump 03 - Critical',
    description: 'Temperature exceeding safe thresholds. High vibration detected in seal housing. Automatic shutdown triggered.',
    severity_level: 'critical',
    tags: ['Seal Kit', 'Coolant'],
  },
  {
    id: 'default-2',
    pump_id: 'demo-02',
    ticketNumber: 'TK-8845',
    title: 'Pump 02 - Warning',
    description: 'Intermittent pressure drops during peak load. Recommend sensor calibration and inspection of inlet valves.',
    severity_level: 'warning',
    tags: ['Pressure Sensor'],
  },
]
