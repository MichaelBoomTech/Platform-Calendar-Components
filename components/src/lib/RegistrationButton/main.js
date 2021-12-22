import React from 'react'
import PropTypes from 'prop-types'
import styles from './main.module.css'
import { getGuestLimitProperties } from './../helpers/guestLimit'
import { combineClassNames } from './../helpers/commons'

const RegistrationButton = ({
  wrapperCustomClassNames = [],
  onClick = (url) => url && window.open(url, '_blank'),
  eventRegistration,
  eventTicket,
  addons = [],
  eventKind = 1,
  eventPageUrl = '',
  eventEndDate,
  eventStartDate,
  planGuestLimit = 0,
  repeat,
  guests,
  comp_id,
  instance,
  eventId,
  registrationPageUrl,
  text = 'Register'
}) => {
  const { showButton, buttonText, page_url, guest_limit, guestsCount } =
  getGuestLimitProperties({
      eventRegistration,
      eventTicket,
      addons,
      eventKind,
      eventPageUrl,
      eventEndDate,
      planGuestLimit,
      repeat,
      guests,
      eventStartDate,
      comp_id,
      instance,
      eventId,
      registrationPageUrl,
      text
    })

  if (!showButton) return null

  return (
    <button
      className={combineClassNames([styles.register_button, ...wrapperCustomClassNames])}
      style={{opacity: guestsCount >= guest_limit ? 0.4 : 1}}
      onClick={() => (guestsCount >= guest_limit ? null : onClick(page_url))}
    >
      {buttonText}
    </button>
  )
}

RegistrationButton.propTypes = {
  wrapperCustomClassNames: PropTypes.array,
  text: PropTypes.string,
  onClick: PropTypes.func,
  addons: PropTypes.array.isRequired,
  eventKind: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  eventRegistration: PropTypes.object,
  eventPageUrl: PropTypes.string,
  planGuestLimit: PropTypes.number,
  eventEndDate: PropTypes.string.isRequired,
  eventStartDate: PropTypes.string.isRequired,
  repeat: PropTypes.object.isRequired,
  guests: PropTypes.oneOfType([PropTypes.array, PropTypes.number]).isRequired,
  comp_id: PropTypes.string.isRequired,
  instance: PropTypes.string.isRequired,
  eventId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  registrationPageUrl: PropTypes.string.isRequired
}


export default RegistrationButton