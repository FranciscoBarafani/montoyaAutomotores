import React from "react";
//Components
import { Carousel } from "antd";
import { map } from "lodash";

import "./ImageGallery.scss";

export default function ImageGallery(props) {
  const { images } = props;
  console.log(images);

  return (
    <div className="image-gallery">
      <Carousel>
        {map(images, (image) => (
          <div>
            <img src={image} alt="Imagen Vehiculo" key={image} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
