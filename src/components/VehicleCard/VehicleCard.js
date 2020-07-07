import React, { useEffect, useState } from "react";
//Components
import { Card } from "antd";
import { Link } from "react-router-dom";
import firebase from "../../utils/Firebase";
import { Parallax } from "rc-scroll-anim";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="vehicle-card">
      <Parallax
        always={false}
        animation={[{ y: -0, opacity: 1, playScale: [0, 0.5] }]}
        style={{
          transform: "translateY(100px)",
          opacity: 0,
        }}
      >
        <Link to={`/home/${id}`}>
          <Card
            hoverable
            cover={<img src={imageUrl} alt={name} />}
            loading={isLoading}
          >
            <Meta title={<h3>{name}</h3>} />
            <p>
              {kilometers} KM | {fuel}
            </p>
            <h3>ARS {price} </h3>
          </Card>
        </Link>
      </Parallax>
    </div>
  );
}
