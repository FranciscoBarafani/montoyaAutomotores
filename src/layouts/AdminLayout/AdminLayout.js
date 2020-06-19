//Essentials
import React, { useState } from "react";
//Components
import { Layout, Menu, message } from "antd";
import LoginForm from "../../forms/LoginForm";
//Firebase
import firebase from "../../utils/Firebase";
import "firebase/auth";
//Routes
import AdminRoutes from "../../routes/AdminRoutes";

import "./AdminLayout.scss";

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { Header, Content, Sider } = Layout;

  //Log In Function
  const onSubmit = (email, password) => {
    setIsLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        message.success("Inicio de Sesión Correcto.");
        setUser(response.user);
      })
      .catch(() => {
        message.error("Usuario o Contraseña incorrectos.");
      })
      .finally(() => setIsLoading(false));
  };

  //Log Out Function
  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        message.info("Has cerrado sesión.");
        setUser(null);
      })
      .catch(() => message.error("Error al cerrar sesión."));
  };

  return (
    <div className="admin-Layout">
      {user ? (
        <Layout>
          <Header className="header">
            <h2>Menu Administrador</h2>
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <Menu.Item key="1">Administrar Vehiculos</Menu.Item>
                <Menu.Item key="2" onClick={logOut}>
                  Cerrar Sesión
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <AdminRoutes />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      ) : (
        <LoginForm isLoading={isLoading} onSubmit={onSubmit} />
      )}
    </div>
  );
}
