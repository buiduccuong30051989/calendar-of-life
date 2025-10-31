import { memo } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from './common/tooltip';
import { VIEW_SETTINGS, CSS_CLASSES } from '@/constants';

const WeekItemComponent = ({
	title,
	settings,
	isPast,
	isBirthdayWeek,
	monthClasses,
	yearClasses,
	formattedStartDate,
	formattedEndDate,
	isNewYearWeek,
}) => {
	return (
		<Tooltip
			content={
				<div>
					<p className="text-xs">
						{formattedStartDate} - {formattedEndDate}
					</p>
				</div>
			}
		>
			<div
				title={title}
				className={`${settings === VIEW_SETTINGS.STRIPPED_MONTH ? 'stripped-month' : ''} ${settings === VIEW_SETTINGS.STRIPPED_YEAR ? 'stripped-year' : ''} w-4 h-4 border border-gray-300 flex items-center justify-center ${
					isBirthdayWeek
						? `${settings === VIEW_SETTINGS.BIRTHDAY ? CSS_CLASSES.BIRTHDAY_WEEK : ''}`
						: isNewYearWeek
							? `${settings === VIEW_SETTINGS.YEAR_END ? CSS_CLASSES.NEW_YEAR_WEEK : ''}`
							: ''
				} ${monthClasses} ${yearClasses} ${isPast ? CSS_CLASSES.PAST_WEEK : ''}`}
			/>
		</Tooltip>
	);
};

WeekItemComponent.propTypes = {
	title: PropTypes.string.isRequired,
	settings: PropTypes.string.isRequired,
	isPast: PropTypes.bool.isRequired,
	isBirthdayWeek: PropTypes.bool.isRequired,
	monthClasses: PropTypes.string.isRequired,
	yearClasses: PropTypes.string.isRequired,
	formattedStartDate: PropTypes.string.isRequired,
	formattedEndDate: PropTypes.string.isRequired,
	isNewYearWeek: PropTypes.bool.isRequired,
};

export const WeekItem = memo(WeekItemComponent);
