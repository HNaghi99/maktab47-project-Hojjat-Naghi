import React from "react";
import "./style.css";
import { getProducts } from "../../../../api/Api";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Text } from "./components/Text";
import { patchProduct } from "../../../../api/Api";
import joi from "joi";
import { SnackbarProvider, useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import { loaderAction } from "../../../../redux/reducer/loadReducer";
import { useDispatch } from "react-redux";

const columns = [
  { id: "picture", label: "کالا", minWidth: 170 },
  { id: "name", label: "قیمت", minWidth: 100 },
  {
    id: "category",
    label: "موجودی",
    minWidth: 170,
  },
];
function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}
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

export function StockComponent() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
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
  const schema = joi.object({
    stock: joi
      .number()
      .min(1)
      .error(new Error("موجودی بایستی به صورت عدد و بزرگتر از صفر باشد")),
    price: joi
      .number()
      .min(1)
      .error(new Error("قیمت بایستی به صورت عدد و بزرگتر از صفر باشد")),
  });
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [products, setProducts] = React.useState([]);
  const [modified, setModified] = React.useState([]);
  const [flag, setFlag] = React.useState(true);
  React.useEffect(() => {
    async function dataProvider() {
      return getProducts();
    }
    const data = dataProvider();
    data.then((product) => setProducts(product));
  }, [flag]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const e2p = (s) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  const saveHandler = () => {
    let changedProductsId = modified;
    changedProductsId = [...new Set(changedProductsId)];
    changedProductsId.forEach((id) => {
      const formData = new FormData();
      const changedProperties = products.find((product) => product.id === id);
      let editedData = schema.validate({
        stock: changedProperties.stock,
        price: changedProperties.price,
      });
      try {
        if (editedData.error) throw new Error(editedData.error.message);
        else {
          dispatch(loaderAction.displayLoader());
          formData.append("price", changedProperties.price);
          formData.append("stock", changedProperties.stock);
          patchProduct(formData, id).then(() => {
            setFlag(!flag);
            dispatch(loaderAction.hideLoader());
            handleClickVariant("ویرایش با موفقیت انجام شد", "success");
          });
        }
      } catch (error) {
        console.log("message is:", error.message);
        handleClickVariant(error.message, "error");
      }
    });
  };
  const passStock = (value, id) => {
    setModified([...modified, id]);
    const modifiedProducts = products;
    modifiedProducts.find((product) => product.id === id).stock = value;
    setProducts(modifiedProducts);
  };
  const passPrice = (value, id) => {
    setModified([...modified, id]);
    const modifiedProducts = products;
    modifiedProducts.find((product) => product.id === id).price = value;
    setProducts(modifiedProducts);
  };

  return (
    <>
      <div className="save-product">
        <Button
          variant="contained"
          onClick={saveHandler}
          className={(classes.button, "save")}
          startIcon={<SaveIcon />}
        >
          ذخیره
        </Button>
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
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => {
                  return (
                    <TableRow key={product.id}>
                      <TableCell align="center">{product.name}</TableCell>
                      <TableCell align="center" className="cell">
                        <Text
                          type="price"
                          value={e2p(product.price)}
                          id={product.id}
                          onChange={passPrice}
                        />
                      </TableCell>
                      <TableCell align="center" className="cell">
                        <Text
                          type="stock"
                          value={e2p(product.stock)}
                          id={product.id}
                          onChange={passStock}
                        />
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
export function Stock(props) {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      TransitionComponent={Slide}
    >
      <StockComponent />
    </SnackbarProvider>
  );
}
