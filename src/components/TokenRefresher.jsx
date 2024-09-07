import React, { useEffect } from "react";
import { refreshAuthToken } from "../actions/user.actions";

const TokenRefresher = () => {
  useEffect(() => {
    // refresh token immediately when the page loads
    refreshAuthToken();

    const refreshInterval = setInterval(() => {
      refreshAuthToken();
    }, 540000);

    // Cleanup
    return () => clearInterval(refreshInterval);
  }, []);
};

export default TokenRefresher;
