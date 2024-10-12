import React from "react";
import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { yellow } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  yellow: {
    color: yellow[600],
    "&:hover": {
      backgroundColor: "rgba(253, 216, 53, .2)"
    }
  }
}));

const ToggleButton = ({ children, color, onClick }) => {
  const classes = useStyles();
  return (
    <Button
      onClick={onClick}
      className={classNames({ [classes.yellow]: color === "yellow" })}
    >
      {children}
    </Button>
  );
};

export default ToggleButton;
