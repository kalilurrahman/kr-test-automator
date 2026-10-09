import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { CatalogueSnapshot } from "./catalogue-snapshot";

afterEach(cleanup);
describe("Catalogue snapshot", () => {
  it("displays measured counts and derives percentages from priority totals", () => {
    render(<MemoryRouter><CatalogueSnapshot stats={{ uniqueIds: 200, lastUpdated: 1791297297548, topPlatforms: [{ name: "SAP", value: 120 }, { name: "Salesforce", value: 80 }], byPriority: [{ name: "High", value: 150 }, { name: "Low", value: 50 }] }} /></MemoryRouter>);
    expect(screen.getByText("120 cases")).toBeInTheDocument();
    expect(screen.getByText("150 · 75%")).toBeInTheDocument();
    expect(screen.getByLabelText("SAP catalogue cases")).toHaveAttribute("value", "120");
    expect(screen.getByText(/not execution results/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Full dashboard" })).toHaveAttribute("href", "/dashboard");
  });
  it("shows no fabricated figures when the snapshot is missing", () => {
    render(<MemoryRouter><CatalogueSnapshot stats={null} /></MemoryRouter>);
    expect(screen.getByRole("status")).toHaveTextContent("unavailable");
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });
  it("handles empty distributions without invalid percentages", () => {
    render(<MemoryRouter><CatalogueSnapshot stats={{ uniqueIds: 0, lastUpdated: 0, topPlatforms: [], byPriority: [] }} /></MemoryRouter>);
    expect(screen.getByText("No priority distribution recorded.")).toBeInTheDocument();
    expect(screen.queryByText(/NaN/)).not.toBeInTheDocument();
  });
});