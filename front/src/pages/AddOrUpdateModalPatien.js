import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { notification } from "antd";
import Creatable from "react-select/creatable";
import Swal from "sweetalert2";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { isAuthenticated } from "../helpers/auth";
const { Option } = Select;
const AddOrUpdateModalPatient = (props) => {
  const { visible, onCancel } = props;

  const [form] = useForm();

  useEffect(() => {
    console.log("teswttt", props.record);
    if (!isAuthenticated()) {
      hist.push("/sign-in");
    }
    form.setFieldsValue({
      ...props.record,
      Date_of_birth: String(props.record.Date_of_birth).slice(0, 10),
    });
  }, [form, props.record, props.visible]);

  const hist = useHistory();

  const handleonfinish = async (val) => {
    const config = {
      headers: {
        "content-type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    };

    const values = {
      ...val,
      id: props.record._id,
    };

    await axios
      .put(
        "http://localhost:3017/api/updatepatient/" + values.id,
        values,
        config
      )
      .then(function (response) {
        notification.success({ message: "Update Done  " });
        props.refetech();
        onCancel();
      })
      .catch(function (err) {
        props.refetech();
        onCancel();
      });
  };
  const options = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];
  return (
    <Form form={form} onFinish={handleonfinish}>
      <div className="site-card-border-less-wrapper">
        <Modal
          title="Update"
          centered
          visible={visible}
          onOk={() => {
            form.submit();
          }}
          onCancel={onCancel}
        >
          <Card
            centered
            style={{
              width: "100%",
              height: "100%",
            }}
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
          </Card>
        </Modal>
      </div>
    </Form>
  );
};

export default AddOrUpdateModalPatient;
