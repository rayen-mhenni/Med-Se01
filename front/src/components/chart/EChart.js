import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography, notification } from "antd";
import eChart from "./configs/eChart";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function EChart() {
  const { Title, Paragraph } = Typography;

  const [data, setdata] = useState([]);

  const getDatas = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    };

    await axios
      .get("http://localhost:3017/api/activeUser", data, config)
      .then((response) => {
        setdata(Object.values(response.data.months[0]));
      })
      .catch((err) => {
        //  notification.error({ message: "No Data " });
      });
  };

  useEffect(() => {
    getDatas();
  }, []);

  const items = [
    {
      Title: "3,6K",
      user: "Users",
    },
    {
      Title: "2m",
      user: "Clicks",
    },
    {
      Title: "3m",
      user: "Analyze",
    },
    {
      Title: "82",
      user: "Items",
    },
  ];

  const toto = [
    {
      name: "USERS",
      data: data,
      color: "#fff",
    },
  ];

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={toto}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Active Users</Title>

        {/* <Paragraph className="lastweek">
          ************* <span className="bnb2">+30%</span>
        </Paragraph>
        <Paragraph className="lastweek">
          ******************************************************
          *****************************************************
        </Paragraph> */}

        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;
