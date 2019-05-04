import { isFraction, isNumber } from 'functions/functions.jsx';

import AddBox from '@material-ui/icons/AddBox';
import IndeterminateCheckBox from '@material-ui/icons/IndeterminateCheckBox';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/core components
const style = theme => ({
  root: {
    display: 'inline-flex'
  },
  margin: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  inputCenter: {
    minWidth: '60px',
    textAlign: 'center'
  },
  icon: {
    margin: theme.spacing.unit,
    alignSelf: 'center'
  }
});

function DrugCell(props) {
  const { classes, value, setValue, drugType } = props;

  const toNumValue = x => {
    if (isNumber(x)) {
      return parseFloat(x);
    } else if (isFraction(x)) {
      let str = x.slice(0, -1);
      let lastchar = x.slice(-1);
      let output = parseFloat(str, 10);
      switch (lastchar) {
        case '¼':
          output += 0.25;
          break;
        case '½':
          output += 0.5;
          break;
        case '¾':
          output += 0.75;
          break;
      }
      return parseFloat(output);
    }
  };

  const toFracValue = x => {
    if (isNumber(x)) {
      let val = Math.round(x * 4) / 4;
      let frac = Math.round(x * 4) % 4;
      let output = '' + Math.floor(val);
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
  };

  const alterValue = x => {
    setValue(toFracValue(toNumValue(value) + parseFloat(x)));
  };

  const handleKeyDown = e => {
    // arrow up/down button should select next/previous list element
    switch (e.key) {
      case 'ArrowLeft': // Left
        alterValue(-0.25);
        break;
      case 'ArrowUp': // Up
        alterValue(1);
        break;
      case 'ArrowRight': // Right
        alterValue(0.25);
        break;
      case 'ArrowDown': // Down
        alterValue(-1);
        break;
      case 'Enter':
        e.target.blur();
        break;
    }
  };

  const handleOnChange = e => {
    if (isNumber(e.target.value) || isFraction(e.target.value)) {
      setValue(e.target.value);
    } else {
      setValue(value);
    }
  };

  const handleFocus = () => {
    setValue(toNumValue(value));
  };

  const handleBlur = () => {
    setValue(toFracValue(value));
  };

  const handleClick = x => {
    // to do: make button ripple
    alterValue(x);
  };

  return (
    <div className={classes.root}>
      <div>
        <IndeterminateCheckBox
          className={classes.icon}
          onClick={() => handleClick(-1)}
        />
      </div>
      <div>
        <Input
          id='adornment-password'
          className={classes.inputCenter}
          value={value}
          onChange={handleOnChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          inputProps={{ style: { textAlign: 'center' } }}
          endAdornment={
            <InputAdornment position='end'>{drugType}</InputAdornment>
          }
        />
      </div>
      <div>
        <AddBox className={classes.icon} onClick={() => handleClick(1)} />
      </div>
    </div>
  );
}

DrugCell.propTypes = {
  classes: PropTypes.object,
  drugType: PropTypes.string,
  setValue: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired
};

function areEqual(prevProps, nextProps) {
  return prevProps.value == nextProps.value;
}

export default React.memo(withStyles(style)(DrugCell), areEqual);
