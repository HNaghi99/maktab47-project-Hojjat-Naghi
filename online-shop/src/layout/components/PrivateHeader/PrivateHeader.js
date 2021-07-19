import React from "react";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { Orders } from "../../../pages/Index";
import { Stock } from "../../../pages/Index";
import { Wares } from "../../../pages/Index";
import Grid from "@material-ui/core/Grid";
import "./style.css";
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
        <Box bgcolor="primary.main" color="primary.contrastText">
          <Grid container>
            <Grid item xs={12} sm={5} md={3}>
              <Box component="h1" mr={"8px"} className="private-header-title">
                پنل مدیریت فروشگاه
              </Box>
            </Grid>
            <Grid
              xs={9}
              sm={8}
              md={6}
              style={{ margin: "auto", marginBottom: "14px" }}
            >
              <Box className={"tabs"}>
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
            </Grid>
            <Grid
              xs={12}
              md={2}
              style={{
                margin: "14px 0",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                className="header-link"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
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
            </Grid>
          </Grid>
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
