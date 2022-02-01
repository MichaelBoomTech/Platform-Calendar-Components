import moment from "moment";
import {encodeId} from './commons'

export function getShowRegistrationButtonStatus(event, registration) {
  if(moment(event.start).isBefore(moment())) return false
  return registration.open
}

export function generateRegistrationURL(cid, event, registration, urlBase) {
  if(registration.external) return registration.url
  return `${urlBase}${encodeId(String(event.id))}?cid=${cid}${event?.repeat?.type ? '&startDate='+event.st.split('T')[0] : ''}`
}

export function getGuestsOptions(event, registration, tickets) {
  if(!registration.open || registration.external) return null
  if(tickets?.open && event.guests?.length && event.guests?.tickets?.length) return calcGuestsOptionsByTickets(event, tickets)
  return {
    count: event?.guests?.length ?? 0,
    limit: registration.guestsLimit
  }
}

export function calcGuestsOptionsByTickets(event, tickets) {
  if(!tickets.showLimit) return null
  let result = {
    count: event.guests.length,
    limit: tickets.list.length
  }
  for(let guest of event.guests) {
    guest.tickets.forEach(guestTicket => {
      if(
        !guest.date || 
        (event?.repeat?.type && moment(guest.date).format('DD-MM-YYYY') === moment(event.start).format('DD-MM-YYYY'))
      ) {
        result.count += guestTicket.quantity
      }
    })
  }
  return result
}