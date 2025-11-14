import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { test, expect, vi, describe } from "vitest";
import { Signup } from "./Signup";

describe("Signup Component", () => {
  const mockOnClose = vi.fn();
  const mockOnSignup = vi.fn();
  const getElements = () => ({
    //UI Elements
    signupTitle: screen.getByText("Join Our Community"),
    signupText: screen.getByText(
      "Create your account to access the venue marketplace",
    ),
    firstName: screen.getByRole("textbox", { name: "First Name" }),
    lastName: screen.getByRole("textbox", { name: "Last Name" }),
    email: screen.getByRole("textbox", { name: "Email Address" }),
    city: screen.getByRole("textbox", { name: "City" }),
    company: screen.getByRole("textbox", { name: "Company" }),
    workPosition: screen.getByRole("textbox", { name: "Work Position" }),
    departmentDropDown: screen.getByRole("combobox", { name: "Department" }),
    linkedInUrl: screen.getByRole("textbox", { name: "LinkedIn URL" }),
    privacyCheckbox: screen.getByRole("checkbox"),
    privacyLink: screen.getByText("Privacy Policy."),
    signUpButton: screen.getByRole("button", { name: "Sign Up" }),
    cancelButton: screen.getByRole("button", { name: "Cancel" }),
  });
  test("renders signup form when open", () => {
    render(
      <Signup open={true} onClose={mockOnClose} onSignup={mockOnSignup} />,
    );
    const e = getElements();

    expect(e.signupTitle).toBeInTheDocument();
    expect(e.signupText).toBeInTheDocument();
    expect(e.firstName).toBeInTheDocument();
    expect(e.lastName).toBeInTheDocument();
    expect(e.email).toBeInTheDocument();
    expect(e.city).toBeInTheDocument();
    expect(e.company).toBeInTheDocument();
    expect(e.workPosition).toBeInTheDocument();
    expect(e.departmentDropDown).toBeInTheDocument();
    expect(e.linkedInUrl).toBeInTheDocument();
    expect(e.privacyCheckbox).toBeInTheDocument();
    expect(e.privacyLink).toBeInTheDocument();
    expect(e.signUpButton).toBeInTheDocument();
    expect(e.cancelButton).toBeInTheDocument();
  });

  test("does not render signup form when closed", () => {
    render(
      <Signup open={false} onClose={mockOnClose} onSignup={mockOnSignup} />,
    );
    const signupTitle = screen.queryByText("Join Our Community");
    expect(signupTitle).not.toBeInTheDocument();
  });

  test("check department dropdown", async () => {
    render(
      <Signup open={true} onClose={mockOnClose} onSignup={mockOnSignup} />,
    );
    const e = getElements();
    const user = userEvent.setup();
    await user.click(e.departmentDropDown);
    expect(screen.getByText("1. People Operations")).toBeInTheDocument();
    expect(screen.getByText("2. Talent & Growth")).toBeInTheDocument();
    expect(screen.getByText("3. Culture & Engagement")).toBeInTheDocument();
    expect(screen.getByText("4. Workplace & Experience")).toBeInTheDocument();
    expect(screen.getByText("5. Leadership & Strategy")).toBeInTheDocument();
  });

  test("form field gets updated when user types", async () => {
    render(
      <Signup open={true} onClose={mockOnClose} onSignup={mockOnSignup} />,
    );
    const e = getElements();
    const user = userEvent.setup();
    await user.type(e.firstName, "Max");
    expect(e.firstName).toHaveValue("Max");
    await user.type(e.lastName, "Mustermann");
    expect(e.lastName).toHaveValue("Mustermann");
    await user.type(e.email, "max@example.com");
    expect(e.email).toHaveValue("max@example.com");
    await user.type(e.city, "Berlin");
    expect(e.city).toHaveValue("Berlin");
    await user.type(e.company, "CODE University");
    expect(e.company).toHaveValue("CODE University");
    await user.type(e.workPosition, "HR Manager");
    expect(e.workPosition).toHaveValue("HR Manager");
    await user.type(e.linkedInUrl, "https://linkedin.com/in/max");
    expect(e.linkedInUrl).toHaveValue("https://linkedin.com/in/max");
  });
  test("cancel button closes signup form", async () => {
    render(
      <Signup open={true} onClose={mockOnClose} onSignup={mockOnSignup} />,
    );
    const e = getElements();
    const user = userEvent.setup();
    await user.click(e.cancelButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
