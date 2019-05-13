/* eslint-disable react/prop-types */
import React, { useRef } from "react";

import BaseDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Input from "components/CustomInput/CustomInput.jsx";
import FormControl from "@material-ui/core/FormControl";
import "./style.css";

function InnerInput(props) {
  const { inputRef, key, label, error, ...other } = props;
  const handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputRef.current.blur();
    }
    props.onKeyDown && props.onKeyDown(e);
  };
  return (
    <Input
      labelText={label}
      key={key}
      error={error}
      inputProps={{
        ...other,
        inputRef: inputRef,
        inputProps: { onKeyDown: handleKeyDown }
      }}
    />
  );
}

function DatePicker(props) {
  const { name, label, value, error, onChange } = props;
  const inputRef = useRef(null);

  const handleChange = (value, event) => {
    event.target = { name, value };
    //inputRef.current.blur();
    onChange && onChange(event);
  };

  return (
    <FormControl>
      <BaseDatePicker
        dateFormat="dd/MM/yyyy"
        selected={value}
        onChange={handleChange}
        customInput={
          <InnerInput
            inputRef={inputRef}
            label={label}
            error={error}
            name={name}
          />
        }
        popperModifiers={{
          preventOverflow: {
            enabled: false
          },
          flip: {
            enabled: false
          }
        }}
        popperProps={{
          eventsEnabled: true
        }}
      />
    </FormControl>
  );
}

export default DatePicker;
