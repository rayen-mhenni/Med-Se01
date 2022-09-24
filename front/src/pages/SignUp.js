import React, { useState } from "react";
import {
  Layout,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
  notification,
  Select,
  InputNumber,
  Radio,
  Row,
  Col,
} from "antd";
import GoogleMapReact from "google-map-react";
import { Footer } from "antd/lib/layout/layout";
import { Image } from "antd";
import logo from "../assets/images/ooo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
const { Title } = Typography;
const { Content } = Layout;

const SignUp = () => {
  const his = useHistory();

  const onFinish = async (values) => {
    if (values.remember === false)
      notification.error({ message: "please agree to ower term !" });
    else {
      console.log("Success:", values);
      const data = {
        ...values,
        Gender: values.gender.target.value,
      };
      const config = {
        headers: {
          "content-type": "application/json",
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      };

      await axios
        .post("http://localhost:3017/api/signUpPatient", data, config)
        .then((response) => {
          notification.success({ message: response.data.successMessage });
          his.push("/sign-in");
        })
        .catch((err) => {
          notification.error({ message: "check your data " });
          console.log(err);
        });
    }
  };
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  const onFinishFailed = (errorInfo) => {
    notification.error({ message: "check your data " });
  };
  const options = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];
  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content">
              <Title>Sign Up</Title>
              <p className="text-lg">Welcome</p>
            </div>
          </div>

          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            bordered="false"
          >
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="row-col"
            >
              <Row justify="space-between" gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="UserName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="UserName" type="texte" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="LastName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your LastName!",
                      },
                    ]}
                  >
                    <Input placeholder="LastName" type="texte" />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="space-between" gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="location"
                    rules={[
                      {
                        required: true,
                        message: "Please input your location!",
                      },
                    ]}
                  >
                    <Input placeholder="location" type="texte" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                    ]}
                  >
                    <Input placeholder="email" type="email" />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="space-between" gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    rules={[
                      { required: true, message: "Please input your pphone!" },
                    ]}
                  >
                    <InputNumber
                      style={{
                        width: "100%",
                        height: "40px",
                        border: "1px solid #d9d9d9",
                        borderRadius: "6px",
                      }}
                      placeholder="phone"
                      type="phone"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Contact_number"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Contact_number!",
                      },
                    ]}
                  >
                    <Input placeholder="Contact_number" type="tel" />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="space-between" gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="Nationality"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Nationality!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Nationality"
                      style={{
                        width: "100%",
                      }}
                      type="texte"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="gender"
                    rules={[
                      {
                        required: true,
                        message: "Please input your gender!",
                      },
                    ]}
                    valuePropName="radio"
                  >
                    <Radio.Group
                      options={options}
                      style={{ width: "100%" }}
                      buttonStyle="solid"
                      optionType="button"
                    ></Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="space-between" gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="Type_Analyse"
                    type="date"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Type_Analyse!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Type Analyse"
                      style={{
                        width: "100%",
                        height: "40px",
                        border: "1px solid #d9d9d9",
                        borderRadius: "6px",
                      }}
                      bordered={false}
                    >
                      <Select.Option value="Swab">Swab</Select.Option>
                      <Select.Option value="Spit">Spit</Select.Option>
                      <Select.Option value="Blood">Blood</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Date_of_birth"
                    type="date"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Date_of_birth!",
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "100%", height: "40px" }}
                      placeholder="Date_of_birth"
                      type="date"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="center">
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>
                    I agree the{" "}
                    <a href="#pablo" className="font-bold text-dark">
                      Terms and Conditions
                    </a>
                  </Checkbox>
                </Form.Item>
              </Row>
              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  SIGN UP
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Content>
      </div>
      <Footer
        style={{
          backgroundColor: "rgba(230, 230, 230, 1) ",
          paddingTop: "50px",
          zIndex: 4,
          position: "relative",
        }}
      >
        <Row>
          <Col span={12}>
            <Row>
              <Image src={logo} width="150px" />
            </Row>
            <br />
            <Row gutter={64}>
              <Col span={12}>
                <Row>
                  {" "}
                  <Typography.Text underline italic>
                    Contact us with Email:
                  </Typography.Text>{" "}
                </Row>

                <Row>
                  <Typography.Text strong>
                    {" "}
                    Abiomix.Abiomix@Abiomix.com{" "}
                  </Typography.Text>
                </Row>
                <Row>
                  <Typography.Text strong>
                    {" "}
                    Abiomix.Abiomix@Abiomix.com{" "}
                  </Typography.Text>
                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <Typography.Text underline italic>
                    Contact us with Phone:
                  </Typography.Text>{" "}
                </Row>
                <Row>
                  <Typography.Text strong>+216 58 913 468</Typography.Text>
                </Row>
                <Row>
                  {" "}
                  <Typography.Text strong>+216 58 913 468</Typography.Text>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col style={{ height: "30vh", width: "60%" }} span={12}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
              />
            </GoogleMapReact>
          </Col>
        </Row>
      </Footer>
    </>
  );
};
export default SignUp;
