import React from "react";
import Header from "../UI/Header";

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <main className="flex-fill main-content">{children}</main>
    </div>
  );
};

export default Layout;
