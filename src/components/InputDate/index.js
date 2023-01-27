import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useRef } from "react";
import { Controller } from "react-hook-form";
import ptBr from "date-fns/locale/pt-BR";
import DatePicker, { registerLocale } from "react-datepicker";
import classNames from "classnames";
import InputMask from "react-input-mask";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";



export default function InputDate({
  label,
  name,
  adornment,
  required,
  placeholder,
  mask,
  control,
  error,
  auto,
  onChange,
  ref,
  ...restProps
}) {
  registerLocale("pt-BR", ptBr);
  const onKeyDown = (e) => {
    if (e.keyCode === 9 || e.which === 9) {
      ref.current.setOpen(false);
    }
    if (e.keyCode === 13 || e.which === 13) {
      ref.current.setOpen(false);
    }
  };

  return (
    <div
      key="date"
      className={!error ? "__signup-input-group" : "__signup-input-group error"}>
      <label htmlFor={restProps.name} className={!error ? "__signup-input-label" : "__signup-input-label error"}>
        {label}
        {required && <span className="__signup-input-required">*</span>}
        {adornment}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field, ref }) => {
          return (
            <DatePicker
              className={!error ? "__signup-input" : "__signup-input error"}
              placeholderText={placeholder}
              onChange={(date) => {
                onChange && onChange(date);
                field.onChange(date);
              }}
              selected={field.value}
              dateFormat="dd/MM/yyyy"
              locale="pt-BR"
              customInput={<InputMask mask="99/99/9999" />}
              ref={ref}
              onKeyDown={onKeyDown}
              autoFocus={auto}
              {...restProps}
            />
          );
        }}
      />
      <div
        key="errorDiv"
        class={classNames("__signup-input-error", {
          "__signup-input-error-filled": error,
        })}
      >
        {error && (
          <div key="errordate">
            <ExclamationCircleOutlined className="__signup-input-error-icon" />
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
