import { Box } from "@material-ui/core";
export function ErrorMessage(props) {
  return (
    <Box textAlign="center" color="red" fontWeight="bold" mt={"7px"}>
      {props.value}
    </Box>
  );
}
