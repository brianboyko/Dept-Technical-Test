import styled from "styled-components";
import Heading from "./Heading";
import Subheading from "./Subheading";

const StyledHeaderContainer = styled.section`
  text-align: center;
  margin-top: 6rem;
  margin-bottom: 4rem;
`;

const Header = () => (
  <StyledHeaderContainer>
    <Heading />
    <Subheading />
  </StyledHeaderContainer>
);
export default Header;
