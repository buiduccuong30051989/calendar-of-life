export const DatesCalendar = ({ dates, dateDifferences }) => {
	return (
		<div
			className={"grid grid-cols-7 gap-2 mt-4 "}
		>
			{Array.from({ length: dateDifferences.days }).map((_, index) => {
				const currentDate = new Date(dates.dateOfBirth);
				currentDate.setDate(currentDate.getDate() + index);
				const formattedDate = currentDate.toLocaleDateString();
				const isPast = currentDate < new Date();

				return (
					<div
						key={formattedDate}
						className={`w-32 h-16 border flex items-center justify-center ${
							isPast ? "bg-gray-200" : "border-gray-300"
						}`}
					>
						{formattedDate}
					</div>
				);
			})}
		</div>
	);
};
