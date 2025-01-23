import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "../HomePage.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import * as Requests from "@/rest/requests.ts";
import { NewsProps } from "@/components/types.ts";

const mockNews: NewsProps[] = [
  {
    title: "1",
    urlToImage: "1",
    url: "1",
    description: "description1",
  },
];

describe("HomePage", () => {
  it("renders correctly", async () => {
    vi.spyOn(Requests, "getNews").mockResolvedValue(mockNews);
    render(
      <Router>
        <HomePage />
      </Router>,
    );
    await waitFor(() => {
      const news = screen.getByTestId("news1");
      expect(news).toBeInTheDocument();
    });
  });
});
