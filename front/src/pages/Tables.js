import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  Image,
  message,
  Button,
  Avatar,
  Typography,
  Space,
  Tag,
  Tooltip,
  Form,
  notification,
} from "antd";
import Swal from "sweetalert2";
import {
  EditOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import AddOrUpdateModal from "./AddOrUpdateModal";
import { isAuthenticated } from "../helpers/auth";

const { Title } = Typography;
function Tables() {
  const [visible, setVisible] = useState(false);
  const [visibleE, setVisibleE] = useState(false);
  const [record, setrecord] = useState({});
  const [data, setdata] = useState([]);
  const [role, setRole] = useState("ALL");
  const [refetech, setrefetech] = useState(false);

  const { form } = useForm();

  const hist = useHistory();

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context("../assets/uploads", false, /\.(png|jpg|jpe?g|svg)$/)
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "UserName",
      key: "name",
      render: (val, record) => {
        return (
          <Avatar.Group>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={70}
              icon={
                <Image
                  width={70}
                  height={70}
                  src={images[record.userImage]?.default}
                  alt={record.userImage}
                />
              }
            ></Avatar>
            <div className="avatar-info">
              <Title level={5}>{val}</Title>
              <p>{record.email}</p>
            </div>
          </Avatar.Group>
        );
      },
      width: "13%",
    },
    {
      title: "LastName",
      dataIndex: "LastName",
      key: "LastName",
      render: (val, record) => {
        return (
          <div className="author-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "13%",
    },
    {
      title: "Mobile",
      dataIndex: "phone",
      key: "phone",
      render: (val, record) => {
        return (
          <div className="author-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "13%",
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
      render: (val) => {
        return (
          <div className="avatar-info">
            <Title level={5}>{val}</Title>
          </div>
        );
      },
      width: "13%",
    },
    {
      title: "role",
      dataIndex: "role",
      render: (val, record) => {
        return (
          <div className="author-info">
            <Title level={5}>{val}</Title>
            <p>{record.org}</p>
          </div>
        );
      },
      width: "13%",
    },

    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (val, record) => {
        return val === "BLOCKED" ? (
          <Tag icon={<CloseCircleOutlined />} color="error">
            {val}
            {/* check API status when comparing the status VALID,BLOCKED....!!! */}
          </Tag>
        ) : (
          <Tag icon={<CheckCircleOutlined />} color="success">
            {val}
          </Tag>
        );
      },
      width: "13%",
    },

    {
      title: "Action",
      dataIndex: "Action",
      render: (val, record) => {
        return (
          <Space size="middle" direction="horizontal">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.preventDefault();
                setrecord(record);
                setVisibleE(true);
              }}
            >
              Edit
            </Button>
            <Button
              danger
              onClick={(e) => {
                e.preventDefault();
                heldeDelete(record._id);
              }}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const handrefetech = () => {
    setrefetech(!refetech);
  };
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
      .post("http://localhost:3017/api/getUserByRole", { role: role }, config)
      .then(function (response) {
        console.log("eeeeeeee", response);
        setdata(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [role, refetech]);

  const heldeDelete = async (_id) => {
    const config = {
      headers: {
        "content-type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        notification.success({ message: "deleted" });
        axios
          .delete("http://localhost:3017/api/deleteUser/" + _id, config)
          .then(function (response) {
            axios
              .post(
                "http://localhost:3017/api/getUserByRole",
                { role: role },
                config
              )
              .then(function (response) {
                console.log("eeeeeeee", response);
                setdata(response.data);
              })
              .catch(function (err) {
                console.log(err);
              });
          })
          .catch(function (err) {
            notification.error({ message: "Delete Error" });
          });
      }
    });
  };

  return (
    <Form form={form}>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="List Of Users"
              extra={
                <Space size="middle" direction="horizontal">
                  <Radio.Group
                    onChange={(e) => {
                      setRole(e.target.value);
                      console.log("aaaa", e);
                    }}
                    defaultValue="ALL"
                  >
                    <Radio.Button value="ALL" name="role">
                      ALL
                    </Radio.Button>
                    <Radio.Button value="makiting" name="role">
                      Marketing
                    </Radio.Button>
                    <Radio.Button value="analysta" name="role">
                      Analyste
                    </Radio.Button>
                  </Radio.Group>
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
                        setVisible(true);
                      }}
                    />
                  </Tooltip>
                </Space>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={true}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <AddOrUpdateModal
        visible={visibleE}
        record={record}
        refetech={handrefetech}
        onCancel={() => setVisibleE(false)}
        type="EDIT"
      />
      <AddOrUpdateModal
        visible={visible}
        refetech={handrefetech}
        onCancel={() => setVisible(false)}
        type="ADD"
      />
    </Form>
  );
}

export default Tables;
