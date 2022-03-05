import { useMemo } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import humanizeTime from '../../utils/humanizeTime';
import parseISO from 'date-fns/parseISO';
import compareAsc from 'date-fns/compareAsc';
import { LocalMeasurement } from '../../store/modules/measurements';
import { useDispatch } from 'react-redux';
import { removeLocation } from '../../store/modules/measurements';

const StyledMeasurementCard = styled.div`
  position: relative;
  background-color: #ffffff;
  padding: 2rem;
  margin: 1.5rem;
  border-radius: 1rem;
  color: black;
  width: 24rem;
  box-shadow: 2px 2px 10px -6px #000000;
`;

const StyledTimeLine = styled.div`
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;
const StyledLocation = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-purple);
`;
const StyledSubLocation = styled.div`
  margin-bottom: 0.5rem;
`;
const StyledValues = styled.div`
  font-weight: 600;
`;
const StyledRemove = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  & > * {
    pointer-events: none;
  }
`;

const MeasurementCard = ({
  location,
  city,
  country,
  measurements,
}: LocalMeasurement) => {
  const dispatch = useDispatch();
  const lastUpdated: string = useMemo(() => {
    const timeUpdated: Date = measurements.reduce((prev: Date, curr) => {
      const currentEntryTime = parseISO(curr.lastUpdated);
      if (compareAsc(currentEntryTime, prev) > 0) {
        return currentEntryTime;
      }
      return prev;
    }, parseISO(measurements[0].lastUpdated));
    const longHumanTime = humanizeTime(timeUpdated);
    return longHumanTime.split(',').slice(0, 2).join(',');
  }, [measurements]);

  const handleDeletion = () => {
    dispatch(removeLocation(location));
  };

  const formattedValues: string = useMemo(() => {
    return measurements
      .map(
        (entry: any) =>
          `${entry.parameter.toUpperCase()}: ${entry.value}${entry.unit}`
      )
      .join(', ');
  }, [measurements]);
  return (
    <StyledMeasurementCard>
      <StyledRemove onClick={handleDeletion}>
        <Image
          width="36px"
          height="36px"
          src="/img/close_black_24dp.svg"
          alt="remove card"
        />
      </StyledRemove>
      <StyledTimeLine>Updated {lastUpdated} ago</StyledTimeLine>
      <StyledLocation>{location}</StyledLocation>
      <StyledSubLocation>
        in {city}, {country === 'GB' ? 'United Kingdom' : country}
      </StyledSubLocation>
      <StyledValues>Values: {formattedValues}</StyledValues>
    </StyledMeasurementCard>
  );
};

export default MeasurementCard;
