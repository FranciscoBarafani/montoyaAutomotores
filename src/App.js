//Essentials
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Home Page Layout
import HomeLayout from "./layouts/HomeLayout";
//Admin Page Layout
import AdminLayout from "./layouts/AdminLayout";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home">
            <HomeLayout />
          </Route>
          <Route path="/admin">
            <AdminLayout />
          </Route>
          <Route path="*">Error</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
