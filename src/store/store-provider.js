import { useReducer } from 'react';
import { StoreContext, storeReducer } from './store-context';


function StoreProvider({ children }) {
  const initialState = {
    latLong: "",
    coffeeStores: []
  };
  const [state, dispatch] = useReducer(storeReducer, initialState);
    
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;