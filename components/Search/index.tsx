/* Note: Thanks to https://blog.logrocket.com/build-react-autocomplete-component/ for the basics. */

import { useMemo, useState } from "react";
import SuggestionsList from "./SuggestionsList";
import styled from 'styled-components';

const StyledInput = styled.input`
  color: black;
`

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
    () => textValue.length > 3 && filteredSuggestions.length > 0,
    [filteredSuggestions, textValue]
  );

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const userInput = event.target.value;
    if (userInput.length > 3) {
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
  const handleKeyboardSelection: React.KeyboardEventHandler<HTMLLIElement> = (
    event
  ) => {
    if (!showSelectionBox) {
      return;
    }
    if (event.key === "ArrowUp") {
      setKeyboardSelectionIndex((index) => Math.max(0, index - 1));
    }
    if (event.key === "ArrowDown") {
      setKeyboardSelectionIndex((index) =>
        Math.min(index + 1, filteredSuggestions.length)
      );
    }
    if (event.key === "Enter") {
      handleSelection(filteredSuggestions[keyboardSelectionIndex])();
    }
  };
  const handleMouseOver = (selectionIndex: number) => (_event?: any) => {
    setKeyboardSelectionIndex(selectionIndex);
  };

  return (
    <>
      <StyledInput type="text" onChange={handleTextChange} />
      <SuggestionsList
        filteredSuggestions={filteredSuggestions}
        keyboardSelectionIndex={keyboardSelectionIndex}
        handleKeyboardSelection={handleKeyboardSelection}
        handleSelection={handleSelection}
        handleMouseOver={handleMouseOver}
      />
    </>
  );
};

export default Search;
