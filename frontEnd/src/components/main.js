import React from "react";
import { Switch, Route, BrowserRouter, Router } from "react-router-dom";
import LandingPage from "./Landingpage";
import organization from "./organization";
import manage from "./manage";
import standard from "./standard";
import user from "./user";

const Main = props => {
  return (
    <Router history={props.history}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/organization" component={organization} />
        <Route path="/manage" component={manage} />
        <Route path="/standard" component={standard} />
        <Route path="/user" component={user} />
      </Switch>
    </Router>
  );
};

export default Main;
