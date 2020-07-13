import React from "react";
//Components
import { Carousel } from "antd";
//Images
import Img1B from "../../assets/images/Banner1Big.jpg";
import Img1S from "../../assets/images/Banner1Small.jpg";
import Img2B from "../../assets/images/Banner2Big.jpg";
import Img2S from "../../assets/images/Banner2Small.jpg";

import "./Slider.scss";

export default function Slider() {
  return (
    <div className="slider">
      <Carousel autoplay effect="fade">
        <div className="slider-1">
          <picture>
            <source media="(min-width:768px)" srcset={Img1B} />
            <source media="(min-width:300px)" srcset={Img1S} />
            <img alt="Imagen" />
          </picture>
        </div>
        <div>
          <picture>
            <source media="(min-width:768px)" srcset={Img2B} />
            <source media="(min-width:300px)" srcset={Img2S} />
            <img alt="Imagen" />
          </picture>
        </div>
      </Carousel>
    </div>
  );
}
