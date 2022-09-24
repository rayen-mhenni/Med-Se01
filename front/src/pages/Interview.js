import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
  Space,
  Tag,
  Tooltip,
  Modal,
  Form,
  Input,
  notification,
  List,
} from "antd";
import moment from "moment";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import {
  EditOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import AddOrUpdateModalPatient from "./AddOrUpdateModalInetview";
import { isAuthenticated } from "../helpers/auth";
const { Title } = Typography;
function Interview() {
  const [data, setdata] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [refetech, setrefetech] = useState(false);
  const [visibleIn, setvisibleIn] = useState(false);
  const [visibleInE, setvisibleInE] = useState(false);
  const [record, setrecord] = useState({});

  const handrefetech = () => {
    setrefetech(!refetech);
  };

  const hist = useHistory();

  const columns = [
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (val) => {
        return (
          <div className="avatar-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "20%",
    },

    {
      title: "date_entretient",
      dataIndex: "date_entretient",
      key: "date_entretient",
      render: (val) => {
        return (
          <div className="avatar-info">
            <Title level={5}>{moment(val).format("YYYY-MM-DD")}</Title>
          </div>
        );
      },
      width: "20%",
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
      render: (val) => {
        return (
          <div className="avatar-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "20%",
    },
    {
      title: "interview",
      dataIndex: "interview",
      key: "interview",
      render: (val) => {
        return (
          <div className="author-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "20%",
    },
    {
      title: "interv",
      dataIndex: "interv",
      render: (val, record) => {
        return (
          <ul>
            {val.map((elem) => (
              <div className="author-info">
                <li>{elem.email}</li>
              </div>
            ))}
          </ul>
        );
      },
      width: "20%",
    },
    {
      title: "Action ",

      render: (row, record) => {
        return (
          <Space size="middle" direction="horizontal">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={(e) => {
                setrecord(record);
                setvisibleInE(true);
              }}
            >
              Edit
            </Button>
            <Button danger onClick={() => handleDelete(row._id)}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const config = {
    headers: {
      "content-type": "application/json",
      authorization: JSON.parse(localStorage.getItem("token")),
    },
  };
  useEffect(() => {
    if (!isAuthenticated()) {
      hist.push("/sign-in");
    }

    axios
      .get("http://localhost:3017/api/getEntretient", config)
      .then((res) => {
        setdata(res.data);
      })
      .catch(() => {
        notification.error({ message: " No interview is found " });
      });
  }, [refetech]);

  const handleDelete = async (id) => {
    await axios
      .get("http://localhost:3017/api/deleteEntretient/" + id, config)
      .then(function (response) {
        handrefetech();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div className="tabled">
      <Card>
        <Row justify="end">
          <Tooltip title="Add">
            <Button
              type="primary"
              shape="circle"
              icon={
                <PlusOutlined
                  style={{
                    position: "relative",
                    margin: "5px 0px 5px 5px",
                  }}
                />
              }
              size="large"
              onClick={() => {
                setvisibleIn(true);
              }}
            />
          </Tooltip>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col span={24}>
            <Table
              columns={columns}
              loading={Loading}
              dataSource={data}
              pagination={{ responsive: true }}
            />
          </Col>
        </Row>
      </Card>
      <AddOrUpdateModalPatient
        visible={visibleIn}
        record={record}
        type="ADD"
        refetech={handrefetech}
        onCancel={() => setvisibleIn(false)}
      />
      <AddOrUpdateModalPatient
        visible={visibleInE}
        record={record}
        type="EDIT"
        refetech={handrefetech}
        onCancel={() => setvisibleInE(false)}
      />
    </div>
  );
}

export default Interview;
