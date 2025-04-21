import React from "react";
import styled from "styled-components";

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

export default Card;

const StyledCard = styled.div`
  background-color: white;
  height: auto;
  align-self: start;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 ${({ theme }) => theme.colors.warmGray75};
  border: solid 1px ${({ theme }) => theme.colors.gainsbro};
`;
