import { Box, Button } from "@material-ui/core";
export function SubmitButton() {
  return (
    <Box my={"8px"} display="flex" justifyContent="center">
      <Button type="submit" variant="contained" color="primary">
        ورود
      </Button>
    </Box>
  );
}
