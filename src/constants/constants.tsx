import CARD1 from "@/assets/card1.png";
import CARD2 from "@/assets/card2.png";
import CARD3 from "@/assets/card3.png";
import CARD4 from "@/assets/card4.png";

interface CardProps {
  img: string;
  alt: string;
}

export const BASE_URL = "http://localhost:8080/";

export const card: CardProps[] = [
  {
    img: CARD1,
    alt: "design1",
  },
  {
    img: CARD2,
    alt: "design2",
  },
  {
    img: CARD3,
    alt: "design3",
  },
  {
    img: CARD4,
    alt: "design4",
  },
];

export const features = [
  "Powerful online protection",
  "Cashback without borders",
  "Personal design",
  "Work anywhere in the world",
];

export const currency = ["USD", "EUR", "CAD", "CNY", "CHF", "SGD"];

export const footerLinks = [
  {
    link: "",
    title: "About bank",
  },
  {
    link: "",
    title: "Ask a Question",
  },
  {
    link: "",
    title: "Quality of service",
  },
  {
    link: "",
    title: "Requisites",
  },
  {
    link: "",
    title: "Press center",
  },
  {
    link: "",
    title: "Bank career",
  },
  {
    link: "",
    title: "Investors",
  },
  {
    link: "",
    title: "Analytics",
  },
  {
    link: "",
    title: "Business and processes",
  },
  {
    link: "",
    title: "Compliance and business ethics",
  },
] as const;

export const headerLinks = [
  {
    link: "",
    title: "Credit card",
  },
  {
    link: "",
    title: "Product",
  },
  {
    link: "",
    title: "Account",
  },
  {
    link: "",
    title: "Resources",
  },
] as const;
