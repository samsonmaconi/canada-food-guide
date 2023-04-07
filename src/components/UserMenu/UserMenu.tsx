import { FaCog } from 'react-icons/fa'
import './UserMenu.scss';
import { STRING_CONSTANTS } from '../Strings.const';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateActiveMemberIndex } from '../../redux/slices/familyMembersSlice';
import { closeDialog, openDialog } from '../../redux/slices/registrationDialogSlice';

const UserInfo = (props: { userInfo: { name: string; ageRange: any; sex: any; } }) => {
  const { name, ageRange, sex } = props.userInfo;
  const isFamilyName = !ageRange && !sex;
  return (
    <div className="user-info">
      <span><b>{STRING_CONSTANTS.Active}:</b> {`${name}${isFamilyName ? "" : " (" + sex + ", " + ageRange + ")"}`}</span>
    </div>
  );
}

const UserMenu = () => {
  const familyMembersData = useAppSelector(state => state.familyMembers);
  const isRegistrationDialogOpen = useAppSelector(state => state.registrationDialog.open);
  const { isIndividual, familyName, allMembers, activeMemberIndex } = familyMembersData;
  const dispatch = useAppDispatch();
  const familyNameOption = !isIndividual ? STRING_CONSTANTS.FamilyName.replace("{0}", familyName) : undefined;
  const familyMembersList = (familyNameOption ? [{ name: familyNameOption }, ...allMembers] : allMembers)

  const handleMemberSelect = (memberIndex: any) => {
    dispatch(updateActiveMemberIndex(+memberIndex));
  };

  return (
    <div className="user-menu">
      <div className="user-menu-group">
        <div className="user-menu-dropdown">
          <select
            value={activeMemberIndex}
            onChange={(e) => handleMemberSelect(e.target.value)}
          >
            {familyMembersList.map((member, key) => (
              <option key={key} value={key}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={(e) => dispatch(isRegistrationDialogOpen ? closeDialog() : openDialog())} title={STRING_CONSTANTS.UpdateFamilyProfile} className="user-menu-settings-button"><FaCog /></button>
      </div>
      <UserInfo userInfo={familyMembersList[activeMemberIndex]} />
    </div>
  );
};

export default UserMenu;
