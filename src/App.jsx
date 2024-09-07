import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Call from "./pages/Call";
import TokenRefresher from "./components/TokenRefresher";
import RedirectRoute from "./components/RedirectRoute";
const App = () => {
  return (
    <Router>
      <TokenRefresher />
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <RedirectRoute>
                <Login />
              </RedirectRoute>
            }
          />

          <Route
            path="/calls"
            element={
              <PrivateRoute>
                <Call />
              </PrivateRoute>
            }
          />

          <Route
            path="*"
            element={
              <PrivateRoute>
                <Call />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
