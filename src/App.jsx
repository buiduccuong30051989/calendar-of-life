import { Printer, RotateCcw } from "lucide-react";
import { useState } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

import { DatesCalendar } from "./components/datesCalendar";
import { FormDate } from "./components/formDate";
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
		// dateOfBirth: "",
		// dateOfDie: "",
	});
	const [settings, setSettings] = useState({
		...initSettingsHighLight,
		...initSettingsView,
		yearEnd: true,
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

	const handleReset = () => setDates({ dateOfBirth: "", dateOfDie: "" });

	if (!dates.dateOfBirth || !dates.dateOfDie)
		return <FormDate dates={dates} handleChange={handleChange} />;

	return (
		<SidebarProvider>
			<AppSidebar
				footer={
					<div className="flex justify-center space-x-4">
						<button
							className="text-3xl px-2 py-2 rounded-sm bg-gray-50"
							type="button"
							onClick={handlePrint}
						>
							<Printer className="w-4 h-4" />
						</button>
						<button
							className="text-3xl px-2 py-2 rounded-sm bg-gray-50"
							type="button"
							onClick={handleReset}
						>
							<RotateCcw className="w-4 h-4" />
						</button>
					</div>
				}
			>
				<Sidebar
					handleChange={handleChangeSetting}
					remainingDifferences={remainingDifferences}
					settings={settings}
				/>
			</AppSidebar>
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 z-[1]">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="#">
									Building Your Application
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>Data Fetching</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</header>
				<div className="flex flex-1">
					<div className="h-screen w-full flex items-center max-w-[90vw] mx-auto absolute top-0 pt-16">
						{/* <div className="toolbar fixed top-0 left-0 flex flex-col space-y-2">
							<button
								className="text-3xl px-2 py-2 rounded-sm bg-gray-50"
								type="button"
								onClick={() => setOpenSidebar(!openSidebar)}
							>
								<CogIcon className="w-4 h-4" />
							</button>
							<button
								className="text-3xl px-2 py-2 rounded-sm bg-gray-50"
								type="button"
								onClick={handlePrint}
							>
								<PrintIcon className="w-4 h-4" />
							</button>
							<button
								className="text-3xl px-2 py-2 rounded-sm bg-gray-50"
								type="button"
								onClick={handleReset}
							>
								<ResetIcon className="w-4 h-4" />
							</button>
						</div> */}

						{dateDifferences && (
							<>
								{showDateCalendar && (
									<DatesCalendar
										dates={dates}
										dateDifferences={dateDifferences}
									/>
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
				</div>
			</SidebarInset>
		</SidebarProvider>
		// <div className="h-screen w-full flex items-center max-w-[90vw] mx-auto">
		// 	<Sidebar
		// 		handleChange={handleChangeSetting}
		// 		remainingDifferences={remainingDifferences}
		// 		settings={settings}
		// 		openSidebar={openSidebar}
		// 	/>

		// 	<div className="toolbar fixed top-0 left-0 flex flex-col space-y-2">
		// 		<button
		// 			className="text-3xl px-2 py-2 rounded-sm bg-gray-50"
		// 			type="button"
		// 			onClick={() => setOpenSidebar(!openSidebar)}
		// 		>
		// 			<CogIcon className="w-4 h-4" />
		// 		</button>
		// 		<button
		// 			className="text-3xl px-2 py-2 rounded-sm bg-gray-50"
		// 			type="button"
		// 			onClick={handlePrint}
		// 		>
		// 			<PrintIcon className="w-4 h-4" />
		// 		</button>
		// 		<button
		// 			className="text-3xl px-2 py-2 rounded-sm bg-gray-50"
		// 			type="button"
		// 			onClick={handleReset}
		// 		>
		// 			<ResetIcon className="w-4 h-4" />
		// 		</button>
		// 	</div>

		// 	{dateDifferences && (
		// 		<>
		// 			{showDateCalendar && (
		// 				<DatesCalendar dates={dates} dateDifferences={dateDifferences} />
		// 			)}
		// 			<WeeksCalendar
		// 				settings={settings}
		// 				dates={dates}
		// 				dateDifferences={dateDifferences}
		// 				showPastWeeks={settings.showPastWeeks}
		// 			/>
		// 		</>
		// 	)}
		// </div>
	);
}

export default App;
