export const Sidebar = ({
	handleChange,
	remainingDifferences,
	settings,
	openSidebar,
}) => {
	return (
		<div className={`sidebar ${openSidebar ? "open" : ""} `}>
			<h2 className="block text-center text-2xl font-bold mb-8">
				Customization
			</h2>

			<div className="flex items-center mb-4">
				<input
					id="yearEnd"
					type="radio"
					name="selection"
					className="form-radio h-5 w-5 text-blue-600"
					onChange={handleChange}
					checked={settings.yearEnd}
				/>
				<label
					htmlFor="yearEnd"
					className="ml-2 text-gray-700 select-none cursor-pointer"
				>
					Year End
				</label>
			</div>

			<div className="flex items-center mb-4">
				<input
					id="birthday"
					type="radio"
					name="selection"
					className="form-radio h-5 w-5 text-blue-600"
					onChange={handleChange}
					checked={settings.birthday}
				/>
				<label
					htmlFor="birthday"
					className="ml-2 text-gray-700 select-none cursor-pointer"
				>
					BirthDay
				</label>
			</div>

			<div className="flex items-center mb-4">
				<input
					id="strippedMonth"
					type="radio"
					name="selection"
					className="form-radio h-5 w-5 text-blue-600"
					onChange={handleChange}
					checked={settings.strippedMonth}
				/>
				<label
					htmlFor="strippedMonth"
					className="ml-2 text-gray-700 select-none cursor-pointer"
				>
					Stripped Month
				</label>
			</div>

			<div className="flex items-center mb-4">
				<input
					id="strippedYear"
					type="radio"
					name="selection"
					className="form-radio h-5 w-5 text-blue-600"
					onChange={handleChange}
					checked={settings.strippedYear}
				/>
				<label
					htmlFor="strippedYear"
					className="ml-2 text-gray-700 select-none cursor-pointer"
				>
					Stripped Year
				</label>
			</div>

			<div className="flex items-center mb-4">
				<input
					id="showPastWeeks"
					type="checkbox"
					name="showPastWeeks"
					className="form-radio h-5 w-5 text-blue-600"
					onChange={handleChange}
					checked={settings.showPastWeeks}
				/>
				<label
					htmlFor="showPastWeeks"
					className="ml-2 text-gray-700 select-none cursor-pointer"
				>
					Show Past Weeks
				</label>
			</div>

			<div className="border-t border-gray-300 my-8" />

			<div>
				{remainingDifferences && (
					<div className="space-y-4">
						<p>Số ngày còn lại: {remainingDifferences.days}</p>
						<p>Số tuần còn lại: {remainingDifferences.weeks}</p>
						<p>Số tháng còn lại: {remainingDifferences.months}</p>
						<p>Số năm còn lại: {remainingDifferences.years}</p>
						<p>Số lần sinh nhật còn lại: {remainingDifferences.birthdays}</p>
						<p>Số lần tết holiday còn lại: {remainingDifferences.holidays}</p>
					</div>
				)}
			</div>
		</div>
	);
};
