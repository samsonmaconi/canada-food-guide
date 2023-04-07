import React from 'react'
import PropTypes from 'prop-types'
import { FoodGroup, FoodGroupCategory } from '../../api'
import './FoodGroupCard.scss';
import { STRING_CONSTANTS } from '../Strings.const';
import FoodSamples from '../FoodSamples/FoodSamples';
import useBreakpoint, { Breakpoints } from '../hooks/useBreakpoint';

const FoodGroupCard = (props: { foodGroupData: FoodGroup }) => {
  const { id, name, directionalStatemments, categories } = props.foodGroupData
  const breakpoint: Breakpoints = useBreakpoint();
  const isSmallScreen = [Breakpoints.sm, Breakpoints.md].includes(breakpoint);
  const servingSize = getServingSize()

  return (
    <div className={`food-group-card bg-${id}`}>
      <div className="food-group-card-content">
        {/* {image && <div className="food-group-card-icon">
          <Icons8Image keyword="search" width={64} height={64} />
        </div>} */}
        <div className="title-group">
          <h3 className="food-group-card-title">{name}</h3>
          <div className="food-group-card-serving-size">
            <span className="serving-size-label">{STRING_CONSTANTS.ServingSize}</span>
            <span className="serving-size">{STRING_CONSTANTS.ServingUnits.replace("{0}", servingSize.toString())}</span>
          </div>
        </div>
        <ul className="food-group-card-direction">
          {directionalStatemments.map((statement: string, key: React.Key) =>
            <li key={key}>{statement}</li>
          )}
        </ul>
      {
        isSmallScreen && renderFoodSamples(categories)
      }
      </div>
      {
        !isSmallScreen && renderFoodSamples(categories)
      }
    </div>
  )
}

const renderFoodSamples = (categories: FoodGroupCategory[]) => {
  return categories ? <FoodSamples foodGroupCategories={categories} /> : null;
}

const getServingSize = () => {
  return 7; // TODO
}

FoodGroupCard.propTypes = {
  foodGroupData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    directionalStatemments: PropTypes.arrayOf(PropTypes.string).isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
}

export default FoodGroupCard