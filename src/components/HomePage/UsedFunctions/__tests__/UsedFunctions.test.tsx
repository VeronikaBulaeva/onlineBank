import { describe, expect, it } from "vitest";
import UsedFunctions from "../UsedFunctions.tsx";
import { render, screen } from "@testing-library/react";

describe("UsedFunctions", () => {
  it("компонент отображается корректно", () => {
    render(<UsedFunctions />);
    const featuresItem = screen.getByTestId("Powerful online protection");
    expect(featuresItem).toBeInTheDocument();
  });
});
