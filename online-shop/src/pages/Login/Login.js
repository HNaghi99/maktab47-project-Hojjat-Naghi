import { Component } from "react";
import { Box } from "@material-ui/core";
import { InputField } from "./components/InputField";
import { SubmitButton } from "./components/Button";
import { Link } from "react-router-dom";
function Login() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      color="white"
      style={{
        background: "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
      }}
    >
      <form>
        <Box component="h1" textAlign="center">
          ورود به پنل مدیریت فروشگاه سیب
        </Box>
        <Box display="flex" flexDirection="column">
          <InputField label="نام کاربری" />
          <InputField label="کلمه عبور" type="password" />
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
        </Box>
      </form>
    </Box>
  );
}
export { Login };
