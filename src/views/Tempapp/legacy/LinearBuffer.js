import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function LinearBuffer (props) {
    const { classes, completed, buffer, completedS, bufferS } = props;
    let completedSum = (completedS === undefined) ? completed : completedS;
    let bufferSum = (bufferS === undefined) ? buffer : bufferS;
    return (
      <div className={classes.root}>
        <br />
        <LinearProgress color="primary" variant="buffer" value={completed} valueBuffer={buffer} />
        <br />
        <LinearProgress color="secondary" variant="buffer" value={completedSum} valueBuffer={bufferSum} />
      </div>
    );
}

LinearBuffer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearBuffer);