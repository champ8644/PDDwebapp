import { isFraction, isNumber } from 'functions/functions.jsx';

import Delete from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input';
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

function DrugHeader(props) {
  const { classes, time, settime } = props;

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
    settime(toFracValue(toNumValue(time) + parseFloat(x)));
  };

  const handleKeyDown = e => {
    // arrow up/down button should select next/previous list element
    switch (e.key) {
      case 'ArrowLeft': // Left
        alterValue(-1);
        break;
      case 'ArrowUp': // Up
        alterValue(0.25);
        break;
      case 'ArrowRight': // Right
        alterValue(1);
        break;
      case 'ArrowDown': // Down
        alterValue(-0.25);
        break;
      case 'Enter':
        e.target.blur();
        break;
    }
  };

  const handleOnChange = e => {
    if (isNumber(e.target.value) || isFraction(e.target.value)) {
      settime(e.target.value);
    } else {
      settime(time);
    }
  };

  const handleClick = x => {
    // to do: make button ripple
    alterValue(x);
  };

  return (
    <div className={classes.root}>
      <div>
        <Input
          id='adornment-password'
          className={classes.inputCenter}
          value={time}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          inputProps={{ style: { textAlign: 'center' } }}
        />
      </div>
      <div>
        <Delete className={classes.icon} onClick={() => handleClick(1)} />
      </div>
    </div>
  );
}

DrugHeader.propTypes = {
  classes: PropTypes.any,
  drugType: PropTypes.any,
  settime: PropTypes.any,
  time: PropTypes.any
};

function areEqual(prevProps, nextProps) {
  return prevProps.time == nextProps.time;
}

export default React.memo(withStyles(style)(DrugHeader), areEqual);
