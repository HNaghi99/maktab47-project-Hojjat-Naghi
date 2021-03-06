import { Box } from "@material-ui/core";
import { InputField } from "../../components/InputField";
import { SubmitButton } from "./components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import joi from "joi";
import { authAction } from "../../redux/reducer/authReducer";
import { useDispatch } from "react-redux";
import RTLComponent from "../../Theme/RTLComponent";
import styles from "./style.module.css";
function LoginComponent() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const schema = joi.object({
    username: joi.string().min(6).required(),
    password: joi.string().min(6),
  });
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const userNameHandler = (value) => {
    setUsername(value);
  };
  const passwordHandler = (value) => {
    setPassword(value);
  };
  const handleClickVariant = (message, variant) => {
    enqueueSnackbar(
      message,
      { variant },
      {
        TransitionComponent: Slide,
      }
    );
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
        dispatch(authAction.login());
        dispatch(authAction.show());
      } else {
        throw new Error("نام کاربری و کلمه عبور وارد شده صحیح نمی باشد");
      }
    } catch (error) {
      handleClickVariant(error.message, "error");
    }
  };
  return (
    <RTLComponent>
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
              className={styles.submitBtn}
              alignSelf="flex-end"
            >
              بازگشت به سایت
            </Box>
          </Box>
        </form>
      </Box>
    </RTLComponent>
  );
}
export function Login() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      TransitionComponent={Slide}
    >
      <LoginComponent />
    </SnackbarProvider>
  );
}
