import { createSlice } from '@reduxjs/toolkit'

export const registrationDialogSlice = createSlice({
  name: 'registrationDialog',
  initialState: {
    open: false
  },
  reducers: {
    openDialog: (state) => {
      state.open = true;
    },
    closeDialog: (state) => {
      state.open = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { openDialog, closeDialog } = registrationDialogSlice.actions

export default registrationDialogSlice.reducer