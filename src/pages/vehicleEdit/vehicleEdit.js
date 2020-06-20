import React, { useState } from "react";
//Components
import { message, Button } from "antd";
import VehicleForm from "../../forms/VehicleForm";
import firebase from "../../utils/Firebase";
import "firebase/firestore";

import "./vehicleEdit.scss";

const db = firebase.firestore(firebase);

export default function VehicleEdit() {
  const [isLoading, setIsLoading] = useState(false);

  //Create Vehicle Function
  const createVehicle = (vehicle) => {
    setIsLoading(true);
    db.collection("vehicles")
      .add(vehicle)
      .then(() => {
        message.success("Vehiculo creado correctamente");
      })
      .catch(() => message.error("Error al cargar vehiculo"))
      .finally(setIsLoading(false));
  };
  //Update Vehicle Function
  const updateVehicle = (vehicle, id) => {
    setIsLoading(true);
    db.collection("vehicles")
      .doc(id)
      .update(vehicle)
      .then(() => message.success("Vehiculo modificado correctamente"))
      .catch(() => message.error("Error al modificar vehiculo"))
      .finally(setIsLoading(false));
  };

  return (
    <div className="vehicle-edit">
      <Button href="/admin">Volver</Button>
      <VehicleForm
        createVehicle={createVehicle}
        updateVehicle={updateVehicle}
        isLoading={isLoading}
      />
    </div>
  );
}
