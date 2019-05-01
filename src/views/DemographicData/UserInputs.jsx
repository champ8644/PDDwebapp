/* eslint-disable prettier/prettier */
import React, { useReducer } from "react";
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

const initialState = {
  prefix:                            {value: '', error: null},
  firstName:                         {value: '', error: null},
  middleName:                        {value: '', error: null},
  lastName:                          {value: '', error: null},
  sex:                               {value: '', error: null},
  birthDate:                         {value: '', error: null},
  age:                               {value: '', error: null},
  maritalStatus:                     {value: '', error: null},
  occupation:                        {value: '', error: null},
  nationality:                       {value: '', error: null},
  race:                              {value: '', error: null},
  religion:                          {value: '', error: null},
  healthRight:                       {value: '', error: null},
  bloodGroup:                        {value: '', error: null},
  underlyingDisease:                 {value: '', error: null},
  drugAllergy:                       {value: '', error: null},
  ageOnset:                          {value: '', error: null},
  diagOnset:                         {value: '', error: null},
  address:                           {value: '', error: null},
  homePhone:                         {value: '', error: null},
  mobilePhone:                       {value: '', error: null},
  numOfAdmission:                    {value: '', error: null},
  numOfFollowUp:                     {value: '', error: null},
  sleepTime:                         {value: '', error: null},
  wakeTime:                          {value: '', error: null},
  diagnosis:                         {value: '', error: null},
  subtypeDiagnosis:                  {value: '', error: null},
  TMSE:                              {value: '', error: null},
  MOCA:                              {value: '', error: null},
  PDQ8:                              {value: '', error: null},
  HY:                                {value: '', error: null},
  UPDRS:                             {value: [], error: null},
  WOQ9:                              {value: '', error: null},
  dexterityIndex:                    {value: '', error: null},
}

const textHoles = {
  homePhone: [/\d{1,2}/, '-', /\d{1,3}/, '-', /\d{1,4}/],
  mobilePhone: [/\d{1,3}/, '-', /\d{1,3}/, '-', /\d{1,4}/],
  wakeTime: [/[a-z]{1,}/, '@', /[a-z]{1,}/, '.', /[a-z]*/],
};

function fillInHole(text, holes){

  let regsrc = holes.reduce((concatSrc, currHole, idx) => {
    if(currHole instanceof RegExp){         
      return concatSrc + `(?<m${idx}>` + currHole.source + ")?";
    }else if(typeof currHole == "string"){
      return concatSrc + `(?<m${idx}>` + currHole.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + ")?";
    }
  },'');

  let re = new RegExp('^'+regsrc+'$');  
  let namedMatch = re.exec(text);

  const getFilled = () => {
    return namedMatch && Object.values(namedMatch.groups).map(
      (x, idx, arr) => {
        if(x === undefined || x == ""){
          if(arr[idx+1] !== undefined && arr[idx+1] != ""){
            return typeof holes[idx] == 'string' ? holes[idx] : '';
          }else{
            return '';
          }
        }else{
          return x;
        }
      })
      .reduce((r, c) => r + c, '');
  };

  const getDefilled = () => {
    return namedMatch && Object.values(namedMatch.groups)
      .filter((x, idx) => typeof holes[idx] != 'string' && x !== undefined)
      .reduce((r,c) => r + c, '');
  };

  return {  
    isValid: namedMatch ? true : false, 
    getFilled: getFilled, 
    getDefilled: getDefilled,
  };
}

function filterAction(action){
  if(action.fieldName in textHoles){
    let hole = textHoles[action.fieldName];
    let { isValid, getFilled, getDefilled } = fillInHole(action.fieldValue, hole)
    return [isValid, getFilled, getDefilled];    
  }else{
    return [true, () => action.fieldValue, () => action.fieldValue];
  }
}

