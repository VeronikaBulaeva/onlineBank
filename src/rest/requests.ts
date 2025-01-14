import axios from "axios";
import instance from "@/rest/instance.ts";
import {
  CreditInfo,
  CreditOfferType,
  FinishRegistrationBody,
  GetCurrencyType,
  NewsData,
  PrescoringFormData,
} from "@/components/types.ts";

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

export const sendEmail = async (email: string) =>
  await instance.post("email", { email });

export const getNews = async () => {
  const data = await getData<NewsData>(
    `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d1cddbdf0d1a4e36adc123241e087633`,
  );
  return data?.articles;
};

export const sendPrescoringForm = async (data: PrescoringFormData) => {
  return await instance.post<CreditOfferType[]>("application", data);
};

export const selectOffer = async (offer: CreditOfferType) =>
  await instance.post("application/apply", offer);

export const finishRegistration = async (
  id: string,
  data: FinishRegistrationBody,
) => await instance.put(`application/registration/${id}`, data);

export const getCreditDataById = async (id: string) =>
  await instance.get<CreditInfo>(`admin/application/${id}`);

export const createDocument = async (id: string) =>
  await instance.post(`document/${id}`);

export const signDocument = async (id: string) =>
  await instance.post(`document/${id}/sign`);

export const sendSignCode = async (id: string, code: string) =>
  await instance.post(`document/${id}/sign/code`, code, {
    headers: {
      "Content-Type": "application/json",
    },
  });
