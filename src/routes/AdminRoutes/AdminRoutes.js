import React from "react";
import { Switch, Route } from "react-router-dom";

//Pages
import Admin from "../../pages/admin";

export default function AdminRoutes() {
  return (
    <Switch>
      <Route path="/admin" exact>
        <Admin />
      </Route>
    </Switch>
  );
}
