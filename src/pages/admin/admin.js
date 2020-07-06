import React, { useState, useEffect } from "react";
//Components
import { Button, message } from "antd";
import VehicleTable from "../../components/VehicleTable";
import { map } from "lodash";
import { Link, useHistory } from "react-router-dom";
//Firebase
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";

import "./admin.scss";

const db = firebase.firestore(firebase);

export default function Admin() {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  //useHistory replaces Link component programmatically to redirect webpage inside JS code
  let history = useHistory();

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
    history.push(`/admin/vehicle-edit/${vehicle.key}`);
  };

  return (
    <div className="admin">
      <div className="admin__top-bar">
        <Link to="/admin/vehicle-edit/new-vehicle">
          <Button type="primary">Nuevo Vehiculo</Button>
        </Link>
      </div>
      <div className="admin__table">
        <VehicleTable
          isLoading={isLoading}
          dataSet={vehicles}
          deleteVehicle={deleteVehicle}
          onEditButtonClick={onEditButtonClick}
        />
      </div>
    </div>
  );
}
