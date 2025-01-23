import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Table from "@/components/shared/table/Table.tsx";
import { TableContentType } from "@/components/shared/table/types.ts";

const mockContent: TableContentType[] = [
  {
    number: 0,
    date: "11.10.2015",
    debtPayment: 100000,
    interestPayment: 10000,
    remainingDebt: 2000000,
    totalPayment: 30000000,
  },
  {
    number: 1,
    date: "11.11.2015",
    debtPayment: 10000,
    interestPayment: 1000,
    remainingDebt: 200000,
    totalPayment: 30000000,
  },
];

const mockColumns = [
  "number",
  "date",
  "total payment",
  "interest payment",
  "debt payment",
  "remaining debt",
];

describe("Table", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("отрисовка и сортировка таблицы по дате", async () => {
    render(<Table content={[...mockContent]} columns={[...mockColumns]} />);

    const sortButton = screen.getByTestId("date");
    const numbers = screen.queryAllByTestId("contentnumber");
    expect(numbers[0]).toHaveTextContent("0");
    expect(numbers[1]).toHaveTextContent("1");
    fireEvent.click(sortButton);
    await waitFor(() => {
      const sortedNumbers = screen.queryAllByTestId("contentnumber");
      expect(sortedNumbers[0]).toHaveTextContent("1");
      expect(sortedNumbers[1]).toHaveTextContent("0");
    });
    fireEvent.click(sortButton);
    await waitFor(() => {
      const sortedNumbers = screen.queryAllByTestId("contentnumber");
      expect(sortedNumbers[0]).toHaveTextContent("0");
      expect(sortedNumbers[1]).toHaveTextContent("1");
    });
  });

  it("сортировка по колонке с типом number", async () => {
    render(<Table content={[...mockContent]} columns={[...mockColumns]} />);

    const sortButton = screen.getByTestId("interest payment");
    const numbers = screen.queryAllByTestId("contentinterest payment");
    expect(numbers[0]).toHaveTextContent("10000");
    expect(numbers[1]).toHaveTextContent("1000");
    fireEvent.click(sortButton);
    await waitFor(() => {
      const sortedNumbers = screen.queryAllByTestId("contentinterest payment");
      expect(sortedNumbers[0]).toHaveTextContent("1000");
      expect(sortedNumbers[1]).toHaveTextContent("10000");
    });
    fireEvent.click(sortButton);
    await waitFor(() => {
      const sortedNumbers = screen.queryAllByTestId("contentinterest payment");
      expect(sortedNumbers[0]).toHaveTextContent("10000");
      expect(sortedNumbers[1]).toHaveTextContent("1000");
    });
  });
});
