import React from "react";
import Message from "./Message";
import NewMessage from "./NewMessage";
import firebase from "firebase/firebase-browser";
const notifier = require('node-notifier');

import {List, ListItem} from 'material-ui/List';


const ROOM_STYLE = {
  padding: "10px 30px"
};

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      messages: []
    };
    this.db = firebase.database();
    this.handleMessagePost = this.handleMessagePost.bind(this);
  }

  componentDidMount() {
    const { roomId } = this.props.params;
    this.fetchRoom(roomId);
  }

  componentWillReceiveProps(nextProps) {
    const { roomId } = nextProps.params;
    if (roomId === this.props.params.roomId) {
      return;
    }
    if (this.stream) {
      this.stream.off();
    }
    this.setState({messages: []});
    this.fetchRoom(roomId);
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.room.parentNode.scrollTop = this.room.parentNode.scrollHeight;
    }, 0);
  }

  componentWillUnmount() {
    if (this.stream) {
      // stop monitoring messages
      this.stream.off();
    }
  }

  handleMessagePost(message) {
    const newItemRef = this.fbChatRoomRef.child("messages").push();
    // logged in user is owner of this message
    this.user = this.user || firebase.auth().currentUser;
    return newItemRef.update({
      writtenBy: {
        uid: this.user.uid,
        displayName: this.user.displayName,
        email: this.user.email,
        photoURL: this.user.photoURL
      },
      time: Date.now(),
      text: message
    });
  }

  fetchRoom(roomId) {
    // get room detail info from firebase
    this.fbChatRoomRef = this.db.ref("/chatrooms/" + roomId);
    this.fbChatRoomRef.once("value").then(snapshot => {
      const { description } = snapshot.val();
      this.setState({description});
      window.document.title = description;
    });
    this.stream = this.fbChatRoomRef.child("messages").limitToLast(10);
    // monitor message post
    this.stream.on("child_added", item => {
      const { messages } = this.state;
      // added message is set to state
      //messages.reverse();
      messages.sort(function(a,b) {
        return (a < b ? 1 : -1);
      });
      messages.unshift(Object.assign({ key: item.key }, item.val()));
      this.setState({messages});

      /*
      notifier.notify({
        title: 'New message Notifier',
        message: messages[0].text,
        wait: false
      });*/

      const { displayName } = messages[0].writtenBy;
      let myNotification = new Notification('New message Notifier', {
        body: displayName + " - " + messages[0].text
      })

    });
  }

  render() {
    const { messages } = this.state;
    return (
      <div style={ROOM_STYLE} ref={room => this.room = room}>
        <NewMessage onMessagePost={this.handleMessagePost} />
        <List>
          {messages.map(m => <Message key={m.key} message={m} />)}
        </List>
      </div>
    );
  }
}
