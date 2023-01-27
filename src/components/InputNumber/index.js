import React, { useState, useEffect } from "react";
import "./styles.css";
import NumberFormat from "react-number-format";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { Controller } from "react-hook-form";

export default function InputNumber({
  label,
  name,
  type,
  placeholder,
  adornment,
  required,
  valueAsNumber,
  control,
  error,
  ...restProps
}) {
  return (
    <div className="__signup-input-group">
      <label htmlFor={restProps.name} className={!error ? "__signup-input-label" : "__signup-input-label error"}>
        {label}
        {required && <span className="__signup-input-required">*</span>}
        {adornment}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field, onChange, value }) => (
          <NumberFormat
            type={type}
            className={!error ? "__signup-input" : "__signup-input error"}
            id={name}
            placeholder={placeholder}
            thousandSeparator="."
            decimalSeparator=","
            fixedDecimalScale
            decimalScale={2}
            prefix={"R$ "}
            onValueChange={(values) => {
              const { formattedValue, value } = values;
              field.onChange(valueAsNumber ? value : formattedValue);
            }}
            renderText={(formattedValue) => <Text>{formattedValue}</Text>}
            {...field}
            {...restProps}
          />
        )}
      ></Controller>

      {error && (
        <div
          class={classNames("__signup-input-error", {
            "__signup-input-error-filled": error,
          })}
        >
          <ExclamationCircleOutlined className="__signup-input-error-icon" />
          {error}
        </div>
      )}
    </div>
  );
}
