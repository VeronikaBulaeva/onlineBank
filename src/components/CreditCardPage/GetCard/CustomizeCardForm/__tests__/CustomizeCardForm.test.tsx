import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/app/store/store.ts";
import * as Router from "react-router-dom";
import CustomizeCardForm from "../CustomizeCardForm.tsx";
import * as Requests from "@/rest/requests.ts";
import { AxiosResponse } from "axios";
import userEvent from "@testing-library/user-event";

describe("CustomizeCardForm", () => {
  it("Под каждым элементом формы будет выведена ошибка при сабмите и пустых элементах", async () => {
    render(
      <Provider store={store}>
        <Router.BrowserRouter>
          <CustomizeCardForm />
        </Router.BrowserRouter>
      </Provider>,
    );
    const button = screen.getByTestId("submit");
    fireEvent.click(button);
    await waitFor(() => {
      const errors = screen.queryAllByTestId("error");
      expect(errors.length).toEqual(6);
    });
  });

  it("Отправка формы при заполненных полях", async () => {
    const spy = vi
      .spyOn(Requests, "sendPrescoringForm")
      .mockResolvedValue({ status: 200 } as AxiosResponse);
    render(
      <Provider store={store}>
        <Router.BrowserRouter>
          <CustomizeCardForm />
        </Router.BrowserRouter>
      </Provider>,
    );
    const lastName = screen.getByTestId("lastName");
    const firstName = screen.getByTestId("firstName");
    const email = screen.getByTestId("email");
    const birthdate = screen.getByTestId("birthdate");
    const passportSeries = screen.getByTestId("passportSeries");
    const passportNumber = screen.getByTestId("passportNumber");

    await userEvent.type(lastName, "Pepega");
    await userEvent.type(firstName, "Olega");
    await userEvent.type(email, "pepegaolega@mail.ru");
    await userEvent.type(birthdate, "11/11/1999");
    await userEvent.type(passportSeries, "0000");
    await userEvent.type(passportNumber, "000000");

    const button = screen.getByTestId("submit");
    fireEvent.submit(button);
    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });
  });
});
