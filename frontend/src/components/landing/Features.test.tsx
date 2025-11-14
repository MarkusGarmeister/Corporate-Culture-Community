import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import { Features } from "./Features";

describe("Features Component", () => {
  test("renders main heading", () => {
    render(<Features />);

    expect(screen.getByText("What We Offer")).toBeInTheDocument();
  });

  test("renders description text", () => {
    render(<Features />);

    expect(
      screen.getByText(
        /Three pillars that make our community the go-to platform/i,
      ),
    ).toBeInTheDocument();
  });

  test("renders Connect & Exchange feature card", () => {
    render(<Features />);

    expect(screen.getByText("Connect & Exchange")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Network with fellow Office, Workplace, and HR Managers/i,
      ),
    ).toBeInTheDocument();
  });

  test("renders Share & Learn feature card", () => {
    render(<Features />);

    expect(screen.getByText("Share & Learn")).toBeInTheDocument();
    expect(
      screen.getByText(/Access our comprehensive knowledge base/i),
    ).toBeInTheDocument();
  });

  test("renders Event Marketplace feature card", () => {
    render(<Features />);

    expect(screen.getByText("Event Marketplace")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Discover and participate in exclusive community events/i,
      ),
    ).toBeInTheDocument();
  });
});
