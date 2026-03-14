export type TicketPriority = 'critical' | 'warning' | 'normal'

export type Ticket = {
  id: string
  ticketNumber: string
  title: string
  description: string
  priority: TicketPriority
  priorityLabel: string
  tags: string[]
}
