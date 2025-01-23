import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Modal from "../Modal.tsx";

describe("Modal", () => {
  it("компонент отображается корректно", () => {
    render(
      <Modal active onClose={vi.fn}>
        <p>pepegio</p>
      </Modal>,
    );

    const text = screen.queryByText("pepegio");
    expect(text).toBeVisible();
  });

  it("по нажатию на кнопку закрытия компонент закрывается", async () => {
    const onClose = vi.fn();

    render(
      <Modal active onClose={onClose}>
        <p>pepegio</p>
      </Modal>,
    );

    const closeButton = screen.getByTestId("close");
    fireEvent.click(closeButton);
    await waitFor(() => {});
    expect(onClose).toHaveBeenCalled();
  });

  it("компонент ничего не отображает", () => {
    render(
      <Modal active={false} onClose={vi.fn}>
        <p>pepegio</p>
      </Modal>,
    );

    const text = screen.queryByText("pepegio");
    expect(text).not.toBeInTheDocument();
  });
});
