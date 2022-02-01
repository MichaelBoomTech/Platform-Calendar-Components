import React from 'react'
import PropTypes from 'prop-types'
import styles from './main.module.css'
import { combineClassNames } from './../helpers/commons'
import { SHAPE_GUEST, SHAPE_REGISTRATION, SHAPE_TICKETS } from '../helpers/commonPropTypes'
import { getGuestsOptions } from '../helpers/guestLimit'

const GuestLimit = ({
    foreword = 'Guests Limit',
    event,
    globalRegistration,
    globalTickets,
    wrapperCustomClassNames = []    
}) => {
    const registration = event.registration ?? globalRegistration
    const tickets = event.tickets ?? globalTickets
    if(!tickets?.list?.length && (registration.guestsLimited || !registration.showGuests)) return null

    const guestsOptions = getGuestsOptions(event, registration, tickets)
    if(!guestsOptions) return null
  
    const { count, limit } = guestsOptions

  return (
    <div className={combineClassNames([styles.guest_limit_parent, ...wrapperCustomClassNames])}>
      <p>
        {foreword}: {count} / {limit}
      </p>
    </div>
  )
}

GuestLimit.propTypes = {
    foreword: PropTypes.string,
    guests: PropTypes.arrayOf(PropTypes.shape(SHAPE_GUEST)),
    globalRegistration: SHAPE_REGISTRATION,
    globalTickets: PropTypes.arrayOf(PropTypes.shape(SHAPE_TICKETS)),
    wrapperCustomClassNames: PropTypes.string
}

export default GuestLimit