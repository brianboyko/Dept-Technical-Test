import styled from 'styled-components';

const StyledHeading = styled.h1`
  font-size: 3rem;
  font-weight: 600;
`;

const Heading = () => (
  <StyledHeading data-cy="styled-heading">Compare your Air</StyledHeading>
);

export default Heading;
