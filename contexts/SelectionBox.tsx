/* This is mainly to demonstrate that I also know how to use the Context API */

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type noop = () => void;

export const SelectionBoxStateContext = createContext({
  showSelectionBox: false,
});
export const SelectionBoxDispatchContext = createContext<{setShowSelectionBox: noop | Dispatch<SetStateAction<boolean>>}>({
  setShowSelectionBox: () => {}
});

export const SelectionBoxProvider = ({ children }: { children: ReactNode }) => {
  const [showSelectionBox, setShowSelectionBox] = useState<boolean>(false);
  return (
    <SelectionBoxStateContext.Provider value={{ showSelectionBox }}>
      <SelectionBoxDispatchContext.Provider value={{ setShowSelectionBox }}>
        {children}
      </SelectionBoxDispatchContext.Provider>
    </SelectionBoxStateContext.Provider>
  );
};

export default SelectionBoxProvider;
