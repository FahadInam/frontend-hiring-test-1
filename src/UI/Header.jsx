import React from "react";
import { Row, Col, Button } from "antd";
import Logo from "../assets/logo.png";
import { logoutUser } from "../actions/user.actions";
import { useSelector } from "react-redux";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div
      className="border-bottom d-flex header align-items-center justify-content-between"
      style={{
        borderRight: "1px solid #d9d9d9",
        padding: "10px 20px",
      }}
    >
      <Row style={{ width: "100%" }}>
        <Col span={12} className="d-flex align-items-center">
          <img src={Logo} className="header-img" alt="Logo" />
        </Col>
        <Col span={12} className="d-flex justify-content-end">
          {isAuthenticated && (
            <Button
              type="primary"
              className="logout-button"
              onClick={() => {
                logoutUser();
              }}
            >
              Log out
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Header;
