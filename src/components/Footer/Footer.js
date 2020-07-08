import React from "react";
//Components
import { Divider } from "antd";
import { LinkedinOutlined } from "@ant-design/icons";
import { Parallax } from "rc-scroll-anim";

import "./Footer.scss";

export default function Footer() {
  return (
    <div className="footer">
      <Parallax
        always={false}
        animation={[{ y: -0, opacity: 1, playScale: [-0.1, 0.3] }]}
        style={{
          transform: "translateY(100px)",
          opacity: 0,
        }}
      >
        <h3>
          <b style={{ color: "#183059" }}>Donde encontrarnos?</b> En Av. Alem
          324, haz click{" "}
          <a
            href="https://goo.gl/maps/HYE5kS5in3CyqTHq7"
            target="_blank"
            rel="noopener noreferrer"
          >
            aqui
          </a>{" "}
          para ubicarnos en el mapa.
        </h3>
        <Divider />
        <p>
          Sitio web desarrollado por Francisco Barafani{" "}
          <a
            href="https://www.linkedin.com/in/francisco-barafani-57231b150/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinOutlined style={{ fontSize: "18px" }} />
          </a>{" "}
          .Todos los derechos reservados.
        </p>
      </Parallax>
    </div>
  );
}
