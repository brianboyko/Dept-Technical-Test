/* Note: Thanks to https://blog.logrocket.com/build-react-autocomplete-component/ for the basics. */

import { useMemo, useState } from "react";
import SuggestionsList from "./SuggestionsList";
import styled from "styled-components";
import Image from "next/image";

const StyledSearchBox = styled.div`
  display: flex;
  width: 100%;
  z-index: 1000;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  border: 2px solid #f0f0f0;
  box-shadow: 2px 2px 10px -6px #000000;
  background-color: #ffffff;
  &:focus-within {
    border: 2px solid #9999ff;
  }
`;
const StyledInput = styled.input`
  color: black;
  width: 100%;
  left: 0;
  margin-left: 0.5rem;
  top: 0;
  font-size: 1.5rem;
  border: 0;
  &:focus {
    outline: none;
  }
`;

const StyledAutoCompleteContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Search: React.FC<{ listOfCities: string[] }> = ({ listOfCities }) => {
  const [textValue, setTextValue] = useState<string>("");
  const [showSelectionBox, setShowSelectionBox] = useState<boolean>(false);
  const [keyboardSelectionIndex, setKeyboardSelectionIndex] =
    useState<number>(0);

  const filteredSuggestions: string[] = useMemo(() => {
    return listOfCities.filter((city) =>
      city.toLowerCase().includes(textValue.toLowerCase())
    );
  }, [listOfCities, textValue]);

  const showSuggestions: boolean = useMemo(
    () => textValue.length > 0,
    [textValue]
  );

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const userInput = event.target.value;
    if (userInput.length > 0) {
      setShowSelectionBox(true);
    }
    setTextValue(userInput);
  };

  const handleSelection = (selectionName: string) => (_event?: any) => {
    setTextValue(selectionName);
    setShowSelectionBox(false);
    // there will be a callback to a selected cities context here.
    console.log("SELECTED:", selectionName);
  };

  return (
    <StyledAutoCompleteContainer>
      <StyledSearchBox>
        <Image
          width="36px"
          height="36px"
          src="/img/search_black_24dp.svg"
          alt="search icon"
        />
        <StyledInput
          tabIndex={0}
          type="text"
          value={textValue}
          onChange={handleTextChange}
        />
      </StyledSearchBox>
      {showSelectionBox && showSuggestions && (
        <SuggestionsList
          handleSelection={handleSelection}
          filteredSuggestions={filteredSuggestions}
          keyboardSelectionIndex={keyboardSelectionIndex}
        />
      )}
    </StyledAutoCompleteContainer>
  );
};

export default Search;
