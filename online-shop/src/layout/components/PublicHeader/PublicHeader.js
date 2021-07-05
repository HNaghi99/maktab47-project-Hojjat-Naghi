import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import logo from "../../../asset/image/logo.png";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
export default class PublicHeader extends Component {
  render() {
    return (
      <header>
        <Box
          bgcolor="primary.main"
          color="primary.contrastText"
          display="flex"
          justifyContent="space-between"
        >
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Box component="div" className="header-title" display="flex">
                <Box
                  component="img"
                  src={logo}
                  width="100px"
                  height="100%"
                  ml={"5px"}
                />
                <Box component="h1">فروشگاه سیب</Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Box
                component="div"
                className="header-links"
                display="flex"
                alignItems="center"
              >
                <Box
                  component={Link}
                  exact
                  to="/dashboard"
                  color="yellow"
                  fontWeight="fontWeightBold"
                  style={{ textDecoration: "none" }}
                  mx={"15px"}
                >
                  مدیریت
                </Box>
                <Box component="span" className="header-cart" mx={"15px"}>
                  <ShoppingCartIcon />
                  <Box
                    component={Link}
                    exact
                    to="/cart"
                    color="yellow"
                    fontWeight="fontWeightBold"
                    style={{ textDecoration: "none" }}
                    position="relative"
                    bottom={"6px"}
                    mr={"6px"}
                  >
                    سبد خرید
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </header>
    );
  }
}
