import React from "react";
//Components
import { WhatsAppOutlined } from "@ant-design/icons";

import "./ContactVehicle.scss";

export default function ContactVehicle(props) {
  const { vehicleName } = props;
  return (
    <a
      href={`https://wa.me/5493516235746/?text=Hola!%20Me%20interesa%20${vehicleName}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="contact-vehicle-button">
        <WhatsAppOutlined />
        <h3>Consulta!</h3>
      </div>
    </a>
  );
}
