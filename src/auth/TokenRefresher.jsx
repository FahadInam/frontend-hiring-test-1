import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { refreshAuthToken } from "../actions/user.actions";

const TokenRefresher = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      // refresh token immediately when the page loads
      refreshAuthToken();

      const refreshInterval = setInterval(() => {
        refreshAuthToken();
      }, 540000); // every 9 minutes

      // Cleanup interval on component unmount
      return () => clearInterval(refreshInterval);
    }
  }, [isAuthenticated]);
};

export default TokenRefresher;
