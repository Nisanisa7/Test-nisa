import React from "react";
import styled from "styled-components";

const Button = ({ children, isDisabled, onClick, className, variant }) => {
  return (
    <StyledButton disabled={isDisabled} onClick={onClick} variant={variant} className={className}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  box-sizing: border-box;
  border-radius: 3px;
  margin: 1em;
  font-size: 1em;
  padding: 0.25em 1em;
 
  &.shine{
    background: #ffba33;
    color: #6a4029;
  }
  &.warning{
    background: red;
    color: #6a4029;
  }
  &.primary{
    background: cyan;
    color: #6a4029;
  }

`;
