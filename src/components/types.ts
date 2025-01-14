import { TableContentType } from "@/components/shared/table/types.ts";

export type GetCurrencyType = {
  conversion_rates: Record<string, number>;
};

export interface NewsProps {
  title: string;
  urlToImage: string;
  url: string;
  description: string;
}

export interface NewsData {
  articles: NewsProps[];
}

export interface IAccordion {
  id: number;
  question: string;
  answer: string;
}

export interface AccordionProps {
  accordions: IAccordion[];
  activeAccordion: IAccordion | null;
  onClick: (accordion: IAccordion) => void;
}

export interface InputType {
  name: string;
  placeholder?: string;
  required: boolean;
  className?: string;
  labelText?: string;
}

export interface OptionType {
  value: string | number;
  label: string;
}

export interface SelectInputType extends InputType {
  options: OptionType[];
}

export interface DefaultMaskInputType extends InputType {
  mask: string;
}

export interface RangeInputType extends InputType {
  min: number;
  max: number;
  amount?: number | string;
}

export type PrescoringFormData = {
  amount: number;
  term: string | number;
  firstName: string;
  lastName: string;
  middleName: string | null;
  email: string;
  birthdate: string;
  passportSeries: string;
  passportNumber: string;
};

export type CreditOfferType = {
  applicationId: number;
  requestedAmount: number;
  totalAmount: number;
  term: number;
  monthlyPayment: number;
  rate: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
};

export type FinishRegistrationBody = {
  gender: string;
  maritalStatus: string;
  dependentAmount: number;
  passportIssueDate: string;
  passportIssueBranch: string;
  employment: {
    employmentStatus: string;
    employerINN: string;
    salary: number;
    position: string;
    workExperienceTotal: number;
    workExperienceCurrent: number;
  };
  account: string;
};

export type Client = PrescoringFormData & FinishRegistrationBody;

export type CreditInfo = {
  id: number;
  client: Client;
  credit: {
    amount: number;
    term: number;
    monthlyPayment: number;
    rate: number;
    psk: number;
    isInsuranceEnabled: true;
    isSalaryClient: true;
    paymentSchedule: TableContentType[];
  };
  status: string;
  creationDate: string;
  signDate: string | null;
  sesCode: string | null;
};
