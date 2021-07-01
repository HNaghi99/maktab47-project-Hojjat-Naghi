import React from "react";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { Orders } from "../../pages/Orders";
import { Stock } from "../../pages/Stock";
import { Wares } from "../../pages/Wares";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

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
    <>
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
            <Box
              component={Link}
              exact
              to="/"
              color="yellow"
              fontWeight="fontWeightBold"
              style={{ textDecoration: "none" }}
              mx={"15px"}
            >
              بازگشت به سایت
            </Box>
          </Box>
        </Box>
      </header>
      <div>
        <TabPanel value={value} index={0}>
          <Wares />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Stock />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Orders />
        </TabPanel>
      </div>
    </>
  );
}
