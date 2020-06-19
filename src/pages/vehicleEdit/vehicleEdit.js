import React, { useState } from "react";
//Components
import { message } from "antd";
import VehicleForm from "../../forms/VehicleForm";
import firebase from "../../utils/Firebase";
import "firebase/firestore";

import "./vehicleEdit.scss";

const db = firebase.firestore(firebase);

export default function VehicleEdit() {
  const [isLoading, setIsLoading] = useState(false);

  //Create Vehicle Function
  const createVehicle = (vehicle) => {
    console.log("Cargando vehiculo");

    setIsLoading(true);
    db.collection("vehicles")
      .add(vehicle)
      .then(() => {
        message.success("Vehiculo creado correctamente");
      })
      .catch(() => message.error("Error al cargar vehiculo"))
      .finally(setIsLoading(false));
  };

  return (
    <div className="vehicle-edit">
      <VehicleForm createVehicle={createVehicle} isLoading={isLoading} />
    </div>
  );
}
