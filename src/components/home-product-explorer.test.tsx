import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HomeProductExplorer } from "./home-product-explorer";

vi.mock("@/components/ProductLogo", () => ({ ProductLogo: () => <span /> }));
afterEach(cleanup);
const renderExplorer = () => render(<MemoryRouter><HomeProductExplorer /></MemoryRouter>);

describe("Home product explorer", () => {
  it("features all five uploaded product repositories", () => {
    renderExplorer();
    for (const name of ["Claude Code", "Codex", "Databricks", "Snowflake AI", "Palantir Foundry AI"]) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", expect.stringContaining("/p/"));
    }
  });

  it("searches the entire catalogue and clears an empty result", () => {
    renderExplorer();
    fireEvent.change(screen.getByRole("textbox", { name: "Find a product" }), { target: { value: "Snowflake" } });
    expect(screen.getByRole("link", { name: "Snowflake AI" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "SAP" })).not.toBeInTheDocument();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "no-such-product" } });
    expect(screen.getByText(/No products match/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(screen.getByRole("link", { name: "SAP" })).toBeInTheDocument();
  });

  it("filters by the shared product family", () => {
    renderExplorer();
    fireEvent.click(screen.getByRole("button", { name: "AI developer tools" }));
    expect(screen.getByRole("button", { name: "AI developer tools" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: "Claude Code" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "SAP" })).not.toBeInTheDocument();
  });
});