import {
  addDays,
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  format,
  getMonth,
  getYear,
  isAfter,
  isBefore,
  isSameDay,
  startOfWeek,
} from 'date-fns';

import { WeekItem } from "./weekItem";

export const WeeksCalendar = ({
	dates,
	dateDifferences,
	settings,
	showPastWeeks,
}) => {
	const weeks = Array.from({ length: dateDifferences.weeks }).map((_, index) => {
		const startDate = addWeeks(new Date(dates.dateOfBirth), index);
		const endDate = endOfWeek(startDate, { weekStartsOn: 0 }); // Assuming week starts on Sunday
	
		const formattedStartDate = format(startDate, 'MM/dd/yyyy');
		const formattedEndDate = format(endDate, 'MM/dd/yyyy');
		const isPast = isBefore(endDate, new Date());
	
		// Check if the current week contains the birthday
		const birthday = new Date(dates.dateOfBirth);
		birthday.setFullYear(getYear(startDate));
		const isBirthdayWeek = !isBefore(birthday, startDate) && !isAfter(birthday, endDate);
	
		// Check if the current week contains New Year's Day
		const isNewYearWeek = eachDayOfInterval({ start: startDate, end: endDate }).some(
			(day) => getMonth(day) === 0 && day.getDate() === 1
		);
	
		// Create class for the current month of each week
		const startMonthClass = `month-${getMonth(startDate) + 1} ${
			(getMonth(startDate) + 1) % 2 === 0
				? `${settings.strippedMonth ? 'month-even bg-gray-300' : 'month-even'}`
				: 'month-odd'
		}`;
		const endMonthClass = `month-${getMonth(endDate) + 1}`;
		const monthClasses =
			getMonth(startDate) === getMonth(endDate)
				? startMonthClass
				: `${startMonthClass} ${endMonthClass}`;
	
		// Create class for the current year of each week
		const startYearClass = `year-${getYear(startDate)} ${
			getYear(startDate) % 2 === 0
				? `${settings.strippedYear ? 'year-even bg-gray-400' : 'year-even'}`
				: 'year-odd'
		}`;
		const endYearClass = `year-${getYear(endDate)}`;
		const yearClasses =
			getYear(startDate) === getYear(endDate)
				? startYearClass
				: `${startYearClass} ${endYearClass}`;
	
		return {
			index,
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
	});
	console.log({weeks})

  const filteredWeeks = showPastWeeks ? weeks : weeks.filter(week => !week.isPast);
  console.log({filteredWeeks})

	const rows = [];

  for (let i = 0; i < filteredWeeks.length; i += 56) {
    rows.push(filteredWeeks.slice(i, i + 56));
  }

	return (
		<table className="table-auto mt-4 mx-auto w-fit">
			<tbody>
				{rows.map((row, rowIndex) => (
					<tr key={rowIndex}>
						{row.map((week) => (
							<td key={week.index} className="p-[1px]">
								<WeekItem {...week} />
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};
