import React, { useEffect } from "react";

import { useState } from "react";

import {
  Row,
  Col,
  Table,
  Typography,
  Form,
  Card,
  notification,
  DatePicker,
  Select,
  Button,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import axios from "axios";
import TextArea from "antd/lib/input/TextArea";

const { Title } = Typography;
export default function Vocation() {
  const [hist, sethist] = useState([]);
  const [reload, setreload] = useState(false);
  const [form] = useForm();

  let year = new Date().getFullYear();
  const columns = [
    {
      title: "date debut",
      dataIndex: "startingDate",
      key: "startingDate",
      render: (val) => {
        return (
          <div className="avatar-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "12%",
    },
    {
      title: "endingDate",
      dataIndex: "endingDate",
      key: "endingDate",
      render: (val) => {
        return (
          <div className="avatar-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "12%",
    },
    {
      title: "type_vacation",
      dataIndex: "type_vacation",
      key: "type_vacation",
      render: (val) => {
        return (
          <div className="author-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "12%",
    },
    {
      title: "days",
      dataIndex: "days",
      render: (val, record) => {
        return (
          <div className="author-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "12%",
    },

    {
      title: "status",
      dataIndex: "status",
      render: (val, record) => {
        return (
          <div className="author-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },

      width: "12%",
    },
  ];

  function handleonfinish(values) {
    const config = {
      headers: {
        "content-type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    };

    axios
      .post(
        "http://localhost:3017/api/vacation",
        {
          startingDate: values.startdate,
          endingDate: values.enddate,
          type_vacation: values.type,
          message: values.facultative,
        },
        config
      )
      .then((response) => setreload(!reload))
      .catch((err) => console.log(err));
  }
  const config = {
    headers: {
      "content-type": "application/json",
      authorization: JSON.parse(localStorage.getItem("token")),
    },
  };
  useEffect(() => {
    axios
      .get("http://localhost:3017/api/historiqueVaccation", config)
      .then((reponse) => {
        if (reponse) {
          sethist(reponse.data.data);
        }
      });
  }, [reload]);

  return (
    <Form form={form} onFinish={handleonfinish} layout="vertical">
      <Row gutter={16}>
        <Col span={7}>
          <Card type="inner" size="small" title="Demande de congé">
            <Row justify="start" gutter={16}>
              <Col span={12}>
                <Form.Item label="date de debut" name="startdate">
                  <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="date de fin" name="enddate">
                  <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="type" name="type">
              <Select style={{ width: "100%" }}>
                <Select.Option value="maladie">maladie</Select.Option>
                <Select.Option value="normale">Normal</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Facultative" name="facultative">
              <TextArea rows={4} />
            </Form.Item>
            <Row>
              <Button
                type="primary"
                style={{ width: "100%" }}
                htmlType="submit"
              >
                envoyer
              </Button>
            </Row>
          </Card>
        </Col>
        <Col span={16}>
          <Card type="inner" size="small" title="Historique de congé">
            <Table
              columns={columns}
              dataSource={hist}
              pagination={{ responsive: true }}
            />
          </Card>
        </Col>
      </Row>
    </Form>
  );
}
