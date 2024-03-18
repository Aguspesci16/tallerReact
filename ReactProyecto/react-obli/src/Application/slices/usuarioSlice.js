import { createSlice } from '@reduxjs/toolkit';
import {
  getItemFromLocalStorage,
  removeUserFromLocalStorage,
  setUserToLocalStorage,
} from '../../storage/Storage';

const initialState = {
  userLogged: getItemFromLocalStorage('UserData'),
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onLogin: (state, action) => {
      setUserToLocalStorage(action.payload);
      state.userLogged = action.payload;
    },
    onLogout: (state) => {
      removeUserFromLocalStorage();
      state.userLogged = null;
    },
  },
});

export const { onLogin, onLogout } = userSlice.actions;
export default userSlice.reducer;