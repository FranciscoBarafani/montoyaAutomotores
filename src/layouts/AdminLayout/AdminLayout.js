//Essentials
import React from "react";
//Components
import { Layout, Menu } from "antd";

//Routes
import AdminRoutes from "../../routes/AdminRoutes";

import "./AdminLayout.scss";

export default function AdminLayout() {
  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout;

  return (
    <div className="admin-Layout">
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
              <SubMenu key="sub1" title="subnav 1">
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
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
    </div>
  );
}
