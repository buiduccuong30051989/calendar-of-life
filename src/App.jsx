import { useState } from "react";
import { DatesCalendar } from "./components/datesCalendar";
import { WeeksCalendar } from "./components/weeksCalendar";
import { dateDifferencesFunc, remainingDifferencesFunc } from "./utils";

function App() {
	const [dates, setDates] = useState({
		dateOfBirth: "1989-05-30",
		dateOfDie: "2062-05-30",
	});
	const [showDateCalendar, setShowDateCalendar] = useState(false);

	const dateDifferences = dateDifferencesFunc(dates);
	const remainingDifferences = remainingDifferencesFunc(dates);

	const handleChange = (e) => {
		const { id, value } = e.target;
		setDates((prevDates) => ({
			...prevDates,
			[id]: value,
		}));
	};

	if (!dates.dateOfBirth || !dates.dateOfDie)
		return <FormDate dates={dates} handleChange={handleChange} />;

	return (
		<div className="h-screen w-full flex items-center max-w-[90vw] mx-auto">
			<div className={`${showDateCalendar ? "" : "hidden"}`}>
				{remainingDifferences && (
					<div>
						<p>Số ngày còn lại: {remainingDifferences.days}</p>
						<p>Số tuần còn lại: {remainingDifferences.weeks}</p>
						<p>Số tháng còn lại: {remainingDifferences.months}</p>
						<p>Số năm còn lại: {remainingDifferences.years}</p>
						<p>Số lần sinh nhật còn lại: {remainingDifferences.birthdays}</p>
						<p>Số lần tết holiday còn lại: {remainingDifferences.holidays}</p>
					</div>
				)}
			</div>
			{dateDifferences && (
				<>
					{showDateCalendar && (
						<DatesCalendar
							dates={dates}
							dateDifferences={dateDifferences}
						/>
					)}
					<WeeksCalendar dates={dates} dateDifferences={dateDifferences} />
				</>
			)}
		</div>
	);
}

export default App;
