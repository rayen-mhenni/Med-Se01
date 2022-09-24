import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  notification,
} from "antd";

import { useHistory } from "react-router-dom";
import { isAuthenticated } from "../helpers/auth";

function RestPassword() {
  const [newpassword, setnewpassword] = useState("");

  let { id, token } = useParams();

  const hist = useHistory();

  const resetpassword = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
    };
    await axios
      .put(
        "http://localhost:3017/api/updatepass/" + id,
        { password: newpassword, token },
        config
      )
      .then((data) => {
        notification.success({ message: "Done" });
        localStorage.clear();
        hist.push("/sign-in");
      })
      .catch((error) => {
        console.log(error);
        notification.error({ message: "check your data" });
      });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center h-100">
        <div className="card">
          <div className="card-header">
            <h3>Reset Your Password </h3>
            <div className="d-flex justify-content-end social_icon"></div>
          </div>
          <div className="card-body">
            <Form style={{ width: "90%" }} layout="vertical">
              <Form.Item
                className="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="NewPassword"
                  name="NewPassword"
                  type="password"
                  onChange={(e) => setnewpassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" onClick={resetpassword}>
                  UPDATE
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestPassword;
