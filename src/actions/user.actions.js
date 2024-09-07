import store from "../redux/store";
import { login, logout } from "../redux/slices/userSlice";
import apiHandler from "../utils/apiHandler";

export const isUserAuthenticated = () => {
  const state = store.getState();
  return state.user.isAuthenticated;
};
export const getAuthToken = () => {
  const state = store.getState();
  return state.user.accessToken;
};

export const refreshAuthToken = async () => {
  try {
    const state = store.getState();
    const response = await apiHandler("refreshToken", {}, {});
    const { access_token } = response;

    store.dispatch(
      login({
        access_token,
        user: state.user.userDetails,
      })
    );

    return access_token;
  } catch (error) {
    console.error("Error refreshing token:", error.message);
  }
};

export const logoutUser = () => {
  store.dispatch(logout());
};
