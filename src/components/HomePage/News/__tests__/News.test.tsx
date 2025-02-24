import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NewsProps } from "@/components/types.ts";
import { BrowserRouter as Router } from "react-router-dom";
import News from "@/components/HomePage/News/News.tsx";
import React from "react";

const mockNews: NewsProps[] = [
  {
    title: "1",
    urlToImage: "1",
    url: "1",
    description: "description1",
  },
  {
    title: "2",
    urlToImage: "2",
    url: "2",
    description: "description2",
  },
  {
    title: "3",
    urlToImage: "3",
    url: "3",
    description: "description3",
  },
  {
    title: "4",
    urlToImage: "4",
    url: "4",
    description: "description4",
  },
  {
    title: "5",
    urlToImage: "5",
    url: "5",
    description: "description5",
  },
  {
    title: "6",
    urlToImage: "6",
    url: "6",
    description: "description6",
  },
];

describe("News", () => {
  it("Отрисовка компонента при наличии новостей", async () => {
    render(
      <Router>
        <News articles={mockNews} />
      </Router>,
    );
    const prev = screen.queryByTestId("prev-slide");
    const next = screen.queryByTestId("next-slide");
    expect(prev).toHaveAttribute("disabled");
    expect(next).not.toHaveAttribute("disabled");
    if (next) {
      fireEvent.click(next);
    }
    await waitFor(() => {
      expect(prev).not.toHaveAttribute("disabled");
      expect(next).not.toHaveAttribute("disabled");
    });
  });

  it("Отрисовка компонента без новостей", async () => {
    render(
      <Router>
        <News articles={[]} />
      </Router>,
    );
    await waitFor(() => {
      const noNews = screen.queryByText("Пока новостей нет(");
      expect(noNews).toBeInTheDocument();
    });
  });
});
