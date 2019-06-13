/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from "react-dom";

import { hashHistory, Route, Switch, HashRouter } from "react-router-dom";
import Scroll from "react-scroll";
import { StickyContainer } from "react-sticky";

import { ThemeProvider } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { common } from "@material-ui/core/colors";

import MenuBar from "./components/menubar";
import Docs from "./components/docs";
import theme from "./components/megadrafttheme";
import Example from "./components/example";
import Header from "./components/header";
import { highlightCode } from "./components/highlightCode";
import LetsRockArrow from "./components/icons/arrow-down";
import ToggleButton from "./components/toggleButton";

const LinkScroll = Scroll.Link;
const scroller = Scroll.scroller;

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: true
    };
  }

  componentDidMount() {
    highlightCode(this);
  }

  componentDidUpdate() {
    highlightCode(this);
    scroller.scrollTo("appbar", { duration: 300 });
  }

  handleClick = () => {
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
  };

  render() {
    const { content } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Header />
        <StickyContainer>
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

          <MenuBar
            showLeft={!!content}
            background={content ? common.white : common.black}
          >
            <Grid container justify="flex-end">
              <ToggleButton
                onClick={this.handleClick}
                color={content ? "inherit" : "yellow"}
              >
                {content ? "VIEW CONTENT JSON" : "EDITOR"}
              </ToggleButton>
            </Grid>
          </MenuBar>

          <div className={content ? "" : "container--dark"}>
            <Example activeContent={content} />
          </div>
        </StickyContainer>
      </ThemeProvider>
    );
  }
}

ReactDOM.render(
  <HashRouter history={hashHistory}>
    <Switch>
      <Route path="/docs/:doc" component={Docs} />
      <Route path="/" component={Page} exact />
    </Switch>
  </HashRouter>,
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
