import { createSlice } from '@reduxjs/toolkit'

export const familyMembersSlice = createSlice({
  name: 'familyMembers',
  initialState: {
    activeMemberIndex: 0,
    allMembers: [ // TODO: Clear
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
  },
  reducers: {
    registerMembers: (state, action) => {
      state = {
        activeMemberIndex: 0,
        allMembers: action.payload
      }
    },
    updateActiveMemberIndex: (state, action) => {
      state.activeMemberIndex = action.payload
    },
    reset: (state, action) => {
      state = {
        activeMemberIndex: 0,
        allMembers: []
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { registerMembers, updateActiveMemberIndex, reset } = familyMembersSlice.actions

export default familyMembersSlice.reducer