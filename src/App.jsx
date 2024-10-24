import { useState } from "react";
import { DatesCalendar } from "./components/datesCalendar";
import { Sidebar } from "./components/sidebar";
import { WeeksCalendar } from "./components/weeksCalendar";
import { dateDifferencesFunc, remainingDifferencesFunc } from "./utils";

const initSettings = {
	yearEnd: false,
	birthday: false,
	strippedMonth: false,
	strippedYear: false,
};

function App() {
	const [dates, setDates] = useState({
		dateOfBirth: "1989-05-30",
		dateOfDie: "2062-05-30",
	});
	const [settings, setSettings] = useState(initSettings);
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

	const handleChangeSetting = (e) => {
		const { id, value } = e.target;
		setSettings(() => ({
			initSettings,
			[id]: value,
		}));
	};

	if (!dates.dateOfBirth || !dates.dateOfDie)
		return <FormDate dates={dates} handleChange={handleChange} />;

	// - tooltip
	// - should allow custom style
	// - research when print, remove or replace some css color

	return (
		<div className="h-screen w-full flex items-center max-w-[90vw] mx-auto">
			<Sidebar
				handleChange={handleChangeSetting}
				remainingDifferences={remainingDifferences}
			/>

			{dateDifferences && (
				<>
					{showDateCalendar && (
						<DatesCalendar dates={dates} dateDifferences={dateDifferences} />
					)}
					<WeeksCalendar
						settings={settings}
						dates={dates}
						dateDifferences={dateDifferences}
					/>
				</>
			)}
		</div>
	);
}

export default App;
