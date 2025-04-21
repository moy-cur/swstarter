import React from "react";
import styled from "styled-components";

const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return <StyledInput {...props} />;
};

export default TextInput;

const StyledInput = styled.input`
  padding: 11px;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px 0 ${({ theme }) => theme.colors.warmGray75};
  border: solid 1px ${({ theme }) => theme.colors.pinkishGray};
  background-color: #fff;
  color: black;

  &::placeholder {
    font-family: Montserrat;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: ${({ theme }) => theme.colors.pinkishGray};
  }

  &:focus {
    border: 1px solid red;
  }
`;
