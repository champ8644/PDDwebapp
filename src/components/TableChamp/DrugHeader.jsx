import React, { useEffect } from 'react';
import { epotT, ttEpo } from 'functions/functions.jsx';

import Delete from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
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
  const { classes, time, setTime } = props;

  const alterValue = x => {
    let t = ttEpo(x) + time;
    if (t < 0) t += ttEpo({ hr: 24 });
    setTime(t);
  };

  const handleKeyDown = e => {
    // arrow up/down button should select next/previous list element
    switch (e.key) {
      case 'ArrowLeft': // Left
        alterValue({ hr: -1 });
        break;
      case 'ArrowUp': // Up
        alterValue({ min: 15 });
        break;
      case 'ArrowRight': // Right
        alterValue({ hr: 1 });
        break;
      case 'ArrowDown': // Down
        alterValue({ min: -15 });
        break;
      case 'Enter':
        e.target.blur();
        break;
    }
  };

  const handleOnChange = e => {
    setTime(e.target.value);
  };

  const handleClick = x => {
    // to do: make button ripple
    alterValue(x);
  };

  const parseToTime = x => {
    let y = epotT(x);
    return y.hr + ':' + ('00' + y.min).slice(-2);
  };

  return (
    <div className={classes.root}>
      <div>
        <Input
          id='adornment-password'
          className={classes.inputCenter}
          value={parseToTime(time)}
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
  setTime: PropTypes.object.isRequired,
  time: PropTypes.number.isRequired
};

function areEqual(prevProps, nextProps) {
  return prevProps.time == nextProps.time;
}

export default React.memo(withStyles(style)(DrugHeader), areEqual);
