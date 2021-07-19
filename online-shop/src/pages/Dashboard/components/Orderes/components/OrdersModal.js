import React from "react";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CancelIcon from "@material-ui/icons/Cancel";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { patchOrder } from "../../../../../api/Api";
import { useDispatch } from "react-redux";
import { loaderAction } from "../../../../../redux/reducer/loadReducer";

const columns = [
  { id: "product", label: "کالا", minWidth: 170 },
  { id: "price", label: "قیمت", minWidth: 100 },
  {
    id: "number",
    label: "تعداد",
    minWidth: 170,
  },
];
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  button: {
    margin: theme.spacing(1),
  },
}));
export function OrdersModal(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const cart = JSON.parse(props.orderData.cart);
  const [deliveryFlag, setDeliveryFlag] = React.useState(false);
  const [openDeleteDialog, setOpenDelete] = React.useState(false);
  const e2p = (s) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  function insertrialcamma(n) {
    var m = "";
    for (var i = 0; i < n.length; i++) {
      var c = n.substr(n.length - i - 1, 1);
      if ((i % 3 == 0) & (i > 0)) {
        m = c + "," + m;
      } else {
        m = c + m;
      }
    }
    return m;
  }
  const handleOpenDeleteDialog = () => {
    setOpenDelete(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDelete(false);
  };
  const changeDeliveryStatus = () => {
    dispatch(loaderAction.displayLoader());
    const nowDate = new Date().toLocaleDateString("fa-IR");
    const formData = new FormData();
    formData.append("deliveryStatus", "true");
    formData.append("deliveryTime", nowDate);
    patchOrder(formData, props.id).then(() => {
      props.onChange(deliveryFlag);
      dispatch(loaderAction.hideLoader());
      setDeliveryFlag(!deliveryFlag);
      setOpenDelete(false);
    });
  };
  return (
    <>
      <Button
        variant="contained"
        className={(props.class, props.color)}
        startIcon={<AssignmentTurnedInIcon />}
        onClick={handleOpenDeleteDialog}
      >
        بررسی سفارش
      </Button>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="edit-apartment"
      >
        <DialogTitle id="edit-apartment">
          <span>نمایش سفارش</span>
          <CancelIcon onClick={handleCloseDeleteDialog} />
        </DialogTitle>
        <DialogContent>
          <div className="customer-data">
            <div className="customer-field">
              نام مشتری:{props.orderData.name}
            </div>
            <address className="customer-field">
              آدرس:{props.orderData.address}
            </address>
            <div className="customer-field">تلفن:{props.orderData.tel}</div>
            <div className="customer-field">
              زمان تحویل درخواست شده:{e2p(props.orderData.deliveryRequestTime)}
            </div>
            <div className="customer-field">
              زمان سفارش:{e2p(props.orderData.OrderTime)}
            </div>
          </div>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead style={{ backgroundColor: "black", color: "white" }}>
                  <TableRow className="MuiPaper-elevation20 MuiTab-textColorInherit">
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={"center"}
                        style={{
                          minWidth: column.minWidth,
                          fontWeight: "bold",
                          fontSize: "larger",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((product) => {
                    return (
                      <TableRow>
                        <TableCell align="center">{product.product}</TableCell>
                        <TableCell align="center" className="cell">
                          {insertrialcamma(e2p(JSON.stringify(product.price)))}
                        </TableCell>
                        <TableCell align="center" className="cell">
                          {e2p(JSON.stringify(product.number))}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </DialogContent>
        <DialogActions className="MuiGrid-justify-xs-center">
          {props.orderData.deliveryStatus === "false" ? (
            <Button className="delivered-alert" onClick={changeDeliveryStatus}>
              تحویل شد
            </Button>
          ) : (
            <div className="delivery-time">
              زمان تحویل:{e2p(props.orderData.deliveryTime)}
            </div>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
