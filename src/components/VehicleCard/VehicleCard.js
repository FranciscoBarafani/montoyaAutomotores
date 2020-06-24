import React from "react";

//Components
import { Card } from "antd";

import "./VehicleCard.scss";

export default function VehicleCard(props) {
  const { id, name, kilometers, fuel, price } = props;
  const { Meta } = Card;

  return (
    <div className="vehicle-card">
      <a href={`/home/${id}`}>
        <Card
          hoverable
          cover={
            <img
              alt="example"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Volkswagen_Gol_1.6_Trend_2011_%2813905746028%29.jpg/1200px-Volkswagen_Gol_1.6_Trend_2011_%2813905746028%29.jpg"
            />
          }
        >
          <Meta title={name} />
          <h3>
            Kilometros: {kilometers} | {fuel}
          </h3>
          <h2>ARS {price} </h2>
        </Card>
      </a>
    </div>
  );
}
