import React, { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import classNames from "classnames";

export default function InputSelectAddress({
    register,
    control,
    options,
    label,
    adornment,
    required,
    handleChangeState,
    placeholder,
    name,
    onChange,
    error,
    setValueCity,
    defaultValue,
    value,
    state,
    ...restProps
}) {

    function test(e) {
        setValueCity(e.target.value)
        console.log(e.target.value)
    }

    return (
        <div key="Select" className="__signup-input-group">
            <label htmlFor={restProps.name} className={!error ? "__signup-input-label" : "__signup-input-label error"}>
                {label}
                {required && <span className="__signup-input-required">*</span>}
                {adornment}
            </label>

            <select id={name}
                onChange={(e) => test(e)}
                className={!error ? "__signup-input" : "__signup-input error"}
                placeholder={placeholder}
                {...register}
                {...restProps}
            >
                {options.map((option, index) => (
                    <option value={option.value} key={index + 1}>{option.label}</option>
                ))}
            </select>
                
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
