import React from "react";
import "./style.css";
import { InputField } from "../Login/components/InputField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { DatePicker } from "jalali-react-datepicker";

function Finalize(props) {
  return (
    <main>
      <h2 className="finalize-title">نهایی کردن خرید</h2>
      <form>
        <InputField />
        <InputField />
        <TextareaAutosize />
        <InputField />
        <DatePicker timePicker={false} />
      </form>
    </main>
  );
}
export { Finalize };
