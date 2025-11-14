import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import { About } from "./About";

describe("About Component", () => {
  test("renders About Us badge", () => {
    render(<About />);

    expect(screen.getByText("About Us")).toBeInTheDocument();
  });

  test("renders main heading", () => {
    render(<About />);

    expect(screen.getByText("Building Bridges in")).toBeInTheDocument();
    expect(screen.getByText("People & Culture")).toBeInTheDocument();
  });

  test("renders first description paragraph", () => {
    render(<About />);

    expect(
      screen.getByText(/Corporate Culture Community is more than just a network/i),
    ).toBeInTheDocument();
  });

  test("renders Learn More About Us button", () => {
    render(<About />);

    const button = screen.getByRole("button", { name: /learn more about us/i });
    expect(button).toBeInTheDocument();
  });

  test("renders all 6 benefit items", () => {
    render(<About />);

    expect(
      screen.getByText(/Connect with like-minded professionals/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Access exclusive resources and industry insights/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Stay updated with the latest People & Culture trends/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Participate in thought-provoking discussions/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Grow your professional network organically/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Learn from real-world experiences and case studies/i),
    ).toBeInTheDocument();
  });
});
