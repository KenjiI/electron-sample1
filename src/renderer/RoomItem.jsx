import React from "react";
import { Link } from "react-router";

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { hashHistory } from "react-router";

const LINK_STYLE = {
  color: "inherit",
  textDecoration: "none"
}

export default class RoomItem extends React.Component {
  constructor(props) {
    super(props);

    const { selected } = props;
    const { description, key } = props.room;
    this.state = {
      selected: selected,
      description: description,
      key: key
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, key) {
    this.props.onCallBack();
    hashHistory.push(`/rooms/${key}`);
  }

  render() {
    return (
        <MenuItem primaryText={this.state.description} value={this.state.key}
          onTouchTap={(event) => this.handleClick(event, this.state.key)}/>
    )
  }
}
