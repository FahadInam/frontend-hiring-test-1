import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userDetails: null,
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userDetails = action.payload.user;
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userDetails = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
