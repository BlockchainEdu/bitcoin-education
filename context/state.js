import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [ sharedState, setSharedState ] = useState({
    latitude: 38.5,
    longitude: -99,
    zoom: 3,
    scrollY: 0,
  });

  return (
    <AppContext.Provider value={{sharedState, setSharedState}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
