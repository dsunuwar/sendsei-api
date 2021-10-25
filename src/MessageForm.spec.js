import React from "react";

import { screen, render, fireEvent, act } from "@testing-library/react";
import MessageForm from "./MessageForm";
import * as service from "./service";

describe("MessageForm", () => {
  it("disables form on invalid submit", async () => {
    render(<MessageForm />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Recipient:"), {
        target: { value: "1233213" },
      });
      fireEvent.change(screen.getByLabelText("Message:"), {
        target: { value: "Hello this is message test" },
      });
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls sendSMS() on submit", async () => {
    jest.spyOn(service, "sendSMS");

    render(<MessageForm />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Recipient:"), {
        target: { value: "1233213" },
      });
      fireEvent.change(screen.getByLabelText("Message:"), {
        target: { value: "He" },
      });
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
      expect(service.sendSMS).toHaveBeenCalledWith(
        "Enterprise",
        "1233213",
        "He"
      );
    });
  });

  it("displays sent messages on successful form submit", () => {
    // use this for testing message display
    // sendSMS.mockImplementation(() => {});
  });
});
