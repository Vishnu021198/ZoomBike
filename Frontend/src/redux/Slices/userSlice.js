import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  token: '',
  filteredBikes: [],
  selectedBike: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setUserId: (state, action) => {
      state.id = action.payload;
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
    setBike: (state, action) => {
      state.selectedBike = action.payload;
    },
    clearUser: (state) => {
      state.id = '';
      state.name = '';
      state.email = '';
      state.token = '';
      state.filteredBikes = [];
      state.selectedBike = null; 
    },
  },
});

export const {
  setUserEmail,
  setToken,
  setUserName,
  clearUser,
  setFilteredBikes,
  setBike,
  setUserId
} = userSlice.actions;

export const selectUser = (state) => state.user.name;
export const selectUserId = (state) => state.user.id;
export const selectFilteredBikes = (state) => state.user.filteredBikes;
export const selectToken = (state) => state.user.token;
export const selectSelectedBike = (state) => state.user.selectedBike;

export default userSlice.reducer;