function reducer(state, action){
  switch (action.type) {
    case 'CHANGE':
      var [isValid, getFilteredValue, getDefilteredValue] = filterAction(action);
      if(isValid){
        return {
          ...state, 
          [action.fieldName]: {value: getFilteredValue(), error: null}
        };
      }else{
        return state;
      }
    default:
      throw new Error();
  }
}

function UserInputs(props) {
  const { classes } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({type:'CHANGE', fieldName: e.target.name, fieldValue: e.target.value});
  };

  return (
    <Card>
      <CardHeader color="primary">
        <h2 className={classes.cardTitleWhite}>Edit Profile</h2>
        <p className={classes.cardCategoryWhite}>Complete your profile</p>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={3}>
            <Select name="Prefix" value={state.prefix.value} onChange={handleChange}>
              <MenuItem value={'นาย'}>นาย</MenuItem>
              <MenuItem value={'นาง'}>นาง</MenuItem>
              <MenuItem value={'นางสาว'}>นางสาว</MenuItem>
            </Select>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput key={0} labelText="First Name" inputProps={{name: 'firstName',value: state.firstName.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput key={1} labelText="Last Name" inputProps={{name: 'lastName',value: state.lastName.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput key={2} labelText="Sex" inputProps={{name: 'sex',value: state.sex.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput key={3}  labelText="Birth Date" inputProps={{name: 'birthDate',value: state.birthDate.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput key={4}  labelText="Age" inputProps={{name: 'age',value: state.age.value, onChange: handleChange}}/>
          </GridItem>  
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="Marital Status" inputProps={{name: 'maritalStatus',value: state.maritalStatus.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="Occupation" inputProps={{name: 'occupation',value: state.occupation.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="Nationality" inputProps={{name: 'nationality',value: state.nationality.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="Race" inputProps={{name: 'race',value: state.race.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="Religion" inputProps={{name: 'religion',value: state.religion.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="HealthRight" inputProps={{name: 'healthRight',value: state.healthRight.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="BloodGroup" inputProps={{name: 'bloodGroup',value: state.bloodGroup.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="underlyingDisease" inputProps={{name: 'underlyingDisease',value: state.underlyingDisease.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="DrugAllery" inputProps={{name: 'drugAllergy',value: state.drugAllergy.value, onChange: handleChange}}/>
          </GridItem> 
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="AgeOnset" inputProps={{name: 'ageOnset',value: state.ageOnset.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="AgeOnset" inputProps={{name: 'ageOnset',value: state.ageOnset.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="DiagOnset" inputProps={{name: 'diagOnset',value: state.diagOnset.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="Address" inputProps={{name: 'address',value: state.address.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="Home Telephone" inputProps={{name: 'homePhone',value: state.homePhone.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="Mobile Phone" inputProps={{name: 'mobilePhone',value: state.mobilePhone.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="NumOfAdission" inputProps={{name: 'numOfAdmission',value: state.numOfAdmission.value, onChange: handleChange}}/>
          </GridItem>  
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="SleepTime" inputProps={{name: 'sleepTime',value: state.sleepTime.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="WakeTime" inputProps={{name: 'wakeTime',value: state.wakeTime.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="Diagnosis" inputProps={{name: 'diagnosis',value: state.diagnosis.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="SubtypeDiagnosis" inputProps={{name: 'subtypeDiagnosis',value: state.subtypeDiagnosis.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="TMSE" inputProps={{name: 'TMSE',value: state.TMSE.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="MOCA" inputProps={{name: 'MOCA',value: state.MOCA.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="PDQ8" inputProps={{name: 'PDQ8',value: state.PDQ8.value, onChange: handleChange}}/>
          </GridItem>     
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="HY" inputProps={{name: 'HY',value: state.HY.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="UPDRS" inputProps={{name: 'UPDRS',value: state.UPDRS.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="WOQ9" inputProps={{name: 'WOQ9',value: state.WOQ9.value, onChange: handleChange}}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput labelText="DexterityIndex" inputProps={{name: 'dexterityIndex',value: state.dexterityIndex.value, onChange: handleChange}}/>
          </GridItem>    
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
