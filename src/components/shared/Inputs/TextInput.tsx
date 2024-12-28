import { FC, InputHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InputType } from "@/components/types.ts";
import styles from "./Input.module.css";

const TextInput: FC<
  InputType & Partial<InputHTMLAttributes<HTMLInputElement>>
> = ({ name, placeholder, className, labelText, ...rest }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, invalid, isDirty } }) => (
        <div className={styles.input__block}>
          <label className={styles.label}>
            {labelText}
            <input
              name={field.name}
              onChange={field.onChange}
              className={`${
                isDirty && !invalid && styles.successInput
              } ${className}`}
              placeholder={placeholder}
              type={rest.type}
              id={error ? styles.errorInput : "input"}
              {...rest}
            />
          </label>
          {error && <div className={styles.errorMessage}>{error.message}</div>}
        </div>
      )}
    />
  );
};

export default TextInput;
