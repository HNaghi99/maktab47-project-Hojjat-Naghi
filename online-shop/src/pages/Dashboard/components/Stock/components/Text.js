import * as React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(
  createStyles({
    // name: { "font-size": "50px" },
  })
);

function Text(props) {
  //   const classes = useStyles(props);
  const value = props.value;
  const [name, setName] = React.useState(value);
  const [isNameFocused, setIsNamedFocused] = React.useState(false);

  // ((note)) ref doesn't work as TextField doesn't exist when running Typography's onClick
  // console.log({ isNameFocused });

  // ((todo)) create EditableField component
  // ((todo)) put cursor where user clicks rather than at the end
  return (
    <div className="App">
      {!isNameFocused ? (
        <Typography
          //   className={classes.name}
          onClick={() => {
            setIsNamedFocused(true);
          }}
        >
          {name}
        </Typography>
      ) : (
        <TextField
          autoFocus
          //   inputProps={{ className: classes.name }}
          value={name}
          onChange={(event) => setName(event.target.value)}
          onBlur={(event) => setIsNamedFocused(false)}
        />
      )}
    </div>
  );
}
export { Text };
