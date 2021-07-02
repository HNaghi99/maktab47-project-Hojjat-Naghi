import React from "react";
import { useState } from "react";
const IsLogin = React.createContext();
function IsLoginProvider(props) {
  const [login, setLogin] = useState(false);
  const loginHandler = (value) => setLogin(!value);
  const value = { value: login, handler: loginHandler };
  return <IsLogin.Provider value={value}>{props.children}</IsLogin.Provider>;
}
export { IsLoginProvider, IsLogin };
// export const isLogin = false;
