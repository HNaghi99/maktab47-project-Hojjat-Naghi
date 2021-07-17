import { createMuiTheme } from "@material-ui/core/styles";
import { faIR } from "@material-ui/core/locale";
const CustomTheme = createMuiTheme(
  {
    direction: "rtl",
    typography: {
      fontFamily: ["iransans", "iranyekan", "vazir"],
    },
  },
  faIR
);
export { CustomTheme };
