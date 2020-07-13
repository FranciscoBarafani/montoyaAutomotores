import React from "react";
//Components
import { Carousel } from "antd";
//Images
import Img1B from "../../assets/images/Banner1Big.jpg";
import Img1S from "../../assets/images/Banner1Small.jpg";
import Img2B from "../../assets/images/Banner2Big.jpg";
import Img2S from "../../assets/images/Banner2Small.jpg";
import Img3B from "../../assets/images/Banner3Big.jpg";
import Img3S from "../../assets/images/Banner3Small.jpg";
import Img4B from "../../assets/images/Banner4Big.jpg";
import Img4S from "../../assets/images/Banner4Small.jpg";

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
        <div>
          <picture>
            <source media="(min-width:768px)" srcset={Img3B} />
            <source media="(min-width:300px)" srcset={Img3S} />
            <img alt="Imagen" />
          </picture>
        </div>
        <div>
          <picture>
            <source media="(min-width:768px)" srcset={Img4B} />
            <source media="(min-width:300px)" srcset={Img4S} />
            <img alt="Imagen" />
          </picture>
        </div>
      </Carousel>
    </div>
  );
}
