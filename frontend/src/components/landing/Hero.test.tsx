import { render, screen } from "@testing-library/react";
import { test, expect, vi, describe } from "vitest";
import { Hero } from "./Hero";
import { BrowserRouter } from "react-router";

// Mock react-admin (needed for Login component)
const mockUseLogin = vi.fn();
vi.mock("react-admin", () => ({
  useLogin: () => mockUseLogin,
}));

// Mock useNavigate
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("Hero Component", () => {
  test("renders logo with correct alt text", () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>,
    );

    const logo = screen.getByAltText("Corporate Culture Community");
    expect(logo).toBeInTheDocument();
  });

  test("renders main heading text", () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>,
    );

    expect(screen.getByText("Where People & Culture")).toBeInTheDocument();
    expect(screen.getByText("Leaders Connect")).toBeInTheDocument();
  });

  test("renders description paragraph", () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>,
    );

    expect(
      screen.getByText(/Join a thriving community of Office, Workplace/i),
    ).toBeInTheDocument();
  });

  test("renders Login button", () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>,
    );

    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeInTheDocument();
  });

  test("renders Become a Member and Explore Events buttons", () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole("button", { name: /become a member/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /explore events/i }),
    ).toBeInTheDocument();
  });
});
