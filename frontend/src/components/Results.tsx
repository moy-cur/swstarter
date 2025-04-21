import React from "react";
import styled from "styled-components";

import Card from "@components/ui/Card";
import PrimaryButton from "@components/ui/PrimaryButton";
import { SearchResponse } from "@/types/api/search";
import { Link } from "react-router";

const Results: React.FC<{ loading: boolean; results: SearchResponse }> = ({
  loading,
  results,
}) => {
  return (
    <Card>
      <Content>
        <StyledTitle>Results</StyledTitle>
        {results.length > 0 ? (
          <StyledResults>
            {results.map((result) => (
              <StyledResult
                key={result.type === "people" ? result.name : result.title}
              >
                <span>
                  {result.type === "people" ? result.name : result.title}
                </span>
                <Link to={`/detail/${result.type}/${result.id}`}>
                  <PrimaryButton>SEE DETAILS</PrimaryButton>
                </Link>
              </StyledResult>
            ))}
          </StyledResults>
        ) : (
          <EmptyResults>
            {loading ? (
              <p>Searching...</p>
            ) : (
              <p>
                There are zero matches.
                <br /> Use the form to search for People or Movies.
              </p>
            )}
          </EmptyResults>
        )}
      </Content>
    </Card>
  );
};

export default Results;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 582px;
  height: 582px;
`;

const StyledTitle = styled.div`
  font-weight: bold;
  text-align: left;
  border-bottom: 1px solid ${({ theme }) => theme.colors.pinkishGray};
  padding-bottom: 8px;
`;

const StyledResults = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1px;
  overflow: scroll;
`;

const StyledResult = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.pinkishGray};
  color: black;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;

const EmptyResults = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${({ theme }) => theme.colors.pinkishGray};
  font-weight: bold;
`;
