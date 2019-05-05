import { epotStr } from 'functions/functions.jsx';

function sortByColumn(newState) {
  // move tableHeader like sortrepresent
  let i,
    sortrepresent = [];
  for (i = 0; i < newState.tableHeader.length; i++) {
    sortrepresent.push({ index: i, value: newState.tableHeader[i] });
  }
  sortrepresent.sort(function(a, b) {
    return a.value - b.value;
  });
  let newStateSorted = {
    currentFocus: -1,
    tableHeader: [],
    tableHeaderDisplay: [],
    tableHeaderFocus: [],
    tableFront: [],
    tableCell: []
  };
  for (i = 0; i < newState.tableFront.length; i++) {
    newStateSorted.tableCell.push([]);
    newStateSorted.tableFront.push(newState.tableFront[i]);
  }
  for (i = 0; i < sortrepresent.length; i++) {
    newStateSorted.tableHeader[i] =
      newState.tableHeader[sortrepresent[i].index];
    newStateSorted.tableHeaderFocus[i] =
      newState.tableHeaderFocus[sortrepresent[i].index];
    newStateSorted.tableHeaderDisplay[i] =
      newState.tableHeaderDisplay[sortrepresent[i].index];
    for (let j = 0; j < newState.tableFront.length; j++) {
      newStateSorted.tableCell[j].push(
        newState.tableCell[j][sortrepresent[i].index]
      );
    }
  }
  if (newState.currentFocus > 0) {
    newStateSorted.currentFocus = sortrepresent[newState.currentFocus].index;
    if (newStateSorted.currentFocus != newState.currentFocus) {
      newStateSorted.tableHeaderFocus[newStateSorted.currentFocus].focus();
    }
  }
  return newStateSorted;
}

export default function reducerMedTable(state, action) {
  var newState = {
    currentFocus: -1,
    tableHeader: [...state.tableHeader],
    tableHeaderFocus: [...state.tableHeaderFocus],
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
    case 'setRefHeaderFocus':
      newState.tableHeaderFocus[action.payload.x] = action.payload.refFunction;
      return newState;
    case 'setTableHeader': {
      // set new tableHeader
      newState.tableHeader[action.payload.x] = action.payload.epoch;
      newState.tableHeaderDisplay[action.payload.x] = epotStr(
        action.payload.epoch
      );
      // sort new tableHeader
      return sortByColumn(newState);
    }
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
