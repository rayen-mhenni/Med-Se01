import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";
import {
  Typography,
  Avatar,
  Row,
  Col,
  Table,
  Space,
  Button,
  Radio,
  Form,
  Card,
  Select,
  InputNumber,
  Image,
  Drawer,
  notification,
} from "antd";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
const { Title } = Typography;
const List = () => {
  const [Data, setData] = useState([]);
  const [selected, setSelected] = useState("");
  const [value, setValue] = useState(1);
  const [hist, sethist] = useState([]);
  const [reload, setreload] = useState(false);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  let year = new Date().getFullYear();

  const [form] = useForm();

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context("../../assets/uploads", false, /\.(png|jpg|jpe?g|svg)$/)
  );

  const columns = [
    {
      title: "User image",
      dataIndex: "Userimage",
      key: "name",
      render: (val, record) => {
        console.log();
        return (
          <Avatar.Group onChange={onChange} value={value}>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={70}
              icon={
                <Image
                  width={70}
                  height={70}
                  src={images[record.userId.userImage]?.default}
                  alt={record.userId.userImage}
                />
              }
            ></Avatar>
            <Title level={5}>{val}</Title>
            <p>{record.email}</p>
          </Avatar.Group>
        );
      },
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "UserName",
      key: "name",
      render: (val, record) => {
        return <Title level={5}>{record.userId.UserName}</Title>;
      },
      width: "10%",
    },

    {
      title: "date debut",
      dataIndex: "startingDate",
      key: "startingDate",
      render: (val) => {
        return <Title level={5}>{moment(val).format("YYYY-MM-DD")}</Title>;
      },
      width: "10%",
    },
    {
      title: "endingDate",
      dataIndex: "endingDate",
      key: "endingDate",
      render: (val) => {
        return <Title level={5}>{moment(val).format("YYYY-MM-DD")}</Title>;
      },
      width: "10%",
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
      width: "10%",
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
      width: "10%",
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

      width: "10%",
    },
    {
      dataIndex: "action",
      title: "Action",
      render: (val, record) => {
        return (
          <Space size="middle" direction="horizontal">
            <Button
              type="dashed"
              onClick={() => {
                handleUpdate("Accepted", record._id);
              }}
            >
              acceptez
            </Button>
            <Button
              type="primary"
              onClick={() => {
                handleUpdate("Refused", record._id);
              }}
            >
              refuser
            </Button>
          </Space>
        );
      },
      width: "10%",
    },
  ];
  const config = {
    headers: {
      "content-type": "application/json",
      authorization: JSON.parse(localStorage.getItem("token")),
    },
  };
  const handleUpdate = async (status, id) => {
    const data = {
      newStatus: status,
    };
    await axios
      .put(`http://localhost:3017/api/UpdateEtatAdmin/` + id, data)
      .then((res) => {
        setreload(true);
        handleSearch();
      })
      .catch();
  };

  const handleSearch = async () => {
    await axios
      .get(`http://localhost:3017/api/listVacation`, config)
      .then((resultat) => {
        if (resultat) {
          setData(resultat.data.vacations);
        }
      });
  };
  const [drawer, setdrawer] = useState(false);

  const onclosedrawer = () => {
    setdrawer(false);
  };
  const showdrawer = () => {
    setdrawer(true);
  };
  useEffect(() => {
    handleSearch();
  }, [reload]);

  function handleonfinish(values) {
    const config = {
      headers: {
        "content-type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    };

    axios
      .post(
        "http://localhost:3017/api/totaleVacation",
        {
          role: values.role,
          totale: values.maxday,
          type_vacation: values.type,
        },
        config
      )
      .then((response) => {
        notification.success({ message: "Settings done" });
        onclosedrawer();
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Card
        type="inner"
        size="small"
        title="List des congés"
        extra={
          <Button icon={<SettingOutlined />} onClick={showdrawer}>
            Parameters Congé
          </Button>
        }
      >
        <Table columns={columns} dataSource={Data} />
      </Card>
      <Drawer
        className="settings-drawer"
        mask={true}
        width={400}
        closeIcon={null}
        closable
        onClose={onclosedrawer}
        placement="right"
        visible={drawer}
      >
        <Form form={form} onFinish={handleonfinish} layout="vertical">
          <Card type="inner" size="small" title=" Parameters de congé">
            <Form.Item label="max congé de l'anneé (jour)" name="maxday">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="type" name="type">
              <Select style={{ width: "100%" }}>
                <Select.Option value="maladie">maladie</Select.Option>
                <Select.Option value="normale">Normal</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="role" name="role">
              <Select style={{ width: "100%" }}>
                <Select.Option value="analysta">analyse</Select.Option>
                <Select.Option value="makiting">markiting</Select.Option>
              </Select>
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
        </Form>
      </Drawer>
    </>
  );
};
export default List;
