import styled from 'styled-components';

const StyledSubheading = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0.5rem 0;
`;

const Subheading = () => (
  <>
    <StyledSubheading>
      Compare the air quality between cities in the UK.
    </StyledSubheading>
    <StyledSubheading>
      Select cities to compare using the search tool below.
    </StyledSubheading>
  </>
);

export default Subheading;
