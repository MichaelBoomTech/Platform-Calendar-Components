import React from 'react'
import PropTypes from 'prop-types'
import { SHAPE_TICKETS } from '../helpers/commonPropTypes'
import { combineClassNames } from '../helpers/commons'
import styles from './main.module.css'

const TicketList = ({
  data,
  wrapperCustomClassNames = []
  }) => {
  
  if(!data.open) return null
  
  return (
    <div className={ combineClassNames([styles.wrapper, ...wrapperCustomClassNames]) }>
      <div className='icon-ticket' />
      <div>
        {
          data.list.map(item => {
            return (
              <pre>
                {
                  `${item.limited ? (`${ item.limit } x ${ item.label }   `) : ''}${ item.price }`
                }
              </pre>
            )
          })
        }
      </div>
    </div>
  )
}

TicketList.propTypes = {
  data: SHAPE_TICKETS,
  wrapperCustomClassNames: PropTypes.arrayOf(PropTypes.string)
}

export default TicketList