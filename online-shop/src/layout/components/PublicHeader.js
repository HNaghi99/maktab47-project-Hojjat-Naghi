import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import logo from "../../asset/image/logo.png";
// import Link from "@material-ui/core/Link";
import { Link, BrowserRouter } from "react-router-dom";
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
          <Box
            component="div"
            className="header-links"
            ml={"40px"}
            display="flex"
            alignItems="center"
          >
            <BrowserRouter>
              <Box
                component={Link}
                to="/dashboard"
                color="yellow"
                fontWeight="fontWeightBold"
                style={{ textDecoration: "none" }}
                mx={"15px"}
              >
                مدیریت
              </Box>
            </BrowserRouter>
            <Box component="span" className="header-cart" mx={"15px"}>
              <ShoppingCartIcon />
              <BrowserRouter>
                <Box
                  component={Link}
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
              </BrowserRouter>
            </Box>
          </Box>
        </Box>
      </header>
    );
  }
}
