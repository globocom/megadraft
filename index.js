/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {withRouter, hashHistory, Router, Route, IndexRoute, Link} from "react-router";
import Scroll from "react-scroll";
import {StickyContainer, Sticky} from "react-sticky";

import getMuiTheme from "material-ui/styles/getMuiTheme";
import FlatButton from "material-ui/FlatButton";
import {darkBlack, white, yellow600} from "material-ui/styles/colors";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import Popover from "material-ui/Popover";
import Divider from "material-ui/Divider";
import Menu from "material-ui/Menu";
import {Toolbar, ToolbarGroup} from "material-ui/Toolbar";

import Home from "./components/home";
import Docs from "./components/docs";
import MyRawTheme from "./components/megadrafttheme";
import Example from "./components/example";
import Header from "./components/header";
import {highlightCode} from "./components/highlightCode";
import LetsRockArrow from "./components/icons/arrow-down";

import injectTapEventPlugin from "react-tap-event-plugin";


// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
const LinkScroll = Scroll.Link;
const Element = Scroll.Element;
const scroller = Scroll.scroller;

class Page extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      content: true,
    };
    this.handleClick = ::this.handleClick;
    this.handleTouchTap = ::this.handleTouchTap;
    this.handleRequestClose = ::this.handleRequestClose;
  }

  componentDidMount() {
    highlightCode(this);
  }

  componentDidUpdate() {
    highlightCode(this);
    scroller.scrollTo("appbar", {duration: 300});
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(MyRawTheme)
    };
  }

  handleClick() {
    if(this.state.content){
      highlightCode(this);
      this.setState({
        content: !this.state.content,
      });
    } else {
      highlightCode(this);
      this.setState({
        content: !this.state.content,
      });
    }
  }

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();
    scroller.scrollTo("appbar", {duration: 300, smooth: true});

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const {router} = this.props;
    this.isHome = router.isActive("/", true);

    return (
      <div>
        {this.isHome? <Header /> : null}
        <StickyContainer>
        {this.isHome? <div>
        <LinkScroll className="hero__call-to-action"
            to="appbar" spy={true}
            smooth={true}
            duration={600}>
          LET'S ROCK
        <div className="hero__arrow-call-to-action">
        <LetsRockArrow />
        </div>
        </LinkScroll>
        </div>: null}
        <Element name="appbar">
        <Sticky style={{zIndex:1100}}>
        <Toolbar
          style={{background:this.state.content? white: darkBlack,
            border: "solid 1px rgba(0, 0, 0, 0.1)"}}>

        {this.state.content ?
        <ToolbarGroup firstChild={true} className="label">
          <FlatButton
              label="Home" containerElement={<Link to="/"/>}/>
            <RaisedButton
                onTouchTap={this.handleTouchTap}
                label="Documentation"
                style={{boxShadow: white}}
            />
            <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: "left", vertical: "bottom"}}
                targetOrigin={{horizontal: "left", vertical: "top"}}
                onRequestClose={this.handleRequestClose}>
            <Menu>
              <MenuItem primaryText="Overview & Usage"
                  onTouchTap= {this.handleRequestClose}
                  containerElement={<Link to="/docs/overview"/>}/>
              <MenuItem primaryText="Customization"
                  onTouchTap= {this.handleRequestClose}
                  containerElement={<Link to="/docs/customization"/>}/>
              <MenuItem primaryText="Plugins"
                  onTouchTap= {this.handleRequestClose}
                  containerElement={<Link to="/docs/plugins"/>}/>
              <MenuItem primaryText="Custom Entities"
                  onTouchTap= {this.handleRequestClose}
                  containerElement={<Link to="/docs/custom-entities"/>}/>
              <MenuItem primaryText="Saving & Loading"
                  onTouchTap= {this.handleRequestClose}
                  containerElement={<Link to="/docs/saving-loading"/>}/>
              <Divider />
              <MenuItem primaryText="Draft.js"
                  onTouchTap= {this.handleRequestClose}
                  href="http://draftjs.org" target="_blank"/>
              <MenuItem primaryText="React"
                  onTouchTap= {this.handleRequestClose}
                  href="https://facebook.github.io/react/" target="_blank"/>
              </Menu>
            </Popover>
          <FlatButton
              label="Slack channel"
              href="https://draftjs.slack.com/messages/megadraft/"
              target="_blank"/>
          <FlatButton
              label="Repository"
              href="https://github.com/globocom/megadraft"
              target="_blank"/>
          </ToolbarGroup>
          : <ToolbarGroup />}

          {this.isHome?
          <ToolbarGroup>
            <FlatButton
                label={this.state.content? "VIEW CONTENT JSON" : "EDITOR"}
                onClick={this.handleClick}
                labelStyle={{color:this.state.content? darkBlack: yellow600}}/>
          </ToolbarGroup>
          : <ToolbarGroup />}
        </Toolbar>
        </Sticky>
        </Element>

        <div
          className={this.state.content? "": "container--dark"}>
          {React.cloneElement(this.props.children, {activeContent: this.state.content})}
        </div>

        </StickyContainer>
      </div>
    );
  }
}

Page.childContextTypes = {
  muiTheme: PropTypes.object
};

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={withRouter(Page)}>
      <IndexRoute component={Home}/>
      <Route path="/docs/:doc" component={Docs}/>
      <Route path="/dev" component={Example}/>
    </Route>
  </Router>),
  document.getElementById("react-container")
);

/* global hljs */
hljs.initHighlightingOnLoad();

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
