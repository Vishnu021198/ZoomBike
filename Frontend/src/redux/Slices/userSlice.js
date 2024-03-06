import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  token: '',
  filteredBikes: [],
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
    setFilteredBikes: (state, action) => {
      state.filteredBikes = action.payload;
    },
      
    clearUser: (state) => {
      state.name = '';
      state.email = '';
      state.token = '';
      state.filteredBikes = [];
    },
  },
});

export const { setUserEmail, setToken, setUserName, clearUser, setFilteredBikes} = userSlice.actions;
export const selectUser = (state) => state.user.name;
export const selectFilteredBikes = (state) => state.user.filteredBikes;

export default userSlice.reducer;
