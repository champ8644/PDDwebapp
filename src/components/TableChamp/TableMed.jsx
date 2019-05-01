import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont
} from "assets/jss/material-dashboard-react.jsx";

import React, { useReducer } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const style = {
  grid: {
    padding: "0 0px !important",
    //backgroundColor: warningColor[3],
  },
  headerStyle: {

  },
  frontStyle: {

  },
  cellStyle: {

  },
};

function timeToEpoch (timeStamp) {
  timeStamp = {hr:0,min:0,sec:0,...timeStamp}
  return 3600*timeStamp.hr + 60*timeStamp.min + timeStamp.sec;
}

function epochToTime (epoch) {
  return {
    sec: epoch%60,
    min: Math.floor(epoch/60)%60,
    hr: Math.floor(epoch/3600)
  }
}

function init () {
  return { 
    timeDrug: [timeToEpoch({hr:8}),timeToEpoch({hr:12}),timeToEpoch({hr:16})],
    medications: [],
    cellsDose: []
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'addTimeDrug':
      return {...state,
        timeDrug: [[...state.timeDrug],
        state.timeDrug.push(timeToEpoch(action.payload))]
      }
    case 'deleteTimeDrug':
      return {...state,
        timeDrug: state.timeDrug.splice(action.payload,1)
      }
    case 'editTimeDrug':
      return {...state,
        timeDrug: state.timeDrug
      }
    default:
      throw new Error()
  }
}

function TableHeader({ ...props }) {
  const { classes, tableHeader, ...rest } = props;
  console.log(tableHeader);
  return (
    {/*tableHeader.map((prop, key) => {
      return (
        <TableCell
          className={classes.tableCell + " " + classes.tableHeadCell}
          key={key}
        >
          {prop}
        </TableCell>
      );
    })*/}
  );
}

function TableMed({ ...props }) {
  const { classes, tableHeader, tableFirst, tableCells, ...rest } = props;
  const [state, dispatch] = useReducer(reducer, {}, init)
  return (
    <Grid item {...rest} className={classes.grid}>
       <TableHeader tableHeader={tableHeader}/>

       <p style={{backgroundColor:roseColor[0]}}> hello world </p>
       <p style={{backgroundColor:roseColor[1]}}> hello world </p>
       <p style={{backgroundColor:roseColor[2]}}> hello world </p>
       <p style={{backgroundColor:roseColor[3]}}> hello world </p>
    </Grid>
  );
}

export default withStyles(style)(TableMed);
