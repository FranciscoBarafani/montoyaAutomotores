import React from "react";

//Components
import { Menu } from "antd";

export default function TopMenu() {
  return (
    <div className="top-menu">
      <Menu mode="horizontal" theme="dark">
        <Menu.Item>Home</Menu.Item>
        <Menu.Item>Quienes Somos?</Menu.Item>
      </Menu>
    </div>
  );
}
