import React, { useEffect, useState } from "react";
//Components
import { useParams } from "react-router-dom";
import { message, Row, Col } from "antd";
import Loading from "../Loading";
//Firebase
import firebase from "../../utils/Firebase";
import "firebase/firestore";

import "./VehicleInfo.scss";

const db = firebase.firestore(firebase);

export default function VehicleInfo() {
  const [vehicle, setVehicle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { vehicleId } = useParams();

  useEffect(() => {
    db.collection("vehicles")
      .doc(vehicleId)
      .get()
      .then((response) => {
        setVehicle(response.data());
      })
      .catch(() => message.error("Error al obtener información del vehiculo."))
      .finally(setIsLoading(false));
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="vehicle-info">
          <Row>
            <Col>Imagen Vehiculo</Col>
            <Col>
              <h1>{vehicle.name}</h1>
              <h2>{vehicle.year}</h2>
              <h2>{vehicle.kilometers}</h2>
              <h2>{vehicle.fuel}</h2>
              <h2>{vehicle.transmission}</h2>
              <h2>{vehicle.price}</h2>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
