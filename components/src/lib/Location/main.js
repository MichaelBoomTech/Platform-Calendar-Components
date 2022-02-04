import React from 'react'
import PropTypes from 'prop-types'
import styles from './main.module.css'
import { combineClassNames } from '../helpers/commons'

const Location = ({
  data,
  disabled = false,
  showIcon = true,
  oneLine = false,
  linkClassName = '',
  textClassName = '',
  wrapperCustomClassNames = []
}) => {
  if(!data) return null

  const {lat, lng} = data;

  if(!lat || !lng || isNaN(Number(lat)) || isNaN(Number(lng))){
    return (
      <div className={combineClassNames([styles.location_parent, ...wrapperCustomClassNames])}>
        <p className={combineClassNames([oneLine ? styles.oneLine : undefined, textClassName])}>
          {data.address}
        </p>
      </div>
    )
  }
  return (
    <div className={combineClassNames([styles.location_parent, ...wrapperCustomClassNames])} >
      {showIcon && <div className={combineClassNames([styles.icon, 'icon-location', linkClassName])} />}
      <a 
        href={disabled ? undefined : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`} 
        target="_blank" 
        className={combineClassNames([oneLine ? styles.oneLine : undefined, linkClassName])}
        onClick={e => {
          e.stopPropagation();
          disabled && e.preventDefault();
        }}
      >
        {data.address}
      </a>
    </div>
  )
}

Location.propTypes = {
  data: PropTypes.shape({
    address: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    website: PropTypes.string,
    city: PropTypes.string,
    statesList: PropTypes.string,
    country: PropTypes.string,
    postal: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number 
  }),
  wrapperCustomClassNames: PropTypes.array,
  disabled: PropTypes.bool,
  showIcon: PropTypes.bool,
  oneLine: PropTypes.bool,
  linkClassName: PropTypes.string,
  textClassName: PropTypes.string
}

export default Location