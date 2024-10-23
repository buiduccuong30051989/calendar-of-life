// Hàm để tính toán giữa hai ngày
export const calculateDateDifferences = (startDate, endDate) => {
	const start = new Date(startDate);
	const end = new Date(endDate);
	const diffTime = Math.abs(end - start);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	const diffWeeks = Math.ceil(diffDays / 7);

	// Tính số năm chính xác
	const diffYears = end.getFullYear() - start.getFullYear();
	const isBirthdayPassedThisYear =
		end.getMonth() > start.getMonth() ||
		(end.getMonth() === start.getMonth() && end.getDate() >= start.getDate());
	const exactYears = isBirthdayPassedThisYear ? diffYears : diffYears - 1;

	// Tính số tháng chính xác
	const diffMonths = diffYears * 12 + (end.getMonth() - start.getMonth());
	const exactMonths = isBirthdayPassedThisYear ? diffMonths : diffMonths - 1;

	// Số lần sinh nhật và số lần tết holiday
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

// Hàm để tính toán số ngày, tuần, tháng, năm còn lại từ hôm nay đến ngày chết
export const calculateRemainingDifferences = (endDate) => {
	const start = new Date();
	const end = new Date(endDate);
	const diffTime = Math.abs(end - start);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	const diffWeeks = Math.ceil(diffDays / 7);

	// Tính số năm chính xác
	const diffYears = end.getFullYear() - start.getFullYear();
	const isBirthdayPassedThisYear =
		end.getMonth() > start.getMonth() ||
		(end.getMonth() === start.getMonth() && end.getDate() >= start.getDate());
	const exactYears = isBirthdayPassedThisYear ? diffYears : diffYears - 1;

	// Tính số tháng chính xác
	const diffMonths = diffYears * 12 + (end.getMonth() - start.getMonth());
	const exactMonths = isBirthdayPassedThisYear ? diffMonths : diffMonths - 1;

	// Số lần sinh nhật và số lần tết holiday
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
