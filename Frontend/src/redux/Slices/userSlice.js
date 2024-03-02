import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  token: '', 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearUser: (state) => {
      state.name = '';
      state.email = '';
      state.token = '';
    },
  },
});

export const { setUserEmail, setToken, setUserName, clearUser} = userSlice.actions;
export const selectUser = (state) => state.user.name;

export default userSlice.reducer;
