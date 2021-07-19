import React from "react";
import "./style.css";
import { getProducts } from "../../../../api/Api";
import { makeStyles } from "@material-ui/core/styles";
import { DeleteButton } from "./components/DeleteButton";
import { EditButton } from "./components/EditButton";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { AddButton } from "./components/AddButton";
import { useDispatch } from "react-redux";
import { loaderAction } from "../../../../redux/reducer/loadReducer";
import { SnackbarProvider, useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";

const columns = [
  { id: "picture", label: "تصویر", minWidth: 170 },
  { id: "name", label: "نام کالا", minWidth: 100 },
  {
    id: "category",
    label: "دسته بندی",
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
export function WaresItem() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [products, setProducts] = React.useState([]);
  const [deletedProductId, setDeletedId] = React.useState("");
  const [editedProductId, setEditedId] = React.useState([2]);
  const [addedProduct, setAddProduct] = React.useState([1]);
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
  React.useEffect(() => {
    const dataProvider = async () => {
      return getProducts();
    };
    const data = dataProvider();
    dispatch(loaderAction.displayLoader());
    data.then((product) => {
      setProducts(product);
      dispatch(loaderAction.hideLoader());
    });
  }, [deletedProductId, editedProductId, addedProduct]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const deleteHandler = (id) => {
    setDeletedId(id);
    handleClickVariant("محصول مورد نظر حذف گردید", "success");
  };
  const editHandler = (id) => {
    setEditedId([...editedProductId, id]);
    handleClickVariant("ویرایش با موفقیت انجام شد", "success");
  };
  const addHandler = (id) => {
    setAddProduct([...addedProduct, id]);
    handleClickVariant("محصول مورد نظر اضافه شد", "success");
  };
  return (
    <>
      <AddButton class={classes.button} onSelect={addHandler} />
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
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => {
                  return (
                    <TableRow key={product.id}>
                      <TableCell align="center">
                        <img
                          src={`http://localhost:3004${product.image}`}
                          width="100px"
                        />
                      </TableCell>
                      <TableCell align="center" className="cell">
                        {product.name}
                      </TableCell>
                      <TableCell align="center" className="cell">
                        {product.header}/{product.group}
                      </TableCell>
                      <TableCell align="center" className="cell">
                        <div className="buttons">
                          <EditButton
                            class={classes.button}
                            id={product.id}
                            product={product}
                            onSelect={editHandler}
                          />
                          <DeleteButton
                            class={classes.button}
                            id={product.id}
                            onSelect={deleteHandler}
                          />
                        </div>
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
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export function Wares(props) {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      TransitionComponent={Slide}
    >
      <WaresItem onSelect={props.onSelect} />
    </SnackbarProvider>
  );
}
