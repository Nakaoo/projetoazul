import Input from "react-input-mask";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Controller } from "react-hook-form";
import classNames from "classnames";

export default function InputMask({
  label,
  name,
  type,
  placeholder,
  adornment,
  required,
  autoComplete,
  mask,
  control,
  onChange,
  error,
  ...restProps
}) {
  return (
    <div key="inputMask">
      <div className={!error ? "__signup-input-group" : "__signup-input-group error"}>
        <label htmlFor={restProps.name} className={!error ? "__signup-input-label" : "__signup-input-label error"}>
          {label}
          {required && <span className="__signup-input-required">*</span>}
          {adornment}
        </label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input
              maskChar={null}
              mask={mask}
              type={type}
              className={!error ? "__signup-input" : "__signup-input error"}
              id={name}
              placeholder={placeholder}
              autoComplete={autoComplete || "off"}
              onChange={(event) => {
                onChange && onChange(event);
                field.onChange(event.target.value);
              }}
              value={field.value}
              {...restProps}
            />
          )}
        ></Controller>
        <div key="Error"
          class={classNames("__signup-input-error", {
            "__signup-input-error-filled": error,
          })}
        >
          {error && (
            <div key="inputError">
              <ExclamationCircleOutlined className="__signup-input-error-icon" />
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
