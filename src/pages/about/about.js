import React from "react";
//Components
import { Row, Col } from "antd";
import {
  SmileOutlined,
  DollarCircleOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import Logo from "../../assets/images/MontoyaLogoBig.svg";
import { Parallax } from "rc-scroll-anim";

import "./about.scss";

export default function About() {
  return (
    <div className="about">
      <Row justify="space-around" align="middle">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Parallax
            always={false}
            animation={[{ y: -0, opacity: 1, playScale: [0, 0.5] }]}
            style={{
              transform: "translateY(100px)",
              opacity: 0,
            }}
          >
            <img src={Logo} alt={"Logo"} />
          </Parallax>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Row>
            <Parallax
              always={false}
              animation={[{ y: -0, opacity: 1, playScale: [0, 0.5] }]}
              style={{
                transform: "translateY(100px)",
                opacity: 0,
              }}
            >
              <h2>
                Somos <b style={{ color: "#183059" }}>Montoya Automotores</b>,
                una concesionaria familiar con más de ocho años en el rubro.
                Ubicados en
                <a
                  href="https://goo.gl/maps/HYE5kS5in3CyqTHq7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <u> Av. Alem 324</u>{" "}
                </a>
                nos dedicamos a la compra y venta de automotores semi-nuevos y
                usados en muy buen estado. Nuestro catálogo esta compuesto por
                vehículos de primera y segunda mano con el mejor precio de lista
                asegurado.
              </h2>
            </Parallax>
          </Row>
          <Row align="middle" justify="center">
            <Parallax
              always={false}
              animation={[{ y: -0, opacity: 1, playScale: [0, 0.5] }]}
              style={{
                transform: "translateY(100px)",
                opacity: 0,
              }}
            >
              <h2>En Montoya Automotores te garantizamos:</h2>
            </Parallax>
          </Row>
          <Row>
            <Col span={8}>
              <Parallax
                always={false}
                animation={[{ y: -0, opacity: 1, playScale: [0, 0.3] }]}
                style={{
                  transform: "translateY(100px)",
                  opacity: 0,
                }}
              >
                <SmileOutlined style={{ fontSize: "50px", color: "#183059" }} />
              </Parallax>
            </Col>
            <Col span={8}>
              <Parallax
                always={false}
                animation={[{ y: -0, opacity: 1, playScale: [0, 0.3] }]}
                style={{
                  transform: "translateY(100px)",
                  opacity: 0,
                }}
              >
                <DollarCircleOutlined
                  style={{ fontSize: "50px", color: "#183059" }}
                />
              </Parallax>
            </Col>
            <Col span={8}>
              <Parallax
                always={false}
                animation={[{ y: -0, opacity: 1, playScale: [0, 0.3] }]}
                style={{
                  transform: "translateY(100px)",
                  opacity: 0,
                }}
              >
                <LineChartOutlined
                  style={{ fontSize: "50px", color: "#183059" }}
                />
              </Parallax>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Parallax
                always={false}
                animation={[{ y: -0, opacity: 1, playScale: [0, 0.3] }]}
                style={{
                  transform: "translateY(100px)",
                  opacity: 0,
                }}
              >
                <h3>
                  <b>La mejor Atencion</b>
                </h3>
              </Parallax>
            </Col>
            <Col span={8}>
              <Parallax
                always={false}
                animation={[{ y: -0, opacity: 1, playScale: [0, 0.3] }]}
                style={{
                  transform: "translateY(100px)",
                  opacity: 0,
                }}
              >
                <h3>
                  <b>El mejor precio</b>
                </h3>
              </Parallax>
            </Col>
            <Col span={8}>
              <Parallax
                always={false}
                animation={[{ y: -0, opacity: 1, playScale: [0, 0.3] }]}
                style={{
                  transform: "translateY(100px)",
                  opacity: 0,
                }}
              >
                <h3>
                  <b>La mejor financiación</b>
                </h3>
              </Parallax>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
