import React from 'react';
import PropTypes from 'prop-types';
import './FoodItemCard.scss';

const FoodItemCard = (props: { name: string; imgUrl: string; servingSize: string; }) => {
  const { name, imgUrl, servingSize } = props;

  return (
    <div className="food-item-card">
      <div className="food-item-image-container">
        <img src={imgUrl} alt={name} className="food-item-image" />
      </div>
      <div className="food-item-details">
        <h2 className="food-item-name">{name}</h2>
        <p className="food-item-serving-size">Serving Size: {servingSize}</p>
      </div>
    </div>
  );
};

FoodItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  servingSize: PropTypes.string.isRequired,
};

export default FoodItemCard;
