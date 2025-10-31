import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { WeekItem } from './weekItem';
import { generateWeeksData, filterWeeks, splitWeeksIntoRows } from '@/utils';
import { datesShape, dateDifferencesShape } from './propTypes';

/**
 * WeeksCalendar component displays a grid of weeks
 * @param {Object} props
 * @param {Object} props.dates - Date of birth and death
 * @param {Object} props.dateDifferences - Calculated date differences
 * @param {string} props.settings - Current view setting
 * @param {boolean} props.showPastWeeks - Whether to show past weeks
 */
export const WeeksCalendar = ({
	dates,
	dateDifferences,
	settings,
	showPastWeeks,
}) => {
	const rows = useMemo(() => {
		if (!dateDifferences?.weeks || !dates?.dateOfBirth) return [];

		// Generate all weeks data
		const weeks = generateWeeksData(dates.dateOfBirth, dateDifferences.weeks, settings);

		// Filter weeks based on showPastWeeks setting
		const filteredWeeks = filterWeeks(weeks, showPastWeeks);

		// Split into rows for table display
		return splitWeeksIntoRows(filteredWeeks);
	}, [dates.dateOfBirth, dateDifferences?.weeks, settings, showPastWeeks]);

	if (rows.length === 0) return null;

	return (
		<table className="table-auto mt-4 mx-auto w-fit">
			<tbody>
				{rows.map((row, rowIndex) => (
					<tr key={rowIndex}>
						{row.map((week) => (
							<td key={week.index} className="p-[1px]">
								<WeekItem {...week} />
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

WeeksCalendar.propTypes = {
	dates: datesShape.isRequired,
	dateDifferences: dateDifferencesShape,
	settings: PropTypes.string.isRequired,
	showPastWeeks: PropTypes.bool.isRequired,
};
