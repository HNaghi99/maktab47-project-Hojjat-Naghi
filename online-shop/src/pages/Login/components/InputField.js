import { Box, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React, { Component } from "react";
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
