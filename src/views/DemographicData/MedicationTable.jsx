import React, { useReducer } from 'react';
import { ttEpo, ttStr } from 'functions/functions.jsx';

import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import PropTypes from 'prop-types';
import SimpleTable from 'views/DemographicData/SimpleTable.jsx';
import reducerMedTable from 'views/DemographicData/MedTableDispatch.jsx';
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/core components
// core components
// custom components
//import TableMed from "components/TableChamp/TableMed.jsx";
//import SampleMaterialUI from "views/DemographicData/SampleMaterialUI.jsx";

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  },
  inputHN: {
    color: 'green',
    fontSize: '36px'
  }
};

function MedicationTable({ ...props }) {
  const { classes } = props;

  const initialState = {
    currentFocus: -1,
    tableHeader: [
      ttEpo({ hr: 8 }),
      ttEpo({ hr: 12 }),
      ttEpo({ hr: 16 }),
      ttEpo({ hr: 23 })
    ],
    tableHeaderFocus: [],
    tableHeaderDisplay: [
      ttStr({ hr: 8 }),
      ttStr({ hr: 12 }),
      ttStr({ hr: 16 }),
      ttStr({ hr: 23 })
    ],
    tableFront: ['Drug A', 'Drug B', 'Drug C', 'Drug D', 'Drug E', 'Drug F'],
    tableCell: [
      [15, 6.0, 24, 4.0],
      [23, 9.0, 37, 4.25],
      [26, 16.0, 24, 6.0],
      [30, 3.75, 67, 4.25],
      [35, 16.0, 49, 3.75],
      [40, 6.0, 24, 4.0]
    ]
  };

  const [state, dispatch] = useReducer(reducerMedTable, initialState);

  return (
    <Card>
      <CardHeader color='rose'>
        <h2 className={classes.cardTitleWhite}>Medications</h2>
        <p className={classes.cardCategoryWhite}>Complete the table</p>
      </CardHeader>
      <CardBody>
        <div style={{ overflowY: 'hidden', overflowX: 'auto' }}>
          <SimpleTable state={state} dispatch={dispatch} />
        </div>
      </CardBody>
      <CardFooter>
        <Button color='rose'>Update Medications</Button>
      </CardFooter>
    </Card>
  );
}

MedicationTable.propTypes = {
  classes: PropTypes.any
};

export default withStyles(styles)(MedicationTable);
