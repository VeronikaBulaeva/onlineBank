import axios from "axios";
import instance from "@/rest/instance.ts";
import { getDate } from "@/lib/getDate.ts";
import { GetCurrencyType, NewsData } from "@/components/types.ts";

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

export const getNews = async () => {
  const data = await getData<NewsData>(
    ` https://newsapi.org/v2/everything?q=tesla&from=${getDate()}&sortBy=publishedAt&apiKey=d1cddbdf0d1a4e36adc123241e087633`,
  );
  return data?.articles;
};
