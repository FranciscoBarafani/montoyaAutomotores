import React from "react";

//Components
import { Menu } from "antd";

import "./TopMenu.scss";

export default function TopMenu() {
  return (
    <div className="top-menu">
      <Menu mode="horizontal">
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
