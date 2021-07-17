import React from "react";
import { Button } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { postProduct } from "../../../../../api/Api";
import CancelIcon from "@material-ui/icons/Cancel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { InputField } from "../../../../Login/components/InputField";
import { SelectItem } from "../../../../../components/Select";
import { convertToRaw, EditorState, Editor } from "draft-js";
import { useDispatch } from "react-redux";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import joi from "joi";
import { SnackbarProvider, useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import draftToHtml from "draftjs-to-html";
import { stateToHTML } from "draft-js-export-html";
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
export function Add(props) {
  const dispatch = useDispatch();
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
  const schema = joi.object({
    name: joi
      .string()
      .min(2)
      .required()
      .error(new Error("وارد کردن نام محصول الزامی است")),
    header: joi
      .string()
      .min(2)
      .required()
      .error(new Error("وارد کردن گروه محصول الزامی است")),
    group: joi
      .string()
      .min(2)
      .required()
      .error(new Error("وارد کردن زیر گروه محصول الزامی است")),
    description: joi
      .optional()
      // .string()
      // .min(2)
      // .required()
      .error(new Error("وارد کردن جزئیات محصول الزامی است")),
    image: joi
      .object({})
      .required()
      .error(new Error("بارگذاری تصویر محصول الزامی است")),
  });
  const [editorState, setEditor] = React.useState(EditorState.createEmpty());
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [head, setHead] = React.useState("");
  const [group, setGroup] = React.useState("");
  const [description, setDes] = React.useState("");
  const [openDeleteDialog, setOpenDelete] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [flag, setFlag] = React.useState(5);
  const styleMap = {
    STRIKETHROUGH: {
      textDecoration: "line-through",
    },
  };
  const handleOpenDeleteDialog = () => {
    setOpenDelete(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDelete(false);
  };
  const headHandler = (head) => {
    setHead(head);
  };
  const groupHandler = (group) => {
    setGroup(group);
  };
  const inputHandler = (value) => {
    setName(value);
  };
  const editorHandler = (value) => {
    setEditor(value);
    console.log(
      "salam be jam",
      JSON.stringify(stateToHTML(editorState.getCurrentContent()))
    );
    setDes(JSON.stringify(stateToHTML(editorState.getCurrentContent())));
  };
  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log("type of", typeof file, file);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // props.onSelect(flag);
    let formData = new FormData();
    let addedData = schema.validate({
      name: name,
      header: head,
      group: group,
      description: description,
      image: image,
    });
    try {
      if (addedData.error) {
        throw new Error(addedData.error.message);
      } else {
        dispatch(loaderAction.displayLoader());
        formData.append("name", name);
        formData.append("header", head);
        formData.append("group", group);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("stock", "0");
        formData.append("price", "0");
        postProduct(formData).then(() => {
          handleCloseDeleteDialog();
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
      <div className="add-product">
        <Button
          variant="contained"
          className={(props.class, "add")}
          startIcon={<AddIcon />}
          onClick={handleOpenDeleteDialog}
        >
          افزودن کالا
        </Button>
      </div>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="edit-apartment"
      >
        <form onSubmit={submitHandler}>
          <DialogTitle id="edit-apartment">
            <span>افزودن کالا</span>
            {/* <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="یستن"
              placement="left"
            > */}
            <IconButton className="cancel-icon">
              <CancelIcon onClick={handleCloseDeleteDialog} />
            </IconButton>
            {/* </Tooltip> */}
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
              customStyleMap={styleMap}
              editorState={editorState}
              onChange={editorHandler}
              placeholder="توضیحات..."
              textAlignment="right"
              textDirectionality="RTL"
              // toolbar={{
              //   options: ["inline", "list", "history", "image", "emoji"],
              //   inline: {
              //     options: ["bold", "italic", "underline", "strikethrough"],
              //     bold: { className: "bordered-option-classname" },
              //     italic: { className: "bordered-option-classname" },
              //     underline: { className: "bordered-option-classname" },
              //     strikethrough: { className: "bordered-option-classname" },
              //     code: { className: "bordered-option-classname" },
              //   },
              //   list: {
              //     options: ["unordered", "ordered"],
              //     unordered: { className: "bordered-option-classname" },
              //     ordered: { className: "bordered-option-classname" },
              //   },
              //   image: {
              //     urlEnabled: true,
              //     uploadEnabled: true,
              //   },
              // }}
            />
          </DialogContent>
          <DialogActions className="MuiGrid-justify-xs-center">
            <Button className="add" type="submit">
              ذخیره
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
export function AddButton(props) {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      TransitionComponent={Slide}
    >
      <Add onSelect={props.onSelect} />
    </SnackbarProvider>
  );
}
