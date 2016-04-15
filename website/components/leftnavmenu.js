import React from "react";
import {Link} from "react-router"

import Divider from "material-ui/Divider";
import Drawer from "material-ui/Drawer";
import {List, ListItem} from "material-ui/List";
import Subheader from 'material-ui/Subheader';

export default class LeftNavMenu extends React.Component {

  render() {
    return (
      <div>
        <Drawer
          open={this.props.open}
          docked={false}
          onRequestChange={open => this.props.toggleMenu()}>
          <Divider />
          <List>
            <ListItem
              containerElement={<Link to="/"/>}>Home</ListItem>
            <ListItem
              containerElement={<Link to="/docs/overview"/>}>
                Overview</ListItem>
          </List>
          <Divider />
          <List>
            <Subheader>Resources</Subheader>
            <ListItem
              containerElement={<Link to="/docs/overview"/>}>Docs</ListItem>
            <ListItem
              containerElement={
                <a href="https://github.com/globocom/megadraft"/>}>
                  Github</ListItem>
            <ListItem
              containerElement={<a href="https://facebook.github.io/react"/>}>
                React</ListItem>
            <ListItem
              containerElement={<a href="draftjs.org"/>}>
                Draft.js</ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

