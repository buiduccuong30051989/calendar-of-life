import { useState, useCallback } from 'react';

/**
 * Custom hook for managing date state
 * @param {Object} initialDates - Initial date values
 * @returns {Object} - Dates state and handlers
 */
export const useDates = (initialDates = { dateOfBirth: '', dateOfDie: '' }) => {
  const [dates, setDates] = useState(initialDates);

  const handleDateChange = useCallback(({ id, value }) => {
    setDates((prevDates) => ({
      ...prevDates,
      [id]: value,
    }));
  }, []);

  const resetDates = useCallback(() => {
    setDates({ dateOfBirth: '', dateOfDie: '' });
  }, []);

  const areDatesValid = dates.dateOfBirth && dates.dateOfDie;

  return {
    dates,
    handleDateChange,
    resetDates,
    areDatesValid,
  };
};
