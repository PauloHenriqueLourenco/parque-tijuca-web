import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./pages/Logon";
import Main from "./pages/Main";
import NewAction from "./pages/NewAction";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Logon} />
        <Route path="/actions/new" exact component={NewAction} />
      </Switch>
    </BrowserRouter>
  );
}