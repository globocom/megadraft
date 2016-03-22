import React from "react";

import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

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
            <ListItem>Overview</ListItem>
            <ListItem>Examples</ListItem>
          </List>
          <List subheader="Resources">
            <ListItem>Docs</ListItem>
            <ListItem>Github</ListItem>
            <ListItem>React</ListItem>
            <ListItem>Draft.js</ListItem>
          </List>
        </LeftNav>
      </div>
    );
  }
}

