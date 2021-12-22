import React, { memo } from 'react'
import styles from './main.module.css'
import '../icons.css'
import PropTypes from 'prop-types'
import { combineClassNames } from '../helpers/commons'

const CategoryItem = (props) => {
  
  if(!props.category || !props.category.id) return null

  const { 
    category: {
      id,
      name, 
      color, 
    },
    wrapperCustomClassNames = []
  } = props

  if(!id) return null

  return (
    <div style={{ color }} className={combineClassNames([styles.category_item, ...wrapperCustomClassNames])}>
      <span className="icon-tag" />
      <span>{name}</span>
    </div>
  )
}

CategoryItem.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string, 
    color: PropTypes.string,
  }),
  wrapperCustomClassNames: PropTypes.arrayOf(PropTypes.string)
}

export default memo(CategoryItem)