import { WeekItem } from "./weekItem";

export const WeeksCalendar = ({
	dates,
	dateDifferences,
	settings,
	showPastWeeks,
}) => {
	const weeks = Array.from({ length: dateDifferences.weeks }).map(
		(_, index) => {
			const startDate = new Date(dates.dateOfBirth);
			startDate.setDate(startDate.getDate() + index * 7);
			const endDate = new Date(startDate);
			endDate.setDate(endDate.getDate() + 6);
			const formattedStartDate = startDate.toLocaleDateString();
			const formattedEndDate = endDate.toLocaleDateString();
			const isPast = endDate < new Date();

			// Kiểm tra xem tuần hiện tại có chứa ngày sinh nhật hay không
			const birthday = new Date(dates.dateOfBirth);
			birthday.setFullYear(startDate.getFullYear());
			const isBirthdayWeek = startDate <= birthday && birthday <= endDate;

			// Kiểm tra xem tuần hiện tại có chứa ngày đầu năm mới hay không
			let isNewYearWeek = false;
			for (
				let d = new Date(startDate);
				d <= endDate;
				d.setDate(d.getDate() + 1)
			) {
				if (d.getMonth() === 0 && d.getDate() === 1) {
					isNewYearWeek = true;
					break;
				}
			}

			// Tạo class cho tháng hiện tại của từng tuần
			const startMonthClass = `month-${startDate.getMonth() + 1} ${(startDate.getMonth() + 1) % 2 === 0 ? `${settings.strippedMonth ? "month-even bg-gray-300" : "month-even"}` : "month-odd"}`;
			const endMonthClass = `month-${endDate.getMonth() + 1}`;
			const monthClasses =
				startDate.getMonth() === endDate.getMonth()
					? startMonthClass
					: `${startMonthClass} ${endMonthClass}`;

			// Tạo class cho năm hiện tại của từng tuần
			const startYearClass = `year-${startDate.getFullYear()} ${startDate.getFullYear() % 2 === 0 ? `${settings.strippedYear ? "year-even bg-gray-400" : "year-even"}` : "year-odd"}`;
			const endYearClass = `year-${endDate.getFullYear()}`;
			const yearClasses =
				startDate.getFullYear() === endDate.getFullYear()
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
		},
	);

  const filteredWeeks = showPastWeeks ? weeks : weeks.filter(week => !week.isPast);
  console.log(showPastWeeks, filteredWeeks)

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
