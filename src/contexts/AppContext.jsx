import { createContext, useContext } from 'react';
import { useDates, useDateCalculations, useSettings } from '@/hooks';

const AppContext = createContext(null);

/**
 * Provider component for application-wide state
 */
export const AppProvider = ({ children, initialDates }) => {
  const dateState = useDates(initialDates);
  const calculations = useDateCalculations(dateState.dates);
  const settings = useSettings();

  const value = {
    // Date state
    ...dateState,
    // Calculations
    ...calculations,
    // Settings
    ...settings,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Custom hook to access app context
 * @returns {Object} - Application context
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
