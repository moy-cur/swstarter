import React from "react";
import styled from "styled-components";

const InfoColumn: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Body>{children}</Body>
    </Container>
  );
};

export default InfoColumn;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  text-align: justify;
  & a {
    color: #0094ff;
    font-style: none;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Title = styled.div`
  color: black;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  border-bottom: 1px solid ${({ theme }) => theme.colors.pinkishGray};
  text-align: left;
  width: 90%;
  padding: 10px 0;
`;

const Body = styled.div`
  padding: 10px 0;
`;
