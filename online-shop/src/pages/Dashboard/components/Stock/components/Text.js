import * as React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { getProductWithId } from "../../../../../api/Api";
function Text(props) {
  const value = props.value;
  const [previousValue, setPrevious] = React.useState(0);
  const [name, setName] = React.useState(value);
  const [isNameFocused, setIsNamedFocused] = React.useState(false);
  const e2p = (s) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  const keyDownHandler = async (e) => {
    var key = e.keyCode ? e.keyCode : e.which;
    if (e.key === "Escape") {
      setIsNamedFocused(false);
      setName(e2p(previousValue));
    }
    if (
      !(
        [8, 9, 13, 46, 110, 190].indexOf(key) !== -1 ||
        (key == 65 && (e.ctrlKey || e.metaKey)) ||
        (key >= 35 && key <= 40) ||
        (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
        (key >= 96 && key <= 105)
      )
    )
      e.preventDefault();
  };
  const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  const changeHandler = (e) => {
    if (e.target.value === "") {
      setName("۰");
      props.onChange("0", props.id);
    } else {
      const pattern = /^[\u0600-\u06FF\s]+$/;
      const result = pattern.test(e.target.value);
      if (result) {
        setName(e.target.value);
        props.onChange(p2e(e.target.value), props.id);
      }
    }
  };
  React.useEffect(() => {
    const productData = async () => {
      return getProductWithId(props.id);
    };
    const product = productData();
    product.then((product) => {
      setPrevious(product[`${props.type}`]);
    });
  }, []);
  return (
    <div className="App" onKeyDown={keyDownHandler}>
      {!isNameFocused ? (
        <Typography
          onClick={() => {
            setIsNamedFocused(true);
          }}
        >
          {name}
        </Typography>
      ) : (
        <TextField
          autoFocus
          value={name}
          onChange={changeHandler}
          onBlur={(event) => setIsNamedFocused(false)}
        />
      )}
    </div>
  );
}
export { Text };
