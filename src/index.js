import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import "semantic-ui-css/semantic.css";

const rootApp = (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route exact path="/" component={App} />
    </Switch>
  </Router>
);

ReactDOM.render(rootApp, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// 0.0.0.0 account.jetbrains.com
// https://daothaison.me/activate-jetbrains-phpstorm-phpstorm2019-1570271354
