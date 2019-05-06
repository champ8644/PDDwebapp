import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MedicationQuery from 'components/ChampCustoms/MedicationQuery.jsx';
import ReactVirtualizedTable from 'components/Table/ReactVirtualizedTable.jsx';

function ScrollDialogDrug() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button onClick={handleClickOpen('disable')}>Open Dialog</Button>
      <Dialog
        fullWidth={true}
        maxWidth={'100%'}
        open={open}
        onClose={handleClose}
        aria-labelledby='scroll-dialog-title'
      >
        <DialogTitle id='scroll-dialog-title'>Medication</DialogTitle>
        <DialogContent>
          <ReactVirtualizedTable />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Select
          </Button>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ScrollDialogDrug;
