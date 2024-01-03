import { TicketsService } from '../services/tickets.service.js'

export class TicketController {
  static getTickets = async ( req, res ) => {
    try {
      const result = await TicketsService.getAllTickets()
      res.json( { status: 'success', data: result } )
    } catch ( error ) {
      // console.log('TICKETS CONTROLLER getTickets:', error)
      res.status( 500 ).json( { error: error.message } )
    }
  }

  // Obtener Tickets por ID
  static getTicket = async ( req, res ) => {
    try {
      const { ticketId } = req.params
      const ticket = await TicketsService.getOneTicket( ticketId )
      res.json( { status: 'success', data: ticket } )
    } catch ( error ) {
      // console.log('TICKETS CONTROLLER getTicket:', error)
      res.status( 500 ).json( { error: error.message } )
    }
  }

  // Crear Ticket
  static createTicket = async ( req, res ) => {
    try {
      const ticketInfo = req.body
      const result = await TicketsService.createTicket( ticketInfo )
      res.json( { status: 'success', data: result } )
    } catch ( error ) {
      // console.log('TICKETS CONTROLLER createTicket:', error)
      res.status( 500 ).json( { error: error.message } )
    };
  }
};
