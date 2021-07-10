import React from "react";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CancelIcon from "@material-ui/icons/Cancel";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

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
  const classes = useStyles();
  const [openDeleteDialog, setOpenDelete] = React.useState(false);

  const handleOpenDeleteDialog = () => {
    setOpenDelete(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDelete(false);
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
            <div className="customer-field">آدرس:{props.orderData.address}</div>
            <div className="customer-field">تلفن:{props.orderData.tel}</div>
            <div className="customer-field">
              زمان تحویل:{props.orderData.deliveryTime}
            </div>
            <div className="customer-field">
              زمان سفارش:{props.orderData.OrderTime}
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
                  {props.orderData.cart.map((product) => {
                    return (
                      <TableRow>
                        <TableCell align="center">{product.product}</TableCell>
                        <TableCell align="center" className="cell">
                          {product.price}
                        </TableCell>
                        <TableCell align="center" className="cell">
                          {product.number}
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
          {props.orderData.deliveryStatus ? (
            <div className="delivered-alert">تحویل شد</div>
          ) : (
            <div className="delivery-time">
              زمان تحویل:{props.orderData.deliveryTime}
            </div>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
