import { API_BASE_URL, apis } from "../constants/api.constants";
import { getAuthToken } from "../actions/user.actions";
import { toast } from "react-toastify";

const apiHandler = async (apiName, payload = {}, headers = {}) => {
  const apiConfig = apis[apiName];

  if (!apiConfig) {
    throw new Error(`API ${apiName} not found in constants`);
  }

  let path = apiConfig.path;
  if (typeof path === "function") {
    path = path(payload.id);
    delete payload.id;
  }

  let url = `${API_BASE_URL}${path}`;
  if (apiConfig.method === "GET" && Object.keys(payload).length > 0) {
    const queryParams = new URLSearchParams(payload).toString();
    url = `${url}?${queryParams}`;
  }

  // request options
  const requestOptions = {
    method: apiConfig.method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(apiConfig.method !== "GET" && { body: JSON.stringify(payload) }),
  };

  // if authentication is required
  if (apiConfig.isAuthenticate) {
    const token = getAuthToken();
    if (token) {
      requestOptions.headers["Authorization"] = `Bearer ${token}`;
    } else {
      throw new Error("Authentication required but no token found");
    }
  }

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return data; // Return the response data
  } catch (error) {
    toast.error(`Error in ${apiName}: ${error.message}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    console.error(`Error in ${apiName}:`, error.message);
    throw error;
  }
};

export default apiHandler;
