import PropTypes from 'prop-types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { VIEW_SETTINGS, TEXTS } from '@/constants';
import { dateDifferencesShape } from './propTypes';

const LANG = TEXTS.EN; // Could be made dynamic with i18n

/**
 * Sidebar component for settings and statistics
 * @param {Object} props
 * @param {Function} props.handleChange - Handler for view setting changes
 * @param {Object} props.remainingDifferences - Remaining time statistics
 * @param {string} props.settings - Current view setting
 * @param {Function} props.setShowPastWeeks - Handler for past weeks toggle
 * @param {boolean} props.showPastWeeks - Whether past weeks are shown
 */
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
					<RadioGroupItem value={VIEW_SETTINGS.YEAR_END} id="yearEnd" />
					<Label htmlFor="yearEnd">{LANG.YEAR_END}</Label>
				</div>

				<div className="flex items-center space-x-2">
					<RadioGroupItem value={VIEW_SETTINGS.BIRTHDAY} id="birthday" />
					<Label htmlFor="birthday">{LANG.BIRTHDAY}</Label>
				</div>

				<div className="flex items-center space-x-2">
					<RadioGroupItem value={VIEW_SETTINGS.STRIPPED_MONTH} id="strippedMonth" />
					<Label htmlFor="strippedMonth">{LANG.STRIPPED_MONTH}</Label>
				</div>

				<div className="flex items-center space-x-2">
					<RadioGroupItem value={VIEW_SETTINGS.STRIPPED_YEAR} id="strippedYear" />
					<Label htmlFor="strippedYear">{LANG.STRIPPED_YEAR}</Label>
				</div>
			</RadioGroup>

			<div className="flex items-center my-4 space-x-2">
				<Checkbox
					id="showPastWeeks"
					checked={showPastWeeks}
					onCheckedChange={setShowPastWeeks}
				/>
				<Label htmlFor="showPastWeeks">{LANG.SHOW_PAST_WEEKS}</Label>
			</div>

			<div className="border-t border-gray-300 my-8" />

			<div>
				{remainingDifferences && (
					<div className="space-y-4">
						<p>{LANG.DAYS_REMAINING}: {remainingDifferences.days}</p>
						<p>{LANG.WEEKS_REMAINING}: {remainingDifferences.weeks}</p>
						<p>{LANG.MONTHS_REMAINING}: {remainingDifferences.months}</p>
						<p>{LANG.YEARS_REMAINING}: {remainingDifferences.years}</p>
						<p>{LANG.BIRTHDAYS_REMAINING}: {remainingDifferences.birthdays}</p>
						<p>{LANG.HOLIDAYS_REMAINING}: {remainingDifferences.holidays}</p>
					</div>
				)}
			</div>
		</div>
	);
};

Sidebar.propTypes = {
	handleChange: PropTypes.func.isRequired,
	remainingDifferences: dateDifferencesShape,
	settings: PropTypes.string.isRequired,
	setShowPastWeeks: PropTypes.func.isRequired,
	showPastWeeks: PropTypes.bool.isRequired,
};
