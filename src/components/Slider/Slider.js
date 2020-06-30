import React from "react";
//Components
import { Carousel } from "antd";
//Images
import Img1 from "../../assets/images/banner1.jpg";
import Img2 from "../../assets/images/banner2.jpg";
import Img3 from "../../assets/images/banner3.jpg";
import Img4 from "../../assets/images/banner4.jpg";

import "./Slider.scss";

export default function Slider() {
  return (
    <div className="slider">
      <Carousel autoplay effect="fade">
        <div>
          <img src={Img1} alt="Auto" />
        </div>
        <div>
          <img src={Img2} alt="Auto" />
        </div>
        <div>
          <img src={Img3} alt="Auto" />
        </div>
        <div>
          <img src={Img4} alt="Auto" />
        </div>
      </Carousel>
    </div>
  );
}
