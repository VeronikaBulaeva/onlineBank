import { FC, InputHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InputType } from "@/components/types.ts";
import styles from "./Input.module.css";
import { isRequired } from "@/components/shared/Inputs/lib/isRequired.ts";

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
          <label className={`${styles.label}`}>
            <p className={`${isRequired(rest)}`}>{labelText}</p>
            <input
              data-testid={name}
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
          {error && (
            <div className={styles.errorMessage} data-testid="error">
              {error.message}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default TextInput;
