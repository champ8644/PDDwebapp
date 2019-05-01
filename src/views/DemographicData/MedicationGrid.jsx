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

import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import withStyles from "@material-ui/core/styles/withStyles";
//import { SketchPicker } from "react-color";

//import "./styles.css";
//import PageGuide from "./PageGuide";

const styles = {};

class ColorEditor extends React.Component {
  constructor(props) {
      super(props);
      this.state = { color: props.value };
  }

  getValue() {
      return { labelColour: this.state.color };
  }

  getInputNode() {
      return ReactDOM.findDOMNode(this).getElementsByTagName("input")[0];
  }

  handleChangeComplete = color => {
      this.setState({ color: color.hex }, () => this.props.onCommit());
  };

  render() {
      return (
        {/*
      <SketchPicker
          color={this.state.color}
          onChange={this.handleChangeComplete}
      />
      */}
      );
  }
}

const columns = [
  { key: "Medications", name: "ID" },
];

const rows = [
  { id: 0, title: "Task 1", issueType: "Bug", labelColour: "#1D1D1F" },
  { id: 1, title: "Task 2", issueType: "Story", labelColour: "#1D1D1F" },
  { id: 2, title: "Task 3", issueType: "Epic", labelColour: "1D1D1F" }
];

function MedicationGrid (){
  const [state, setState] = useState({rows});

  const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
      setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
          rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
      });
  };

  return (
    <>
      <div>

      </div>
      <div>
        <ReactDataGrid
        columns={columns}
        rowGetter={i => state.rows[i]}
        rowsCount={3}
        onGridRowsUpdated={onGridRowsUpdated}
        enableCellSelect={true}
        />
      </div>
    </>
  );
}

export default withStyles(styles)(MedicationGrid);
/*  

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
      {tableHeader.map((prop, key) => {
        return (
          <TableCell
            className={classes.tableCell + " " + classes.tableHeadCell}
            key={key}
          >
            {prop}
          </TableCell>
        );
      })}
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
  */