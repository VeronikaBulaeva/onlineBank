import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormFields, formSchema } from "@/constants/Schemas.ts";
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

const defaultValues = {
  term: selectOptions[0].value,
  firstName: "",
  lastName: "",
  middleName: null,
  email: "",
  passportSeries: "",
  passportNumber: "",
};

const CustomizeCardForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<FormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: PrescoringFormData) => {
    setIsLoading(true);
    await sendPrescoringForm({
      ...data,
      birthdate: data.birthdate.split("/").reverse().join("-"),
    }).finally(() => setIsLoading(false));
  };

  const amount = methods.watch("amount");

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
              <TextInput
                name="amount"
                required
                placeholder="Select amount"
                className={styles.input}
                labelText="Select amount"
                type="number"
              />
            </div>
          </div>
          <div className={styles.amount__block}>
            <p className={styles.block__title}>You have chosen the amount</p>
            <p className={styles.amount__text}>{amount || "0"} ₽</p>
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
              required
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
