import React from "react";
// import Avatar from "./Avatar";
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import img from '../images/ok.png';

const MEDIA_BODY_STYLE = {
  color: "#888",
  fontSize: ".9em"
}

const TIME_STYLE = {
  marginLeft: 5
}

const TEXT_STYLE = {
  whiteSpace: "normal",
  workBreak: "break-word"
}

export default function Message(props) {
  const { text, time, writtenBy } = props.message;
  const localeString = new Date(time).toLocaleString();
  const basicInfo = writtenBy.email + " - " + localeString;

  return (
    <div>
      <ListItem
        leftAvatar={<Avatar src={img} />}
        primaryText={basicInfo}
        secondaryText={text}
        secondaryTextLines={2} />
      <Divider inset={true} />
    </div>
  );
}
