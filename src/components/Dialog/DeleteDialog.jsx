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
  root: {
    alignSelf: 'center'
  },
  icon: {
    margin: theme.spacing.unit,
    alignSelf: 'auto'
  }
});

function DeleteDialog(props) {
  const { classes, id, name, ConfirmDel, type } = props;

  const [open, setOpen] = useState(false);

  function handleDelete() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleCloseDel() {
    ConfirmDel();
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <Delete className={classes.icon} onClick={handleDelete} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id={'confirm-delete-' + type}>
          Confirm delete {type}
          {type == 'Col' ? 'umn' : ''} ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id={'confirm-delete-' + type + '-description'}>
            You are going to delete [{type}
            {type == 'Col' ? 'umn' : ''} No.{id}] [{name}] This can{"'"}t be
            undo. Are you sure?
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

DeleteDialog.propTypes = {
  ConfirmDel: PropTypes.func.isRequired,
  classes: PropTypes.object,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default withStyles(style)(DeleteDialog);
