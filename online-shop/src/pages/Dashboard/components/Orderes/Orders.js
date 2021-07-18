import React from "react";
import "./style.css";
import RadioButton from "./components/Radio";
import { getOrders } from "../../../../api/Api";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { OrdersModal } from "./components/OrdersModal";
import { instanceOf, string } from "prop-types";
import { SnackbarProvider, useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
const columns = [
  { id: "name", label: "نام کاربر", minWidth: 170 },
  { id: "amount", label: "مجموع مبلغ", minWidth: 100 },
  {
    id: "orderTime",
    label: "زمان ثبت سفارش",
    minWidth: 170,
  },
  {
    id: "buttons",
    label: "",
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

export function OrdersElement() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [checkState, setCheck] = React.useState("delivered");
  const [color, setColor] = React.useState("success");
  const [orders, setOrders] = React.useState([]);
  const [deliveryFlag, setDeliveryFlag] = React.useState(true);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleClickVariant = (message, variant) => {
    enqueueSnackbar(
      message,
      { variant },
      {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        TransitionComponent: Slide,
      }
    );
  };
  const radioHandler = (value, color) => {
    setCheck(value);
    setColor(color);
  };
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
  React.useEffect(() => {
    async function dataProvider() {
      return getOrders();
    }
    const data = dataProvider();
    data.then((orders) => {
      if (checkState === "delivered") {
        const filteredOrders = orders.filter(
          (order) => order.deliveryStatus === "true"
        );
        setOrders(filteredOrders);
        console.log("orders are:", orders);
      } else {
        const filteredOrders = orders.filter(
          (order) => order.deliveryStatus === "false"
        );
        setOrders(filteredOrders);
        console.log("orders are:waiting", orders);
      }
      // setOrders(orders)
    });
    console.log("checkState is :", checkState);
  }, [checkState, deliveryFlag]);
  const e2p = (s) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const changeModalHandler = (value) => {
    setDeliveryFlag(value);
    handleClickVariant("تغییرات با موفقیت ثبت شد", "success");
  };

  return (
    <>
      <div className="radio-buttons">
        <RadioButton onChange={radioHandler} />
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
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => {
                  return (
                    <TableRow key={order.id}>
                      <TableCell align="center">{order.name}</TableCell>
                      <TableCell align="center" className="cell">
                        {insertrialcamma(e2p(order.amount))}
                      </TableCell>
                      <TableCell align="center" className="cell">
                        {e2p(order.OrderTime)}
                      </TableCell>
                      <TableCell align="center" className="cell">
                        <OrdersModal
                          variant="contained"
                          class={classes.button}
                          color={color}
                          id={order.id}
                          orderData={order}
                          onChange={changeModalHandler}
                        >
                          بررسی سفارش
                        </OrdersModal>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 15, 25]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export function Orders(props) {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      TransitionComponent={Slide}
    >
      <OrdersElement />
    </SnackbarProvider>
  );
}
