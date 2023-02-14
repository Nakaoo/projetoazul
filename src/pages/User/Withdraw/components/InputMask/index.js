import Input from "react-input-mask";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Controller } from "react-hook-form";

export default function InputMask({
  label,
  name,
  placeholder,
  autoComplete,
  mask,
  control,
  onChange,
  error,
  ...restProps
}) {
  return (
    <div key="inputMask" className="__transfer-input-group">
      <label htmlFor={name} className="__transfer-label">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            mask={mask}
            className="__transfer-input"
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
      />
      <div
        key="diverro"
        style={{
          margin: error ? "5px 0 10px" : "0",
          color: "var(--text)",
          display: "block",
          maxHeight: error ? "100px" : "0px",
          transition: "all 0.25s cubic-bezier(0.25, 0.05, 0.36, 1) 0s",
        }}
      >
        {error && (
          <div key="errorMask">
            <ExclamationCircleOutlined
              style={{ color: "var(--danger-color)", margin: "0 10px" }}
            />
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
