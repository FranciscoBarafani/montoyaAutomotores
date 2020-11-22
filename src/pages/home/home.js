import React, { useState, useEffect } from "react";
//Components
import Vehicles from "../../components/Vehicles";
import { message, Divider } from "antd";
import { map } from "lodash";
import Slider from "../../components/Slider";
//Firebase
import firebase from "../../utils/Firebase";
import "firebase/firestore";
//Redux
import { connect, useDispatch } from "react-redux";
import { getVehicles } from "../../redux/actions";

import "./home.scss";

const db = firebase.firestore(firebase);

function Home(props) {
  const [isLoading, setIsLoading] = useState(false);
  //Lazy Component load for better SEO

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.vehicles.length <= 1) {
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
          dispatch(getVehicles(dataSet));
        })
        .catch((response) => message.error(response))
        .finally(() => setIsLoading(false));
    }
  }, []);

  return (
    <div className="home">
      <Slider />
      <Divider style={{ color: "black" }}>
        <h2>
          <b>Nuestros Usados</b>
        </h2>
      </Divider>
      <Vehicles vehicles={props.vehicles.vehicles} loading={isLoading} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  vehicles: state.vehicles,
});

const mapDispatchToProps = {
  getVehicles,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
