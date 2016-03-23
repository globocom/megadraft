import React from "react";
import {Link} from 'react-router'

import Divider from 'material-ui/lib/divider';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';


export default class LeftNavMenu extends React.Component {

  render() {
    return (
      <div>
        <LeftNav
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
          <List subheader="Resources">
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
              containerElement={<a href="https://facebook.github.io/draft-js"/>}>
                Draft.js</ListItem>
          </List>
        </LeftNav>
      </div>
    );
  }
}

