// NavigationContext.js
import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [showBackButton, setShowBackButton] = useState(false);
  const [handleBack, setHandleBack] = useState(() => () => {});

  return (
    <NavigationContext.Provider value={{ showBackButton, setShowBackButton, handleBack, setHandleBack }}>
      {children}
    </NavigationContext.Provider>
  );
};
