import { render, screen } from "@testing-library/react";

import { test, expect, vi, describe } from "vitest";
import { Login } from "./Login";

const mockUseLogin = vi.fn();
vi.mock("react-admin", () => ({
  useLogin: () => mockUseLogin,
}));

describe("Login Component", () => {
  const mockOnClose = vi.fn();
  const mockOnLogin = vi.fn();

  test("renders login dialog when open", () => {
    render(<Login open={true} onClose={mockOnClose} onLogin={mockOnLogin} />);
    const loginTitle = screen.getByText("Welcome Back");
    const loginText = screen.getByText(
      "Log in to access the venue marketplace and connect with the community.",
    );
    const emailInput = screen.getByPlaceholderText("your.email@company.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginTitle).toBeInTheDocument();
    expect(loginText).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test("does not render dialog when closed", () => {
    render(<Login open={false} onClose={mockOnClose} onLogin={mockOnLogin} />);

    expect(screen.queryByText("Welcome Back")).not.toBeInTheDocument();
  });
});
