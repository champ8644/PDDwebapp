import {
  isDispTimeNoColon_Digit,
  isValidDisplayTime,
  test2DigitNoColon,
  test3DigitNoColon,
  ttEpo
} from 'functions/functions.jsx';

import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import purple from '@material-ui/core/colors/purple';
import withStyles from '@material-ui/core/styles/withStyles';

//import { primaryColor } from 'assets/jss/material-dashboard-react.jsx';

// @material-ui/core components
const style = theme => ({
  root: {
    display: 'inline-flex'
  },
  margin: {
    margin: theme.spacing.unit
  },
  cssLabel: {
    '&$cssFocused': {
      color: purple[500]
    }
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: purple[500]
    }
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: purple[500],
      textAlign: 'center'
    }
  },
  notchedOutline: {},
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  input: {
    minWidth: '50px',
    textAlign: 'center'
  },
  icon: {
    margin: theme.spacing.unit,
    alignSelf: 'center'
  },
  disabled: {
    '&:before': {
      backgroundColor: 'transparent !important'
    }
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
    handleOnFocusState,
    handleOnBlurState,
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

  const validateValue = () => {
    let str = colonization(display);

    if (isValidDisplayTime(str)) {
      let result = str.split(':');
      result[0] = result[0] || '0';
      result[1] = result[1] || '0';
      if (result[1].length < 2) {
        result[1] += '0';
      }
      confirmTime({
        hr: parseInt(result[0]),
        min: parseInt(result[1])
      });
    } else {
      throw Error('handle on blur error (impossible) : ' + str);
    }
  };

  const handleKeyDown = e => {
    // arrow up/down button should select next/previous list element
    switch (e.key) {
      case 'ArrowUp': // Up
        validateValue();
        alterValue({ min: 15 });
        break;
      case 'ArrowDown': // Down
        validateValue();
        alterValue({ min: -15 });
        break;
      case 'Enter':
        validateValue();
        break;
    }
  };

  const colonization = strx => {
    var str = strx.replace(/:/, '');
    let colonInsertIndex = -1;
    if (isDispTimeNoColon_Digit[2].test(str)) {
      if (test2DigitNoColon[0].test(str)) {
        colonInsertIndex = 2;
      } else if (test2DigitNoColon[1].test(str)) {
        colonInsertIndex = 1;
      }
    } else if (isDispTimeNoColon_Digit[3].test(str)) {
      if (test3DigitNoColon[0].test(str)) {
        colonInsertIndex = 1;
      } else if (test3DigitNoColon[1].test(str)) {
        colonInsertIndex = 2;
      }
    } else if (isDispTimeNoColon_Digit[4].test(str)) {
      colonInsertIndex = 2;
    }
    if (colonInsertIndex > 0) {
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
    validateValue();
    handleOnBlurState();
  };

  const addRefInput = () => {
    return input => {
      setRefFocus(input);
    };
  };

  return (
    <div className={classes.root}>
      <TextField
        className={classes.margin + ' ' + classes.input}
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused
          }
        }}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline
          },
          style: { textAlign: 'center' }
        }}
        label='Drug meal'
        variant='outlined'
        id='table-header'
        value={display}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        onBlur={handleOnBlur}
        onFocus={handleOnFocusState}
        inputRef={addRefInput()}
      />
      {DeleteColDialog}
    </div>
  );
}

DrugHeader.propTypes = {
  DeleteColDialog: PropTypes.element.isRequired,
  classes: PropTypes.any,
  display: PropTypes.string.isRequired,
  handleDeleteCol: PropTypes.object.isRequired,
  handleOnBlurState: PropTypes.object.isRequired,
  handleOnFocusState: PropTypes.object.isRequired,
  setDisplay: PropTypes.object.isRequired,
  setRefFocus: PropTypes.object.isRequired,
  setTime: PropTypes.object.isRequired,
  time: PropTypes.number.isRequired
};

function areEqual(prevProps, nextProps) {
  return prevProps.display == nextProps.display;
}

export default React.memo(withStyles(style)(DrugHeader), areEqual);
