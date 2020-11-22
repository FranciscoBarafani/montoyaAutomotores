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
//Redux
import { connect, useDispatch } from "react-redux";
import { getVehicles } from "../../redux/actions";

import "./admin.scss";

const db = firebase.firestore(firebase);

function Admin(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  //useHistory replaces Link component programmatically to redirect webpage inside JS code
  let history = useHistory();

  const dispatch = useDispatch();

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
        dispatch(getVehicles(dataSet));
      })
      .catch(() => message.error("Error al obtener vehiculos"))
      .finally(() => setIsLoading(false));
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
          dataSet={props.vehicles.vehicles}
          deleteVehicle={deleteVehicle}
          onEditButtonClick={onEditButtonClick}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  vehicles: state.vehicles,
});

const mapDispatchToProps = {
  getVehicles,
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
