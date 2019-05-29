/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from "react-dom";
import {
  withRouter,
  hashHistory,
  Router,
  Route,
  IndexRoute,
  Link
} from "react-router";
import Scroll from "react-scroll";
import { StickyContainer, Sticky } from "react-sticky";

import Button from "@material-ui/core/Button";

import { common, yellow } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";

import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import Toolbar from "@material-ui/core/Toolbar";

import Home from "./components/home";
import Docs from "./components/docs";
import theme from "./components/megadrafttheme";
import Example from "./components/example";
import Header from "./components/header";
import { highlightCode } from "./components/highlightCode";
import LetsRockArrow from "./components/icons/arrow-down";

const LinkScroll = Scroll.Link;
const Element = Scroll.Element;
const scroller = Scroll.scroller;

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      content: true
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
    scroller.scrollTo("appbar", { duration: 300 });
  }

  handleClick() {
    if (this.state.content) {
      highlightCode(this);
      this.setState({
        content: !this.state.content
      });
    } else {
      highlightCode(this);
      this.setState({
        content: !this.state.content
      });
    }
  }

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();
    scroller.scrollTo("appbar", { duration: 300, smooth: true });

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  render() {
    const { router } = this.props;
    this.isHome = router.isActive("/", true);

    return (
      <ThemeProvider theme={theme}>
        {this.isHome ? <Header /> : null}
        <StickyContainer>
          {this.isHome ? (
            <div>
              <LinkScroll
                className="hero__call-to-action"
                to="appbar"
                spy={true}
                smooth={true}
                duration={600}
              >
                LET'S ROCK
                <div className="hero__arrow-call-to-action">
                  <LetsRockArrow />
                </div>
              </LinkScroll>
            </div>
          ) : null}
          <Element name="appbar">
            <Sticky>
              {({ style }) => (
                <Toolbar
                  style={{
                    ...style,
                    background: this.state.content
                      ? common.white
                      : common.black,
                    zIndex: 1100,
                    border: "1px solid rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <Grid container>
                    {this.state.content ? (
                      <Grid item xs={6}>
                        <Grid container direction="row" justify="space-evenly">
                          <Button component={Link} to="/">
                            Home
                          </Button>
                          <Button
                            onClick={this.handleTouchTap}
                            style={{ boxShadow: common.white }}
                          >
                            Documentation
                          </Button>
                          <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            open={Boolean(this.state.open)}
                            onClose={this.handleRequestClose}
                          >
                            <MenuItem
                              onClick={this.handleRequestClose}
                              component={Link}
                              to="/docs/overview"
                            >
                              Overview & Usage
                            </MenuItem>
                            <MenuItem
                              component={Link}
                              onClick={this.handleRequestClose}
                              to="/docs/customization"
                            >
                              Customization
                            </MenuItem>
                            <MenuItem
                              component={Link}
                              onClick={this.handleRequestClose}
                              to="/docs/plugins"
                            >
                              Plugins
                            </MenuItem>
                            <MenuItem
                              component={Link}
                              onClick={this.handleRequestClose}
                              to="/docs/custom-entities"
                            >
                              Custom Entities
                            </MenuItem>
                            <MenuItem
                              component={Link}
                              onClick={this.handleRequestClose}
                              to="/docs/saving-loading"
                            >
                              Saving & Loading
                            </MenuItem>
                            <Divider />
                            <MenuItem
                              component={"a"}
                              onClick={this.handleRequestClose}
                              href="http://draftjs.org"
                              target="_blank"
                            >
                              Draft.js
                            </MenuItem>
                            <MenuItem
                              component={"a"}
                              onClick={this.handleRequestClose}
                              href="https://facebook.github.io/react/"
                              target="_blank"
                            >
                              React
                            </MenuItem>
                          </Menu>
                          <Button
                            href="https://draftjs.slack.com/messages/megadraft/"
                            target="_blank"
                          >
                            Slack channel
                          </Button>
                          <Button
                            href="https://github.com/globocom/megadraft"
                            target="_blank"
                          >
                            Repository
                          </Button>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid item xs={6} />
                    )}

                    {this.isHome && (
                      <Grid item xs={6}>
                        <Grid container justify="flex-end">
                          <Button
                            onClick={this.handleClick}
                            style={{
                              color: this.state.content
                                ? "inherit"
                                : yellow[600]
                            }}
                          >
                            {this.state.content
                              ? "VIEW CONTENT JSON"
                              : "EDITOR"}
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Toolbar>
              )}
            </Sticky>
          </Element>

          <div className={this.state.content ? "" : "container--dark"}>
            {React.cloneElement(this.props.children, {
              activeContent: this.state.content
            })}
          </div>
        </StickyContainer>
      </ThemeProvider>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={withRouter(Page)}>
      <IndexRoute component={Home} />
      <Route path="/docs/:doc" component={Docs} />
      <Route path="/dev" component={Example} />
    </Route>
  </Router>,
  document.getElementById("react-container")
);

/* global hljs */
hljs.initHighlightingOnLoad();

if (process.env.NODE_ENV === "production") {
  (function(i, s, o, g, r, a, m) {
    i["GoogleAnalyticsObject"] = r;
    (i[r] =
      i[r] ||
      function() {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(
    window,
    document,
    "script",
    "https://www.google-analytics.com/analytics.js",
    "ga"
  );
  /* global ga */
  ga("create", "UA-77313227-1", "auto");
  ga("send", "pageview");
}
