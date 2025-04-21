import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";

import SearchBox from "../../components/SearchBox";

describe("SearchBox", () => {
  let onSearch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onSearch = vi.fn();
  });

  it("should render all fields", () => {
    render(
      <ThemeProvider theme={theme}>
        <SearchBox loading={false} onSearch={onSearch} />
      </ThemeProvider>
    );

    expect(screen.getByText("What are you searching for?")).toBeInTheDocument();
    expect(screen.getByLabelText("People")).toBeInTheDocument();
    expect(screen.getByLabelText("Movies")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("e.g. Chewbacca, Yoda, Boba Fett")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeDisabled();
  });

  it("should enable button when input is filled", async () => {
    render(
      <ThemeProvider theme={theme}>
        <SearchBox loading={false} onSearch={onSearch} />
      </ThemeProvider>
    );
    const user = userEvent.setup();

    const input = screen.getByPlaceholderText(/chewbacca/i);
    await user.type(input, "Yoda");

    expect(screen.getByRole("button", { name: /search/i })).toBeEnabled();
  });

  it("should call onSearch with correct params", async () => {
    render(
      <ThemeProvider theme={theme}>
        <SearchBox loading={false} onSearch={onSearch} />
      </ThemeProvider>
    );
    const user = userEvent.setup();

    const input = screen.getByPlaceholderText(/chewbacca/i);
    await user.type(input, "Yoda");

    const button = screen.getByRole("button", { name: /search/i });
    await user.click(button);

    expect(onSearch).toHaveBeenCalledWith("people", "Yoda");
  });

  it("should switch to films and calls onSearch with type films", async () => {
    render(
      <ThemeProvider theme={theme}>
        <SearchBox loading={false} onSearch={onSearch} />
      </ThemeProvider>
    );
    const user = userEvent.setup();

    await user.click(screen.getByLabelText("Movies"));
    await user.type(screen.getByPlaceholderText(/chewbacca/i), "Hope");

    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(onSearch).toHaveBeenCalledWith("films", "Hope");
  });

  it("should not call onSearch when loading is true", async () => {
    render(
      <ThemeProvider theme={theme}>
        <SearchBox loading={true} onSearch={onSearch} />
      </ThemeProvider>
    );
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/chewbacca/i), "Leia");

    const button = screen.getByRole("button", { name: /searching/i });
    await user.click(button);

    expect(onSearch).not.toHaveBeenCalled();
  });
});
