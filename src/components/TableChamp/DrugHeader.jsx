import {
  isDispTimeNoColon_Digit,
  isValidDisplayTime,
  test3DigitNoColon,
  ttEpo
} from 'functions/functions.jsx';

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
    minWidth: '50px',
    textAlign: 'center'
  },
  icon: {
    margin: theme.spacing.unit,
    alignSelf: 'center'
  }
});

function DrugHeader(props) {
  const {
    classes,
    time,
    display,
    setTime,
    setDisplay,
    setRefFocus,
    DeleteColDialog
  } = props;

  const snapToTime = x => {
    const divider = ttEpo({ min: 15 });
    return Math.round(x / divider) * divider;
  };

  const alterValue = x => {
    let t = snapToTime(ttEpo(x)) + time;
    if (t < 0) t += ttEpo({ hr: 24 });
    setTime(t);
  };

  const handleKeyDown = e => {
    // arrow up/down button should select next/previous list element
    switch (e.key) {
      case 'ArrowLeft': // Left
        handleOnBlur();
        alterValue({ min: -15 });
        break;
      case 'ArrowUp': // Up
        handleOnBlur();
        alterValue({ hr: 1 });
        break;
      case 'ArrowRight': // Right
        handleOnBlur();
        alterValue({ min: 15 });
        break;
      case 'ArrowDown': // Down
        handleOnBlur();
        alterValue({ hr: -1 });
        break;
      case 'Enter':
        e.target.blur();
        break;
    }
  };

  const colonization = strx => {
    console.log('colonization: ', colonization);
    var str = strx.replace(/:/, '');
    console.log('str: ', str);
    console.log('str: ', str.replace(/:/, ''));
    let colonInsertIndex = -1;
    if (isDispTimeNoColon_Digit[3].test(str)) {
      console.log('isDispTimeNoColon_Digit: ', isDispTimeNoColon_Digit);
      if (test3DigitNoColon[0].test(str)) {
        colonInsertIndex = 1;
      } else if (test3DigitNoColon[1].test(str)) {
        colonInsertIndex = 2;
      }
    } else if (isDispTimeNoColon_Digit[4].test(str)) {
      console.log('isDispTimeNoColon_Digit: ', isDispTimeNoColon_Digit);
      colonInsertIndex = 2;
    }
    if (colonInsertIndex > 0) {
      console.log('colonInsertIndex: ', colonInsertIndex);
      str = str.slice(0, colonInsertIndex) + ':' + str.slice(colonInsertIndex);
    }
    return str;
  };

  const handleOnChange = e => {
    if (isValidDisplayTime(e.target.value)) {
      setDisplay(e.target.value);
      return;
    }
    let str = colonization(e.target.value);
    console.log('handleOnChange e', e.target.value);
    if (isValidDisplayTime(str)) {
      setDisplay(str);
      return;
    }
    setDisplay(display);
  };

  const confirmTime = x => {
    setTime(snapToTime(ttEpo(x)));
  };

  const handleOnBlur = () => {
    let str = colonization(display);
    if (isValidDisplayTime(str)) {
      let result = str.split(':');
      result[0] = result[0] || 0;
      result[1] = result[1] || 0;
      confirmTime({
        hr: parseInt(result[0]),
        min: parseInt(result[1])
      });
    } else {
      throw Error('handle on blur error (impossible) : ' + str);
    }
  };

  const addRefInput = () => {
    return input => {
      setRefFocus(input);
    };
  };

  return (
    <div className={classes.root}>
      <div>
        {}
        <Input
          id='adornment-password'
          className={classes.inputCenter}
          value={display}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          onBlur={handleOnBlur}
          inputRef={addRefInput()}
          inputProps={{ style: { textAlign: 'center' } }}
        />
      </div>
      {DeleteColDialog}
    </div>
  );
}

DrugHeader.propTypes = {
  DeleteColDialog: PropTypes.element.isRequired,
  classes: PropTypes.any,
  display: PropTypes.string.isRequired,
  handleDeleteCol: PropTypes.object.isRequired,
  setDisplay: PropTypes.object.isRequired,
  setRefFocus: PropTypes.object.isRequired,
  setTime: PropTypes.object.isRequired,
  time: PropTypes.number.isRequired
};

function areEqual(prevProps, nextProps) {
  return prevProps.display == nextProps.display;
}

export default React.memo(withStyles(style)(DrugHeader), areEqual);
