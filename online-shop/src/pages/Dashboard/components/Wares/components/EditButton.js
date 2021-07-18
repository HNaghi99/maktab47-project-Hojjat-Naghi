import React from "react";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { InputField } from "../../../../../components/InputField";
import { SelectItem } from "../../../../../components/Select";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { patchProduct } from "../../../../../api/Api";
import joi from "joi";
import { SnackbarProvider, useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import { useDispatch } from "react-redux";
import { loaderAction } from "../../../../../redux/reducer/loadReducer";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export function Edit(props) {
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
    name: joi
      .string()
      .min(2)
      .error(new Error("نام محصول حداقل بایستی دو حرفی باشد")),
    header: joi
      .string()
      .required()
      .error(new Error("وارد کردن گروه محصول الزامی است")),
    group: joi
      .string()
      .required()
      .error(new Error("وارد کردن زیر گروه محصول الزامی است")),
    description: joi
      .string()
      .min(5)
      .error(new Error("توضیحات محصول بایستی حداقل ۵ حرفی باشد")),
  });
  const [editorState, setEditor] = React.useState(EditorState.createEmpty());
  const classes = useStyles();
  const [name, setName] = React.useState(props.product.name);
  const [head, setHead] = React.useState(props.product.header);
  const [group, setGroup] = React.useState(props.product.group);
  const [description, setDes] = React.useState(props.product.description);
  const [openDeleteDialog, setOpenDelete] = React.useState(false);
  const [image, setImage] = React.useState(props.product.image);
  const [flag, setFlag] = React.useState(2);
  const handleOpenDeleteDialog = () => {
    setOpenDelete(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDelete(false);
  };
  const headHandler = (head) => {
    setHead(head);
    setGroup(null);
  };
  const groupHandler = (group) => {
    setGroup(group);
  };
  const inputHandler = (value) => {
    setName(value);
  };
  const editorHandler = async (value) => {
    await setEditor(value);
    // setDes()
    // const desc = await editorState.getCurrentContent().getPlainText();
    await setDes(value.getCurrentContent().getPlainText());
    // console.log("description:", value.getCurrentContent().getPlainText());
  };
  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    let editedData = schema.validate({
      name: name,
      header: head,
      group: group,
      description: editorState,
    });
    try {
      if (editedData.error) throw new Error(editedData.error.message);
      else {
        dispatch(loaderAction.displayLoader());
        formData.append("name", name);
        formData.append("header", head);
        formData.append("group", group);
        formData.append("description", description);
        formData.append("image", image);
        patchProduct(formData, props.product.id).then(() => {
          handleCloseDeleteDialog();
          setName("");
          setHead("");
          setGroup("");
          setDes("");
          setImage(null);
          setFlag(flag + 1);
          dispatch(loaderAction.hideLoader());
          props.onSelect(flag + 1);
        });
      }
    } catch (error) {
      handleClickVariant(error.message, "error");
    }
  };
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        className={props.class}
        startIcon={<EditIcon />}
        onClick={handleOpenDeleteDialog}
      >
        ویرایش
      </Button>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="edit-apartment"
      >
        <form onSubmit={submitHandler}>
          <DialogTitle id="edit-apartment">
            <span>ویرایش کالا</span>
            <CancelIcon onClick={handleCloseDeleteDialog} />
          </DialogTitle>
          <DialogContent>
            <div className="image-upload">
              <div className="img-upload-description">
                تصویر کالا را انتخاب نمایید
              </div>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                // value={image}
                onChange={imageHandler}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>
            <InputField
              onChangeInput={inputHandler}
              label="نام کالا را وارد نمایید..."
            />
            <SelectItem head={headHandler} group={groupHandler} />
            <Editor
              editorState={editorState}
              onEditorStateChange={editorHandler}
              placeholder="توضیحات..."
              textAlignment="right"
              toolbar={{
                options: ["inline", "list", "history", "image", "emoji"],
                inline: {
                  options: ["bold", "italic", "underline", "strikethrough"],
                  bold: { className: "bordered-option-classname" },
                  italic: { className: "bordered-option-classname" },
                  underline: { className: "bordered-option-classname" },
                  strikethrough: { className: "bordered-option-classname" },
                  code: { className: "bordered-option-classname" },
                },
                list: {
                  options: ["unordered", "ordered"],
                  unordered: { className: "bordered-option-classname" },
                  ordered: { className: "bordered-option-classname" },
                },
                image: {
                  urlEnabled: true,
                  uploadEnabled: true,
                },
              }}
            />
          </DialogContent>
          <DialogActions className="MuiGrid-justify-xs-center">
            <Button
              // onClick={handleCloseDeleteDialog}
              className="add"
              type="submit"
            >
              ذخیره
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
export function EditButton(props) {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      TransitionComponent={Slide}
    >
      <Edit onSelect={props.onSelect} product={props.product} />
    </SnackbarProvider>
  );
}
