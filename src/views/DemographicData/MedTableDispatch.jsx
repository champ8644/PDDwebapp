import { epotStr } from 'functions/functions.jsx';

export default function reducerMedTable(state, action) {
  var newState = {
    tableHeader: [...state.tableHeader],
    tableHeaderDisplay: [...state.tableHeaderDisplay],
    tableFront: [...state.tableFront],
    tableCell: []
  };
  for (let i = 0; i < state.tableCell.length; i++) {
    newState.tableCell.push([...state.tableCell[i]]);
  }
  switch (action.type) {
    case 'setTableCell':
      newState.tableCell[action.payload.x][action.payload.y] =
        action.payload.value;
      return newState;
    case 'setTableHeader':
      newState.tableHeader[action.payload.x] = action.payload.epoch;
      newState.tableHeaderDisplay[action.payload.x] = epotStr(
        action.payload.epoch
      );
      return newState;
    case 'setTableHeaderDisplay':
      newState.tableHeaderDisplay[action.payload.x] = action.payload.display;
      return newState;
    case 'setTableFront':
      newState.tableFront[action.payload.x] = action.payload.value;
      return newState;
    case 'deleteTableCol':
      newState.tableHeader.splice(action.payload.x, 1);
      for (let i = 0; i < state.tableCell.length; i++) {
        newState.tableCell[i].splice(action.payload.x, 1);
      }
      return newState;
    case 'deleteTableRow':
      newState.tableFront.splice(action.payload.x, 1);
      newState.tableCell.splice(action.payload.x, 1);
      return newState;
    case 'addTableCol': {
      let i, j;
      for (i = 0; i < state.tableHeader.length; i++) {
        if (action.payload.time < state.tableHeader[i]) {
          newState.tableHeader.splice(i, 0, action.payload.time);
          for (j = 0; j < state.tableCell.length; j++) {
            newState.tableCell[j].splice(i, 0, 0);
          }
          return newState;
        }
      }
      newState.tableHeader.push(action.payload.time);
      for (let j = 0; j < state.tableCell.length; j++) {
        newState.tableCell[j].push(0);
      }
      return newState;
    }
    case 'addTableRow': {
      newState.tableFront.push(action.payload.drug);
      let arr = [];
      for (let i = 0; i < state.tableHeader.length; i++) {
        arr.push(0);
      }
      newState.tableCell.push(arr);
      return newState;
    }
    default:
      throw new Error(action.type);
  }
}
