import PrimaryButton from "@/components/ui/PrimaryButton";
import React from "react";
import { Link } from "react-router";
import styled from "styled-components";

const ErrorPage: React.FC = () => {
  return (
    <Container>
      <h1>Couldn't load page</h1>
      <p>
        There was an error while trying to load the page please try again later.
      </p>
      <Link to="/">
        <PrimaryButton>Go Home</PrimaryButton>
      </Link>
    </Container>
  );
};

export default ErrorPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
