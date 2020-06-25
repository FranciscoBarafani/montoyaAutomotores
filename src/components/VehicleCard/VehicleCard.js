import React, { useEffect, useState } from "react";
//Components
import { Card } from "antd";
import firebase from "../../utils/Firebase";
import "firebase/storage";

import "./VehicleCard.scss";

export default function VehicleCard(props) {
  const { id, name, kilometers, fuel, price, showImage } = props;
  const { Meta } = Card;
  const [imageUrl, setImageUrl] = useState("");

  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child("images");

  useEffect(() => {
    imageRef
      .child(`${id}/${showImage}`)
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      });
  }, [id]);

  return (
    <div className="vehicle-card">
      <a href={`/home/${id}`}>
        <Card hoverable cover={<img alt="Imagen" src={imageUrl} />}>
          <Meta title={name} />
          <h3>
            Kilometros: {kilometers} | {fuel}
          </h3>
          <h2>ARS {price} </h2>
        </Card>
      </a>
    </div>
  );
}
