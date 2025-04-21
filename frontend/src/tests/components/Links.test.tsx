import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import Links from "@components/Links";

describe("Links", () => {
  const people = [
    { id: "1", name: "Luke Skywalker" },
    { id: "2", name: "Leia Organa" },
    { id: "3", name: "Han Solo" },
  ];

  it("should render all items as links with correct labels and paths", () => {
    render(
      <MemoryRouter>
        <Links items={people} type="people" />
      </MemoryRouter>
    );

    people.forEach(({ id, name }) => {
      const link = screen.getByText(name!);
      expect(link).toBeInTheDocument();
      expect(link.getAttribute("href")).toBe(`/detail/people/${id}`);
    });
  });

  it("should add commas between all but the last link", () => {
    render(
      <MemoryRouter>
        <Links items={people} type="people" />
      </MemoryRouter>
    );

    const textContent =
      screen.getByText(/Luke Skywalker/).parentElement!.textContent;
    expect(textContent).toContain("Luke Skywalker, Leia Organa, Han Solo");
    expect(textContent?.endsWith(",")).toBe(false);
  });

  it("should use 'title' when 'name' is not provided", () => {
    const films = [{ id: "10", title: "A New Hope" }];
    render(
      <MemoryRouter>
        <Links items={films} type="films" />
      </MemoryRouter>
    );

    const link = screen.getByText("A New Hope");
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe("/detail/films/10");
  });
});
