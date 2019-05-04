export default function reducerMedTable(state, action) {
  var newState = {
    tableHeader: [...state.tableHeader],
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
      newState.tableHeader[action.payload.y] = action.payload.value;
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
    default:
      throw new Error();
  }
}
