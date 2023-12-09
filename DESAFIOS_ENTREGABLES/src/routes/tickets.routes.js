import { Router } from 'express'
import { TicketController } from '../controllers/tickets.controller.js'

const router = Router()

router.get('/', TicketController.getTickets)
router.get('/:ticketId', TicketController.getTicket)
router.post('/', TicketController.createTicket)

export { router as ticketsRouter }
