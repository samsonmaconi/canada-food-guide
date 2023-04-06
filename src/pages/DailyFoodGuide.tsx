import React from 'react'
import { FoodGuideData, useApi } from '../api';
import { Header } from '../components'

const DailyFoodGuide = () => {
  const { data, isLoading, error } = useApi();
  console.log('data', data)
  return (
    <div>
      DailyFoodGuide
      <Header />
      <div>{data && "data available"}</div>
    </div>
  )
}

export default DailyFoodGuide