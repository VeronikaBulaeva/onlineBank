import { z } from "zod";

const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18));

export const textSchema = z
  .string()
  .min(2, "Значение не должно быть короче 2-х символов")
  .max(30, "Значение не должно быть длиннее 30 символов")
  .regex(/^[-а-яА-ЯёЁa-zA-Z\s]+$/, "Значение должно содержать только буквы")
  .trim();

export const formSchema = z
  .object({
    amount: z.coerce
      .number({ message: "Обязательное поле" })
      .min(1, "Обязательное поле")
      .min(15000, "Минимальная сумма 15 000")
      .max(600000, "Максимальная сумма 600 000"),
    term: z.string().or(z.number()),
    firstName: textSchema,
    lastName: textSchema,
    middleName: textSchema.trim().or(z.string().nullable()),
    email: z.string().email("Проверьте корректность email-адреса").trim(),
    birthdate: z
      .string({ message: "Обязательное поле" })
      .regex(
        /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(\d{4})$/,
        "Введите корректную дату",
      ),
    passportSeries: z
      .string()
      .min(4, "Проверьте корректность серии паспорта")
      .trim(),
    passportNumber: z
      .string()
      .min(6, "Проверьте корректность номера паспорта")
      .trim(),
  })
  .superRefine((arg, ctx) => {
    const [day, month, year] = arg.birthdate.split("/");
    const date = new Date(+year, +month - 1, +day);

    if (date.getTime() > new Date().getTime()) {
      ctx.addIssue({
        message: "Дата не может быть больше сегодняшней",
        path: ["birthdate"],
        code: z.ZodIssueCode.custom,
      });
    }

    if (date.getTime() > maxDate.getTime()) {
      ctx.addIssue({
        message: "Допускаются пользователи старше 18-ти лет",
        path: ["birthdate"],
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type FormFields = z.infer<typeof formSchema>;
