export const WeeksCalendar = ({ dates, dateDifferences }) => {
	return (
		<div className="grid grid-cols-56 gap-1 mt-4  mx-auto w-fit ">
			{Array.from({ length: dateDifferences.weeks }).map((_, index) => {
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

				return (
					<div
						key={`${formattedStartDate} - ${formattedEndDate}`}
						title={`${formattedStartDate} - ${formattedEndDate}`}
						className={`w-4 h-4 border flex items-center justify-center ${
							isPast
								? "bg-gray-200 hidden"
								: isBirthdayWeek
									? ""
									: isNewYearWeek
										? "bg-gray-300"
										: "border-gray-300"
						}`}
					>
						<div className="hidden">
							<p className="text-xs">
								{formattedStartDate} - {formattedEndDate}
							</p>
							{index + 1}
						</div>
					</div>
				);
			})}
		</div>
	);
};
