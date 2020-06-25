import React, { useEffect, useState } from "react";
//Components
import { useParams } from "react-router-dom";
import { message, Row, Col } from "antd";
import Loading from "../Loading";
import ImageGallery from "../ImageGallery";
//Firebase
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";

import "./VehicleInfo.scss";

const db = firebase.firestore(firebase);

export default function VehicleInfo() {
  const [vehicle, setVehicle] = useState([]);
  const [images, setImages] = useState([]);
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
        console.log(images);
      })
      .catch(() => message.error("Error al obtener información del vehiculo."))
      .finally(() => setIsLoading(false));
  }, [vehicleId]);

  //Get Images
  const getImages = async (response) => {
    const imagesUrls = [];
    await response.data().images.forEach((image) => {
      imageRef
        .child(`${response.id}/${image}`)
        .getDownloadURL()
        .then((url) => {
          imagesUrls.push(url);
        });
    });
    setImages(imagesUrls);
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="vehicle-info">
          <Row justify="space-around" align="middle">
            <Col xs={12} sm={12} md={10} lg={10} xl={10}>
              <ImageGallery images={images} />
            </Col>
            <Col xs={12} sm={12} md={10} lg={10} xl={10}>
              <div className="vehicle-info__text">
                <h1>{vehicle.name}</h1>
                <p>Modelo: {vehicle.year}</p>
                <p>Kilometros: {vehicle.kilometers}</p>
                <p>Combustible: {vehicle.fuel}</p>
                <p>Transmisión: {vehicle.transmission}</p>
                <p>Precio: {vehicle.price}</p>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
