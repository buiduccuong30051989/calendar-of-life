import { useState } from "react";

import CogIcon from "./assets/icons/cog-svgrepo-com.svg?react";
import PrintIcon from "./assets/icons/print-svgrepo-com.svg?react";
import { DatesCalendar } from "./components/datesCalendar";
import { Sidebar } from "./components/sidebar";
import { WeeksCalendar } from "./components/weeksCalendar";
import { dateDifferencesFunc, remainingDifferencesFunc } from "./utils";

const initSettingsHighLight = {
	yearEnd: false,
	birthday: false,
	strippedMonth: false,
	strippedYear: false,
};

const initSettingsView = {
	showPastWeeks: false,
};

function App() {
	const [dates, setDates] = useState({
		dateOfBirth: "1989-05-30",
		dateOfDie: "2062-05-30",
	});
	const [settings, setSettings] = useState({
		...initSettingsHighLight,
		...initSettingsView,
	});
	const [openSidebar, setOpenSidebar] = useState(false);
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
		const { id, value, checked, type } = e.target;

		if (type === "radio") {
			setSettings({ ...initSettingsHighLight, [id]: checked });
		} else {
			setSettings((prev) => ({
				...prev,
				[id]: type === "checkbox" ? checked : value,
			}));
		}
	};

	const handlePrint = () => {
		window.print();
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
				settings={settings}
				openSidebar={openSidebar}
			/>
			<div className="toolbar fixed top-0 left-0 flex flex-col space-y-2">
				<button
					className="text-3xl px-2 py-2 rounded-sm"
					type="button"
					onClick={() => setOpenSidebar(!openSidebar)}
				>
					<CogIcon className="w-4 h-4" />
				</button>
				<button
					className="text-3xl px-2 py-2 rounded-sm"
					type="button"
					onClick={handlePrint}
				>
					<PrintIcon className="w-4 h-4" />
				</button>
			</div>

			{dateDifferences && (
				<>
					{showDateCalendar && (
						<DatesCalendar dates={dates} dateDifferences={dateDifferences} />
					)}
					<WeeksCalendar
						settings={settings}
						dates={dates}
						dateDifferences={dateDifferences}
						showPastWeeks={settings.showPastWeeks}
					/>
				</>
			)}
		</div>
	);
}

export default App;
