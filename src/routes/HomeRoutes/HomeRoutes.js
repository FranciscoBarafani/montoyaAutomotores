//Essentials
import React from "react";
import { Switch, Route } from "react-router-dom";

//Pages
import Home from "../../pages/home";
import VehicleInfo from "../../components/VehicleInfo";

export default function HomeRoutes() {
  return (
    <Switch>
      <Route path="/home" exact>
        <Home />
      </Route>
      <Route path="/home/:vehicleId" exact>
        <VehicleInfo />
      </Route>
    </Switch>
  );
}
