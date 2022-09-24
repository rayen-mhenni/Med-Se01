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
} from "antd";
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
import AddOrUpdateModalPatient from "./AddOrUpdateModalPatien";
import { isAuthenticated } from "../helpers/auth";
const { Title } = Typography;
function Tablepatient() {
  const [data, setdata] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [refetech, setrefetech] = useState(false);
  const [key, setKey] = useState("");

  const [visibleE, setVisibleE] = useState(false);
  const [record, setrecord] = useState({});
  const { form } = useForm();

  const handrefetech = () => {
    setrefetech(!refetech);
  };

  const hist = useHistory();

  const columns = [
    {
      title: "Name",
      dataIndex: "UserName",
      key: "name",
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
      title: "Prénom",
      dataIndex: "LastName",
      key: "LastName",
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
      title: "email",
      dataIndex: "email",
      key: "email",
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
      title: "Mobile",
      dataIndex: "Contact_number",
      key: "Contact_number",
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
      title: "Nationality",
      dataIndex: "Nationality",
      render: (val, record) => {
        return (
          <div className="author-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "20%",
    },

    {
      title: "Date_of_birth",
      dataIndex: "Date_of_birth",
      render: (val, record) => {
        return (
          <div className="author-info">
            <Title level={5}>{val.toString().slice(0, 10)}</Title>
          </div>
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
                setVisibleE(true);
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
      .get("http://localhost:3017/api/getPatient", config)
      .then((res) => {
        setdata(res.data);
      })
      .catch(() => {
        notification.error({ message: " No user is found " });
      });
  }, [refetech]);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:3017/api/deletePatient/${id}`, config)
      .then(function (response) {
        handrefetech();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleSearch = async () => {
    setLoading(true);
    let resultat = await fetch(
      `http://localhost:3017/api/searchPatient/${key ? key : "all"}`,
      config
    );

    await resultat
      .json()
      .then((resultat) => {
        if (resultat) {
          setLoading(false);
          setdata(resultat);
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <div className="tabled">
      <Card>
        <Row justify="end" gutter={16}>
          <Col span={4}>
            <Input
              style={{ width: "100%" }}
              onChange={(e) => {
                setKey(e.target.value);
              }}
            />
          </Col>
          <Col span={2}>
            <Button
              icon={<SearchOutlined />}
              type="primary"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Col>
        </Row>
        <Row justify="start">
          <Typography.Text strong>
            <Link to="/sign-up">Create New Patient</Link>
          </Typography.Text>
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
        visible={visibleE}
        record={record}
        refetech={handrefetech}
        onCancel={() => setVisibleE(false)}
      />
    </div>
  );
}

export default Tablepatient;
