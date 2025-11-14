import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import { CTA } from "./CTA";

describe("CTA Component", () => {
  test("renders main heading", () => {
    render(<CTA />);

    expect(screen.getByText("Ready to Transform Your")).toBeInTheDocument();
    expect(screen.getByText("Professional Journey?")).toBeInTheDocument();
  });

  test("renders description text", () => {
    render(<CTA />);

    expect(
      screen.getByText(
        /Join hundreds of People & Culture professionals who are already part/i,
      ),
    ).toBeInTheDocument();
  });

  test("renders Get Started Now button", () => {
    render(<CTA />);

    const button = screen.getByRole("button", { name: /get started now/i });
    expect(button).toBeInTheDocument();
  });

  test("renders Contact Us button", () => {
    render(<CTA />);

    const button = screen.getByRole("button", { name: /contact us/i });
    expect(button).toBeInTheDocument();
  });
});
