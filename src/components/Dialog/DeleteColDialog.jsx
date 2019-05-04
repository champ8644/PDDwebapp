import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const style = theme => ({
  icon: {
    margin: theme.spacing.unit,
    alignSelf: 'center'
  }
});

function DeleteColDialog(props) {
  const { classes, timeId, timeString, ConfirmDelCol } = props;
  const [open, setOpen] = useState(false);

  function handleDeleteCol() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleCloseDel() {
    ConfirmDelCol();
    setOpen(false);
  }

  return (
    <div>
      <Delete className={classes.icon} onClick={handleDeleteCol} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id='confirm-delete-col'>
          {'Confirm delete column?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='confirm-delete-col-description'>
            You are going to delete [Array No.{timeId}] [{timeString}] This cant
            be undo. Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDel} color='primary'>
            Agree
          </Button>
          <Button onClick={handleClose} color='primary' autoFocus>
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DeleteColDialog.propTypes = {
  ConfirmDelCol: PropTypes.object.isRequired,
  classes: PropTypes.object,
  timeId: PropTypes.number.isRequired,
  timeString: PropTypes.string
};

export default withStyles(style)(DeleteColDialog);
