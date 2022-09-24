import {
  Button,
  Card,
  Col,
  Divider,
  notification,
  Row,
  Select,
  Switch,
  Typography,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { isAuthenticated } from "../../helpers/auth";
import emailjs from "@emailjs/browser";

const Mail = () => {
  const [mails, setmails] = useState([]);
  const [children, setchildren] = useState([]);
  const [content, setcontent] = useState("");
  const { Option } = Select;
  const hist = useHistory();

  useEffect(() => {
    if (!isAuthenticated()) {
      hist.push("/sign-in");
    }

    const config = {
      headers: {
        "content-type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    };

    axios
      .get("http://localhost:3017/api/getAllMails", config)
      .then(function (response) {
        console.log("eeeeeeee", response);
        let children = [];
        response.data.forEach((element, i) => {
          children.push(<Option key={element.email}>{element.email}</Option>);
        });
        setchildren(children);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  const handleChange = (values) => {
    setmails(values);
  };
  const handleSend = async () => {
    mails.forEach(async (mail) => {
      let templateParams = {
        Email: mail,
        message: content,
      };

      await emailjs
        .send(
          "service_lax6oim",
          "template_l9aj1af",
          templateParams,
          "2px2VWavqAkVhK_w2"
        )
        .then((result) => {
          if (mail === mails[mails.length - 1])
            notification.success({ message: "Done" });
        });
    });
  };

  return (
    <Card
      style={{ textAlign: "center" }}
      title={<Typography.Title level={2}>Mass Mailing</Typography.Title>}
      type="inner"
    >
      <Divider>
        <Typography.Title level={5}>Select emails</Typography.Title>
      </Divider>
      <Row justify="space-around">
        <Col span={21}>
          <Select
            mode="tags"
            size="middle"
            placeholder="Please select emails"
            onChange={handleChange}
            style={{ width: "100%" }}
            value={mails}
          >
            {children}
          </Select>
        </Col>
        <Col span={2}>
          <Switch
            onChange={(val) => {
              if (val) setmails(children);
              else setmails([]);
            }}
            style={{ width: "100%" }}
            checkedChildren="ALL"
            unCheckedChildren="MULTIPLE"
          ></Switch>
        </Col>
      </Row>
      <Divider>
        <Typography.Title level={5}>Content</Typography.Title>
      </Divider>
      <Row>
        <TextArea
          rows={10}
          onChange={(val) => {
            setcontent(val.target.value);
          }}
        ></TextArea>
      </Row>
      <br />
      <Row>
        <Button onClick={handleSend} style={{ width: "100%" }} type="primary">
          Send
        </Button>
      </Row>
    </Card>
  );
};
export default Mail;
