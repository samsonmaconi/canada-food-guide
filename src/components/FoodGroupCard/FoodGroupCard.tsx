import React from 'react'
import PropTypes from 'prop-types'
import { FoodGroup, FoodGroupCategory, Person, ServingsGuide, Sex } from '../../api'
import './FoodGroupCard.scss';
import { STRING_CONSTANTS } from '../Strings.const';
import FoodSamples from '../FoodSamples/FoodSamples';
import useBreakpoint, { Breakpoints } from '../hooks/useBreakpoint';
import { useAppSelector } from '../../redux/hooks';

const FoodGroupCard = (props: { foodGroupData: FoodGroup }) => {
  const { id, name, directionalStatemments, categories, servingsGuide } = props.foodGroupData
  const familyMembersData = useAppSelector(state => state.familyMembers);

  const breakpoint: Breakpoints = useBreakpoint();
  const isSmallScreen = [Breakpoints.sm, Breakpoints.md].includes(breakpoint);
  const servingSize = familyMembersData.allMembers.length ? getServingSize(familyMembersData, servingsGuide) : "";

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

const getServingSize = (familyMembersData: { activeMemberIndex?: number; allMembers?: any; familyName?: any; isIndividual: any; }, servingsGuide: ServingsGuide) => {
  const { isIndividual, allMembers, familyName, activeMemberIndex } = familyMembersData;
  if (isIndividual) {
    const userInfo: Person = allMembers[activeMemberIndex || 0];
    return servingsGuide[userInfo.sex][userInfo.ageRange];
  } else {
    if (activeMemberIndex) {
      const userInfo: Person = allMembers[activeMemberIndex - 1];
      return servingsGuide[userInfo.sex][userInfo.ageRange];
    } else {
      let servings = 0;
      allMembers.forEach((member: Person) => {
        servings += servingsGuide[member.sex][member.ageRange]
      });
      return servings;
    }
  }
}

FoodGroupCard.propTypes = {
  foodGroupData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    directionalStatemments: PropTypes.arrayOf(PropTypes.string).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    servingsGuide: PropTypes.object.isRequired
  }).isRequired
}

export default React.memo(FoodGroupCard)