import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import styled from 'styled-components';
import MeasurementCard from './MeasurementCard';

const StyledCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100rem;
`;

const MeasurementCards = () => {
  const cards = useSelector((state: RootState) => {
    const sortedLocations = Object.keys(state.measurements.data).sort((a, b) =>
      a.localeCompare(b)
    );
    return sortedLocations.map((location) => state.measurements.data[location]);
  });
  return (
    <StyledCardContainer>
      {cards.map((card) => (
        <MeasurementCard key={card.location} {...card} />
      ))}
    </StyledCardContainer>
  );
};

export default MeasurementCards;
