import React from "react";

//Components
import { Card } from "antd";

import "./VehicleCard.scss";

export default function VehicleCard(props) {
  const { nombre, kilometros, combustible, precio } = props;
  const { Meta } = Card;

  return (
    <div className="vehicle-card">
      <Card
        hoverable
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title={nombre} />
        <h3>
          Kilometros: {kilometros} | {combustible}
        </h3>
        <h2>ARS {precio} </h2>
      </Card>
    </div>
  );
}
