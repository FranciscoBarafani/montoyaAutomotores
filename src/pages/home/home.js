import React, { useState, useEffect } from "react";
//Components
import Vehicles from "../../components/Vehicles";
import { message, Divider } from "antd";
import { map } from "lodash";
import Slider from "../../components/Slider";
//Firebase
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import "./home.scss";

const db = firebase.firestore(firebase);

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //Lazy Component load for better SEO

  useEffect(() => {
    setIsLoading(true);
    db.collection("vehicles")
      .get()
      .then((response) => {
        const dataSet = [];
        map(response.docs, (vehicle) => {
          const data = vehicle.data();
          data.id = vehicle.id;
          data.showImage = dataSet.push(data);
        });
        setVehicles(dataSet);
      })
      .catch((response) => message.error(response))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="home">
      <Slider />
      <Divider style={{ color: "black" }}>
        <h2>
          <b>Nuestros Usados</b>
        </h2>
      </Divider>
      <Vehicles vehicles={vehicles} loading={isLoading} />
    </div>
  );
}
