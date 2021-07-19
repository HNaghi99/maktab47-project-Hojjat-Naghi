import React from "react";
import { deleteProduct } from "../../../../../api/Api";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { loaderAction } from "../../../../../redux/reducer/loadReducer";
export function DeleteButton(props) {
  const dispatch = useDispatch();
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
        color="secondary"
        className={props.class}
        startIcon={<DeleteIcon />}
        onClick={handleOpenDeleteDialog}
      >
        حذف
      </Button>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="edit-apartment"
      >
        <DialogContent>
          <DialogContentText>
            آیا می خواهید این محصول را حذف کنید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions className="MuiGrid-justify-xs-space-evenly">
          <Button
            onClick={handleCloseDeleteDialog}
            color="secondary"
            className="MuiButton-containedSecondary"
          >
            خیر
          </Button>
          <Button
            onClick={() => {
              dispatch(loaderAction.displayLoader());
              deleteProduct(props.id).then(() => {
                dispatch(loaderAction.hideLoader());
                props.onSelect(props.id);
              });
            }}
            color="primary"
            className="MuiButton-containedPrimary"
          >
            بله
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
