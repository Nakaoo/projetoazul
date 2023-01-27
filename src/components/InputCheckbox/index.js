import React from "react";
import "./styles.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import classNames from "classnames";

export default function InputCheckbox({
  label,
  name,
  adornment,
  required,
  placeholder,
  register,
  helperText,
  error,
  ...restProps
}) {
  return (
    <div className="__auth-input-group">
      <div style={{ flexDirection: "row" }}>
        <input
          className="__auth-input"
          id={name}
          type="checkbox"
          {...restProps}
          {...register}
          style={{ margin: "6px" }}
        />
        <label for={name} className="__auth-label">
          {label}
          {required && <span className="__signup-input-required">*</span>}
        </label>
        {adornment}
      </div>
      <div
        class={classNames("__signup-input-error", {
          "__signup-input-error-filled": error,
        })}
      >
        {error ? (
          <>
            <ExclamationCircleOutlined className="__signup-input-error-icon" />
            {error}
          </>
        ) : (
          helperText && helperText
        )}
      </div>
    </div>
  );
}
