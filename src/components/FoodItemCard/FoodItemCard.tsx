import React from 'react'
import PropTypes from 'prop-types'

const FoodItemCard = () => {
  return (
    <div>FoodItemCard</div>
  )
}

FoodItemCard.propTypes = {
  imageURL: PropTypes.string,
  servingSize: PropTypes.string.isRequired,
  foodName: PropTypes.string
}

export default FoodItemCard