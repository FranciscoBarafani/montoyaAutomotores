import React, { useEffect, useState } from "react";
//Components
import { Card, Spin } from "antd";
import firebase from "../../utils/Firebase";
import "firebase/storage";

import "./VehicleCard.scss";

export default function VehicleCard(props) {
  const { id, name, kilometers, fuel, price, showImage } = props;
  const { Meta } = Card;
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child("images");

  useEffect(() => {
    imageRef
      .child(`${id}/${showImage}`)
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div className="vehicle-card">
      <a href={`/home/${id}`}>
        <Card
          hoverable
          cover={<img src={imageUrl} alt={name} />}
          loading={isLoading}
        >
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
