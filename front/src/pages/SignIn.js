import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import emailjs from "@emailjs/browser";

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

import { isAuthenticated, setAuthentication } from "../helpers/auth";

import signinbg from "../assets/images/SGimg.svg";
import axios from "axios";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { useContext } from "react";
import { AuthContext } from "../App";
const SignIn = () => {
  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }
  const { Title } = Typography;
  const { Content } = Layout;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const hist = useHistory();

  const onFinish = async () => {
    const data = {
      email: email,
      password: password,
    };
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    await fetch("http://localhost:3017/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      response.json().then((response) => {
        if (response.token) {
          console.log("testtt", response);
          setAuthentication(response?.token, response?.user);
          notification.success({ message: response?.message });
          hist.push("/dashboard");
        } else {
          notification.error({ message: response?.error.message });
        }
      });
    });
  };

  const resetpassword = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    };

    await axios
      .post("http://localhost:3017/api/request/password", { email }, config)
      .then((data) => {
        let templateParams = {
          name: "Mr or Mm",
          Email: email,
          message: `http://localhost:3000/profile/ressetpass/${data.data._id}/${data.data.token}`,
        };

        emailjs
          .send(
            "service_pk0af5q",
            "template_lnq0ocu",
            templateParams,
            "user_TjkkGMETOdkygzIZjLVGS"
          )
          .then(
            (result) => {
              notification.success({ message: "Check you Email" });
            },
            (error) => {
              notification.error({ message: error.text });
            }
          );
      })
      .catch((error) => {
        notification.error({ message: "Email Not Found " });
      });
  };

  const handleLogin = async (googleData) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    console.log("token", googleData.tokenId);

    await axios
      .post(
        "http://localhost:3017/api/google-login",
        { token: googleData.tokenId },
        config
      )
      .then(async (result) => {
        const data = result.json();
        await axios
          .post(
            "http://localhost:3017/api/loginGoogle",
            { email: data.email },
            config
          )
          .then((result) => {
            localStorage.setItem("user", JSON.stringify(result.data.user));
            localStorage.setItem("token", JSON.stringify(result.data.token));
          })
          .catch(() => {
            notification.error({ message: "check your Email " });
          });
      })
      .catch(() => {
        notification.error({ message: "Error Service Google" });
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Layout className="layout-default">
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 7, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15"> Connectez-vous</Title>

              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Email"
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  className="username"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="remember"
                  className="aligin-center"
                  valuePropName="checked"
                >
                  <Switch defaultChecked onChange={onChange} />
                  Remember me
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    SIGN IN
                  </Button>
                </Form.Item>

                <Button
                  type="default"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  onClick={() => {
                    hist.push("/sign-up");
                  }}
                >
                  SignUp Patient
                </Button>

                <Form.Item>
                  <a onClick={resetpassword}> Forget password ?</a>
                </Form.Item>
                <Form.Item>
                  <GoogleLogin
                    clientId={
                      "913791692427-7op1mas3df4pt1fikad6pli7njalnov2.apps.googleusercontent.com"
                    }
                    buttonText="login with Google"
                    onSuccess={handleLogin}
                    onFailure={() => {
                      notification.error({ message: "google failure" });
                    }}
                    cookiePolicy={"single_host_origin"}
                  ></GoogleLogin>
                </Form.Item>
              </Form>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default SignIn;
