import React from "react";
import PropTypes from "prop-types";

import SelectBase from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import Clear from "@material-ui/icons/Clear";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown"
import Check from "@material-ui/icons/Check";

import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.jsx";
import classNames from "classnames";
import withStyle from "@material-ui/core/styles/withStyles";

function Select(props) {
  const { children, classes, error, success, ...other } = props;

  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true
  });

  return (
    <FormControl className={classes.formControl} fullWidth={true}>
      {props.label && (
        <InputLabel
          className={classNames({
            [classes.labelRoot]: true,
            [classes.labelRootError]: error
          })}
        >
          {props.label}
        </InputLabel>
      )}
      <SelectBase
        {...other}
        classes={{
          icon: error ? classes.labelRootError : undefined
        }}
        className={classNames(
          {
            [classes.marginTop]: props.label === undefined
          },
          underlineClasses,
          classes.disabled
        )}
        IconComponent={error ? Clear : ArrowDropDown}
      >
        {children}
      </SelectBase>
    </FormControl>
  );
}

export default withStyle(customInputStyle)(Select);
