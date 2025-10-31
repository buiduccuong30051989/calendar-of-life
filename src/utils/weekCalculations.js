import {
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  format,
  getMonth,
  getYear,
  isAfter,
  isBefore,
} from 'date-fns';
import { APP_CONFIG, VIEW_SETTINGS, CSS_CLASSES } from '@/constants';

/**
 * Check if a week contains a specific date (e.g., birthday)
 * @param {Date} startDate - Start of the week
 * @param {Date} endDate - End of the week
 * @param {Date} targetDate - Date to check for
 * @returns {boolean}
 */
export const isDateInWeek = (startDate, endDate, targetDate) => {
  const adjustedTarget = new Date(targetDate);
  adjustedTarget.setFullYear(getYear(startDate));
  return !isBefore(adjustedTarget, startDate) && !isAfter(adjustedTarget, endDate);
};

/**
 * Check if a week contains New Year's Day
 * @param {Date} startDate - Start of the week
 * @param {Date} endDate - End of the week
 * @returns {boolean}
 */
export const isNewYearInWeek = (startDate, endDate) => {
  return eachDayOfInterval({ start: startDate, end: endDate }).some(
    (day) => getMonth(day) === 0 && day.getDate() === 1
  );
};

/**
 * Generate CSS classes for month-based styling
 * @param {Date} startDate - Start of the week
 * @param {Date} endDate - End of the week
 * @param {string} settings - Current view setting
 * @returns {string}
 */
export const getMonthClasses = (startDate, endDate, settings) => {
  const startMonth = getMonth(startDate);
  const endMonth = getMonth(endDate);

  const startMonthClass = `month-${startMonth + 1} ${
    (startMonth + 1) % 2 === 0
      ? `${settings === VIEW_SETTINGS.STRIPPED_MONTH ? CSS_CLASSES.MONTH_EVEN : 'month-even'}`
      : 'month-odd'
  }`;

  const endMonthClass = `month-${endMonth + 1}`;

  return startMonth === endMonth
    ? startMonthClass
    : `${startMonthClass} ${endMonthClass}`;
};

/**
 * Generate CSS classes for year-based styling
 * @param {Date} startDate - Start of the week
 * @param {Date} endDate - End of the week
 * @param {string} settings - Current view setting
 * @returns {string}
 */
export const getYearClasses = (startDate, endDate, settings) => {
  const startYear = getYear(startDate);
  const endYear = getYear(endDate);

  const startYearClass = `year-${startYear} ${
    startYear % 2 === 0
      ? `${settings === VIEW_SETTINGS.STRIPPED_YEAR ? CSS_CLASSES.YEAR_EVEN : 'year-even'}`
      : 'year-odd'
  }`;

  const endYearClass = `year-${endYear}`;

  return startYear === endYear
    ? startYearClass
    : `${startYearClass} ${endYearClass}`;
};

/**
 * Calculate week data for a single week
 * @param {Date} birthDate - Date of birth
 * @param {number} weekIndex - Week number (0-based)
 * @param {string} settings - Current view setting
 * @returns {Object} - Week data object
 */
export const calculateWeekData = (birthDate, weekIndex, settings) => {
  const startDate = addWeeks(new Date(birthDate), weekIndex);
  const endDate = endOfWeek(startDate, { weekStartsOn: APP_CONFIG.WEEK_STARTS_ON });

  const formattedStartDate = format(startDate, 'MM/dd/yyyy');
  const formattedEndDate = format(endDate, 'MM/dd/yyyy');
  const isPast = isBefore(endDate, new Date());

  const isBirthdayWeek = isDateInWeek(startDate, endDate, birthDate);
  const isNewYearWeek = isNewYearInWeek(startDate, endDate);

  const monthClasses = getMonthClasses(startDate, endDate, settings);
  const yearClasses = getYearClasses(startDate, endDate, settings);

  return {
    index: weekIndex,
    title: `${formattedStartDate} - ${formattedEndDate}`,
    settings,
    isPast,
    isBirthdayWeek,
    isNewYearWeek,
    monthClasses,
    yearClasses,
    formattedStartDate,
    formattedEndDate,
  };
};

/**
 * Generate all weeks data
 * @param {Date} birthDate - Date of birth
 * @param {number} totalWeeks - Total number of weeks
 * @param {string} settings - Current view setting
 * @returns {Array} - Array of week data objects
 */
export const generateWeeksData = (birthDate, totalWeeks, settings) => {
  return Array.from({ length: totalWeeks }, (_, index) =>
    calculateWeekData(birthDate, index, settings)
  );
};

/**
 * Filter weeks based on showPast setting
 * @param {Array} weeks - Array of week data
 * @param {boolean} showPastWeeks - Whether to show past weeks
 * @returns {Array} - Filtered weeks array
 */
export const filterWeeks = (weeks, showPastWeeks) => {
  return showPastWeeks ? weeks : weeks.filter((week) => !week.isPast);
};

/**
 * Split weeks into rows for table display
 * @param {Array} weeks - Array of week data
 * @param {number} weeksPerRow - Number of weeks per row
 * @returns {Array} - 2D array of weeks organized by rows
 */
export const splitWeeksIntoRows = (weeks, weeksPerRow = APP_CONFIG.WEEKS_PER_ROW) => {
  const rows = [];
  for (let i = 0; i < weeks.length; i += weeksPerRow) {
    rows.push(weeks.slice(i, i + weeksPerRow));
  }
  return rows;
};
