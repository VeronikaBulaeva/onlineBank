import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ApplicationIdForm from "../ApplicationIdForm.tsx";
import { Provider } from "react-redux";
import { store } from "@/app/store/store.ts";
import * as Router from "react-router-dom";
import * as Requests from "@/rest/requests.ts";
import { AxiosResponse } from "axios";
import userEvent from "@testing-library/user-event";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn().mockReturnValue({ id: "1" }),
  };
});

describe("ApplicationIdForm", () => {
  it("Под каждым элементом формы будет выведена ошибка при сабмите и пустых элементах", async () => {
    render(
      <Provider store={store}>
        <Router.BrowserRouter>
          <ApplicationIdForm />
        </Router.BrowserRouter>
      </Provider>,
    );
    const button = screen.getByTestId("submit");
    fireEvent.click(button);
    await waitFor(() => {
      const errors = screen.queryAllByTestId("error");
      expect(errors.length).toEqual(11);
    });
  });

  it("Отправка формы при заполненных полях", async () => {
    const spy = vi.spyOn(Requests, "finishRegistration").mockResolvedValue({
      status: 200,
    } as AxiosResponse);
    vi.spyOn(Requests, "getCreditDataById").mockResolvedValue({
      status: 200,
      data: { status: "CC_APPROVED" },
    } as AxiosResponse);

    render(
      <Provider store={store}>
        <Router.BrowserRouter>
          <ApplicationIdForm />
        </Router.BrowserRouter>
      </Provider>,
    );
    const gender = screen.getByTestId("gender");
    const maritalStatus = screen.getByTestId("maritalStatus");
    const dependentAmount = screen.getByTestId("dependentAmount");
    const passportIssueDate = screen.getByTestId("passportIssueDate");
    const passportIssueBranch = screen.getByTestId("passportIssueBranch");
    const employmentStatus = screen.getByTestId("employmentStatus");
    const employerINN = screen.getByTestId("employerINN");
    const salary = screen.getByTestId("salary");
    const position = screen.getByTestId("position");
    const workExperienceTotal = screen.getByTestId("workExperienceTotal");
    const workExperienceCurrent = screen.getByTestId("workExperienceCurrent");
    await userEvent.selectOptions(gender, ["MALE"]);
    await userEvent.selectOptions(maritalStatus, ["SINGLE"]);
    await userEvent.type(dependentAmount, "1");
    await userEvent.type(passportIssueDate, "11.11.1999");
    await userEvent.type(passportIssueBranch, "111-111");
    await userEvent.selectOptions(employmentStatus, ["UNEMPLOYED"]);
    await userEvent.type(employerINN, "000000000000");
    await userEvent.type(salary, "100000");
    await userEvent.selectOptions(position, ["WORKER"]);
    await userEvent.type(workExperienceTotal, "11");
    await userEvent.type(workExperienceCurrent, "8");
    const button = screen.getByTestId("submit");
    fireEvent.submit(button);
    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
      const success = screen.queryByText(
        "Wait for a decision on the application",
      );
      expect(success).toBeInTheDocument();
    });
  });
});
