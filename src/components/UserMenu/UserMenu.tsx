import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa'
import PropTypes from 'prop-types';
import './UserMenu.scss';
import { Person } from '../../api';
import { STRING_CONSTANTS } from '../Strings.const';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateActiveMemberIndex } from '../../redux/slices/familyMembersSlice';
import { closeDialog, openDialog } from '../../redux/slices/registrationDialogSlice';

const UserInfo = (props: { name: any; ageGroup: any; sex: any; }) => {
  const { name, ageGroup, sex } = props;
  return (
    <div className="user-info">
      <span><b>{STRING_CONSTANTS.Active}:</b> {`${name} (${sex}, ${ageGroup})`}</span>
    </div>
  );
}

const UserMenu = (props: { familyMembers: Person[] }) => {
  const { familyMembers } = props;
  const familyMembersData = useAppSelector(state => state.familyMembers);
  const isRegistrationDialogOpen = useAppSelector(state => state.registrationDialog.open);
  const { allMembers, activeMemberIndex } = familyMembersData;
  const dispatch = useAppDispatch();
  const { name, ageRange, sex } = allMembers[activeMemberIndex];


  const handleMemberSelect = (memberIndex: any) => {
    dispatch(updateActiveMemberIndex(+memberIndex));
    // update the serving size on the parent component
  };

  return (
    <div className="user-menu">
      <div className="user-menu-group">
        <div className="user-menu-dropdown">
          <select
            value={activeMemberIndex}
            onChange={(e) => handleMemberSelect(e.target.value)}
          >
            {familyMembers.map((member, key) => (
              <option key={key} value={key}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={(e) => dispatch(isRegistrationDialogOpen ? closeDialog() : openDialog())} title={STRING_CONSTANTS.UpdateFamilyProfile} className="user-menu-settings-button"><FaCog /></button>
      </div>
      <UserInfo name={name} ageGroup={ageRange} sex={sex} />
    </div>
  );
};

UserMenu.propTypes = {
  familyMembers: PropTypes.array.isRequired,
};

export default UserMenu;
