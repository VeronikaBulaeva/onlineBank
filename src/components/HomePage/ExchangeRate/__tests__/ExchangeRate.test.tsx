import { describe, expect, it, vi } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import ExchangeRate from "../ExchangeRate.tsx";
import * as Requests from "@/rest/requests.ts";
import * as React from "react";

describe("ExchangeRate", () => {
  it("Тест отрисовки компонента при успешном получении данных", async () => {
    vi.spyOn(Requests, "getCurrency").mockResolvedValueOnce({
      USD: 0.01003,
      EUR: 0.009648,
    });
    render(
      <Router>
        <ExchangeRate />
      </Router>,
    );
    await waitFor(() => {
      const usd = screen.queryByText("USD:");
      const eur = screen.queryByText("EUR:");
      expect(usd).toBeInTheDocument();
      expect(eur).toBeInTheDocument();
    });
  });

  it("Тест отрисовки компонента при ошибке получения данных", async () => {
    vi.spyOn(Requests, "getCurrency").mockResolvedValue(undefined);
    render(
      <Router>
        <ExchangeRate />
      </Router>,
    );
    await waitFor(() => {
      const error = screen.queryByText("Не удалось получить данные");
      expect(error).toBeInTheDocument();
    });
  });
});
