import { render, screen } from "@testing-library/react";
import OpeningCrawl from "@components/OpeningCrawl";

describe("OpeningCrawl", () => {
  const crawlText = `It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.`;

  it("should render all lines with <br /> between them", () => {
    render(<OpeningCrawl text={crawlText} />);

    const totalLines = crawlText.split("\r\n").length;
    const brs = document.querySelectorAll("br");

    expect(brs.length).toBe(totalLines);
  });

  it("should contains some lines from the text", () => {
    render(<OpeningCrawl text={crawlText} />);
    expect(screen.getByText(/It is a dark time for the/)).toBeInTheDocument();
    expect(
      screen.getByText(/Evading the dreaded Imperial/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Luke Skywalker/)).toBeInTheDocument();
  });
});
