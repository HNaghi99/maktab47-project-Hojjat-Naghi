import React from "react";
import Box from "@material-ui/core/Box";
import logo from "../../../asset/image/logo.png";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import styles from "./style.module.css";
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);
export default function PublicHeader(props) {
  const stock = useSelector((state) => state.cart.cartProductsArray.length);
  const e2p = (s) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
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
                className={styles.dashboardLink}
                mx={"15px"}
              >
                مدیریت
              </Box>
              <Box
                component={Link}
                to="/cart"
                className="header-cart"
                mx={"15px"}
              >
                <IconButton aria-label="cart">
                  <StyledBadge
                    badgeContent={stock !== 0 ? e2p(JSON.stringify(stock)) : 0}
                    color="secondary"
                  >
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </header>
  );
}
