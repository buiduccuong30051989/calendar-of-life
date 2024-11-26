import {
  addYears,
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
  isAfter,
  isBefore,
  isSameDay,
} from 'date-fns';

export const calculateDateDifferences = (startDate, endDate) => {
	console.log(startDate, endDate);
  const start = new Date(startDate);
  const end = new Date(endDate);
	

  const diffDays = differenceInDays(end, start);
  const diffWeeks = differenceInWeeks(end, start);
	console.log({diffDays, diffWeeks})

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
    birthdays: birthdays,
    holidays: holidays,
  };
};

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
    birthdays: birthdays,
    holidays: holidays,
  };
};

// Tính toán giữa dateOfBirth và dateOfDie
export const dateDifferencesFunc = (dates) =>
	dates.dateOfBirth && dates.dateOfDie
		? calculateDateDifferences(dates.dateOfBirth, dates.dateOfDie)
		: null;

// Tính toán số ngày, tuần, tháng, năm còn lại từ hôm nay đến ngày chết
export const remainingDifferencesFunc = (dates) => dates.dateOfDie
	? calculateRemainingDifferences(dates.dateOfDie)
	: null;
