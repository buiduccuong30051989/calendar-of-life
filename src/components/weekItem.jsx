import { memo } from "react";

export const WeekItem = memo(
	({
		title,
		settings,
		isPast,
		isBirthdayWeek,
		monthClasses,
		yearClasses,
		formattedStartDate,
		formattedEndDate,
		isNewYearWeek,
	}) => {
		return (
			<div
				title={title}
				className={`${settings.strippedMonth ? "stripped-month" : ""} ${settings.strippedYear ? "stripped-year" : ""} w-4 h-4 border border-gray-300 flex items-center justify-center ${
					isPast
						? "bg-gray-200 hidden"
						: isBirthdayWeek
							? `${settings.birthday ? "bg-red-300" : ""}`
							: isNewYearWeek
								? `${settings.yearEnd ? "bg-red-500" : ""}`
								: ""
				} ${monthClasses} ${yearClasses}`}
			>
				<div className="hidden">
					<p className="text-xs">
						{formattedStartDate} - {formattedEndDate}
					</p>
					{/* {index + 1} */}
				</div>
			</div>
		);
	},
);
