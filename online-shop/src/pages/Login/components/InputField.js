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
  const changeHandler = ({ target }) => {
    setValue(target.value);
    props.onChangeInput(target.value);
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
          style={{ direction: "rtl" }}
          label={props.label}
          type={props.type}
          InputLabelProps={{
            classes: { root: classes.labelRoot, shrink: classes.shrink },
          }}
        />
      </Box>
    </>
  );
}
