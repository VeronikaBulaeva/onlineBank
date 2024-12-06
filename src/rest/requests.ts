import axios from "axios";
import instance from "@/rest/instance.ts";

export type GetCurrencyType = {
  conversion_rates: Record<string, number>;
};

const getData = async <T>(url: string): Promise<T | undefined> => {
  try {
    const result = await axios.get<T>(url);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrency = async () => {
  const data = await getData<GetCurrencyType>(
    ` https://v6.exchangerate-api.com/v6/63541ba2a3195fa2537793ad/latest/RUB`,
  );
  return data?.conversion_rates;
};

export const sendEmail = async (email: string) => {
  await instance.post("email", { email });
};
