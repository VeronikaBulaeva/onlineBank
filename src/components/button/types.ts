export enum ButtonType {
  link = "link",
  button = "button",
}

export enum ButtonRadius {
  eight = "eight",
  sixteen = "sixteen",
  twenty = "twenty",
  fifty = "fifty",
}

export interface ButtonProps {
  type: ButtonType;
  radius: ButtonRadius;
  className?: string;
  link?: string;
  onClick?: () => void;
  disabled?: boolean;
}
