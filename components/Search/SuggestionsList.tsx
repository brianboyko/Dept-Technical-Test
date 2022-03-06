import styled from 'styled-components';

const StyledSuggestion = styled.li<{ selected: boolean }>`
  background-color: #ffffff;
  color: black;
  padding: 1rem 0;
  padding-left: 1.5rem;
  font-size: 1.25rem;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const StyledSuggestionList = styled.ul`
  position: absolute;
  left: 0;
  top: 1.5rem;
  width: 100%;

  z-index: 0;
  background-color: white;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  padding: 1rem 0 1rem 0;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 20rem;
  list-style: none;
  box-shadow: 5px 5px 15px -6px #000000;
`;

const StyledNoCities = styled.div`
  position: absolute;
  text-decoration: emphasis;
  width: 100%;
  text-align: center;
  top: 4rem;
`;

interface SuggestionListProps {
  filteredSuggestions: string[];
  keyboardSelectionIndex: number;
  handleSelection: (selectionName: string) => (_event?: any) => void;
}

export const SuggestionsList: React.FC<SuggestionListProps> = ({
  filteredSuggestions,
  keyboardSelectionIndex,
  handleSelection,
}) => {
  const handleKeyDown =
    (selectionName: string): React.KeyboardEventHandler<HTMLLIElement> =>
    (event) => {
      if (event.key === 'Enter') {
        handleSelection(selectionName)();
      }
    };
  return filteredSuggestions.length ? (
    <StyledSuggestionList
      data-cy="styled-selection-list"
      className="city-options"
    >
      {filteredSuggestions.map((selectionName, index) => (
        <StyledSuggestion
          data-cy={`styled-selection-${selectionName}`}
          key={selectionName}
          className={`city-option ${
            keyboardSelectionIndex === index ? 'selected' : ''
          }`}
          selected={keyboardSelectionIndex === index}
          onClick={handleSelection(selectionName)}
          onKeyDown={handleKeyDown(selectionName)}
          tabIndex={0}
        >
          {selectionName}
        </StyledSuggestion>
      ))}
    </StyledSuggestionList>
  ) : (
    <StyledNoCities className={'no-city-options'}>
      No cities match your input text.
    </StyledNoCities>
  );
};

export default SuggestionsList;
