/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import {Link} from "react-router";

import Divider from "material-ui/Divider";
import Drawer from "material-ui/Drawer";
import {List, ListItem} from "material-ui/List";
import Subheader from "material-ui/Subheader";

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
              onClick={open => this.props.toggleMenu()}
              containerElement={<Link to="/"/>}>Home</ListItem>
            <ListItem
              onClick={open => this.props.toggleMenu()}
              containerElement={<Link to="/docs/overview"/>}>
                Overview</ListItem>
          </List>
          <Divider />
          <List>
            <Subheader>Resources</Subheader>
            <ListItem
              onClick={open => this.props.toggleMenu()}
              containerElement={<Link to="/docs/overview"/>}>Docs</ListItem>
            <ListItem
              onClick={open => this.props.toggleMenu()}
              containerElement={
                <a href="https://github.com/globocom/megadraft" target="_blank"/>}>
                  Github</ListItem>
            <ListItem
              onClick={open => this.props.toggleMenu()}
              containerElement={<a href="https://facebook.github.io/react" target="_blank"/>}>
                React</ListItem>
            <ListItem
              onClick={open => this.props.toggleMenu()}
              containerElement={<a href="http://draftjs.org" target="_blank"/>}>
                Draft.js</ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

