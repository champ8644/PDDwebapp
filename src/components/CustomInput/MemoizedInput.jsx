import React from "react";
import CustomInput from "./CustomInput.jsx";

const MemoizedInput = React.memo(CustomInput, areEqual);

function areEqual(prevProps, nextProps) {
  return (
    prevProps.inputProps.value == nextProps.inputProps.value &&
    prevProps.inputProps.onChange == nextProps.inputProps.onChange &&
    prevProps.inputProps.onBlur == nextProps.inputProps.onBlur &&
    prevProps.error == nextProps.error
  );
}

export default MemoizedInput;
