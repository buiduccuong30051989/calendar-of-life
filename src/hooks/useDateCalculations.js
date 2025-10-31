import { useMemo } from 'react';
import { calculateDateDifferences, calculateRemainingDifferences } from '@/utils';

/**
 * Custom hook for calculating date-related statistics
 * @param {Object} dates - Object containing dateOfBirth and dateOfDie
 * @returns {Object} - Object containing date differences and remaining differences
 */
export const useDateCalculations = (dates) => {
  const dateDifferences = useMemo(() => {
    if (!dates.dateOfBirth || !dates.dateOfDie) return null;
    return calculateDateDifferences(dates.dateOfBirth, dates.dateOfDie);
  }, [dates.dateOfBirth, dates.dateOfDie]);

  const remainingDifferences = useMemo(() => {
    if (!dates.dateOfDie) return null;
    return calculateRemainingDifferences(dates.dateOfDie);
  }, [dates.dateOfDie]);

  return {
    dateDifferences,
    remainingDifferences,
  };
};
