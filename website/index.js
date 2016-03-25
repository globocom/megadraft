/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from "react-dom";
import { hashHistory, Router, Route, Link, IndexRoute } from 'react-router'

import AppBar from 'material-ui/lib/app-bar';

import styles from './App.css';

import Home from './components/home';
import Docs from './components/docs';
import LeftNavMenu from './components/leftnavmenu';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }
  onMenuToggle() {
    this.setState({open: !this.state.open})
  }
  render() {
    return (
      <div>
        <LeftNavMenu
          open={this.state.open}
          toggleMenu={::this.onMenuToggle} />
        <AppBar
          title="Megadraft"
          onLeftIconButtonTouchTap={::this.onMenuToggle} />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
}


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Page}>
      <IndexRoute component={Home}/>
      <Route path="/docs/:doc" component={Docs}/>
    </Route>
  </Router>),
  document.getElementById('container')
);
