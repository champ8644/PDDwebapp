import DeleteDialog from 'components/Dialog/DeleteDialog.jsx';
import DrugCell from 'components/TableChamp/DrugCell.jsx';
import DrugFront from 'components/TableChamp/DrugFront.jsx';
import DrugHeader from 'components/TableChamp/DrugHeader.jsx';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { epotStr } from 'functions/functions.jsx';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    overflow: 'auto', // added code
    overflowY: 'hidden',
    overflowX: 'auto',
    maxWidth: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    marginBottom: '0',
    maxWidth: 'none',
    width: 'auto',
    overflow: 'hidden', // added code
    tableLayout: 'auto',
    padding: '5px 5 5 5'
    //wordWrap: 'break-word',
  }
});

function SimpleTable(props) {
  const { classes, state, dispatch } = props;

  const handleCell = (e, x, y) => {
    dispatch({ type: 'setTableCell', payload: { x: x, y: y, value: e } });
  };

  const handleHeader = (e, x) => {
    dispatch({ type: 'setTableHeader', payload: { x: x, epoch: e } });
  };

  const handleHeaderDisplay = (e, x) => {
    dispatch({ type: 'setTableHeaderDisplay', payload: { x: x, display: e } });
  };

  const handleFront = (e, x) => {
    dispatch({ type: 'setTableFront', payload: { x: x, value: e } });
  };

  const ConfirmDelCol = x => {
    dispatch({ type: 'deleteTableCol', payload: { x: x } });
  };

  const ConfirmDelRow = x => {
    dispatch({ type: 'deleteTableRow', payload: { x: x } });
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell />
            {state.tableHeader.map((time, timeId) => (
              <TableCell align='center' padding='none' key={timeId}>
                <DrugHeader
                  setTime={e => handleHeader(e, timeId)}
                  setDisplay={e => handleHeaderDisplay(e, timeId)}
                  time={time}
                  display={state.tableHeaderDisplay[timeId]}
                  DeleteColDialog={
                    <DeleteDialog
                      id={timeId}
                      name={epotStr(state.tableHeader[timeId])}
                      ConfirmDel={() => ConfirmDelCol(timeId)}
                      type='Col'
                    />
                  }
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {state.tableCell.map((row, rowId) => (
            <TableRow key={rowId}>
              <TableCell component='th' scope='row'>
                <DrugFront
                  setValue={e => handleFront(e, rowId)}
                  value={state.tableFront[rowId]}
                  drugType='tab'
                  DeleteRow={() => ConfirmDelRow(rowId)}
                  DeleteRowDialog={
                    <DeleteDialog
                      id={rowId}
                      name={state.tableFront[rowId]}
                      ConfirmDel={() => ConfirmDelRow(rowId)}
                      type='Row'
                    />
                  }
                />
              </TableCell>
              {row.map((value, valueId) => (
                <TableCell
                  className={classes.tablecell}
                  align='center'
                  padding='none'
                  key={valueId}
                >
                  <DrugCell
                    setValue={e => handleCell(e, rowId, valueId)}
                    value={value}
                    drugType='tab'
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.any,
  state: PropTypes.any
};

export default withStyles(styles)(SimpleTable);
