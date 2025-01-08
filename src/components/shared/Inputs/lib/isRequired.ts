import styles from "@/components/shared/Inputs/Input.module.css";
import { InputHTMLAttributes } from "react";

export const isRequired = (rest: InputHTMLAttributes<HTMLInputElement>) =>
  rest.required ? styles.required : null;
