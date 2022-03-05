/* Note: Thanks to https://blog.logrocket.com/build-react-autocomplete-component/ for the basics. */

import { useMemo, useState, useContext } from "react";
import styled from "styled-components";
import Image from "next/image";
import SuggestionsList from "./SuggestionsList";
import { fetchLatestMeasurements } from "../../store/modules/measurements";
import { useDispatch } from "react-redux";
import {
  SelectionBoxDispatchContext,
  SelectionBoxStateContext,
} from "../../contexts/SelectionBox";

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
  @media (max-width: 864px) {
    width: 24rem;
  }
`;

/* What's going on here? This is one of the "gotchas" of using the Context API
   and one of the reasons I love Redux. Without memoization, the two context
   values here might not change their internals, but the *pointers* to those
   internals *will*.  What that means is that 'setShowSelectionBox(true)' will
   trigger a rerender even if showSelectionBox already equals true.
   
   To combat this, I take the contexts, and put it in a custom hook which
   uses useMemo.  useMemo will only compare the *value* of showSelectionBox
   when deciding if the hook needs to trigger a re-render. 
*/
const useMemoizedSelectionBoxContext = () => {
  const { setShowSelectionBox } = useContext(SelectionBoxDispatchContext);
  const { showSelectionBox } = useContext(SelectionBoxStateContext);
  return useMemo(
    () => ({ setShowSelectionBox, showSelectionBox }),
    [setShowSelectionBox, showSelectionBox]
  );
};

const Search: React.FC<any> = ({ cities }) => {
  const {setShowSelectionBox, showSelectionBox} = useMemoizedSelectionBoxContext();
  const [textValue, setTextValue] = useState<string>("");
  const [keyboardSelectionIndex, setKeyboardSelectionIndex] =
    useState<number>(0);

  const dispatch = useDispatch();

  const filteredSuggestions: string[] = useMemo(() => {
    return cities.filter((city: string) =>
      city.toLowerCase().includes(textValue.toLowerCase())
    );
  }, [cities, textValue]);

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const userInput = event.target.value;
    if (userInput.length > 0) {
      setShowSelectionBox(true);
    } else {
      setShowSelectionBox(false);
    }
    setTextValue(userInput);
  };

  const handleSelection = (selectionName: string) => (_event?: any) => {
    setTextValue(selectionName);
    setShowSelectionBox(false);
    dispatch(fetchLatestMeasurements(selectionName));
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
      {showSelectionBox && (
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
