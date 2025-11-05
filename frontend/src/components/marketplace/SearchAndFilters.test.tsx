import { render, screen } from "@testing-library/react";
import { SearchAndFilters } from "./SearchAndFilters";
import { test, expect } from "vitest";

test("renders search input", () => {
  render(<SearchAndFilters searchQuery="" onSearchChange={() => {}} />);
  expect(
    screen.getByPlaceholderText("Search venues by name, city, or address..."),
  ).toBeInTheDocument();
});

test("renders search input", () => {
  render(<SearchAndFilters searchQuery="test" onSearchChange={() => {}} />);
  expect(screen.getByDisplayValue("test")).toBeInTheDocument();
});
