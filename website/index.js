/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from "react-dom";
import { hashHistory, Router, Route, IndexRoute } from "react-router";

import AppBar from "material-ui/AppBar";

import Home from "./components/home";
import Docs from "./components/docs";
import LeftNavMenu from "./components/leftnavmenu";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import injectTapEventPlugin from "react-tap-event-plugin";

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
  getChildContext() {
    return {muiTheme: getMuiTheme()};
  }
  onMenuToggle() {
    this.setState({open: !this.state.open});
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
    );
  }
}


Page.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Page}>
      <IndexRoute component={Home}/>
      <Route path="/docs/:doc" component={Docs}/>
    </Route>
  </Router>),
  document.getElementById("container")
);

if (process.env.NODE_ENV === "production") {
  (function(i,s,o,g,r,a,m){
    i["GoogleAnalyticsObject"]=r;
    i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments);
    },i[r].l=1*new Date();
    a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];
    a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
  })(window,document,"script","https://www.google-analytics.com/analytics.js","ga");
  /* global ga */
  ga("create", "UA-77313227-1", "auto");
  ga("send", "pageview");
}
