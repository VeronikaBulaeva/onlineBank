import { FC, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  ApplicationIdFormFields,
  applicationIdFormSchema,
} from "@/constants/Schemas.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Forms.module.css";
import SelectInput from "@/components/shared/Inputs/SelectInput.tsx";
import DefaultMaskInput from "@/components/shared/Inputs/DefaultMaskInputType.tsx";
import DefaultButton from "@/components/shared/DefaultButton/DefaultButton.tsx";
import { ButtonType } from "@/components/shared/DefaultButton/types.ts";
import Loader from "@/components/shared/Loader/Loader.tsx";
import TextInput from "@/components/shared/Inputs/TextInput.tsx";
import {
  employmentStatus,
  gender,
  maritalStatus,
  position,
} from "@/constants/constants.tsx";
import { finishRegistration, getCreditDataById } from "@/rest/requests.ts";
import { useNavigate, useParams } from "react-router-dom";
import useCompareIds from "@/lib/useCompareIds.ts";
import {
  removeApplicationId,
  setCreditOffers,
} from "@/app/store/slices/creditSlice.ts";
import { useAppDispatch } from "@/app/store/hooks.ts";
import TextBlock from "@/components/shared/TextBlock/TextBlock.tsx";
import { HOME_PAGE_ROUTE } from "@/constants/routes.ts";
import useStep from "@/lib/useStep.ts";

const STEP = 2;

const ApplicationIdForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSend, setIsFormSend] = useState(false);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const timeoutId = useRef<NodeJS.Timeout>();
  const navigate = useNavigate();

  const methods = useForm<ApplicationIdFormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(applicationIdFormSchema),
  });

  const onSubmit = async (data: ApplicationIdFormFields) => {
    setIsLoading(true);
    if (id) {
      const response = await finishRegistration(id, {
        gender: data.gender,
        maritalStatus: data.maritalStatus,
        dependentAmount: +data.dependentAmount,
        passportIssueBranch: data.passportIssueBranch,
        passportIssueDate: data.passportIssueDate
          .split("/")
          .reverse()
          .join("-"),
        employment: {
          employmentStatus: data.employmentStatus,
          position: data.position,
          employerINN: data.employerINN,
          salary: +data.salary,
          workExperienceCurrent: +data.workExperienceCurrent,
          workExperienceTotal: +data.workExperienceTotal,
        },
        account: "11223344556677889900",
      }).finally(() => {
        setIsLoading(false);
      });
      if (response.status === 200) {
        setIsFormSend(true);
        timeoutId.current = setTimeout(() => {
          getStatus(id);
        }, 10 * 1000);
      }
    }
  };

  const getStatus = async (dataId: string) => {
    const dataStatus = await getCreditDataById(dataId);
    if (dataStatus.data.status === "CC_DENIED" && id) {
      await dispatch(removeApplicationId(+id));
      navigate(HOME_PAGE_ROUTE);
    }
  };

  useCompareIds(id);

  useStep(STEP, id);

  useEffect(() => {
    return () => {
      clearInterval(timeoutId.current);
    };
  }, []);

  useEffect(() => {
    dispatch(setCreditOffers([]));
  }, [id]);

  return (
    <div className={`${styles.wrapper} ${isFormSend && styles.padding}`}>
      {isFormSend ? (
        <TextBlock
          title="Wait for a decision on the application"
          description="The answer will come to your mail within 10 minutes"
        />
      ) : (
        <FormProvider {...methods}>
          <form
            className={styles.form}
            name="aplicationIdForm"
            noValidate
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            {isLoading && <Loader />}
            <div className={styles.form__top}>
              <div className={styles.form__text}>
                <p className={styles.form__title}>
                  Continuation of the application
                </p>
                <p className={styles.step__text}>Step 2 of 5</p>
              </div>
            </div>
            <div className={styles.top__inputs}>
              <SelectInput
                options={gender}
                name="gender"
                required
                className={styles.input}
                labelText="What's your gender"
              />
              <SelectInput
                options={maritalStatus}
                name="maritalStatus"
                required
                className={styles.input}
                labelText="Your marital status"
              />
              <TextInput
                name="dependentAmount"
                required
                className={styles.input}
                labelText="Your number of dependents"
                type="number"
              />
              <DefaultMaskInput
                name="passportIssueDate"
                required
                placeholder="Select Date and Time"
                className={`${styles.input} ${styles.big}`}
                labelText="Date of issue of the passport"
                mask="00/00/0000"
              />
              <DefaultMaskInput
                name="passportIssueBranch"
                required
                placeholder="000-000"
                className={`${styles.input} ${styles.big}`}
                labelText="Division code"
                mask="000-000"
              />
            </div>
            <div className={styles.form__bottom}>
              <p className={styles.block__title}>Employment</p>
              <div className={styles.bottom__inputs}>
                <SelectInput
                  options={employmentStatus}
                  name="employmentStatus"
                  required
                  className={styles.input}
                  labelText="Your employment status"
                />
                <DefaultMaskInput
                  name="employerINN"
                  required
                  placeholder="000000000000"
                  className={styles.input}
                  labelText="Your employer INN"
                  mask="000000000000"
                />
                <TextInput
                  name="salary"
                  required
                  className={styles.input}
                  labelText="Your salary"
                  placeholder="For example 100 000"
                  type="number"
                />
                <SelectInput
                  options={position}
                  name="position"
                  required
                  className={styles.input}
                  labelText="Your position"
                />
                <TextInput
                  name="workExperienceTotal"
                  required
                  className={styles.input}
                  labelText="Your work experience total"
                  placeholder="For example 10"
                  type="number"
                />
                <TextInput
                  name="workExperienceCurrent"
                  required
                  className={styles.input}
                  labelText="Your work experience current"
                  placeholder="For example 2"
                  type="number"
                />
              </div>
            </div>
            <DefaultButton
              buttonType={ButtonType.button}
              type="submit"
              className={styles.form__button}
              data-testid="submit"
            >
              {isLoading ? "Loading..." : "Continue"}
            </DefaultButton>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default ApplicationIdForm;
