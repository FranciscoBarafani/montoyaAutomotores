import React from "react";

//Components
import { Menu } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/MontoyaLogo.svg";

import "./TopMenu.scss";

export default function TopMenu() {
  return (
    <div className="top-menu">
      <img src={Logo} alt="logo" />
      <Menu mode="horizontal" theme="dark">
        <Menu.Item>
          <Link to="/home">Principal</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/home/about">Quienes Somos?</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}
