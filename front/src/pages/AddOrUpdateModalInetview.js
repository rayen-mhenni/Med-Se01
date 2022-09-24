import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
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
import moment from "moment";
import { useHistory } from "react-router-dom";
import { isAuthenticated } from "../helpers/auth";
const { Option } = Select;
const AddOrUpdateModalInetview = (props) => {
  const { visible, onCancel } = props;

  const [form] = useForm();

  const [mails, setmails] = useState([]);
  const [list, setlist] = useState([]);
  const [children, setchildren] = useState([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      hist.push("/sign-in");
    }

    if (props?.record?.interv) {
      form.setFieldsValue({
        ...props.record,
        interv: props?.record.interv?.map((int) => int.email),
        date_entretient: moment(props.record.date_entretient),
      });
    }
    const config = {
      headers: {
        "content-type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    };

    axios
      .post("http://localhost:3017/api/getUserByRole", { role: "ALL" }, config)
      .then(function (response) {
        let children = [];
        response.data.forEach((element, i) => {
          children.push(<Option key={element.email}>{element.email}</Option>);
        });
        setchildren(children);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [form, props.record, props.visible]);

  const hist = useHistory();

  const handleChange = (values) => {
    let liste = [];
    values.forEach((element) => {
      liste.push({ email: element });
    });
    setlist(liste);
  };

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
      interv: list,
    };
    if (props.type === "EDIT") {
      await axios
        .put(
          "http://localhost:3017/api/updateEntretien/" + values.id,
          val,
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
    } else {
      console.log("tesztttttttttt ", values);
      await axios
        .post("http://localhost:3017/api/addEntretient", values, config)
        .then(function (response) {
          notification.success({ message: " Done  " });
          props.refetech();
          onCancel();
        })
        .catch(function (err) {
          props.refetech();
          notification.error({ message: " ERROR  " });
          onCancel();
        });
    }
  };

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
                  name="date_entretient"
                  rules={[
                    {
                      required: true,
                      message: "Please input your date_entretient!",
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: "Please input your status!",
                    },
                  ]}
                >
                  <Input placeholder="status" type="texte" />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="space-between" gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: "Please input your type!",
                    },
                  ]}
                >
                  <Input placeholder="type" type="texte" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="interview"
                  rules={[
                    { required: true, message: "Please input your interview!" },
                  ]}
                >
                  <Input placeholder="interview" type="text" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  name="interv"
                  rules={[
                    { required: true, message: "Please input your interv!" },
                  ]}
                >
                  <Select
                    mode="tags"
                    style={{ width: "100%" }}
                    size="large"
                    placeholder="Please select emails"
                    onChange={handleChange}
                  >
                    {children}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Modal>
      </div>
    </Form>
  );
};

export default AddOrUpdateModalInetview;
