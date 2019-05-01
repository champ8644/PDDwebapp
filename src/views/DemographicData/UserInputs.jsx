/* eslint-disable prettier/prettier */
import React, { useCallback } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import PropTypes from "prop-types";

import { Formik } from 'formik';

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
  }
};

const initialValue = {
  prefix:                           '',
  firstName:                        '',
  middleName:                       '',
  lastName:                         '',
  sex:                              '',
  birthDate:                        '',
  age:                              '',
  maritalStatus:                    '',
  occupation:                       '',
  nationality:                      '',
  race:                             '',
  religion:                         '',
  healthRight:                      '',
  bloodGroup:                       '',
  underlyingDisease:                '',
  drugAllergy:                      '',
  ageOnset:                         '',
  diagOnset:                        '',
  address:                          '',
  homePhone:                        '',
  mobilePhone:                      '',
  numOfAdmission:                   '',
  numOfFollowUp:                    '',
  sleepTime:                        '',
  wakeTime:                         '',
  diagnosis:                        '',
  subtypeDiagnosis:                 '',
  TMSE:                             '',
  MOCA:                             '',
  PDQ8:                             '',
  HY:                               '',
  UPDRS:                            [],
  WOQ9:                             '',
  dexterityIndex:                   '',
}

function UserInputs(props) {
  const { classes } = props;

  return (
    <Card>
      <CardHeader color="primary">
        <h2 className={classes.cardTitleWhite}>Edit Profile</h2>
        <p className={classes.cardCategoryWhite}>Complete your profile</p>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <Formik initialValues={initialValue}>
          {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,}) => (
            <GridItem xs={12} sm={12} md={3}>
              <Select name="prefix" value={values.prefix} onChange={handleChange}>
                <MenuItem value={'นาย'}>นาย</MenuItem>
                <MenuItem value={'นาง'}>นาง</MenuItem>
                <MenuItem value={'นางสาว'}>นางสาว</MenuItem>
              </Select>
            </GridItem>
          )}
          </Formik>          
        </GridContainer>
      </CardBody>
      <CardFooter>
        <Button color="primary">Update Profile</Button>
      </CardFooter>
    </Card>
  );
}

UserInputs.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(UserInputs);
