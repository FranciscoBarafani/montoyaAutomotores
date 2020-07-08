import React, { useEffect, useState } from "react";
//Components
import { useParams } from "react-router-dom";
import { message, Row, Col } from "antd";
import ContactVehicle from "../ContactVehicle";
import Loading from "../Loading";
import ImageGallery from "../ImageGallery";
import each from "async/each";
import { Descriptions } from "antd";
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
              <div className="vehicle-info-img">
                <ImageGallery images={images} />
              </div>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div className="vehicle-info-card">
                <Descriptions title={vehicle.name} bordered column={1}>
                  <Descriptions.Item label="Modelo:">
                    {vehicle.year}
                  </Descriptions.Item>
                  <Descriptions.Item label="Kilometros:">
                    {vehicle.kilometers.toLocaleString("es-ES")}
                  </Descriptions.Item>
                  <Descriptions.Item label="Combustible:">
                    {vehicle.fuel}
                  </Descriptions.Item>
                  <Descriptions.Item label="Transmisión:">
                    {vehicle.transmission}
                  </Descriptions.Item>
                  <Descriptions.Item label="Precio:">
                    {vehicle.price.toLocaleString("es-ES")}
                  </Descriptions.Item>
                  <Descriptions.Item label="Año:">
                    {vehicle.year}
                  </Descriptions.Item>
                  <Descriptions.Item label="Descripción">
                    {vehicle.description}
                  </Descriptions.Item>
                </Descriptions>
                <ContactVehicle vehicleName={vehicle.name} />
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
