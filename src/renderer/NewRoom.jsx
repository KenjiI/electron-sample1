import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class NewRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: ""
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(e) {
    this.setState({roomName: e.target.value});
  }

  handleOnSubmit(e) {
    this.props.handleOnSubmit(e, this.state.roomName);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleCloseDialog}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleOnSubmit}
      />,
    ];

    return (
      <Dialog
        title="Dialog With Actions"
        actions={actions}
        modal={false}
        open={this.props.openDialog}
      >
        The new room name
        <TextField floatingLabelText="Room name" onChange={this.handleOnChange} value={this.state.roomName}/>
      </Dialog>
    );
  }
}
