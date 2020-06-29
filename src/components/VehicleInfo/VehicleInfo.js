import React, { useEffect, useState } from "react";
//Components
import { useParams } from "react-router-dom";
import { message, Row, Col } from "antd";
import ContactVehicle from "../ContactVehicle";
import Loading from "../Loading";
import ImageGallery from "../ImageGallery";
import each from "async/each";
//Firebase
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";

import "./VehicleInfo.scss";

const db = firebase.firestore(firebase);

export default function VehicleInfo() {
  const [vehicle, setVehicle] = useState([]);
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { vehicleId } = useParams();
  //Firebase Storage References
  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child("images");

  //Get Vehicle Info
  useEffect(() => {
    db.collection("vehicles")
      .doc(vehicleId)
      .get()
      .then((response) => {
        setVehicle(response.data());
        getImages(response);
      })
      .catch(() => message.error("Error al obtener información del vehiculo."))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleId]);

  //Get Images
  const getImages = (response) => {
    const imagesUrls = [];
    each(
      response.data().images,
      (image, callback) => {
        imageRef
          .child(`${response.id}/${image}`)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            imagesUrls.push(url);
            callback();
          });
      },
      () => {
        setImages(imagesUrls);
        setIsLoading(false);
      }
    );
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="vehicle-info">
          <Row justify="space-around" align="middle">
            <Col xs={24} sm={24} md={14} lg={14} xl={14}>
              <ImageGallery images={images} />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div className="vehicle-info__text">
                <h2>{vehicle.name}</h2>
                <div className="vehicle-info__text-data">
                  <p>Modelo: {vehicle.year}</p>
                  <p>Kilometros: {vehicle.kilometers}</p>
                  <p>Combustible: {vehicle.fuel}</p>
                  <p>Transmisión: {vehicle.transmission}</p>
                  <p>Precio: {vehicle.price}</p>
                  <ContactVehicle vehicleName={vehicle.name} />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
