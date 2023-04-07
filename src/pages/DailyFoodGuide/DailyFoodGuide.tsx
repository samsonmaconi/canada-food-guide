import React, { useEffect } from 'react'
import './DailyFoodGuide.scss';
import { useApi } from '../../api';
import { FoodGroupCard, Header, Registration } from '../../components'
import { STRING_CONSTANTS } from '../../components/Strings.const';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Dialog from '@mui/material/Dialog';
import { closeDialog, openDialog } from '../../redux/slices/registrationDialogSlice';

const DailyFoodGuide = () => {
  const { data: foodGuideData, isLoading, error } = useApi();
  const familyMembersData = useAppSelector(state => state.familyMembers);
  const isRegistrationDialogOpen = useAppSelector(state => state.registrationDialog.open);
  const { allMembers } = familyMembersData;
  const dispatch = useAppDispatch();
  const areFamilyMembersRegistered = allMembers.length > 0;
  const isServiceAvailable = !error && foodGuideData;

  useEffect(() => {
    if(!areFamilyMembersRegistered) {
      dispatch(openDialog());
    }
  }, [])

  return (
    <div className="daily-food-guide">
      <Header familyMembers={allMembers} />
      <Dialog disableEscapeKeyDown open={isRegistrationDialogOpen} onClose={() => {dispatch(closeDialog())}}>
        <Registration/>
      </Dialog>
      {isLoading && STRING_CONSTANTS.Loading}
      {!isLoading &&
        <div className="food-group-cards">
          {isServiceAvailable ?
            (foodGuideData?.foodGroupData.map((foodGroupData) => (
              <FoodGroupCard key={foodGroupData.id} foodGroupData={foodGroupData}/>
            )))
            :
            <span>{STRING_CONSTANTS.ServiceUnavailable}</span>
          }
        </div>
      }
    </div>
  )
}


export default React.memo(DailyFoodGuide);