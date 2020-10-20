//Essentials
import React, {useState, useEffect} from "react";
//Firebase
import firebase from "../../utils/Firebase";
//Components
import { Avatar, Row, message } from "antd";
import TopMenu from "../../components/TopMenu";
import CustomFooter from "../../components/Footer";
import SocialMedia from "../../components/SocialMedia";
import { WhatsAppOutlined } from "@ant-design/icons";
import Loading from "../../components/Loading"

//Routes
import HomeRoutes from "../../routes/HomeRoutes";

import "./HomeLayout.scss";

export default function HomeLayout() {
  const [isSignedInAnonymously, setisSignedInAnonymously] = useState(false);
  
  //Firebase Sign In Annonymously
  useEffect(() => {
    firebase.auth().signInAnonymously()
    .then(() => {
      setisSignedInAnonymously(true)})
      .catch(() => message.error("Error al cargar página, por favor intentelo nuevamente"));
  }, []);

  return (
    <div className="home-layout">
      <Row className="home-layout__header" justify="space-between">
        <TopMenu />
        <SocialMedia />
      </Row>
      <Row className="home-layout__content" align="middle" justify="center">
        {isSignedInAnonymously ? <HomeRoutes /> : <Loading />}
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
