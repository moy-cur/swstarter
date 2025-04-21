import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { ThemeProvider } from "styled-components";
import { MemoryRouter } from "react-router";
import { SearchResponse } from "@/types/api/search";
import { theme } from "@/styles/theme";
import Results from "@/components/Results";

const mockPeopleResults: SearchResponse = [
  {
    id: "1",
    name: "Luke Skywalker",
    height: "188",
    mass: "200",
    hairColor: "blue",
    eyeColor: "red",
    birthYear: "22Y",
    gender: "male",
    films: [{ id: "1", title: "A new hope" }],
    type: "people",
  },
  {
    id: "2",
    name: "Anakin Skywalker",
    height: "188",
    mass: "200",
    hairColor: "blue",
    eyeColor: "red",
    birthYear: "22Y",
    gender: "male",
    films: [{ id: "1", title: "A new hope" }],
    type: "people",
  },
];

const mockMovieResults: SearchResponse = [
  {
    id: "1",
    title: "A New Hope",
    characters: [{ id: "1", name: "Luke Skywalker" }],
    openingCrawl: "",
    type: "films",
  },
  {
    id: "2",
    title: "Empire strikes back",
    characters: [{ id: "1", name: "Luke Skywalker" }],
    openingCrawl: "",
    type: "films",
  },
];

describe("Results component", () => {
  it("should display people correctly", () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Results loading={false} results={mockPeopleResults} />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Anakin Skywalker")).toBeInTheDocument();
  });

  it("should display movies correctly", () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Results loading={false} results={mockMovieResults} />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByText("A New Hope")).toBeInTheDocument();
    expect(screen.getByText("Empire strikes back")).toBeInTheDocument();
  });

  it("should display buttons with correct text", () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Results loading={false} results={mockPeopleResults} />
        </ThemeProvider>
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole("button", { name: /see details/i });
    expect(buttons.length).toBe(2);
  });

  it("should render empty message when no results and not loading", () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Results loading={false} results={[]} />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/there are zero matches/i)).toBeInTheDocument();
    expect(screen.getByText(/use the form to search/i)).toBeInTheDocument();
  });

  it("should show loading message when loading and no results", () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Results loading={true} results={[]} />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/searching/i)).toBeInTheDocument();
  });

  it("should render correct links for results", () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Results loading={false} results={mockPeopleResults} />
        </ThemeProvider>
      </MemoryRouter>
    );
    const peopleLink = screen.getAllByRole("link");
    expect(peopleLink[0].getAttribute("href")).toContain("/detail/people/1");
  });
});
