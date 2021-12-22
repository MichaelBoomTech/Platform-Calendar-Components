import moment from "moment";
import {encodeId} from './commons'

const findAddon = (addons, addonName) =>
  addons?.find(({ name }) => addonName === name)

export const getRegistrationProperties = ({
  addons,
  eventRegistration,
  eventKind,
  planGuestLimit
}) => {
  const registration_addon = findAddon(addons, 'registration')

  if (!registration_addon && eventKind !== 4) return null

  let registration_properties = {}

  if (eventKind === 4) {
    if (eventRegistration) {
      registration_properties = eventRegistration
    }
  } else {
    const registration = eventRegistration?.value || registration_addon?.value?.registration

    if (registration?.general?.limit === 0) {
      registration.general.limit = planGuestLimit || 500
    }

    const { texts, general, open } = registration
    const { page_url, limit, limit_type, show_guest } = general
    registration_properties.registration_enabled = open
    registration_properties.page_url = page_url
    registration_properties.rsvp = texts.rsvp
    registration_properties.guest_limit = limit
    registration_properties.guest_limit_type = limit_type
    registration_properties.show_guest_limit = show_guest
  }

  return registration_properties
}

export const getGuestLimitProperties = (props) => {
  const {
    eventKind,
    eventPageUrl,
    planGuestLimit = 0,
    eventEndDate,
    addons,
    eventTicket,
    repeat,
    guests,
    eventStartDate,
    comp_id = '',
    instance = '',
    eventId = '',
    registrationPageUrl = '',
    text
  } = props
  const button_properties = {}

  const registration = getRegistrationProperties(props)

  if(!registration) return {}

  if (eventKind === 4) {
    if (registration) {
      const { status, external } = registration
      if (!status) {
        // In case of registration url as an external link from EventBrite or Wix
        if (typeof registration === 'string') {
          button_properties.showButton = true
          button_properties.buttonText = text
          button_properties.page_url = registration
        }
      } else {
        if (
          ['NA_REGISTRATION_STATUS', 'CLOSED', 'CLOSED_MANUALLY'].includes(status)
        ) {
          button_properties.showButton = false
        } else {
          button_properties.showButton = true
          button_properties.buttonText = text
          button_properties.page_url =
            status === 'OPEN_EXTERNAL'
              ? external.registration
              : eventPageUrl + '/form'
        }
      }
    }
  } else {
    const {
      registration_enabled,
      page_url,
      rsvp
    } = registration

    if (registration_enabled) {
      button_properties.showButton = true
      button_properties.buttonText = rsvp
      if (page_url) {
        button_properties.page_url = page_url
      } else {
        button_properties.page_url = `${registrationPageUrl}${encodeId(String(eventId))}?comp_id=${comp_id}&instance=${instance}&startDate=${repeat.type ? eventStartDate.split('T')[0] : ""}`;
      }
    }
  }
  const format = eventEndDate.includes('T') ? 'YYYY-MM-DD[T]HH:mm:ss' : 'YYYY-MM-DD';
  if ( moment(eventEndDate.replace('T', ' ')).isBefore(moment(moment().format(format))) ) {
    button_properties.showButton = false
  }

  const ticket_addon = findAddon(addons, 'ticket')
  const { value: ticket } = eventTicket || ticket_addon || {}
  const guest_limit_properties = {
    guest_limit: 0,
    show_guest_limit: true
  }

  if (ticket_addon && ticket.general.open) {
    ticket?.fields?.forEach(({ limitNumber, limit }) => {
      if (limit) {
        guest_limit_properties.showGuestLimit = false
      }
      if (typeof guest_limit_properties.guest_limit === 'string') return
      guest_limit_properties.guest_limit = limit
        ? 'unlimited'
        : guest_limit_properties.guest_limit + limitNumber
    })
  } else {
    guest_limit_properties.show_guest_limit =
      button_properties.showButton &&
      registration.registration_enabled &&
      registration.guest_limit_type !== 'unlimited' &&
      registration.show_guest_limit &&
      eventKind !== 4

    guest_limit_properties.guest_limit = registration
      ? planGuestLimit !== 0
        ? Math.min(+registration.guest_limit, planGuestLimit)
        : +registration.guest_limit
      : null
  }

  return {
    ...button_properties,
    ...guest_limit_properties,
    guestsCount: getGuestsCount(
      addons,
      eventTicket,
      repeat,
      guests,
      eventStartDate
    )
  }
}

const getGuestsCount = (addons, eventTicket, repeat, guests = [], startDate) => {
  const ticket_addon = findAddon(addons, 'ticket')
  const ticketAddonEnabled = ticket_addon && ticket_addon.value.general.open
  const { type: repeatType } = repeat
  let allGuests = []

  if (typeof guests === 'number' || !repeat || !repeatType) {
    allGuests = guests
  } else {
    guests && guests.forEach((g) => {
      const { date } = g
      if (
        date &&
        moment(date).format('DD-MM-YYYY') ===
          moment(startDate).format('DD-MM-YYYY')
      ) {
        allGuests.push(g)
      }
    })
  }

  let soldTicketsCount = 0
  if (
    (ticket_addon && !eventTicket && ticketAddonEnabled) ||
    (eventTicket && eventTicket.value.general.open)
  ) {
    guests && guests.forEach(({ value, date }, i) => {
      const { ticket = [] } = value
      if (
        (ticket &&
          ticket.length &&
          date &&
          moment(date).format('DD-MM-YYYY') ===
            moment(startDate).format('DD-MM-YYYY')) ||
        !date
      ){
        ticket.forEach(({ quantity }, i) => {soldTicketsCount += +quantity})
      }
    })
  } else {
    soldTicketsCount = allGuests.length
  }

  return soldTicketsCount
}
