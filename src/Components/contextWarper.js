import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

const ContextWrapper = ({ initial, reducer, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initial)}>
      {children}
    </StateContext.Provider>
  );
};
export default ContextWrapper;

export const useStateValue = () => useContext(StateContext);
