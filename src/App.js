import React, {useState, useEffect} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import UserContext from "./contexts/user.context";
import Login from "./views/Login";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AuthRoute from "./components/AuthRoute";

import LocalStorageService from "./services/localstorage.service";

const App = () => {
  const [user, setUser] = useState(null);
  const userContext = {user, setUser};
  useEffect( () => {
    setUser(LocalStorageService.getUser());
  }, [])

  return (
    <UserContext.Provider value={ userContext }>
      {user && <Navbar />}
      <div className="container-fluid">
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
        </Switch>
      </div>
    </UserContext.Provider>
  );
};

export default App;