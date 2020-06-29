//Essentials
import React from "react";
//Components
import { Avatar, Row } from "antd";
import TopMenu from "../../components/TopMenu";
import Slider from "../../components/Slider";
import CustomFooter from "../../components/Footer";
import SocialMedia from "../../components/SocialMedia";
import { WhatsAppOutlined } from "@ant-design/icons";

//Routes
import HomeRoutes from "../../routes/HomeRoutes";

import "./HomeLayout.scss";

export default function HomeLayout() {
  return (
    <div className="home-layout">
      <Row
        className="home-layout__header"
        align="bottom"
        justify="space-between"
      >
        <TopMenu />
        <SocialMedia />
      </Row>
      <Row className="home-layout__slider" align="top" justify="center">
        <Slider />
      </Row>
      <Row className="home-layout__content" align="middle" justify="center">
        <HomeRoutes />
      </Row>
      <Row className="home-layout__footer" align="middle" justify="center">
        <CustomFooter />
      </Row>
      <div className="home-layout__content-whatsapp-icon">
        <a
          href="https://wa.me/5493516235746"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Avatar
            size={60}
            shape="circle"
            icon={
              <WhatsAppOutlined
                style={{ color: "white", backgroundColor: "transparent" }}
              />
            }
          />
        </a>
      </div>
    </div>
  );
}
