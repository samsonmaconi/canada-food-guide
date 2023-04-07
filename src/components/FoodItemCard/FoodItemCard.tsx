import React from 'react';
import PropTypes from 'prop-types';
import './FoodItemCard.scss';

const FoodItemCard = (props: { name: string; imgUrl?: string; servingSize: string; categoryId: number; }) => {
  const { name, imgUrl, servingSize, categoryId  } = props;

  return (
    <div className={`food-item-card bg-${categoryId}`}>
      <div className="food-item-details">
        {imgUrl && <div className="food-item-image-container">
          <img src={imgUrl} alt={name} className="food-item-image" />
        </div>}
        <span className="food-item-name">{name}</span>
        <span className="food-item-serving-size">Serving Size: {servingSize}</span>
      </div>
    </div>
  );
};

FoodItemCard.defaultProps = {
  // imgUrl: "https://picsum.photos/50/50?grayscale&blur=2" // placeholderImage
};

FoodItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string,
  servingSize: PropTypes.string.isRequired,
  categoryId: PropTypes.number.isRequired
};

export default FoodItemCard;
