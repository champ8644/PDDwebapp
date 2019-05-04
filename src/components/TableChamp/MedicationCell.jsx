import React, { useState } from "react";
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Input from "@material-ui/core/Input";
import InputAdornment from '@material-ui/core/InputAdornment';
import AddBox from '@material-ui/icons/AddBox';
import IndeterminateCheckBox from '@material-ui/icons/IndeterminateCheckBox';

const style = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
    width: '300px',
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
  input: {
    width: '100%',
  },
  icon: {
    margin: theme.spacing.unit,
    alignSelf: 'center',
  },
});

function MedicationCell({ ...props }) {
  const { classes, children, state, setState, drugType, ...rest } = props;

  const isNumber = (x) => {
    return /^\d*\.?\d*$/.test(x);
  }

  const isFraction = (x) => {
    return /^\d*[¼½¾]$/.test(x);
  }

  const toNumValue = (x) => {
    if (isNumber(x)) {
      return parseFloat(x);
    } else if (isFraction(x)) {
      let str = x.slice(0,-1);
      let lastchar = x.slice(-1);
      let output = parseFloat(str,10);
      switch (lastchar) {
        case '¼':
          output += .25;
          break;
        case '½':
          output += .5;
          break;
        case '¾':
          output += .75;
          break;
      }
      return parseFloat(output);
    }
  }

  const toFracValue = (x) => {
    if (isNumber(x)) {
      let val = Math.round(x*4)/4;
      let frac = Math.round(x*4)%4;
      let output = ''+Math.floor(val);
      switch (frac) {
        case 1:
          output += '¼';
          break;
        case 2:
          output += '½';
          break;
        case 3:
          output += '¾';
          break;
      }
      return output;
    } else if (isFraction(x)) {
      return x;
    }
  }

  const alterValue = (x) => {
    console.log({tNV:toNumValue(state.value),pF:parseFloat(x),sum:toNumValue(state.value)+parseFloat(x),tFV:toFracValue(toNumValue(state.value)+parseFloat(x))});
    setState({value:toFracValue(toNumValue(state.value)+parseFloat(x))});
  }

  const handleKeyDown = (e) => {
    // arrow up/down button should select next/previous list element
      switch(e.key) {
        case "ArrowLeft": // Left
          alterValue(-1);
          break;
        case "ArrowUp": // Up
          alterValue(0.25);
          break;
        case "ArrowRight": // Right
          alterValue(1);
          break;
        case "ArrowDown": // Down
          alterValue(-0.25);
          break;
        case "Enter":
          e.target.blur();
          break;
      }
  }

  const handleOnChange = (e) => {
    if (isNumber(e.target.value) || isFraction(e.target.value)) {
      setState({value:e.target.value});
    } else {
      setState({value:state.value});
    }
  }

  const handleFocus = () => {
    setState({value:toNumValue(state.value)});
  }

  const handleBlur = () => {
    setState({value:toFracValue(state.value)});
  }

  const handleClick = (x) => {
    // to do: make button ripple
    alterValue(x);
  }

  return (
    <div className={classes.inputDoses}>
      <div style={{ display: 'inline-flex' }}>
        <div>
            <IndeterminateCheckBox
              className={classes.icon}
              onClick={()=>handleClick(-1)}
            />
        </div>
        <div>
          <Input
            id="adornment-password"
            className={classes.input}
            value={state.value}
            onChange={handleOnChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            endAdornment={
              <InputAdornment position="end">
                {drugType}
              </InputAdornment>
            }
          />
        </div>
        <div>
          <AddBox
            className={classes.icon}
            onClick={()=>handleClick(1)}
          />
        </div>
      </div>
    </div>
  );
}

MedicationCell.propTypes = {
  state: PropTypes.object.isRequired,
  setState: PropTypes.object.isRequired,
  drugType: PropTypes.string.isRequired,
};


export default withStyles(style)(MedicationCell);
