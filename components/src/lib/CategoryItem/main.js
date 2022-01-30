import React, { memo } from 'react'
import styles from './main.module.css'
import '../icons.css'
import PropTypes from 'prop-types'
import { combineClassNames, isDefined } from '../helpers/commons'

const CategoryItem = ({
  data: {
    id,
    name,
    color, 
  },
  wrapperCustomClassNames = []
}) => {
  
  if(!isDefined(id)) return null

  return (
    <div style={{ color: color || '#6464ff' }} className={combineClassNames([styles.category_item, ...wrapperCustomClassNames])}>
      <span className='icon-tag' />
      <span>{name}</span>
    </div>
  )
}

CategoryItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired, 
    color: PropTypes.string,
  }),
  wrapperCustomClassNames: PropTypes.arrayOf(PropTypes.string)
}

export default CategoryItem