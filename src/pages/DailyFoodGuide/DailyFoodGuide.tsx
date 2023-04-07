import React from 'react'
import './DailyFoodGuide.scss';
import { FoodGuideData, useApi } from '../../api';
import { FoodGroupCard, Header } from '../../components'
import { STRING_CONSTANTS } from '../../components/Strings.const';

const tempConst = [
  {
    name: "Samson",
    ageRange: "19 to 30",
    sex: "Male"
  },
  {
    name: "Joan",
    ageRange: "71+",
    sex: "Female"
  }
]

const DailyFoodGuide = () => {
  const { data: foodGuideData, isLoading, error } = useApi();
  console.log('data', foodGuideData)
  return (
    <div className="daily-food-guide">
      <Header familyMembers={tempConst} />
      {isLoading && STRING_CONSTANTS.Loading}
      {!isLoading &&
        <div className="food-group-cards">
          {foodGuideData?.foodGroupData.map((foodGroupData) => (
            <FoodGroupCard key={foodGroupData.id} foodGroupData={foodGroupData} />
          ))}
        </div>
      }
    </div>
  )
}


export default DailyFoodGuide