import { memo } from "react";
import { Tooltip } from "./common/tooltip";

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
			<Tooltip
				content={
					<div className="">
						<p className="text-xs">
							{formattedStartDate} - {formattedEndDate}
						</p>
						{/* {index + 1} */}
					</div>
				}
			>
				<div
					title={title}
					className={`${settings.strippedMonth ? "stripped-month" : ""} ${settings.strippedYear ? "stripped-year" : ""} w-4 h-4 border border-gray-300 flex items-center justify-center ${
						isBirthdayWeek
							? `${settings.birthday ? "bg-red-300" : ""}`
							: isNewYearWeek
								? `${settings.yearEnd ? "bg-red-500" : ""}`
								: ""
					} ${monthClasses} ${yearClasses} ${isPast ? "isPast filter grayscale" : ""}`}
				/>
			</Tooltip>
		);
	},
);
