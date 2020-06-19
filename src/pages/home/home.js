import React from "react";
//Components
import VehicleCard from "../../components/VehicleCard";

import "./home.scss";

export default function Home() {
  return (
    <div className="home">
      <VehicleCard
        nombre="Volkswagen Gol 1.6"
        precio={350000}
        combustible="Diesel"
        kilometros={150000}
      />
    </div>
  );
}
