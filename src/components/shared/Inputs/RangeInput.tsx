import { FC, InputHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RangeInputType } from "@/components/types.ts";
import styles from "./Input.module.css";
import { isRequired } from "@/components/shared/Inputs/lib/isRequired.ts";

const RangeInput: FC<
  RangeInputType & Partial<InputHTMLAttributes<HTMLInputElement>>
> = ({
  name,
  placeholder,
  className,
  labelText,
  amount,
  min,
  max,
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={styles.input__block}>
          <label className={styles.label}>
            <p className={`${isRequired(rest)}`}>{labelText}</p>
            {amount && <p className={styles.amount}>{amount}</p>}
            <input
              name={field.name}
              onChange={field.onChange}
              className={`${styles.range} ${className}`}
              placeholder={placeholder}
              type="range"
              min={min}
              max={max}
              {...rest}
            />
          </label>
          <div className={styles.range__textBlock}>
            <p className={styles.range__text}>{min.toLocaleString()}</p>
            <p className={styles.range__text}>{max.toLocaleString()}</p>
          </div>
          {error && <div className={styles.errorMessage}>{error.message}</div>}
        </div>
      )}
    />
  );
};

export default RangeInput;
