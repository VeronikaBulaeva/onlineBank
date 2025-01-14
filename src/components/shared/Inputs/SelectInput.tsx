import { FC, InputHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styles from "./Input.module.css";
import { SelectInputType } from "@/components/types.ts";
import { isRequired } from "@/components/shared/Inputs/lib/isRequired.ts";

const SelectInput: FC<
  SelectInputType & Partial<InputHTMLAttributes<HTMLInputElement>>
> = ({ name, className, labelText, options, ...rest }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={styles.input__block}>
          <label className={styles.label}>
            <p className={`${isRequired(rest)}`}>{labelText}</p>
            <select
              name={field.name}
              id={field.name}
              onChange={field.onChange}
              className={className}
              required
            >
              {options.map(({ label, value }, index) => (
                <option className={styles.option} value={value} key={index}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          {error && <div className={styles.errorMessage}>{error.message}</div>}
        </div>
      )}
    />
  );
};

export default SelectInput;
