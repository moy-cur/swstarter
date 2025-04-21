import React from "react";
import styled from "styled-components";

const PrimaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default PrimaryButton;

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.greenTeal};
  color: white;
  border-radius: 20px;
  padding: 8px 20px;
  font-weight: bold;
  border: 1px solid ${({ theme }) => theme.colors.greenTeal};
  cursor: pointer;
  &:disabled {
    background-color: ${({ theme }) => theme.colors.pinkishGray};
    border-color: ${({ theme }) => theme.colors.pinkishGray};
    cursor: default;
  }
`;
