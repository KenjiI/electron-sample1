import React from "react";
import { hashHistory } from "react-router";
import RoomItem from "./RoomItem";
import firebase from "firebase/firebase-browser";

import BaseAppBar from "./components/appbar"
import MenuItem from 'material-ui/MenuItem';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Menu from 'material-ui/Menu';

import NewRoom from './NewRoom';

const FORM_STYLE = {
  display: "flex"
};

const BUTTON_STYLE = {
  marginLeft: 10
};

const APPBAR_STYLE = {
  width: "100%"
};

export default class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      openDialog: false
    };
    this.db = firebase.database();
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  componentDidMount() {
    this.fetchRooms();
  }

  handleOpenDialog(e) {
    this.setState({openDialog: true});
  }

  handleCloseDialog(e) {
    this.setState({openDialog: false});
  }

  handleOnSubmit(e, roomName) {
    e.preventDefault();
    if(!roomName.length) {
      return;
    }
    const newRoomRef = this.db.ref("/chatrooms").push();
    const newRoom = {
      description: roomName
    };

    newRoomRef.update(newRoom).then(() => {
      this.setState({roomName: ""});
      return this.fetchRooms().then(() => {
        hashHistory.push(`/rooms/${newRoomRef.key}`);
      });
    });

    this.handleCloseDialog();
  }

  fetchRooms() {
    return this.db.ref("/chatrooms").limitToLast(20).once("value").then(snapshot => {
      const rooms = [];
      snapshot.forEach(item => {
        rooms.push(Object.assign({ key: item.key }, item.val()));
      });
      this.setState({rooms});
    })
  }

  renderRoomList() {
    const { roomId } = this.props;
    const { rooms } = this.state;
    return (

        <div className="list-group sidenav">
          <MenuItem primaryText="New Room" rightIcon={<PersonAdd />} onClick={this.handleOpenDialog}/>
          <NewRoom
            handleOnSubmit={this.handleOnSubmit}
            handleCloseDialog={this.handleCloseDialog}
            openDialog={this.state.openDialog}
            roomName={this.state.roomName}/>
          {rooms.map(r => <RoomItem room={r} key={r.key} selected={r.key === roomId} onCallBack={this.props.onCallBack}/>)}
        </div>
    )
  }

  render() {
    return (
      <div>{this.renderRoomList()}</div>
    );
  }
}
