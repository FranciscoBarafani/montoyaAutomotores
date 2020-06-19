//Essentials
import React from "react";
//Components
import { Layout } from "antd";
import TopMenu from "../../components/TopMenu";
import Slider from "../../components/Slider";
import CustomFooter from "../../components/Footer";
import SocialMedia from "../../components/SocialMedia";
import WhatsappButton from "../../components/WhatsappButton";

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
        <div className="home-layout-slider">
          <Slider />
        </div>
        <Content className="home-layout-content">CONTENIDO</Content>
        <Footer>
          <CustomFooter />
        </Footer>
      </Layout>
    </div>
  );
}
