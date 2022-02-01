import React from 'react'
import PropTypes from 'prop-types'
import styles from './main.module.css'
import { combineClassNames } from './../helpers/commons'
import { SHAPE_EVENT, SHAPE_REGISTRATION, SHAPE_TICKETS } from '../helpers/commonPropTypes'
import { getShowRegistrationButtonStatus, generateRegistrationURL, getGuestsOptions } from '../helpers/guestLimit'

const RegistrationButton = ({
  cid,
  text = 'Register',
  urlBase,
  event,
  globalRegistration,
  globalTickets,
  wrapperClassName = ''
}) => {
  const registration = event.registration ?? globalRegistration
  const tickets = event.tickets ?? globalTickets

  const show = getShowRegistrationButtonStatus(event, registration)
  if (!show) return null

  const url = generateRegistrationURL(cid, event, registration, urlBase)
  const guestsOptions = getGuestsOptions(event, registration, tickets)
  if(!guestsOptions) return null

  const { count, limit } = guestsOptions
  
  return (
    <button
      className={combineClassNames([styles.register_button, wrapperClassName])}
      disabled={count >= limit}
      onClick={() => window.open(url, '_blank')}
    >
      { text }
    </button>
  )
}

RegistrationButton.propTypes = {
  cid: PropTypes.number.isRequired,
  urlBase: PropTypes.string.isRequired,
  text: PropTypes.string,
  event: SHAPE_EVENT,
  globalRegistration: SHAPE_REGISTRATION,
  globalTickets: SHAPE_TICKETS,
  wrapperCustomClassNames: PropTypes.arrayOf(PropTypes.string)
}


export default RegistrationButton