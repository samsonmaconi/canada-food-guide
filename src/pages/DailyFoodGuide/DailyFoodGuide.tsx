import React, { useState } from 'react'
import './DailyFoodGuide.scss';
import { useApi } from '../../api';
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
  const [activeUserData, setactiveUserData] = useState(tempConst[0])
  const isServiceAvailable = !error && foodGuideData;

  console.log('data', foodGuideData)
  return (
    <div className="daily-food-guide">
      <Header familyMembers={tempConst} />
      {isLoading && STRING_CONSTANTS.Loading}
      {!isLoading &&
        <div className="food-group-cards">
          {isServiceAvailable ?
            (foodGuideData?.foodGroupData.map((foodGroupData) => (
              <FoodGroupCard key={foodGroupData.id} foodGroupData={foodGroupData} userInfo={activeUserData}/>
            )))
            :
            <span>{STRING_CONSTANTS.ServiceUnavailable}</span>
          }
        </div>
      }
    </div>
  )
}


export default DailyFoodGuide