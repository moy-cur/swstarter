import React from "react";

const OpeningCrawl: React.FC<{ text: string }> = ({ text }) => {
  return (
    <>
      {text.split("\r\n").map((line, j) => (
        <React.Fragment key={j}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </>
  );
};

export default OpeningCrawl;
