import "./style.css";
import { InputField } from "../Login/components/InputField";
import { TextareaAutosize } from "@material-ui/core";
import { useState } from "react";
import { Grid } from "@material-ui/core";
import momentJalaali from "moment-jalaali";
import DatePicker from "react-datepicker2";
import { Box } from "@material-ui/core";
import joi from "joi";
import { useDispatch } from "react-redux";
import { customerAction } from "../../redux/reducer/customReducer";
import { SnackbarProvider, useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
const schema = joi.object({
  name: joi.string().min(2).error(new Error("وارد کرن نام الزامی است")),
  family: joi
    .string()
    .min(2)
    .required()
    .error(new Error("وارد کردن نام خانوادگی الزامی است")),
  address: joi
    .string()
    .min(10)
    .required()
    .error(new Error("وارد کردن آدرس الزامی است")),
  tel: joi
    .string()
    .regex(new RegExp("^(\\+98|0)?9\\d{9}$"))
    // .min(11)
    .required()
    .error(new Error("شماره تلفن همراه وارد شده صحیح نمی باشد")),
  date: joi
    .string()
    .required()
    .error(new Error("تاریخ تحویل سفارش را وارد کنید")),
});
function FinalizeElements(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [date, setDate] = useState("");
  const [selectedDate, handleDateChange] = useState(null);
  const enabledRange = {
    min: momentJalaali().add(-1, "days"),
    max: momentJalaali().add(+9, "days"),
  };

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
  const nameHandler = (value) => {
    setName(value);
  };
  const familyHandler = (value) => {
    setFamily(value);
  };
  const addressHandler = async (e) => {
    setAddress(await e.target.value);
  };
  const telHandler = (value) => {
    setTel(value);
  };
  const numberInputHandler = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };
  const customerDataHandler = (e) => {
    e.preventDefault();
    const nowDate = new Date().toLocaleDateString("fa-IR");
    let customerData = schema.validate({
      name: name,
      family: family,
      address: address,
      tel: tel,
      date: date,
    });
    try {
      if (customerData.error) throw new Error(customerData.error.message);
      else {
        const customerData = {
          name: name,
          family: family,
          address: address,
          tel: tel,
          date: date,
          orderTime: nowDate,
        };
        dispatch(customerAction.saveCustomerData(customerData));
        window.location.href = "http://127.0.0.1:5500/payment-page/index.html";
      }
    } catch (error) {
      handleClickVariant(error.message, "error");
    }
  };
  return (
    <main>
      <div className="finalize-title-container">
        <h2 className="finalize-title">نهایی کردن خرید</h2>
      </div>
      <form onSubmit={customerDataHandler}>
        <Grid container>
          <Grid item className="finalize-field" xs={12} sm={6}>
            <InputField label="نام" onChangeInput={nameHandler} />
          </Grid>
          <Grid item className="finalize-field" xs={12} sm={6}>
            <InputField label="نام خانوادگی" onChangeInput={familyHandler} />
          </Grid>
          <Grid item xs={12} className="address-field finalize-field" sm={6}>
            <textarea
              placeholder="آدرس"
              onChange={addressHandler}
              value={address}
            />
          </Grid>
          <Grid item className="finalize-field" xs={12} sm={6}>
            <InputField
              onKeyPress={numberInputHandler}
              label="تلفن همراه"
              onChangeInput={telHandler}
            />
          </Grid>
          <Grid item className="finalize-field" xs={12} sm={6}>
            <DatePicker
              value={selectedDate}
              min={enabledRange.min}
              max={enabledRange.max}
              className="date-field"
              placeholder="تاریخ تحویل را انتخاب کنید"
              showTodayButton={false}
              timePicker={false}
              isGregorian={false}
              onChange={async (value) => {
                handleDateChange(value);
                console.log("salam date:", value.format("jYYYY/jM/jD"));
                setDate(await value.format("jYYYY/jM/jD"));
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box component="div" className="pay-btn-container">
              <button className="pay-btn" type="submit">
                پرداخت
              </button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </main>
  );
}
// export { Finalize };
export function Finalize(props) {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      TransitionComponent={Slide}
    >
      <FinalizeElements
      // onSelect={props.onSelect}
      />
    </SnackbarProvider>
  );
}
