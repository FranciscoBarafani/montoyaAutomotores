import React from "react";
import { Switch, Route } from "react-router-dom";

//Pages
import Admin from "../../pages/admin";
import VehicleEdit from "../../pages/vehicleEdit";

export default function AdminRoutes() {
  return (
    <Switch>
      <Route path="/admin" exact>
        <Admin />
      </Route>
      <Route path="/admin/vehicle-edit/:vehicleId">
        <VehicleEdit />
      </Route>
    </Switch>
  );
}
