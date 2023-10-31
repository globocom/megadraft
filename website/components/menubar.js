import React, { useState, useRef } from "react";
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
import { useCallback } from "react";

import { Burger } from "./icons/burger";

const Element = Scroll.Element;
const scroller = Scroll.scroller;

const MenuBar = props => {
  const { background = common.white, showLeft, children } = props;
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const documentationMenu = useRef(null);
  const [closeMenu, setCloseMenu] = useState(true);
  
  const megadraftUrl = "https://draftjs.slack.com/messages/megadraft/";
  const githubUrl = "https://github.com/globocom/megadraft";
  const targetBlank = "_blank";

  const handleTouchTap = event => {
    // This prevents ghost click.
    event.preventDefault();

    scroller.scrollTo("appbar", { duration: 300, smooth: true });
    setTimeout(() => setShowMenuDropdown(true), 300);
  };

  const handleChangeOpenMenu = useCallback(() => {
    setCloseMenu(prev => !prev);
  }, []);

  const handleRequestClose = () => {
    setShowMenuDropdown(false);
    !closeMenu && handleChangeOpenMenu();
  };

  const dropDownData = {
    documentationMenu,
    handleRequestClose,
    showMenuDropdown
  };

  return (
    <Element name="appbar" className="appBar">
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
            <Grid container className="linear-menu">
              {showLeft ? (
                <Grid item xs={6}>
                  <Grid container direction="row" justify="space-evenly">
                    <Button component={Link} to="/">
                      Home
                    </Button>
                    <Button
                      ref={documentationMenu}
                      onClick={handleTouchTap}
                      style={{ boxShadow: common.white }}
                    >
                      Documentation
                    </Button>
                    <MenuDropDown {...dropDownData} />
                    <Button
                      href={megadraftUrl}
                      target={targetBlank}
                    >
                      Slack channel
                    </Button>
                    <Button
                      href={githubUrl}
                      target={targetBlank}
                    >
                      Repository
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Grid item xs={6} />
              )}

              <Grid item xs={6}>
                {children}
              </Grid>
            </Grid>
            <div
              className={`dropdown-menu ${closeMenu &&
                "dropdown-menu__hidden"}`}
            >
              <div
                className={`dropdown-menu__header ${!showLeft &&
                  "dropdown-menu__header__dark"} `}
              >
                Menu{" "}
                <button onClick={handleChangeOpenMenu}>
                  <Burger />
                </button>
              </div>
              {showLeft && (
                <div className="dropdown-menu__list">
                  <Button component={Link} to="/">
                    Home
                  </Button>
                  <Button
                    ref={documentationMenu}
                    onClick={handleTouchTap}
                    style={{ boxShadow: common.white }}
                  >
                    Documentation
                  </Button>
                  <MenuDropDown {...dropDownData} />
                  <Button
                    href={megadraftUrl}
                    target={targetBlank}
                    onClick={handleRequestClose}
                  >
                    Slack channel
                  </Button>
                  <Button
                    href={githubUrl}
                    target={targetBlank}
                    onClick={handleRequestClose}
                  >
                    Repository
                  </Button>
                </div>
              )}
              <div className="dropdown-menu__list">{children}</div>
            </div>
          </Toolbar>
        )}
      </Sticky>
    </Element>
  );
};

const MenuDropDown = props => {
  const { documentationMenu, handleRequestClose, showMenuDropdown } = props;
  return (
    <Menu
      id="simple-menu"
      anchorEl={documentationMenu.current}
      open={Boolean(showMenuDropdown)}
      onClose={handleRequestClose}
    >
      <MenuItem
        onClick={handleRequestClose}
        component={Link}
        to="/docs/overview"
      >
        Overview & Usage
      </MenuItem>
      <MenuItem
        component={Link}
        onClick={handleRequestClose}
        to="/docs/customization"
      >
        Customization
      </MenuItem>
      <MenuItem
        component={Link}
        onClick={handleRequestClose}
        to="/docs/plugins"
      >
        Plugins
      </MenuItem>
      <MenuItem
        component={Link}
        onClick={handleRequestClose}
        to="/docs/custom-entities"
      >
        Custom Entities
      </MenuItem>
      <MenuItem
        component={Link}
        onClick={handleRequestClose}
        to="/docs/saving-loading"
      >
        Saving & Loading
      </MenuItem>
      <Divider />
      <MenuItem
        component={"a"}
        onClick={handleRequestClose}
        href="http://draftjs.org"
        target={targetBlank}
      >
        Draft.js
      </MenuItem>
      <MenuItem
        component={"a"}
        onClick={handleRequestClose}
        href="https://facebook.github.io/react/"
        target={targetBlank}
      >
        React
      </MenuItem>
    </Menu>
  );
};

export default MenuBar;
