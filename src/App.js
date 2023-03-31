import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Home from "./components/Home";

import LocalStorageService from "./services/localstorage.service";

const App = () => {

  return (
    <div>
      <div className="container mt-3">
        <Switch>
          <Route exact path="/"> 
            {LocalStorageService.isLoggedIn() ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login"> 
            {LocalStorageService.isLoggedIn() ? <Redirect to="/" /> : <Login /> }
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;