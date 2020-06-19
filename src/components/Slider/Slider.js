import React from "react";
//Components
import { Carousel } from "antd";

import "./Slider.scss";

export default function Slider() {
  return (
    <div className="slider">
      <Carousel autoplay>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
    </div>
  );
}
