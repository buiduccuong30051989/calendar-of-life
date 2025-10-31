import {
  addYears,
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
  isAfter,
  isSameDay,
} from 'date-fns';

/**
 * Calculate date differences between two dates
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date
 * @returns {Object} - Object containing days, weeks, months, years, birthdays, and holidays
 */
export const calculateDateDifferences = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffDays = differenceInDays(end, start);
  const diffWeeks = differenceInWeeks(end, start);

  // Calculate exact years
  const diffYears = differenceInYears(end, start);
  const isBirthdayPassedThisYear = isAfter(end, addYears(start, diffYears)) || isSameDay(end, addYears(start, diffYears));
  const exactYears = isBirthdayPassedThisYear ? diffYears : diffYears - 1;

  // Calculate exact months
  const diffMonths = differenceInMonths(end, start);
  const exactMonths = isBirthdayPassedThisYear ? diffMonths : diffMonths - 1;

  // Number of birthdays and holidays
  const birthdays = exactYears;
  const holidays = exactYears; // Assuming one holiday per year

  return {
    days: diffDays,
    weeks: diffWeeks,
    months: exactMonths,
    years: exactYears,
    birthdays,
    holidays,
  };
};

/**
 * Calculate remaining time from today to a future date
 * @param {string|Date} endDate - End date
 * @returns {Object} - Object containing remaining days, weeks, months, years, birthdays, and holidays
 */
export const calculateRemainingDifferences = (endDate) => {
  const start = new Date();
  const end = new Date(endDate);

  const diffDays = differenceInDays(end, start);
  const diffWeeks = differenceInWeeks(end, start);

  // Calculate exact years
  const diffYears = differenceInYears(end, start);
  const isBirthdayPassedThisYear = isAfter(end, addYears(start, diffYears)) || isSameDay(end, addYears(start, diffYears));
  const exactYears = isBirthdayPassedThisYear ? diffYears : diffYears - 1;

  // Calculate exact months
  const diffMonths = differenceInMonths(end, start);
  const exactMonths = isBirthdayPassedThisYear ? diffMonths : diffMonths - 1;

  // Number of birthdays and holidays
  const birthdays = exactYears;
  const holidays = exactYears; // Assuming one holiday per year

  return {
    days: diffDays,
    weeks: diffWeeks,
    months: exactMonths,
    years: exactYears,
    birthdays,
    holidays,
  };
};

// Export week calculations
export * from './weekCalculations';
