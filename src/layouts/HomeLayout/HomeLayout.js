//Essentials
import React from "react";
//Components
import { Layout, BackTop, Avatar } from "antd";
import TopMenu from "../../components/TopMenu";
import Slider from "../../components/Slider";
import CustomFooter from "../../components/Footer";
import SocialMedia from "../../components/SocialMedia";
import { WhatsAppOutlined } from "@ant-design/icons";

//Routes
import HomeRoutes from "../../routes/HomeRoutes";

import "./HomeLayout.scss";

export default function HomeLayout() {
  const { Header, Content, Footer } = Layout;

  return (
    <div className="home-layout">
      <Layout>
        <Header className="home-layout-header">
          <TopMenu />
          <SocialMedia />
        </Header>
        <Content>
          <div className="home-layout-slider">
            <Slider />
          </div>
        </Content>
        <Content className="home-layout-content">
          <HomeRoutes />
          <div className="home-layout-content__whatsapp-icon">
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
          <BackTop />
        </Content>
        <Footer>
          <CustomFooter />
        </Footer>
      </Layout>
    </div>
  );
}
