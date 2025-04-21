import React from "react";
import { Link } from "react-router";

type LinksProps = {
  items: { id: string; name?: string; title?: string }[];
  type: string;
};

const Links: React.FC<LinksProps> = ({ items, type }) => {
  return (
    <>
      {items
        .map((item) => {
          const label = item.name || item.title;
          return (
            <Link key={item.id} to={`/detail/${type}/${item.id}`}>
              {label}
            </Link>
          );
        })
        .reduce(
          (acc, curr, idx) => (idx === 0 ? [curr] : [...acc, ", ", curr]),
          [] as React.ReactNode[]
        )}
    </>
  );
};

export default Links;
