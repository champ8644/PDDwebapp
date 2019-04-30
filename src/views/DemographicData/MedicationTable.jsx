import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import HNInput from "components/CustomInput/HNInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  inputHN: {
    color: "green",
    fontSize: "36px"
  }
};

function MedicationTable ({ ...props }) {
  const { classes } = props;
    return (
      <Card>
        <CardHeader color="warning">
          <h2 className={classes.cardTitleWhite}>Medications</h2>
          <p className={classes.cardCategoryWhite}>Complete the table</p>
        </CardHeader>
        <CardBody>
          <p> hello world </p>
        </CardBody>
        <CardFooter>
          <Button color="warning">Update Medications</Button>
        </CardFooter>
      </Card>
    );
}

export default withStyles(styles)(MedicationTable);