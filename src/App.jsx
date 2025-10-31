import { Printer, RotateCcw } from 'lucide-react';
import { AppSidebar } from '@/components/app-sidebar';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import { DatesCalendar } from './components/datesCalendar';
import { FormDate } from './components/formDate';
import { Sidebar } from './components/sidebar';
import { WeeksCalendar } from './components/weeksCalendar';
import { AppProvider, useAppContext } from './contexts/AppContext';

/**
 * Main content component
 */
const AppContent = () => {
	const {
		dates,
		handleDateChange,
		resetDates,
		areDatesValid,
		dateDifferences,
		remainingDifferences,
		viewSetting,
		showPastWeeks,
		showDateCalendar,
		handleViewSettingChange,
		togglePastWeeks,
	} = useAppContext();

	const handlePrint = () => {
		window.print();
	};

	if (!areDatesValid) {
		return <FormDate dates={dates} handleChange={handleDateChange} />;
	}

	return (
		<SidebarProvider>
			<AppSidebar
				footer={
					<div className="flex justify-center space-x-4">
						<button
							className="text-3xl px-2 py-2 rounded-sm bg-gray-50"
							type="button"
							onClick={handlePrint}
							aria-label="Print"
						>
							<Printer className="w-4 h-4" />
						</button>
						<button
							className="text-3xl px-2 py-2 rounded-sm bg-gray-50"
							type="button"
							onClick={resetDates}
							aria-label="Reset dates"
						>
							<RotateCcw className="w-4 h-4" />
						</button>
					</div>
				}
			>
				<Sidebar
					handleChange={handleViewSettingChange}
					setShowPastWeeks={togglePastWeeks}
					showPastWeeks={showPastWeeks}
					remainingDifferences={remainingDifferences}
					settings={viewSetting}
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
									Calendar of Life
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>Life Calendar</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</header>
				<div className="flex flex-1">
					<div className="h-screen w-full flex items-center max-w-[90vw] mx-auto absolute top-0 pt-16">
						{dateDifferences && (
							<>
								{showDateCalendar && (
									<DatesCalendar
										dates={dates}
										dateDifferences={dateDifferences}
									/>
								)}
								<WeeksCalendar
									settings={viewSetting}
									dates={dates}
									dateDifferences={dateDifferences}
									showPastWeeks={showPastWeeks}
								/>
							</>
						)}
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

/**
 * App root component
 */
function App() {
	// Initial dates - can be empty or pre-filled for testing
	const initialDates = {
		dateOfBirth: '1989-05-30',
		dateOfDie: '2062-05-30',
		// dateOfBirth: '',
		// dateOfDie: '',
	};

	return (
		<AppProvider initialDates={initialDates}>
			<AppContent />
		</AppProvider>
	);
}

export default App;
