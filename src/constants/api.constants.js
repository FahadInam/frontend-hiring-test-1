export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apis = {
  login: {
    path: "/auth/login",
    method: "POST",
    isAuthenticate: false,
  },

  getCalls: {
    path: "/calls",
    method: "GET",
    isAuthenticate: true,
  },

  getSingleCall: {
    path: (id) => `/calls/${id}`,
    method: "GET",
    isAuthenticate: true,
  },

  addNote: {
    path: (id) => `/calls/${id}/note`,
    method: "POST",
    isAuthenticate: true,
  },

  updateStatus: {
    path: (id) => `/calls/${id}/archive`,
    method: "PUT",
    isAuthenticate: true,
  },

  refreshToken: {
    path: "/auth/refresh-token",
    method: "POST",
    isAuthenticate: true,
  },
};
