import React from "react";
import clsx from "clsx";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
});

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function RadioButton(props) {
  //   const [state, setState] = React.useState("delivered");
  const clickHandler = (e) => {
    let color;
    if (e.target.value === "waiting") color = "warning";
    else color = "success";
    props.onChange(e.target.value, color);
    let today = new Date().toLocaleDateString("fa-IR");
    console.log("today date is:", today, today.length);
  };
  return (
    <FormControl component="fieldset">
      <RadioGroup
        defaultValue="delivered"
        aria-label="orderStatus"
        name="customized-radios"
      >
        <FormControlLabel
          value="delivered"
          control={<StyledRadio />}
          label="سفارش های تحویل شده"
          onClick={clickHandler}
        />
        <FormControlLabel
          value="waiting"
          control={<StyledRadio />}
          label="سفارش های در انتظار ارسال"
          onClick={clickHandler}
        />
      </RadioGroup>
    </FormControl>
  );
}
