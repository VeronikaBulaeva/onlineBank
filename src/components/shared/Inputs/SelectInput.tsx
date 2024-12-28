import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styles from "./Input.module.css";
import { SelectInputType } from "@/components/types.ts";

const SelectInput: FC<SelectInputType> = ({
  name,
  className,
  labelText,
  options,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={styles.input__block}>
          <label className={styles.label}>
            {labelText}
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
