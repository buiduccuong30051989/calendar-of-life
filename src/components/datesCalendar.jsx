import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { addDays, isBefore } from 'date-fns';
import { formatDisplayDate } from '@/utils/helpers';
import { APP_CONFIG } from '@/constants';
import { datesShape, dateDifferencesShape } from './propTypes';

/**
 * DatesCalendar component displays a grid of days
 * @param {Object} props
 * @param {Object} props.dates - Date of birth and death
 * @param {Object} props.dateDifferences - Calculated date differences
 */
export const DatesCalendar = ({ dates, dateDifferences }) => {
	const days = useMemo(() => {
		if (!dateDifferences?.days || !dates?.dateOfBirth) return [];

		return Array.from({ length: dateDifferences.days }, (_, index) => {
			const currentDate = addDays(new Date(dates.dateOfBirth), index);
			const formattedDate = formatDisplayDate(currentDate);
			const isPast = isBefore(currentDate, new Date());

			return {
				key: `${formattedDate}-${index}`,
				formattedDate,
				isPast,
			};
		});
	}, [dates.dateOfBirth, dateDifferences?.days]);

	if (days.length === 0) return null;

	return (
		<div className="grid grid-cols-7 gap-2 mt-4">
			{days.map(({ key, formattedDate, isPast }) => (
				<div
					key={key}
					className={`w-32 h-16 border flex items-center justify-center ${
						isPast ? 'bg-gray-200' : 'border-gray-300'
					}`}
				>
					{formattedDate}
				</div>
			))}
		</div>
	);
};

DatesCalendar.propTypes = {
	dates: datesShape.isRequired,
	dateDifferences: dateDifferencesShape,
};
