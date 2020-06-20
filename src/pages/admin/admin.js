import React, { useState, useEffect } from "react";
//Components
import { Button, message } from "antd";
import VehicleTable from "../../components/VehicleTable";
import { map } from "lodash";
import Loading from "../../components/Loading";
//Firebase
import firebase from "../../utils/Firebase";
import "firebase/firestore";

import "./admin.scss";

const db = firebase.firestore(firebase);

export default function Admin() {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  //Vehicles Get
  useEffect(() => {
    db.collection("vehicles")
      .get()
      .then((response) => {
        const dataSet = [];
        map(response.docs, (vehicle) => {
          const data = vehicle.data();
          data.key = vehicle.id;
          dataSet.push(data);
        });
        setVehicles(dataSet);
        setIsLoading(false);
      })
      .catch(() => message.error("Error al obtener vehiculos"));
  }, [refresh]);

  //Eliminate Vehicle
  const deleteVehicle = (id) => {
    db.collection("vehicles")
      .doc(id)
      .delete()
      .then(() => {
        message.info("Vehículo eliminado correctamente");
        setRefresh(!refresh);
      })
      .catch(() => message.error("Error al eliminar vehículo"));
  };

  //Edit Vehicle
  const onEditButtonClick = (vehicle) => {
    window.location.replace(`/admin/vehicle-edit/${vehicle.key}`);
  };

  return (
    <div className="admin">
      <Button href="/admin/vehicle-edit/new-vehicle">Nuevo Vehiculo</Button>
      {isLoading ? (
        <Loading />
      ) : (
        <VehicleTable
          dataSet={vehicles}
          deleteVehicle={deleteVehicle}
          onEditButtonClick={onEditButtonClick}
        />
      )}
    </div>
  );
}
