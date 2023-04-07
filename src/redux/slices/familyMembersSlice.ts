import { createSlice } from '@reduxjs/toolkit'

export const familyMembersSlice = createSlice({
  name: 'familyMembers',
  initialState: {
    activeMemberIndex: 0,
    allMembers: new Array(),
    familyName: "",
    isIndividual: true
  },
  reducers: {
    registerMembers: (state, action) => {
      state.activeMemberIndex = 0;
      state.allMembers = [...action.payload.allMembers]
      state.familyName = action.payload.familyName
      state.isIndividual = action.payload.isIndividual
    },
    updateActiveMemberIndex: (state, action) => {
      state.activeMemberIndex = action.payload
    },
    reset: (state, action) => {
      state = {
        activeMemberIndex: 0,
        allMembers: [],
        familyName: "",
        isIndividual: true
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { registerMembers, updateActiveMemberIndex, reset } = familyMembersSlice.actions

export default familyMembersSlice.reducer