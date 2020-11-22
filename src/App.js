//Essentials
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

//Home Page Layout
import HomeLayout from "./layouts/HomeLayout";
//Admin Page Layout
import AdminLayout from "./layouts/AdminLayout";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Redirect path="/" exact to="/home" />
            <Route path="/home">
              <HomeLayout />
            </Route>
            <Route path="/admin">
              <AdminLayout />
            </Route>
            <Route path="*">Error</Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
