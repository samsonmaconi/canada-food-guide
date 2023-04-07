import React, { useEffect, useState } from 'react'
import './Registration.scss';
import { Button, IconButton, ButtonGroup, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { REGISTRATION_STRING_CONSTANTS } from './Registration.strings';
import { FaTrashAlt, FaUserPlus } from 'react-icons/fa'
import { AgeGroups, Genders } from '../../api';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { registerMembers } from '../../redux/slices/familyMembersSlice';


// TODO: Form Fields Validation

const Registration = () => {
  const [isIndividual, setisIndividual] = useState(true);
  const [familyName, setFamilyName] = useState("");
  const [members, setMembers] = useState([
    { name: "", ageRange: AgeGroups[0], sex: Genders[0] },
    { name: "", ageRange: AgeGroups[0], sex: Genders[0] },
  ]);

  const familyMembersData = useAppSelector(state => state.familyMembers);
  const isRegistrationDialogOpen = useAppSelector(state => state.registrationDialog.open);
  const { activeMemberIndex, allMembers, familyName: _familyName, isIndividual: _isIndividual } = familyMembersData;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isIndividual) {
      setMembers([members[0]])
      setFamilyName("");
    }
  }, [isIndividual])



  useEffect(() => {
    if (isRegistrationDialogOpen) {
      // read from redux
      let members = [{ name: "", ageRange: AgeGroups[0], sex: Genders[0] }];
      if (allMembers.length) {
        members = [...(allMembers.map(member => ({ ...member })))];
      }
      setMembers(members)
      setFamilyName(_familyName);
      setisIndividual(_isIndividual);
    } else {
      // save to redux
      dispatch(registerMembers({
        activeMemberIndex: 0,
        allMembers: [...members],
        familyName,
        isIndividual
      }))
    }
  }, [isRegistrationDialogOpen])


  const handleAgeGroupChange = (e: any, index: number) => {
    const newMembers = [...members];
    newMembers[index].ageRange = e.target.value;
    setMembers(newMembers);
  };

  const handleFamilyNameChange = (e: any) => {
    setFamilyName(e.target.value);
  };

  const handleNameChange = (e: any, index: number) => {
    const newMembers = [...members];
    newMembers[index].name = e.target.value;
    setMembers(newMembers);
  };

  const handleSexChange = (e: any, index: number) => {
    const newMembers = [...members];
    newMembers[index].sex = e.target.value;
    setMembers(newMembers);
  };

  const handleAddMember = () => {
    setMembers([...members, { name: "", ageRange: AgeGroups[0], sex: Genders[0] }]);
  };

  const handleRemoveMember = (index: number) => {
    const newMembers = [...members];
    newMembers.splice(index, 1);
    setMembers(newMembers);
  };

  return (
    <div className="registration">
      <span className="title">{REGISTRATION_STRING_CONSTANTS.userRegistration}</span>
      <div className="registration-form">
        <ButtonGroup className='invividualFamilyGrp' variant="contained" aria-label="Individual or Family">
          <Button onClick={() => setisIndividual(true)} variant={!isIndividual ? "outlined" : "contained"}>{REGISTRATION_STRING_CONSTANTS.individual}</Button>
          <Button onClick={() => setisIndividual(false)} variant={isIndividual ? "outlined" : "contained"}>{REGISTRATION_STRING_CONSTANTS.family}</Button>
        </ButtonGroup>
        {!isIndividual ? <TextField value={familyName} onChange={handleFamilyNameChange} label={REGISTRATION_STRING_CONSTANTS.familyName} variant="standard" aria-label={REGISTRATION_STRING_CONSTANTS.name} />
          : null}
        {members.map((member, index) => {
          const { name, ageRange, sex } = member;
          return <div key={index} className="member-inputGroup">
            <TextField value={name} onChange={(e) => handleNameChange(e, index)} label={REGISTRATION_STRING_CONSTANTS.name} variant="standard" aria-label={REGISTRATION_STRING_CONSTANTS.name} />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id={`selectLabel${index}`}>{REGISTRATION_STRING_CONSTANTS.ageGroup}</InputLabel>
              <Select
                labelId={`selectLabel`}
                value={ageRange}
                onChange={(e) => handleAgeGroupChange(e, index)}
                label={`selectLabel${index}`}
              >
                {AgeGroups.map((ageGroup, i) => <MenuItem key={i} value={ageGroup}>{ageGroup}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel >{REGISTRATION_STRING_CONSTANTS.sex}</FormLabel>
              <RadioGroup
                row
                aria-labelledby={REGISTRATION_STRING_CONSTANTS.sex}
                name="sex"
                value={sex}
                defaultValue={Genders[0]}
                onChange={(e) => handleSexChange(e, index)}
              >
                {Genders.map((gender, i) => <FormControlLabel key={i} value={gender} control={<Radio />} label={gender} />)}
              </RadioGroup>
            </FormControl>
            {index > 0 && (
              <IconButton className='delete' color="error" aria-label="remove member" component="label" onClick={() => handleRemoveMember(index)}>
                <FaTrashAlt />
              </IconButton>
            )}
          </div>
        })
        }
        {!isIndividual && (
          <Button onClick={handleAddMember} className="addMember" variant="outlined" startIcon={<FaUserPlus />}>
            {REGISTRATION_STRING_CONSTANTS.addMember}
          </Button>
        )}

      </div>
    </div>
  )
}

export default Registration