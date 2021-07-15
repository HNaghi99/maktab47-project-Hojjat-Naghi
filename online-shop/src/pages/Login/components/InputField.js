import { Box, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React, { Component } from "react";
import { useState } from "react";
const useStyles = makeStyles((theme) => ({
  labelRoot: {
    right: 0,
  },
  shrink: {
    transformOrigin: "top right",
  },
}));
export function InputField(props) {
  const classes = useStyles();
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
          InputLabelProps={{
            classes: { root: classes.labelRoot, shrink: classes.shrink },
          }}
        />
      </Box>
    </>
  );
}
