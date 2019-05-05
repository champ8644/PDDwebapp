import {
  isDisplayTimeWithColon,
  isDisplayTimeWithoutColon,
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
        alterValue({ min: -15 });
        break;
      case 'ArrowUp': // Up
        alterValue({ hr: 1 });
        break;
      case 'ArrowRight': // Right
        alterValue({ min: 15 });
        break;
      case 'ArrowDown': // Down
        alterValue({ hr: -1 });
        break;
      case 'Enter':
        e.target.blur();
        break;
    }
  };

  const handleOnChange = e => {
    if (isDisplayTimeWithColon(e.target.value)) {
      setDisplay(e.target.value);
    } else if (isDisplayTimeWithoutColon(e.target.value)) {
      let num = parseInt(e.target.value);
      let output = e.target.value;
      if (num > 99) {
        output = e.target.value.slice(0, 2) + ':' + e.target.value.slice(2);
      } else if (num > 999) {
        output = e.target.value.slice(0, 3) + ':' + e.target.value.slice(3);
      }

      setDisplay(output);
    } else {
      setDisplay(display);
    }
  };

  const confirmTime = x => {
    setTime(snapToTime(ttEpo(x)));
  };

  const handleOnBlur = () => {
    if (isDisplayTimeWithColon(display)) {
      let result = display.split(':');
      confirmTime({
        hr: parseInt(result[0]),
        min: parseInt(result[1])
      });
    } else if (isDisplayTimeWithoutColon(display)) {
      let result = parseInt(display);

      let output = {};
      if (result < 100) {
        output.hr = result;
      } else if (result < 1000) {
        output.hr = Math.floor(result / 10);
        output.min = result % 10;
      } else {
        output.hr = Math.floor(result / 100);
        output.min = result % 100;
      }

      confirmTime(output);
    } else {
      throw Error('handle on blur error (impossible) : ' + display);
    }
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
  setTime: PropTypes.object.isRequired,
  time: PropTypes.number.isRequired
};

function areEqual(prevProps, nextProps) {
  return prevProps.display == nextProps.display;
}

export default React.memo(withStyles(style)(DrugHeader), areEqual);
