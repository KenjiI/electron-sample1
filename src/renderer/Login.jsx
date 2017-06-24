import React from "react";
import { Link, hashHistory } from "react-router";
import Errors from "./Errors";
import firebase from "firebase/firebase-browser";

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';

import AppBar from 'material-ui/AppBar';

const FORM_STYLE = {
  margin: "0 auto",
  padding: 30
}

const SIGNUP_LINK_STYLE = {
  display: "inline-block",
  marginLeft: 10
}

const DIALOG_STYLE = {
  textAlign: "center"
}

const ICON_STYLE = {
  display: "none"
}

//const addon = require("hello.node");
var addon = require('../../build/Release/hello.node');
console.log(addon.hello()); // 'world'

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.userEmail || "",
      password: localStorage.userPassword || "",
      errors: [],
      openDialog: false
    };
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
    this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleOnChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleOpen() {
    this.setState({openDialog: true});
  };

  handleOnSubmit(e) {
    const { email, password } = this.state;
    const errors = [];
    this.setState({ errors: []});

    let isValid = true;
    e.preventDefault();
    if (!email.length) {
      isValid = false;
      errors.push("Email can't be blank.");
    }
    if (!password.length) {
      isValid = false;
      errors.push("Password can't be blank.");
    }
    if (!isValid) {
      this.setState({ errors: errors });
      return;
    }

    this.setState({openDialog: true});

    // login to firebase
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      localStorage.userEmail = email;
      localStorage.userPassword = password;

      hashHistory.push("/rooms");
    }).catch(() => {
      // failed to login
      this.setState({ errors: ["Incorrect email or password."]});
      this.setState({openDialog: false});
    });
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <AppBar title="Chat app for POC"
          iconStyleLeft={ICON_STYLE}/>
        <div style={FORM_STYLE}>
          <Errors errorMessages={this.state.errors} />
          <TextField
            floatingLabelText="Email Address"
            onChange={this.handleOnChangeEmail}
            value={this.state.email}/>
          <TextField
            floatingLabelText="Password"
            onChange={this.handleOnChangePassword}
            value={this.state.password}
            type="password" />
          <br/>
          <RaisedButton label="Login" primary={true} onTouchTap={this.handleOnSubmit}/>
          <div style={SIGNUP_LINK_STYLE}>
            <Link to="/signup">Create New Account</Link>
          </div>

          <Dialog
            title="Logging in..."
            modal={false}
            open={this.state.openDialog}
            style={DIALOG_STYLE}
          >
            <CircularProgress size={60} thickness={7} />
          </Dialog>
        </div>
      </form>
    );
  }
}
