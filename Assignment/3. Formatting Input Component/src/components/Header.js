import styled from "@emotion/styled";

const StyledHeader = styled.h1`
  text-align: center;
`;

export const Header = ({ children }) => {
  return <StyledHeader>{children}</StyledHeader>;
};
