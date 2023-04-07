import React from 'react'
import PropTypes from 'prop-types'
import { FoodGroup, FoodGroupCategory, ServingsGuide, Sex } from '../../api'
import './FoodGroupCard.scss';
import { STRING_CONSTANTS } from '../Strings.const';
import FoodSamples from '../FoodSamples/FoodSamples';
import useBreakpoint, { Breakpoints } from '../hooks/useBreakpoint';

const FoodGroupCard = (props: { foodGroupData: FoodGroup, userInfo?: { sex: any; ageRange: any; } }) => {
  const { id, name, directionalStatemments, categories, servingsGuide } = props.foodGroupData
  const breakpoint: Breakpoints = useBreakpoint();
  const isSmallScreen = [Breakpoints.sm, Breakpoints.md].includes(breakpoint);
  const servingSize = props.userInfo && getServingSize(props.userInfo, servingsGuide);

  return (
    <div className={`food-group-card bg-${id}`}>
      <div className="food-group-card-content">
        <div className="title-group">
          <h3 className="food-group-card-title">{name}</h3>
          {servingSize && <div className="food-group-card-serving-size">
            <span className="serving-size-label">{STRING_CONSTANTS.RecommendedServing}</span>
            <span className="serving-size">{STRING_CONSTANTS.ServingUnits.replace("{0}", servingSize.toString())}</span>
          </div>}
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

const getServingSize = (userInfo: { sex: Sex; ageRange: string; }, servingsGuide: ServingsGuide) => {
  return servingsGuide[userInfo.sex][userInfo.ageRange];
}

FoodGroupCard.propTypes = {
  foodGroupData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    directionalStatemments: PropTypes.arrayOf(PropTypes.string).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    servingsGuide: PropTypes.object.isRequired
  }).isRequired,
  userInfo: PropTypes.shape({
    ageRange: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired
  })
}

export default FoodGroupCard