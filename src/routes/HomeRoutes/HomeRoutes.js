//Essentials
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import firebase from "../../utils/Firebase";

//Pages
import Home from "../../pages/home";
import VehicleInfo from "../../components/VehicleInfo";
import About from "../../pages/about";

export default function HomeRoutes() {
  useEffect(() => {
    firebase.auth().signInAnonymously();
  }, []);

  return (
    <Switch>
      <Route path="/home" exact>
        <Home />
      </Route>
      <Route path="/home/about" exact>
        <About />
      </Route>
      <Route path="/home/:vehicleId" exact>
        <VehicleInfo />
      </Route>
    </Switch>
  );
}
