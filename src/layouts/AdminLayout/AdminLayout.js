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
  const [user, setUser] = useState(true);
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
            <h2 style={{ color: "white" }}>Menu Administrador</h2>
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <Menu.Item key="1">
                  <a href="/admin">Administrar Vehiculos</a>
                </Menu.Item>
                <Menu.Item key="2" onClick={logOut}>
                  Cerrar Sesión
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Content className="site-layout-background">
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
