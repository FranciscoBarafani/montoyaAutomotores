//Essentials
import React from "react";
import { Switch, Route } from "react-router-dom";
//Components
//Pages
import Home from "../../pages/home";
import VehicleInfo from "../../components/VehicleInfo";
import About from "../../pages/about";

export default function HomeRoutes() {
 
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
