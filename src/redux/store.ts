import { configureStore } from '@reduxjs/toolkit';
import familyMembersReducer from './slices/familyMembersSlice';
import registrationDialogReducer from './slices/registrationDialogSlice';

const store = configureStore({
  reducer: {
    familyMembers: familyMembersReducer,
    registrationDialog: registrationDialogReducer
  }
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
