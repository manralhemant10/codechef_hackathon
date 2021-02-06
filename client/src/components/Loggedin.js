import React, {createContext, useReducer} from 'react';

const initialState = false;
const isLoggedin = createContext(initialState);
const { Provider } = isLoggedin;

const StateProvider = ( { children } ) => {
  const [loginState, setLoginState] = useReducer((state, action) => {
      const newState = action?false:true
    
  return newState
}, initialState);

  return <Provider value={{ loginState, setLoginState }}>{children}</Provider>;
};

export { isLoggedin, StateProvider }