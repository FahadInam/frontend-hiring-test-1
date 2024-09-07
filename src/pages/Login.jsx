import React, { useState } from "react";
import apiHandler from "../utils/apiHandler";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/userSlice";
import { Card, Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await apiHandler("login", {
        username: values.email,
        password: values.password,
      });
      const { access_token, refresh_token, user } = response;
      dispatch(login({ access_token, refresh_token, user }));
      toast.success("Logged In Successfully!");
      navigate("/calls");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center login-content">
      <Card bordered={false} className="login-card">
        <Form
          name="loginForm"
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ email, password }}
        >
          <Form.Item
            label="User Name"
            name="email"
            labelCol={{ className: "pb-4" }}
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#000000" }} />}
              placeholder="Email"
              value={email}
              className="py-2 rounded-1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            labelCol={{ className: "pb-4 " }}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#000000" }} />}
              placeholder="Password"
              value={password}
              className="py-2 rounded-1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block={false}
              className="py-3 rounded-1 fs-6 fw-medium"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
      </Card>
    </div>
  );
};

export default Login;
