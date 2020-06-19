//Essentials
import React from "react";
import { Switch, Route } from "react-router-dom";

//Pages
import Home from "../../pages/home";

export default function HomeRoutes() {
  return (
    <Switch>
      <Route path="/home" exact>
        <Home />
      </Route>
    </Switch>
  );
}
