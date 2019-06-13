import React, { Component } from "react";
import { Sticky } from "react-sticky";
import Scroll from "react-scroll";
import { Link } from "react-router-dom";

import { common } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const Element = Scroll.Element;
const scroller = Scroll.scroller;

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      content: true
    };
  }

  handleTouchTap = event => {
    // This prevents ghost click.
    event.preventDefault();
    scroller.scrollTo("appbar", { duration: 300, smooth: true });

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const background = this.props.background || common.white;
    const showLeft = this.props.showLeft;

    return (
      <Element name="appbar">
        <Sticky>
          {({ style }) => (
            <Toolbar
              style={{
                ...style,
                background,
                zIndex: 1100,
                border: "1px solid rgba(0, 0, 0, 0.1)"
              }}
            >
              <Grid container>
                {showLeft ? (
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

                <Grid item xs={6}>
                  {this.props.children}
                </Grid>
              </Grid>
            </Toolbar>
          )}
        </Sticky>
      </Element>
    );
  }
}

export default MenuBar;
