import React, { useState, useEffect } from "react";
//Components
import Vehicles from "../../components/Vehicles";
import { message } from "antd";
import { map } from "lodash";
//Firebase
import firebase from "../../utils/Firebase";
import "firebase/firestore";

import "./home.scss";

const db = firebase.firestore(firebase);

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    db.collection("vehicles")
      .get()
      .then((response) => {
        const dataSet = [];
        map(response.docs, (vehicle) => {
          const data = vehicle.data();
          data.id = vehicle.id;
          dataSet.push(data);
        });
        setVehicles(dataSet);
      })
      .catch((response) => message.error(response))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="home">
      <Vehicles vehicles={vehicles} loading={isLoading} />
    </div>
  );
}
