import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import MaskedInput from 'react-text-mask';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import HNInputStyle from "assets/jss/material-dashboard-react/components/HNInputStyle.jsx";

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  var maskHN = (rawValue) => {
    let length = rawValue.length;
    var i,c=0;
    for (i=0;i<length;i++) {
      if (i==0) {
        if (/[1-9]/.test(rawValue[i]))
          c++;
      } else {
        if (/\d/.test(rawValue[i]))
          c++;
      }
    }
    length = c;
    let arr = [/[1-9]/];
    for (i=1;i<length;i++) {
      if (i==length-2)
        arr.push('/');
      arr.push(/\d/);
    }
    return arr;
  }

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={maskHN}
      guide={false}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}
TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function CustomInput({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    noMargins
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true
  });
  const marginTop = classNames({
    //[classes.marginTop]: labelText === undefined
    //classes.cssOutlinedInputHN
  });

  var styleMargin = {};
  /*if (props.noMargin) {
    styleMargin = {margin:"0 0 0 0"};
  }*/

  const [values, setValues] = React.useState({
    textmask: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
      style={styleMargin}
    >
      <TextField
        className={classes.margin}
        InputLabelProps={{
          className: classes.labelRoot + labelClasses,
          htmlFor: id,
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
          ...labelProps
        }}
        InputProps={{
          value: values.textmask,
          style: {fontSize:"36px",borderColor:"yellow"},
          onChange: handleChange('textmask'),
          inputComponent: TextMaskCustom,
          classes: {
            root: classes.cssOutlinedInputHN,
            disabled: classes.disabled,
            underline: underlineClasses,
            focused: classes.cssFocusedHN,
            notchedOutline: classes.notchedOutlineHN,
          },
          ...inputProps
        }}
        label="HN"
        variant="outlined"
        id={id}
      />

      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  );
}

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool
};

export default withStyles(HNInputStyle)(CustomInput);
