import { createContext } from 'react';

export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES"
}

export function storeReducer (state, action) {
  switch(action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return {
        ...state, latLong: action.payload.latLong
      }
    };
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return {
        ...state, coffeeStores: action.payload.coffeeStores
      }
    };
    default: 
    throw new Error(`Unhandle action type: ${action.type}`)
  }
};