import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [ sharedState, setSharedState ] = useState({
    latitude: 25.933347,
    longitude: -9.586631,
    zoom: 1.5,
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
