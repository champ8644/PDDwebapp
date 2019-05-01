/* eslint-disable prettier/prettier */
import React, { useCallback } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/MemoizedInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import PropTypes from "prop-types";

import {Formik} from "formik";
import * as Yup from "yup";


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
  prefix: "", firstName: "", middleName: "", lastName: "", sex: "",
  birthDate: "", age: "", maritalStatus: "", occupation: "", 
  nationality: "", race: "", religion: "", healthRight: "", bloodGroup: "", 
  underlyingDisease: "", drugAllergy: "", ageOnset: "", diagOnset: "", address: "", 
  homePhone: "", mobilePhone: "", numOfAdmission: "", numOfFollowUp: "", sleepTime: "", wakeTime: "", 
  diagnosis: "", subtypeDiagnosis: "", TMSE: "", MOCA: "", PDQ8: "", HY: "", UPDRS: [], WOQ9: "", 
  dexterityIndex: ""
};

const PatientInfoSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Required'),
  lastName: Yup.string()
    .required('Required'),
});

function UserInputs(props) {

  const { classes } = props;


  const handleSubmit = useCallback( ( values, {setSubmitting}) => {
    console.log(values);
  },[]);

  return (
    <Card>
      <Formik 
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={ PatientInfoSchema}
        >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>          
          <CardHeader color="primary">
            <h2 className={classes.cardTitleWhite}>Edit Profile</h2>
            <p className={classes.cardCategoryWhite}>Complete your profile</p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={3}>
                <Select name="prefix" value={values.prefix} onChange={handleChange}>
                  <MenuItem value={"นาย"}>นาย</MenuItem>
                  <MenuItem value={"นาง"}>นาง</MenuItem>
                  <MenuItem value={"นางสาว"}>นางสาว</MenuItem>
                </Select>
              </GridItem>
              
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput key={0} labelText="First Name" error={errors.firstName && touched.firstName} inputProps={{name: 'firstName',value:  values.firstName, onChange: handleChange, onBlur:handleBlur}}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput key={1} labelText="Last Name" error={errors.lastName && touched.lastName} inputProps={{name: 'lastName',value:  values.lastName, onChange: handleChange, onBlur:handleBlur}}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput key={2} labelText="Sex" error={errors.sex && touched.sex} inputProps={{name: 'sex',value:  values.sex, onChange: handleChange, onBlur:handleBlur}}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput key={3}  labelText="Birth Date" error={errors.birthDate && touched.birthDate} inputProps={{name: 'birthDate',value:  values.birthDate, onChange: handleChange, onBlur:handleBlur}}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput key={4}  labelText="Age" error={errors.age && touched.age} inputProps={{name: 'age',value:  values.age, onChange: handleChange, onBlur:handleBlur}}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="Marital Status" error={errors.maritalStatus && touched.maritalStatus} inputProps={{name: 'maritalStatus',value:  values.maritalStatus, onChange: handleChange, onBlur:handleBlur}}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="Occupation" error={errors.occupation && touched.occupation} inputProps={{name: 'occupation',value:  values.occupation, onChange: handleChange, onBlur:handleBlur}}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="Nationality" error={errors.nationality && touched.nationality} inputProps={{name: 'nationality',value:  values.nationality, onChange: handleChange, onBlur:handleBlur}}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="Race" error={errors.race && touched.race} inputProps={{name: 'race',value:  values.race, onChange: handleChange, onBlur:handleBlur}}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="Religion" error={errors.religion && touched.religion} inputProps={{name: 'religion',value:  values.religion, onChange: handleChange, onBlur:handleBlur}}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="HealthRight" error={errors.healthRight && touched.healthRight} inputProps={{name: 'healthRight',value:  values.healthRight, onChange: handleChange, onBlur:handleBlur}}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="BloodGroup" error={errors.bloodGroup && touched.bloodGroup} inputProps={{name: 'bloodGroup',value:  values.bloodGroup, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="underlyingDisease" error={errors.underlyingDisease && touched.underlyingDisease} inputProps={{name: 'underlyingDisease',value:  values.underlyingDisease, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="DrugAllery" error={errors.drugAllergy && touched.drugAllergy} inputProps={{name: 'drugAllergy',value: values.drugAllergy, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem> 
              
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="AgeOnset" error={errors.ageOnset && touched.ageOnset} inputProps={{name: 'ageOnset',value: values.ageOnset, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="AgeOnset" error={errors.ageOnset && touched.ageOnset} inputProps={{name: 'ageOnset',value:  values.ageOnset, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="DiagOnset" error={errors.diagOnset && touched.diagOnset} inputProps={{name: 'diagOnset',value:  values.diagOnset, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="Address" error={errors.address && touched.address} inputProps={{name: 'address',value:  values.address, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="Home Telephone" error={errors.homePhone && touched.homePhone} inputProps={{name: 'homePhone',value:  values.homePhone, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="Mobile Phone" error={errors.mobilePhone && touched.mobilePhone} inputProps={{name: 'mobilePhone',value:  values.mobilePhone, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="NumOfAdission" error={errors.numOfAdmission && touched.numOfAdmission} inputProps={{name: 'numOfAdmission',value:  values.numOfAdmission, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem> 

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="SleepTime"  error={errors.sleepTime && touched.sleepTime}inputProps={{name: 'sleepTime',value:  values.sleepTime, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="WakeTime" error={errors.wakeTime && touched.wakeTime} inputProps={{name: 'wakeTime',value:  values.wakeTime, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="Diagnosis" error={errors.diagnosis && touched.diagnosis} inputProps={{name: 'diagnosis',value:  values.diagnosis, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="SubtypeDiagnosis" error={errors.subtypeDiagnosis && touched.subtypeDiagnosis} inputProps={{name: 'subtypeDiagnosis',value:  values.subtypeDiagnosis, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="TMSE" error={errors.TMSE && touched.TMSE} inputProps={{name: 'TMSE',value:  values.TMSE, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="MOCA"  error={errors.MOCA && touched.MOCA}inputProps={{name: 'MOCA',value:  values.MOCA, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="PDQ8" error={errors.PDQ8 && touched.PDQ8} inputProps={{name: 'PDQ8',value:  values.PDQ8, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="HY"  error={errors.HY && touched.HY} inputProps={{name: 'HY',value:  values.HY, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="UPDRS" error={errors.UPDRS && touched.UPDRS} inputProps={{name: 'UPDRS',value:  values.UPDRS, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="WOQ9" error={errors.WOQ9 && touched.WOQ9} inputProps={{name: 'WOQ9',value:  values.WOQ9, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <CustomInput labelText="DexterityIndex" error={errors.dexterityIndex && touched.dexterityIndex} inputProps={{name: 'dexterityIndex',value:  values.dexterityIndex, onChange: handleChange, onBlur: handleBlur }}/>
              </GridItem>    
              
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button type="submit" color="primary">Update Profile</Button>
          </CardFooter>
        </form>
      )}        
      </Formik>
    </Card>
  );
}

UserInputs.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(UserInputs);



