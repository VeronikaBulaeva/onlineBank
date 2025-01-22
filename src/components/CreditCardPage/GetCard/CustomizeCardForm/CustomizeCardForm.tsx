import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  CustomizeCardFormFields,
  customizeCardFormSchema,
} from "@/constants/Schemas.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/shared/Inputs/TextInput.tsx";
import styles from "./CustomizeCardForm.module.css";
import SelectInput from "@/components/shared/Inputs/SelectInput.tsx";
import DefaultMaskInput from "@/components/shared/Inputs/DefaultMaskInputType.tsx";
import DefaultButton from "@/components/shared/DefaultButton/DefaultButton.tsx";
import { ButtonType } from "@/components/shared/DefaultButton/types.ts";
import { sendPrescoringForm } from "@/rest/requests.ts";
import Loader from "@/components/shared/Loader/Loader.tsx";
import { selectOptions } from "@/constants/constants.tsx";
import { PrescoringFormData } from "@/components/types.ts";
import RangeInput from "@/components/shared/Inputs/RangeInput.tsx";
import { useAppDispatch } from "@/app/store/hooks.ts";
import { setCreditOffers } from "@/app/store/slices/creditSlice.ts";

const defaultValues = {
  term: selectOptions[0].value,
  firstName: "",
  lastName: "",
  middleName: null,
  email: "",
  passportSeries: "",
  passportNumber: "",
  amount: 150000,
};

const CustomizeCardForm: FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<CustomizeCardFormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(customizeCardFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: PrescoringFormData) => {
    setIsLoading(true);
    const res = await sendPrescoringForm({
      ...data,
      birthdate: data.birthdate.split("/").reverse().join("-"),
    }).finally(() => setIsLoading(false));
    if (res.status === 200) {
      dispatch(setCreditOffers(res.data));
    }
  };

  const amount = methods.watch("amount").toLocaleString();

  const numberWithSpaces = (number: number | string) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.form}
        name="customizeCardForm"
        noValidate
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {isLoading && <Loader />}
        <div className={styles.form__top}>
          <div className={styles.customize__block}>
            <div className={styles.customize__text}>
              <p className={styles.customize__title}>Customize your card</p>
              <p className={styles.step__text}>Step 1 of 5</p>
            </div>
            <div className={styles.input__block}>
              <RangeInput
                name="amount"
                required={false}
                placeholder="Select amount"
                amount={numberWithSpaces(amount)}
                labelText="Select amount"
                min={15000}
                max={600000}
                step={15000}
                defaultValue={150000}
              />
            </div>
          </div>
          <div className={styles.amount__block}>
            <p className={styles.block__title}>You have chosen the amount</p>
            <p className={styles.amount__text}>{numberWithSpaces(amount)} ₽</p>
          </div>
        </div>
        <div className={styles.form__bottom}>
          <p className={styles.block__title}>Contact Information</p>
          <div className={styles.bottom__inputs}>
            <TextInput
              name="lastName"
              required
              placeholder="For Example Doe"
              className={styles.input}
              labelText="Your last name"
            />
            <TextInput
              name="firstName"
              required
              placeholder="For Example Jhon"
              className={styles.input}
              labelText="Your first name"
            />
            <TextInput
              name="middleName"
              required={false}
              placeholder="For Example Victorovich"
              className={styles.input}
              labelText="Your patronymic"
            />
            <SelectInput
              options={selectOptions}
              name="term"
              required
              className={styles.input}
              labelText="Select term"
            />
            <TextInput
              name="email"
              required
              placeholder="test@gmail.com"
              className={styles.input}
              labelText="Your email"
            />
            <DefaultMaskInput
              name="birthdate"
              required
              placeholder="Select Date and Time"
              className={styles.input}
              labelText="Your date of birth"
              mask="00/00/0000"
            />
            <DefaultMaskInput
              name="passportSeries"
              required
              placeholder="0000"
              className={styles.input}
              labelText="Your passport series"
              mask="0000"
            />
            <DefaultMaskInput
              name="passportNumber"
              required
              placeholder="000000"
              className={styles.input}
              labelText="Your passport number"
              mask="000000"
            />
          </div>
        </div>
        <DefaultButton
          buttonType={ButtonType.button}
          type="submit"
          className={styles.form__button}
        >
          {isLoading ? "Loading..." : "Continue"}
        </DefaultButton>
      </form>
    </FormProvider>
  );
};

export default CustomizeCardForm;
