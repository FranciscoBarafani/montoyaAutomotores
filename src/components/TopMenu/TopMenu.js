import React from "react";

//Components
import { Menu } from "antd";

export default function TopMenu() {
  return (
    <div className="top-menu">
      <Menu mode="horizontal" theme="dark">
        <Menu.Item>
          <a href="/home">Home</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/quienes-somos">Quienes Somos?</a>
        </Menu.Item>
      </Menu>
    </div>
  );
}
