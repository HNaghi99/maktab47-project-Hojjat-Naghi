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
  const keyDownHandler = (e) => {
    var key = e.keyCode ? e.keyCode : e.which;
    if (
      !(
        [8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
        (key == 65 && (e.ctrlKey || e.metaKey)) ||
        (key >= 35 && key <= 40) ||
        (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
        (key >= 96 && key <= 105)
      )
    )
      e.preventDefault();
  };
  const changeHandler = (e) => {
    if (e.target.value === "") {
      setName(0);
      props.onChange("0", props.id);
    } else {
      setName(e.target.value);
      props.onChange(e.target.value, props.id);
    }
  };
  // ((note)) ref doesn't work as TextField doesn't exist when running Typography's onClick
  // console.log({ isNameFocused });

  // ((todo)) create EditableField component
  // ((todo)) put cursor where user clicks rather than at the end
  return (
    <div className="App" onKeyDown={keyDownHandler}>
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
          onChange={changeHandler}
          onBlur={(event) => setIsNamedFocused(false)}
        />
      )}
    </div>
  );
}
export { Text };
