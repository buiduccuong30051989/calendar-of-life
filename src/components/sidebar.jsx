import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const Sidebar = ({
	handleChange,
	remainingDifferences,
	settings,
	setShowPastWeeks,
	showPastWeeks,
}) => {
	return (
		<div className="px-6">
			<RadioGroup defaultValue={settings} onValueChange={handleChange}>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="yearEnd" id="yearEnd" />
					<Label htmlFor="yearEnd">Year End</Label>
				</div>

				<div className="flex items-center space-x-2">
					<RadioGroupItem value="birthday" id="birthday" />
					<Label htmlFor="birthday">BirthDay</Label>
				</div>

				<div className="flex items-center space-x-2">
					<RadioGroupItem value="strippedMonth" id="strippedMonth" />
					<Label htmlFor="strippedMonth">Stripped Month</Label>
				</div>

				<div className="flex items-center space-x-2">
					<RadioGroupItem value="strippedYear" id="strippedYear" />
					<Label htmlFor="strippedYear">Stripped Year</Label>
				</div>
			</RadioGroup>

			<div className="flex items-center my-4 space-x-2">
				<Checkbox
					id="showPastWeeks"
					checked={showPastWeeks}
					onCheckedChange={setShowPastWeeks}
				/>
				<Label htmlFor="showPastWeeks">Show Past Weeks</Label>
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
