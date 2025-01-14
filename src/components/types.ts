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
