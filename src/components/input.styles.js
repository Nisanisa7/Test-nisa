import styled from "styled-components";

export const StyledInput = styled.input`
padding: 15px ;
border: 1px solid violet;
color: #adadad;
outline: none
`

export const InputPassword = styled(StyledInput).attrs(({ type }) => ({
  type:  type || "password"
}))`
  align-items: center;
  display: flex;
  margin: 1.5vh 0;
`