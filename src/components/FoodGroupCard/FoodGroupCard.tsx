import React from 'react'
import PropTypes from 'prop-types'

const FoodGroupCard = () => {
  return (
    <div>FoodGroupCard</div>
  )
}

FoodGroupCard.propTypes = {
    title: PropTypes.string.isRequired,
    directionalStatemments: PropTypes.arrayOf(PropTypes.string).isRequired,
    servingSize: PropTypes.number.isRequired
}

export default FoodGroupCard