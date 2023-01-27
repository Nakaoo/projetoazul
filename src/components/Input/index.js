import React from "react";
import "./styles.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import classNames from "classnames";

export default function Input({
  label,
  name,
  type,
  adornment,
  required,
  placeholder,
  register,
  helperText,
  error,
  auto,
  autoFocus,
  ...restProps
}) {
  return (
    <div>
      <div key="input" className={!error ? "__signup-input-group" : "__signup-input-group error"}>
        <label htmlFor={restProps.name} className={!error ? "__signup-input-label" : "__signup-input-label error"}>
          {label}
          {required && <span className="__signup-input-required">*</span>}
          {adornment}
        </label>
        <input
          className={!error ? "__signup-input" : "__signup-input error"}
          id={name}
          type={type}
          placeholder={placeholder}
          autoFocus={auto}
          {...register}
          {...restProps}
        />
        <div>
          <div key="divError"
            class={classNames("__signup-input-error", {
              "__signup-input-error-filled": error || helperText,
            })}
          >
            {error && (
              <div key="error">
                <ExclamationCircleOutlined className="__signup-input-error-icon" />
                {error}
              </div>
            )}
            <div key="divHelper">{!error && helperText && <div key="helperText">{helperText}</div>}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
