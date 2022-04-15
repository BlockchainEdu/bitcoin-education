import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [ sharedState, setSharedState ] = useState({
    latitude: 30.576450,
    longitude: -10.642023,
    zoom: 10,
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
