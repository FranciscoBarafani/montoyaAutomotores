import React from "react";
//Icons
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

import "./SocialMedia.scss";

export default function SocialMedia() {
  return (
    <div class="social-media">
      <a
        href="https://www.facebook.com/Montoyaautomotores"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Avatar
          size={50}
          shape="circle"
          icon={<FacebookOutlined style={{ backgroundColor: "transparent" }} />}
        />
      </a>
      <a
        href="https://www.instagram.com/montoyaautomotores/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Avatar
          size={50}
          shape="circle"
          icon={
            <InstagramOutlined style={{ backgroundColor: "transparent" }} />
          }
        />
      </a>
    </div>
  );
}
