import React, { Component } from "react";
import { Box, Button } from "@material-ui/core";
export class SubmitButton extends Component {
  render() {
    return (
      <Box my={"8px"} display="flex" justifyContent="center">
        <Button type="submit" variant="contained" color="primary">
          ورود
        </Button>
      </Box>
    );
  }
}
