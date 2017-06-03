import React from "react";
import { render } from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import Login from "./Login";
import Signup from "./Signup";
//import Rooms from "./Rooms";
import BaseAppBar from "./components/appbar";
import Room from "./Room";

import firebase from "firebase/firebase-browser";

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

// the definition of Routring
const appRouting = (
  <MuiThemeProvider>
    <Router history={hashHistory}>
      <Route path="/">
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route path="rooms" component={BaseAppBar} >
          <Route path=":roomId" component={Room} />
        </Route>
      </Route>
    </Router>
  </MuiThemeProvider>
);

// initialization of Routing
if (!location.hash.length) {
  location.hash = "#/login";
}

// Initialize Firebase
var config = {
  // set settings for firebase to connet.
};
firebase.initializeApp(config);

// drawing application
render(appRouting, document.getElementById("app"));
