import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Tablepatient from "./pages/Tablepatient";
import Interview from "./pages/Interview";
import Profile from "./pages/Profile";
import add_file from "./pages/add_file";
import SignUp from "./pages/SignUp";
import listVacation from "./pages/vacation/List";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
// import time from "./pages/TimeExecution";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import RestPassword from "./pages/RestPassword";
import vacation from "./pages/vacation/Vocation";
import configVacation from "./pages/vacation/configVacation";
import mail from "./pages/masse_mailing/mail";
import React, { useState } from "react";
import { Footer } from "antd/lib/layout/layout";
import { Col, Image, Row, Space, Typography } from "antd";
import logo from "./assets/images/ooo.png";
import GoogleMapReact from "google-map-react";
import bi from "./pages/visualisation/bi";
function App() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route
          exact
          path="/profile/ressetpass/:id/:token"
          component={RestPassword}
        />
        <>
          <Main>
            <Route exact path="/dashboard" component={Home} />
            <Route exact path="/tables" component={Tables} />
            <Route exact path="/Tablepatient" component={Tablepatient} />
            <Route exact path="/Interview" component={Interview} />
            <Route exact path="/profile" component={Profile} />

            <Route exact path="/add_file" component={add_file} />
            <Route exact path="/vacation" component={vacation} />

            <Route exact path="/listVacation" component={listVacation} />
            <Route exact path="/configVacation" component={configVacation} />
            <Route exact path="/mail" component={mail} />
            <Route exact path="/analyse" component={bi} />
          </Main>
          <Footer
            style={{
              backgroundColor: "rgba(230, 230, 230, 1) ",
              paddingTop: "50px",
              zIndex: 4,
              position: "relative",
            }}
          >
            <Row>
              <Col span={12}>
                <Row>
                  <Image src={logo} width="150px" />
                </Row>
                <br />
                <Row gutter={64}>
                  <Col span={12}>
                    <Row>
                      {" "}
                      <Typography.Text underline italic>
                        Contact us with Email:
                      </Typography.Text>{" "}
                    </Row>

                    <Row>
                      <Typography.Text strong>
                        {" "}
                        Abiomix.Abiomix@Abiomix.com{" "}
                      </Typography.Text>
                    </Row>
                    <Row>
                      <Typography.Text strong>
                        {" "}
                        Abiomix.Abiomix@Abiomix.com{" "}
                      </Typography.Text>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row>
                      <Typography.Text underline italic>
                        Contact us with Phone:
                      </Typography.Text>{" "}
                    </Row>
                    <Row>
                      <Typography.Text strong>+216 58 913 468</Typography.Text>
                    </Row>
                    <Row>
                      {" "}
                      <Typography.Text strong>+216 58 913 468</Typography.Text>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col style={{ height: "30vh", width: "60%" }} span={12}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: "" }}
                  defaultCenter={defaultProps.center}
                  defaultZoom={defaultProps.zoom}
                >
                  <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                  />
                </GoogleMapReact>
              </Col>
            </Row>
          </Footer>
        </>
      </Switch>
    </div>
  );
}

export default App;
