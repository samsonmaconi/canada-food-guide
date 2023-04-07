import React, { useState } from 'react'
import './DailyFoodGuide.scss';
import { useApi } from '../../api';
import { FoodGroupCard, Header } from '../../components'
import { STRING_CONSTANTS } from '../../components/Strings.const';
import { useAppSelector } from '../../redux/hooks';

const DailyFoodGuide = () => {
  const { data: foodGuideData, isLoading, error } = useApi();
  const familyMembersData = useAppSelector(state => state.familyMembers)
  const { activeMemberIndex, allMembers } = familyMembersData;
  const areThereFamilyMembers = allMembers.length > 0;
  const isServiceAvailable = !error && foodGuideData;

  console.log('data', foodGuideData)
  return (
    <div className="daily-food-guide">
      <Header familyMembers={allMembers} />
      {isLoading && STRING_CONSTANTS.Loading}
      {!isLoading &&
        <div className="food-group-cards">
          {isServiceAvailable ?
            (foodGuideData?.foodGroupData.map((foodGroupData) => (
              <FoodGroupCard key={foodGroupData.id} foodGroupData={foodGroupData} userInfo={areThereFamilyMembers ? allMembers[activeMemberIndex] : undefined}/>
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