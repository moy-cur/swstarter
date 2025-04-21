import React, { useState } from "react";
import styled from "styled-components";

import Header from "@components/Header";
import SearchBox from "@components/SearchBox";
import Results from "@components/Results";
import { Film, Person, SearchItem } from "@/types/api/search";

const url = import.meta.env.VITE_API_URL;

const HomePage: React.FC = () => {
  const [results, setResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (type: string, name: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/${type}/${name}`);
      if (!response.ok) {
        throw new Error(`Could not get ${type}`);
      }

      const rawData = await response.json();

      const data: SearchItem[] =
        type === "people"
          ? (rawData as Person[]).map((item) => ({ ...item, type: "people" }))
          : (rawData as Film[]).map((item) => ({ ...item, type: "films" }));

      setResults(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <StyledMain>
        <SearchBox onSearch={handleSearch} loading={loading} />
        <Results results={results} loading={loading} />
      </StyledMain>
    </>
  );
};

export default HomePage;

const StyledMain = styled.main`
  display: flex;
  justify-content: start;
  gap: 2em;
`;
