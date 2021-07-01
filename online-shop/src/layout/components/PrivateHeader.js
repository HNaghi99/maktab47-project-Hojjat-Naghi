import React from "react";
import Box from "@material-ui/core/Box";
import { Link, BrowserRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function PrivateHeader() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <header>
      <Box
        bgcolor="primary.main"
        color="primary.contrastText"
        display="flex"
        justifyContent="space-between"
      >
        <Box component="h1" mr={"8px"}>
          پنل مدیریت فروشگاه
        </Box>
        <Box className={"tabs"} display="flex" alignItems="center">
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              fontWeight="bold"
            >
              <Tab label="کالاها" {...a11yProps(0)} />
              <Tab label="موجودی و قیمت ها " {...a11yProps(1)} />
              <Tab label="سفارش ها" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
        </Box>
        <Box className="header-link" display="flex" alignItems="center">
          <BrowserRouter>
            <Box
              component={Link}
              to="/"
              color="yellow"
              fontWeight="fontWeightBold"
              style={{ textDecoration: "none" }}
              mx={"15px"}
            >
              بازگشت به سایت
            </Box>
          </BrowserRouter>
        </Box>
      </Box>
    </header>
  );
}
