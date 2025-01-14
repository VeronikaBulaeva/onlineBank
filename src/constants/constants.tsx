import CARD1 from "@/assets/card1.png";
import CARD2 from "@/assets/card2.png";
import CARD3 from "@/assets/card3.png";
import CARD4 from "@/assets/card4.png";
import AboutCard1 from "@/assets/aboutCardIcon1.svg";
import AboutCard2 from "@/assets/aboutCardIcon2.svg";
import AboutCard3 from "@/assets/aboutCardIcon3.svg";
import AboutCard4 from "@/assets/aboutCardIcon4.svg";
import AboutCard5 from "@/assets/aboutCardIcon5.svg";
import { CREDIT_CARD_ROUTE } from "@/constants/routes.ts";
import { IAccordion, OptionType } from "@/components/types.ts";

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
    link: CREDIT_CARD_ROUTE,
    title: "Credit card",
  },
  {
    link: "/product",
    title: "Product",
  },
  {
    link: "/account",
    title: "Account",
  },
  {
    link: "/resources",
    title: "Resources",
  },
] as const;

export const featuresCard = [
  {
    title: "Up to 160 days",
    description: "No percent",
    tooltip: "When repaying the full debt up to 160 days",
  },
  {
    title: "Up to 600 000 ₽",
    description: "Credit limit",
    tooltip: "Over the limit willaccrue percent",
  },
  {
    title: "0 ₽",
    description: "Card service is free",
    tooltip: "Promotion valid until December 31, 2022.",
  },
] as const;

export const TABS = [
  {
    id: 1,
    name: "About card",
  },
  {
    id: 2,
    name: "Rates and conditions",
  },
  {
    id: 3,
    name: "Cashback",
  },
  {
    id: 4,
    name: "FAQ",
  },
];

export const aboutCard = [
  {
    img: AboutCard1,
    title: "Up to 50 000 ₽",
    description: "Cash and transfers without commission and percent",
  },
  {
    img: AboutCard2,
    title: "Up to 160 days",
    description: "Without percent on the loan",
  },
  {
    img: AboutCard3,
    title: "Free delivery",
    description:
      "We will deliver your card by courier at a convenient place and time for you",
  },
  {
    img: AboutCard4,
    title: "Up to 12 months",
    description:
      "No percent. For equipment, clothes and other purchases in installments",
  },
  {
    img: AboutCard5,
    title: "Convenient deposit and withdrawal",
    description:
      "At any ATM. Top up your credit card for free with cash or transfer from other cards",
  },
] as const;

export const cashback = [
  {
    title: "For food delivery, cafes and restaurants",
    description: "5%",
  },
  {
    title: "In supermarkets with our subscription",
    description: "5%",
  },
  {
    title: "In clothing stores and children's goods",
    description: "2%",
  },
  {
    title: "Other purchases and payment of services and fines",
    description: "1%",
  },
  {
    title: "Shopping in online stores",
    description: "up to 3%",
  },
  {
    title: "Purchases from our partners",
    description: "30%",
  },
] as const;

export const rates = [
  {
    name: "Card currency",
    description: "Rubles, dollars, euro",
  },
  {
    name: "Interest free period",
    description: "0% up to 160 days",
  },
  {
    name: "Payment system",
    description: "Mastercard, Visa",
  },
  {
    name: "Maximum credit limit on the card",
    description: "600 000 ₽",
  },
  {
    name: "Replenishment and withdrawal",
    description:
      "At any ATM. Top up your credit card for free with cash or transfer from other cards",
  },
  {
    name: "Max cashback per month",
    description: "15 000 ₽",
  },
  {
    name: "Transaction Alert",
    description:
      "60 ₽ — SMS or push notifications \n 0 ₽ — card statement, information about transactions in the online bank",
  },
] as const;

export const faqs: IAccordion[] = [
  {
    id: 1,
    question: "How to get a card?",
    answer:
      "We will deliver your card by courier free of charge. Delivery in Moscow and St. Petersburg - 1-2 working days. For other regions of the Russian Federation - 2-5 working\n" +
      "days.",
  },
  {
    id: 2,
    question:
      "What documents are needed and how old should one be to get a card?",
    answer: "Need a passport. You must be between 20 and 70 years old.",
  },
  {
    id: 3,
    question: "In what currency can I issue a card?",
    answer: "In rubles, dollars or euro",
  },
  {
    id: 4,
    question: "How much income do I need to get a credit card?",
    answer:
      "To obtain a credit card, you will need an income of at least 25,000 rubles per month after taxes.",
  },
  {
    id: 5,
    question: "How do I find out about the bank's decision on my application?",
    answer:
      "After registration, you will receive an e-mail with a decision on your application.",
  },
];

export const faqUsingCard: IAccordion[] = [
  {
    id: 6,
    question: "What is an interest free credit card?",
    answer:
      "A credit card with a grace period is a bank card with an established credit limit, designed for payment, reservation of goods and services, as well as for receiving cash, which allows you to use credit funds free of charge for a certain period.",
  },
  {
    id: 7,
    question: "How to activate a credit card",
    answer:
      "You can activate your credit card and generate a PIN code immediately after receiving the card at a bank branch using a PIN pad.",
  },
  {
    id: 8,
    question: "What is a settlement date?",
    answer:
      "The settlement date is the date from which you can pay off the debt for the reporting period. The settlement date falls on the first calendar day following the last day of the reporting period. The first settlement date is reported by the bank when transferring the issued credit card to the client, and then in the monthly account statement.",
  },
  {
    id: 9,
    question: "What do I need to know about interest rates?",
    answer:
      "For each reporting period from the 7th day of the previous month to the 6th day of the current month inclusive, a statement is generated for the credit card. The statement contains information on the amount and timing of the minimum payment, as well as the total amount of debt as of the date of issue.",
  },
];

export const getCardInfo = [
  {
    id: 1,
    text: "Fill out an online application - you do not need to visit the bank",
  },
  {
    id: 2,
    text: "Find out the bank's decision immediately after filling out the application",
  },
  {
    id: 3,
    text: "The bank will deliver the card free of charge, wherever convenient, to your city",
  },
] as const;

export const selectOptions: OptionType[] = [
  {
    value: 6,
    label: "6 month",
  },
  {
    value: 12,
    label: "12 month",
  },
  {
    value: 18,
    label: "18 month",
  },
  {
    value: 24,
    label: "24 month",
  },
];
