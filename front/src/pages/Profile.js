import { useState, useEffect, React } from "react";
import axios from "axios";

import {
  Row,
  Col,
  Card,
  Button,
  List,
  notification,
  Descriptions,
  Avatar,
  Radio,
  Image,
  Switch,
  Upload,
  message,
  Form,
  Input,
  Space,
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/profil.jpg";
import { formatCountdown } from "antd/lib/statistic/utils";
import { useForm } from "antd/lib/form/Form";
import { isAuthenticated } from "../helpers/auth";
import { useHistory } from "react-router-dom";

function Profile() {
  const [Editable, setEditable] = useState(false);
  const [Loading, setLoading] = useState(false);

  const [form] = useForm();
  const [user, setuser] = useState({});
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      authorization: JSON.parse(localStorage.getItem("token")),
    },
  };

  const hist = useHistory();

  useEffect(() => {
    if (!isAuthenticated()) {
      hist.push("/sign-in");
    }

    const uu = JSON.parse(localStorage.getItem("user"));
    setuser(JSON.parse(localStorage.getItem("user")));
    console.log("testttt", uu);
    form?.setFieldsValue({
      UserName: uu?.UserName,
      LastName: uu?.LastName,
      email: uu?.email,
      phone: uu?.phone,
      location: uu?.location,
    });
  }, []);

  const handleUpdate = (values) => {
    console.log(
      "ooooooooooooo",
      values,
      form.getFieldValue("LastName"),
      JSON.parse(localStorage.getItem("token"))
    );

    axios
      .put(
        "http://localhost:3017/api/UpdateUser/" + user.id,
        {
          UserName: values.UserName,
          LastName: values.LastName,
          userImage: form.getFieldValue("UserImage"),
          phone: values.phone,
          location: values.location,
          email: values.email,
        },
        config
      )
      .then((res) => {
        notification.success({ message: "Update done with success" });
        localStorage.setItem(
          "user",
          JSON.stringify({ ...res.data, id: user.id })
        );
        console.log("tttttttttttttttt", { ...user, ...res.data });
        setuser({ ...user, ...res.data });
      })
      .catch(() => {
        notification.error({ message: "Error" });
      });
  };

  const pencil = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>
  );

  console.log("testtt", JSON.parse(localStorage.getItem("user")));
  // if (JSON.parse(localStorage.getItem("user"))?.userImage) {
  //   image = require("C:/project/back/images/" +
  //     JSON.parse(localStorage.getItem("user"))?.userImage);
  //   console.log("testtt", "C:/project/back/images/" + user?.userImage);
  // }

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

  return (
    <Form
      form={form}
      initialValues={{
        UserName: "",
        LastName: "",
        UserImage: "",
        phone: "",
        location: "",
        email: "",
      }}
      onFinish={(values) => {
        handleUpdate(values);
      }}
    >
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar
                  size={74}
                  icon={
                    <Image
                      width={70}
                      height={70}
                      src={images[user.userImage]?.default}
                      alt={user.userImage}
                    />
                  }
                  shape="square"
                ></Avatar>

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{user?.UserName}</h4>
                  <p>{user?.role}</p>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={24} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Profile Information</h6>}
            className="header-solid h-full card-profile-information"
            extra={
              !Editable ? (
                <Button
                  type="link"
                  onClick={() => {
                    setEditable(!Editable);
                  }}
                >
                  {pencil}
                </Button>
              ) : (
                <Button
                  type="link"
                  icon={<SaveOutlined />}
                  onClick={() => {
                    setEditable(!Editable);
                    form.submit();
                  }}
                  size="large"
                />
              )
            }
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <Descriptions title="">
              <Descriptions.Item label="Full Name" span={3}>
                {!Editable ? (
                  user?.UserName + " " + user?.LastName
                ) : (
                  <>
                    <Form.Item name="UserName">
                      <Input
                        size="small"
                        placeholder="useName"
                        style={{ height: "2rem" }}
                      />
                    </Form.Item>
                    &nbsp;
                    <Form.Item name="LastName">
                      <Input
                        size="small"
                        placeholder="LastName"
                        style={{ height: "2rem" }}
                      />
                    </Form.Item>
                  </>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Mobile" span={3}>
                {!Editable ? (
                  user?.phone
                ) : (
                  <Form.Item name="phone">
                    <Input size="small" style={{ height: "2rem" }} />
                  </Form.Item>
                )}
                {/* desx : components antd .item houwa appel lih yesama child */}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {!Editable ? (
                  user?.email
                ) : (
                  <Form.Item name="email">
                    <Input size="small" style={{ height: "2rem" }} />
                  </Form.Item>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Location" span={3}>
                {!Editable ? (
                  user?.location
                ) : (
                  <Form.Item name="location">
                    <Input size="small" style={{ height: "2rem" }} />
                  </Form.Item>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Image" span={3}>
                {Editable ? (
                  <Upload
                    onChange={({ file, fileList }) => {
                      try {
                        if (file.status !== "uploading") {
                          console.log("filee", file);

                          var bodyFormData = new FormData();

                          bodyFormData.append("userImage", file.originFileObj);
                          form.setFieldsValue({
                            UserImage: file.originFileObj.name,
                          });

                          axios({
                            method: "post",
                            url: "http://localhost:3017/api/upload",
                            data: bodyFormData,
                            headers: { "Content-Type": "multipart/form-data" },
                          })
                            .then(function (respnse) {
                              //handle success
                              console.log(respnse);
                              setuser({
                                ...user,
                                userImage: file.originFileObj.name,
                              });
                            })
                            .catch(function (response) {
                              //handle error
                              console.log(response);
                              setuser({
                                ...user,
                                userImage: file.originFileObj.name,
                              });
                            });
                        }
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                    progress={{
                      strokeColor: {
                        "0%": "#108ee9",
                        "100%": "#87d068",
                      },
                      strokeWidth: 3,
                      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                ) : (
                  <Image
                    width={100}
                    src={images[user.userImage]?.default}
                    alt={user.userImage}
                  />
                )}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </Form>
  );
}

export default Profile;
