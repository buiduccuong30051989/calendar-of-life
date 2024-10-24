export const Sidebar = ({ handleChange, remainingDifferences }) => {
	return (
		<div className="h-screen w-[300px] bg-gray-50 fixed top-0 left-0 px-4 py-8">
			<h2 className="block text-center text-2xl font-bold mb-8">Hight Light</h2>

			<div className="flex items-center mb-4">
				<input
					id="yearEnd"
					type="radio"
					name="selection"
					className="form-radio h-5 w-5 text-blue-600"
					onChange={handleChange}
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
				/>
				<label
					htmlFor="strippedYear"
					className="ml-2 text-gray-700 select-none cursor-pointer"
				>
					Stripped Year
				</label>
			</div>

			<div>
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
		</div>
	);
};
