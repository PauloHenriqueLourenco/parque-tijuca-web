import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Logon from "./pages/Logon";
import Main from "./pages/Main";
import Users from "./pages/Users";
import NewAction from "./pages/NewAction";
import NewUser from "./pages/NewUser";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/login" exact component={Logon} />
        <Route path="/users" exact component={Users} />
        <Route path="/users/new" exact component={NewUser} />
        <Route path="/actions/new" exact component={NewAction} />
      </Switch>
    </BrowserRouter>
  );
}
