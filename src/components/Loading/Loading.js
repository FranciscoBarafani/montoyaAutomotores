//Essentials
import React from "react";
import "./Loading.scss";
//Components
import { Spin } from "antd";

//This component renders a Loading Spinner

export default function Loading() {
  return (
    <div className="loading">
      <Spin />
      <h1>Cargando</h1>
    </div>
  );
}
