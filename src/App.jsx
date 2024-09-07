import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Call from "./pages/Call";
import TokenRefresher from "./components/TokenRefresher";
const App = () => {
  return (
    <Router>
      <TokenRefresher />
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/calls"
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
