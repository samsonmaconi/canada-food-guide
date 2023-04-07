import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa'
import PropTypes from 'prop-types';
import './UserMenu.scss';
import { Person } from '../../api';
import { STRING_CONSTANTS } from '../string.constants';

const UserInfo = (props: { name: any; ageGroup: any; sex: any; }) => {
  const { name, ageGroup, sex } = props;
  return (
    <div className="user-info">
      <span>Active Member: {`${name} (${sex}, ${ageGroup})`}</span>
    </div>
  );
}

const UserMenu = (props: { familyMembers: Person[] }) => {
  const { familyMembers } = props;
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);
  const { name, ageRange, sex } = familyMembers[selectedMemberIndex];


  const handleMemberSelect = (memberIndex: any) => {
    setSelectedMemberIndex(memberIndex);
    // update the serving size on the parent component
  };

  return (
    <div className="user-menu">
      <div className="user-menu-group">
        <div className="user-menu-dropdown">
          <select
            value={selectedMemberIndex}
            onChange={(e) => handleMemberSelect(e.target.value)}
          >
            {familyMembers.map((member, key) => (
              <option key={key} value={key}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
        <button title={STRING_CONSTANTS.UpdateFamilyProfile} className="user-menu-settings-button"><FaCog /></button>
      </div>
      <UserInfo name={name} ageGroup={ageRange} sex={sex} />
    </div>
  );
};

UserMenu.propTypes = {
  familyMembers: PropTypes.array.isRequired,
};

export default UserMenu;
