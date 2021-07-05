import { Component } from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
} from "@material-ui/core/styles";
import { CustomTheme } from "./CustomTheme";
import "../asset/css/font.css";
// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
export default class RTLComponent extends Component {
  render() {
    return (
      <ThemeProvider theme={CustomTheme}>
        <StylesProvider jss={jss}></StylesProvider>
      </ThemeProvider>
    );
  }
}
