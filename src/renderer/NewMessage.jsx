import React from "react";

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const FORM_STYLE = {
  display: "flex"
}

const BUTTON_STYLE = {
  marginLeft: 10
}

export default class NewMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { message: "" };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(e) {
    this.setState({ message: e.target.value });
  }

  handleOnSubmit(e) {
    const { onMessagePost } = this.props;
    if (!onMessagePost || !this.state.message.length) {
      return;
    }
    onMessagePost(this.state.message);
    this.setState({ message: ""});
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <TextField hintText="0-140" floatingLabelText="Message"
          onChange={this.handleOnChange} value={this.state.message}/>
        <RaisedButton label="POST" primary={true} style={BUTTON_STYLE} onTouchTap={this.handleOnSubmit}/>
      </div>
    );
  }
}
