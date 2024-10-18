import { useState } from "react";

function App() {
	// Tạo state để lưu trữ giá trị của hai input
	const [dates, setDates] = useState({
		dateOfBirth: "",
		dateOfDie: "",
	});

	// Hàm handleChange để cập nhật state khi giá trị của input thay đổi
	const handleChange = (e) => {
		const { id, value } = e.target;
		setDates((prevDates) => ({
			...prevDates,
			[id]: value,
		}));
	};

	// Hàm để tính toán giữa hai ngày
	const calculateDateDifferences = (startDate, endDate) => {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const diffTime = Math.abs(end - start);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		const diffWeeks = Math.ceil(diffDays / 7);

		// Tính số năm chính xác
		const diffYears = end.getFullYear() - start.getFullYear();
		const isBirthdayPassedThisYear =
			end.getMonth() > start.getMonth() ||
			(end.getMonth() === start.getMonth() && end.getDate() >= start.getDate());
		const exactYears = isBirthdayPassedThisYear ? diffYears : diffYears - 1;

		// Tính số tháng chính xác
		const diffMonths = diffYears * 12 + (end.getMonth() - start.getMonth());
		const exactMonths = isBirthdayPassedThisYear ? diffMonths : diffMonths - 1;

		// Số lần sinh nhật và số lần tết holiday
		const birthdays = exactYears;
		const holidays = exactYears; // Assuming one holiday per year

		return {
			days: diffDays,
			weeks: diffWeeks,
			months: exactMonths,
			years: exactYears,
			birthdays: birthdays,
			holidays: holidays,
		};
	};

	// Hàm để tính toán số ngày, tuần, tháng, năm còn lại từ hôm nay đến ngày chết
	const calculateRemainingDifferences = (endDate) => {
		const start = new Date();
		const end = new Date(endDate);
		const diffTime = Math.abs(end - start);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		const diffWeeks = Math.ceil(diffDays / 7);

		// Tính số năm chính xác
		const diffYears = end.getFullYear() - start.getFullYear();
		const isBirthdayPassedThisYear =
			end.getMonth() > start.getMonth() ||
			(end.getMonth() === start.getMonth() && end.getDate() >= start.getDate());
		const exactYears = isBirthdayPassedThisYear ? diffYears : diffYears - 1;

		// Tính số tháng chính xác
		const diffMonths = diffYears * 12 + (end.getMonth() - start.getMonth());
		const exactMonths = isBirthdayPassedThisYear ? diffMonths : diffMonths - 1;

		// Số lần sinh nhật và số lần tết holiday
		const birthdays = exactYears;
		const holidays = exactYears; // Assuming one holiday per year

		return {
			days: diffDays,
			weeks: diffWeeks,
			months: exactMonths,
			years: exactYears,
			birthdays: birthdays,
			holidays: holidays,
		};
	};

	// Tính toán giữa dateOfBirth và dateOfDie
	const dateDifferences =
		dates.dateOfBirth && dates.dateOfDie
			? calculateDateDifferences(dates.dateOfBirth, dates.dateOfDie)
			: null;

	// Tính toán số ngày, tuần, tháng, năm còn lại từ hôm nay đến ngày chết
	const remainingDifferences = dates.dateOfDie
		? calculateRemainingDifferences(dates.dateOfDie)
		: null;

	return (
		<div className="container w-full text-center mx-auto p-4 flex items-center justify-center h-screen">
			<div>
				<h2 className="text-4xl font-bold max-w-[992px]">
					Commodo aute eu adipisicing consequat adipisicing aliquip duis adipisicing aliquip duis.
				</h2>
				<div className="grid grid-cols-2 gap-4 mt-16 max-w-[480px] mx-auto">
					<div>
						<label className="block" htmlFor="dateOfBirth">Date of birth</label>
						<input
							type="date"
							id="dateOfBirth"
							value={dates.dateOfBirth}
							onChange={handleChange}
							className="border p-2 m-2"
						/>
					</div>
					<div>
            <label className="block" htmlFor="dateOfDie">Date of die</label>
						<input
							type="date"
							id="dateOfDie"
							value={dates.dateOfDie}
							onChange={handleChange}
							className="border p-2 m-2"
						/>
					</div>
				</div>
			</div>
		</div>
	);

	// return (
	// 	<div className="p-4">
	// 		{remainingDifferences && (
	// 			<div>
	// 				<p>Số ngày còn lại: {remainingDifferences.days}</p>
	// 				<p>Số tuần còn lại: {remainingDifferences.weeks}</p>
	// 				<p>Số tháng còn lại: {remainingDifferences.months}</p>
	// 				<p>Số năm còn lại: {remainingDifferences.years}</p>
	// 				<p>Số lần sinh nhật còn lại: {remainingDifferences.birthdays}</p>
	// 				<p>Số lần tết holiday còn lại: {remainingDifferences.holidays}</p>
	// 			</div>
	// 		)}
	// 		<div>
	// 			<label htmlFor="dateOfBirth">Date of birth</label>
	// 			<input
	// 				type="date"
	// 				id="dateOfBirth"
	// 				value={dates.dateOfBirth}
	// 				onChange={handleChange}
	// 				className="border p-2 m-2"
	// 			/>
	// 		</div>
	// 		<div>
	// 			<label htmlFor="dateOfDie">Date of die</label>
	// 			<input
	// 				type="date"
	// 				id="dateOfDie"
	// 				value={dates.dateOfDie}
	// 				onChange={handleChange}
	// 				className="border p-2 m-2"
	// 			/>
	// 		</div>
	// 		{dateDifferences && (
	// 			<>
	// 				<div className="grid grid-cols-7 gap-2 mt-4 hidden">
	// 					{Array.from({ length: dateDifferences.days }).map((_, index) => {
	// 						const currentDate = new Date(dates.dateOfBirth);
	// 						currentDate.setDate(currentDate.getDate() + index);
	// 						const formattedDate = currentDate.toLocaleDateString();
	// 						const isPast = currentDate < new Date();

	// 						return (
	// 							<div
	// 								key={index}
	// 								className={`w-32 h-16 border flex items-center justify-center ${
	// 									isPast ? "bg-gray-200" : "border-gray-300"
	// 								}`}
	// 							>
	// 								{formattedDate}
	// 							</div>
	// 						);
	// 					})}
	// 				</div>
	// 				<div className="grid grid-cols-7 gap-2 mt-4">
	// 					{Array.from({ length: dateDifferences.weeks }).map((_, index) => {
	// 						const startDate = new Date(dates.dateOfBirth);
	// 						startDate.setDate(startDate.getDate() + index * 7);
	// 						const endDate = new Date(startDate);
	// 						endDate.setDate(endDate.getDate() + 6);
	// 						const formattedStartDate = startDate.toLocaleDateString();
	// 						const formattedEndDate = endDate.toLocaleDateString();
	// 						const isPast = endDate < new Date();

	// 						// Kiểm tra xem tuần hiện tại có chứa ngày sinh nhật hay không
	// 						const birthday = new Date(dates.dateOfBirth);
	// 						birthday.setFullYear(startDate.getFullYear());
	// 						const isBirthdayWeek =
	// 							startDate <= birthday && birthday <= endDate;

	// 						// Kiểm tra xem tuần hiện tại có chứa ngày đầu năm mới hay không
	// 						let isNewYearWeek = false;
	// 						for (
	// 							let d = new Date(startDate);
	// 							d <= endDate;
	// 							d.setDate(d.getDate() + 1)
	// 						) {
	// 							if (d.getMonth() === 0 && d.getDate() === 1) {
	// 								isNewYearWeek = true;
	// 								break;
	// 							}
	// 						}

	// 						return (
	// 							<div
	// 								key={index}
	// 								className={`w-32 h-16 border flex items-center justify-center ${
	// 									isPast
	// 										? "bg-gray-200"
	// 										: isBirthdayWeek
	// 											? "bg-yellow-200"
	// 											: isNewYearWeek
	// 												? "bg-green-200"
	// 												: "border-gray-300"
	// 								}`}
	// 							>
	// 								{/* <p className="text-xs">{formattedStartDate} - {formattedEndDate}</p> */}
	// 								{index + 1}
	// 							</div>
	// 						);
	// 					})}
	// 				</div>
	// 			</>
	// 		)}
	// 	</div>
	// );
}

export default App;
