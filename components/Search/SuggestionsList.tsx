import styled from "styled-components";

interface SuggestionListProps {
  filteredSuggestions: string[];
  keyboardSelectionIndex: number;
  handleKeyboardSelection: React.KeyboardEventHandler<HTMLLIElement>;
  handleMouseOver: (index: number) => React.MouseEventHandler<HTMLLIElement>;
  handleSelection: (selectionName: string) => (_event?: any) => void;
}

const StyledSuggestion = styled.li<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? `#f0f0f0` : `#FFFFFF`)};
  border: 1px solid ${(props) => (props.selected ? `pink` : `blue`)};
  color: black;
  `;

export const SuggestionsList: React.FC<SuggestionListProps> = ({
  filteredSuggestions,
  keyboardSelectionIndex,
  handleKeyboardSelection,
  handleMouseOver,
  handleSelection,
}) => {
  return filteredSuggestions.length ? (
    <ul className="city-options">
      {filteredSuggestions.map((selectionName, index) => (
        <StyledSuggestion
          key={selectionName}
          className={`city-option ${
            keyboardSelectionIndex === index ? "selected" : ""
          }`}
          selected={keyboardSelectionIndex === index}
          onKeyPress={handleKeyboardSelection}
          onMouseOver={handleMouseOver(index)}
          onClick={handleSelection(selectionName)}
        >{selectionName}</StyledSuggestion>
      ))}
    </ul>
  ) : (
    <div className="no-city-options">
      <em>No cities match your input text.</em>
    </div>
  );
};

export default SuggestionsList;
