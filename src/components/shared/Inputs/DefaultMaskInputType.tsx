import { FC, forwardRef, InputHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DefaultMaskInputType, InputType } from "@/components/types.ts";
import styles from "./Input.module.css";
import { IMaskInput } from "react-imask";
import { isRequired } from "@/components/shared/Inputs/lib/isRequired.ts";

interface InputMaskProps extends InputType {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: string;
}

const DefaultMaskInput: FC<
  DefaultMaskInputType & Partial<InputHTMLAttributes<HTMLInputElement>>
> = ({ name, placeholder, className, mask, labelText, ...rest }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, invalid, isDirty } }) => (
        <div className={styles.input__block}>
          <label className={styles.label}>
            <p className={`${isRequired(rest)}`}>{labelText}</p>
            <InputMask
              name={field.name}
              onChange={field.onChange}
              className={`${error && styles.errorInput} ${
                isDirty && !invalid && styles.successInput
              } ${className}`}
              placeholder={placeholder}
              mask={mask}
              required
            />
          </label>
          {error && <div className={styles.errorMessage}>{error.message}</div>}
        </div>
      )}
    />
  );
};

export default DefaultMaskInput;

const InputMask = forwardRef<HTMLInputElement, InputMaskProps>((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask={props.mask}
      required
      inputRef={ref}
      onAccept={(value: string) =>
        onChange({ target: { name: props.name, value } })
      }
      overwrite
    />
  );
});
