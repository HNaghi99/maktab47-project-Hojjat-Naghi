import { Box, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { useState } from "react";
export function InputField(props) {
  const [value, setValue] = useState("");
  const changeHandler = (e) => {
    if (e.target.validity.valid) {
      setValue(e.target.value);
      props.onChangeInput(e.target.value);
    }
  };
  return (
    <>
      <Box
        component="div"
        my={"4px"}
        display="flex"
        justifyContent="center"
        color="green"
      >
        {" "}
        <TextField
          value={value}
          onChange={changeHandler}
          onKeyPress={props.onKeyPress}
          style={{ direction: "rtl" }}
          label={props.label}
          type={props.type}
          pattern={props.pattern}
        />
      </Box>
    </>
  );
}
