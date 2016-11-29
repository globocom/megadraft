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
import {darkBlack} from "material-ui/styles/colors";

export default class LeftNavMenu extends React.Component {

  render() {
    const titleStyle = {
      fontSize: 24,
      color: "#FFF",
      lineHeight: "64px",
      fontWeight: 300,
      paddingLeft: 24,
      marginBottom: 8,
      backgroundColor: darkBlack
    };
    return (
      <div>
        <Drawer
          open={this.props.open || this.props.docked}
          docked={this.props.docked}
          onRequestChange={open => this.props.toggleMenu()}>
          <div style={titleStyle}>Megadraft</div>
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
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem primaryText="Overview & Usage" key="overview" containerElement={<Link to="/docs/overview"/>}/>,
                <ListItem primaryText="Customization" key="customization" containerElement={<Link to="/docs/customization"/>}/>,
                <ListItem primaryText="Custom Entities" key="custom-entities" containerElement={<Link to="/docs/custom-entities"/>}/>,
                <ListItem primaryText="Plugins" key="plugins" containerElement={<Link to="/docs/plugins"/>}/>,
                <ListItem primaryText="Saving & Loading"
                          key="saving"
                          containerElement={<Link to="/docs/saving-loading"/>}/>
              ]}>Docs</ListItem>
            <ListItem primaryText="Github" href="https://github.com/globocom/megadraft" target="_blank"/>
            <ListItem primaryText="React" href="https://facebook.github.io/react" target="_blank"/>
            <ListItem primaryText="Draft.js" href="http://draftjs.org" target="_blank"/>
            <ListItem primaryText="Slack channel" href="https://draftjs.slack.com/messages/megadraft/" target="_blank"/>
          </List>
        </Drawer>
      </div>
    );
  }
}
