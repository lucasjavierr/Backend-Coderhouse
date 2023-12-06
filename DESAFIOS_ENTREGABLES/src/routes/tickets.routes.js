import { Router } from 'express'
import { TicketController } from '../controllers/tickets.controller.js'

export const TicketsRouter = Router()

TicketsRouter.get('/', TicketController.getTickets)
TicketsRouter.get('/:ticketId', TicketController.getTicket)
TicketsRouter.post('/', TicketController.createTicket)
