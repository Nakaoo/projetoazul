import React from "react";
import { Controller } from "react-hook-form";
import "./styles.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import classNames from "classnames";
import Select from 'react-select';


export default function InputSelect({
  register,
  control,
  options,
  label,
  adornment,
  required,
  placeholder,
  name,
  onChange,
  error,
  setValueCity,
  defaultValue,
  value,
  ref,
  state,
  type,
  ...restProps
}) {


  const style = {
    container: (base) => ({
      ...base,
      width: type === "row" ? "50%" : "100%",
    }),
    control: () => ({
      display: "flex",
      padding: "0 0.75rem",
      position: "relative",
      borderRadius: "0.375rem",
      backgroundColor: "#F1F3F6",
      fontSize: "1rem",
      fontWeight: "400",
      lineHeight: "1.5",
      color: "#212529",
      backgroundClip: "paddingBox",
      border: error ? "1px solid red" : "1px solid #ced4da"
    }),
    input: (base) => ({ ...base, background: "#F1F3F6", color: "var(--input)", position: "absolute", width: "0%" }),
    valueContainer: (base) => ({ ...base, padding: "0 0 0 0" }),
    singleValue: () => ({ color: "#212529" }),
    option: (provided, state) => ({
      ...provided,
      position: "relative",
      borderBottom: "1px black",
      color: state.isSelected ? "#212529;" : "black",
      ...(state.isSelected && { backgroundColor: "#657b91" }),
    }),
    placeholder: (base) => ({
      ...base,
      color: "#555555",
      whiteSpace: "nowrap",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      padding: "0 0 0 0",
    }),
    indicatorSeparator: (base) => ({
      ...base,
      padding: "0 0 0 0",
    }),
    menuList: (base) => ({
      ...base,
      "::-webkit-scrollbar": {
        width: "9px",
        height: "9px",
        paddingTop: "30px",
        background: "#f4f4f4",
        borderRadius: "10px",
        transition: "all 1s",
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: "#EEE",
        borderRadius: "10px",
        transition: "all 1s",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#e3e3e3",
        borderRadius: "10px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#c3c3c3",
      },
    }),
  };

  return (
    <div key="Select" className={type === "row" ? "__signup-input-group-col" : "__signup-input-group"}>
      <label htmlFor={restProps.name} className={!error ? "__signup-input-label-size" : "__signup-input-label error"}>
        {label}
        {required && <span className="__signup-input-required">*</span>}
        {adornment}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ? defaultValue : defaultValue?.value}
        render={({ field, ref }) => (
          <Select
            styles={style}
            className="select_row"
            options={options}
            required
            ref={ref}
            placeholder={placeholder}
            inputId={name}
            openMenuOnFocus
            onChange={(option) => {
              onChange && onChange(option.value);
              field.onChange(option?.value);
              setValueCity && setValueCity(option.value)
            }}
            value={options.find((c) => c.value === field.value)}
            {...restProps}
            defaultValue={defaultValue}
          ></Select>
        )}
      />
      <div
        key="errorInput"
        class={classNames("__signup-input-error", {
          "__signup-input-error-filled": error,
        })}
      >
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
    </div>
  );
}
