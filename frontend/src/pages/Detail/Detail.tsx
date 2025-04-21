import React, { Suspense } from "react";
import styled from "styled-components";
import { Await, Link, LoaderFunctionArgs, useLoaderData } from "react-router";

import Card from "@components/ui/Card";
import InfoColumn from "@components/InfoColumn";
import PrimaryButton from "@components/ui/PrimaryButton";
import { SearchItem } from "@/types/api/search";
import PersonDetails from "@components/PersonDetails";
import OpeningCrawl from "@components/OpeningCrawl";
import Links from "@components/Links";

const url = import.meta.env.VITE_API_URL;

const DetailPage: React.FC = () => {
  const { dataPromise } = useLoaderData();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={dataPromise}>
        {(data) => {
          const isPerson = data?.type === "people";
          return (
            <Card>
              <Container>
                <Title>{isPerson ? data?.name : data?.title}</Title>
                <ColumnsContainer>
                  <InfoColumn title={isPerson ? "Details" : "Opening Crawl"}>
                    <StyledInfo>
                      {isPerson ? (
                        <PersonDetails data={data} />
                      ) : (
                        <OpeningCrawl text={data?.openingCrawl || ""} />
                      )}
                    </StyledInfo>
                  </InfoColumn>
                  <InfoColumn title={isPerson ? "Movies" : "Characters"}>
                    {isPerson ? (
                      <Links type={"films"} items={data?.films || []} />
                    ) : (
                      <Links type={"people"} items={data?.characters || []} />
                    )}
                  </InfoColumn>
                </ColumnsContainer>

                <Link to="/">
                  <PrimaryButton>BACK TO SEARCH</PrimaryButton>
                </Link>
              </Container>
            </Card>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default DetailPage;

const loadDetails = async ({ params }: LoaderFunctionArgs) => {
  const type = params.type;
  const id = params.id;

  const response = await fetch(`${url}/${type}/detail/${id}`);

  if (!response.ok) {
    throw new Error("Could not get detail");
  }
  const rawData: SearchItem = await response.json();

  const data = { ...rawData, type };

  return data;
};

export const Loader = async ({ params }: LoaderFunctionArgs) => {
  return { dataPromise: loadDetails({ params } as LoaderFunctionArgs) };
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 804px;
  min-height: 418px;
`;

const Title = styled.h1`
  font-size: 18px;
  text-align: left;
`;

const ColumnsContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  width: 100%;
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  & p {
    margin: 0;
  }
`;
