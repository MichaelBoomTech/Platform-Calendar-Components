import React from 'react'
import PropTypes from 'prop-types'
import styles from './main.module.css'
import { combineClassNames } from '../helpers/commons'

const Location = ({
  wrapperCustomClassNames = [],
  address,
  disabled = false,
  showIcon = true,
  oneLine = false,
  coordinates = {},
  linkClassName = '',
  textClassName = ''
}) => {
  if(!address) return null

  const {lat, long} = coordinates;

  if(!lat || !long || isNaN(Number(lat)) || isNaN(Number(long))){
    return (
      <div className={combineClassNames([styles.location_parent, ...wrapperCustomClassNames])}>
        <p className={combineClassNames([oneLine ? styles.oneLine : undefined, textClassName])}>
          {address}
        </p>
      </div>
    )
  }

  return (
    <div className={combineClassNames([styles.location_parent, ...wrapperCustomClassNames])} >
      {showIcon && <div className={combineClassNames([styles.icon, 'icon-Location', linkClassName])} />}
      <a 
        href={disabled ? undefined : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} 
        target="_blank" 
        className={combineClassNames([oneLine ? styles.oneLine : undefined, linkClassName])}
        onClick={e => {
          e.stopPropagation();
          disabled && e.preventDefault();
        }}
      >
        {address}
      </a>
    </div>
  )
}

Location.propTypes = {
  address: PropTypes.string,
  wrapperCustomClassNames: PropTypes.array,
  disabled: PropTypes.bool,
  showIcon: PropTypes.bool,
  oneLine: PropTypes.bool,
  linkClassName: PropTypes.string,
  textClassName: PropTypes.string
}

export default Location