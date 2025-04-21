import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <StyledTitle onClick={() => navigate("/")}>SWStarter</StyledTitle>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

const StyledTitle = styled.h1`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.greenTeal};
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  cursor: pointer;
`;
