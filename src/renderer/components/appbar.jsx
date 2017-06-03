import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Rooms from '../Rooms';
import img from '../../images/chat.png';

const ICON_CHAT_STYLE = {
  textAlign: "center"
};

export default class BaseAppBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }
  handleClose() {
    this.setState({open: false});
  }
  //{this.props.rooms.map(r => <MenuItem primaryText={r.description} />)}

  renderRoom() {
    if (this.props.children) {
      return this.props.children;
    } else {
      return (
        <div style={ICON_CHAT_STYLE}>
          <img src={img} />
          <p>Join a chat room from the sidebar</p>

          <FloatingActionButton secondary={true} mini={true} onTouchTap={this.handleToggle}>
                <ContentAdd />
          </FloatingActionButton>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <AppBar
          title="Chat app"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.handleToggle}>
          <Drawer open={this.state.open} docked={false} >
                <AppBar
                  onLeftIconButtonTouchTap={this.handleToggle}
                  title={localStorage.userEmail}/>
                <Rooms onCallBack={this.handleClose}></Rooms>
          </Drawer>
        </AppBar>
        <div className="">{this.renderRoom()}</div>
      </div>
    );
  }
}
