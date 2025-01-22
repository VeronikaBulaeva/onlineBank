export interface TableContentType {
  date: string;
  debtPayment: number;
  interestPayment: number;
  number: number;
  remainingDebt: number;
  totalPayment: number;
}

export interface TableType {
  content: TableContentType[];
  columns: string[];
}
