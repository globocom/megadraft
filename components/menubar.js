import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Scroll from "react-scroll";
import { Sticky } from "react-sticky";

import Button from "@material-ui/core/Button";
import { common } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import { useCallback } from "react";

import { Burger } from "./icons/burger";

const Element = Scroll.Element;
const scroller = Scroll.scroller;

const MenuBar = props => {
  const { background = common.white, showLeft, children } = props;
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const documentationMenu = useRef(null);
  const [closeMenu, setCloseMenu] = useState(true);

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
                    href="https://draftjs.slack.com/messages/megadraft/"
                    target="_blank"
                    onClick={handleRequestClose}
                  >
                    Slack channel
                  </Button>
                  <Button
                    href="https://github.com/globocom/megadraft"
                    target="_blank"
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
        target="_blank"
      >
        Draft.js
      </MenuItem>
      <MenuItem
        component={"a"}
        onClick={handleRequestClose}
        href="https://facebook.github.io/react/"
        target="_blank"
      >
        React
      </MenuItem>
    </Menu>
  );
};

export default MenuBar;
