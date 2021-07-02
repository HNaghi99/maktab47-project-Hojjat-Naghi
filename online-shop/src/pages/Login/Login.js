import { Component } from "react";
import { Box } from "@material-ui/core";
import { InputField } from "./components/InputField";
import { SubmitButton } from "./components/Button";
import { ErrorMessage } from "./components/ErrorMessage";
import { Link, Redirect, Route } from "react-router-dom";
import { useContext, useState } from "react";
import { IsLogin } from "../../utils/IsLogin";
import joi from "joi";

function Login() {
  const schema = joi.object({
    username: joi.string().min(6).required(),
    password: joi.string().min(6),
  });
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const [err, setErr] = useState("");
  const handler = useContext(IsLogin).handler;
  const isLogin = useContext(IsLogin).value;
  const userNameHandler = (value) => {
    setUsername(value);
  };
  const passwordHandler = (value) => {
    setPassword(value);
  };
  const submitHandler = (event, variant) => {
    event.preventDefault();
    const value = schema.validate({
      username: username,
      password: password,
    });

    try {
      if (value.error) {
        throw new Error("نام کاربری و کلمه عبور باید حداقل ۶ حرفی باشد");
      } else if (
        value.value.username === "hojjat" &&
        value.value.password === "123456"
      ) {
        console.log(value);
        handler(isLogin);
      } else {
        throw new Error("نام کاربری و کلمه عبور وارد شده صحیح نمی باشد");
      }
    } catch (error) {
      setErr(error.message);
    }
    console.log("form submitted");
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      color="white"
      px={"10px"}
      style={{
        background: "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
      }}
    >
      <form onSubmit={submitHandler}>
        <Box component="h1" textAlign="center">
          ورود به پنل مدیریت فروشگاه سیب
        </Box>
        <Box display="flex" flexDirection="column">
          <InputField label="نام کاربری" onChangeInput={userNameHandler} />
          <InputField
            label="کلمه عبور"
            type="password"
            onChangeInput={passwordHandler}
          />
          <SubmitButton />
          <Box
            component={Link}
            exact
            to="/"
            alignSelf="flex-end"
            style={{
              textDecoration: "none",
              color: "yellow",
              fontWeight: "bold",
            }}
          >
            بازگشت به سایت
          </Box>
          <ErrorMessage value={err} />
        </Box>
      </form>
    </Box>
  );
}
export { Login };
