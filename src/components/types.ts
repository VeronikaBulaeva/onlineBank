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
