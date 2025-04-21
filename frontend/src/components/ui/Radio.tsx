import React from "react";
import styled from "styled-components";

const Radio: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & { label: string }
> = ({ label, ...props }) => {
  return (
    <RadioGroup>
      <StyledRadio {...props} />
      <label htmlFor={props.id}>{label}</label>
    </RadioGroup>
  );
};

export default Radio;

const RadioGroup = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
`;

const StyledRadio = styled.input.attrs({ type: "radio" })`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid ${({ theme }) => theme.colors.pinkishGray};
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  transition: border-color 0.2s;

  &:checked {
    border: 6px solid #0094ff;
  }

  &:hover {
    border-color: #005fcc;
  }
`;
