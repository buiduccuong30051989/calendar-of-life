import PropTypes from 'prop-types';

// Common prop type shapes
export const dateShape = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.instanceOf(Date),
]);

export const datesShape = PropTypes.shape({
  dateOfBirth: dateShape,
  dateOfDie: dateShape,
});

export const dateDifferencesShape = PropTypes.shape({
  days: PropTypes.number,
  weeks: PropTypes.number,
  months: PropTypes.number,
  years: PropTypes.number,
  birthdays: PropTypes.number,
  holidays: PropTypes.number,
});

export const weekItemShape = PropTypes.shape({
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  settings: PropTypes.string.isRequired,
  isPast: PropTypes.bool.isRequired,
  isBirthdayWeek: PropTypes.bool.isRequired,
  isNewYearWeek: PropTypes.bool.isRequired,
  monthClasses: PropTypes.string.isRequired,
  yearClasses: PropTypes.string.isRequired,
  formattedStartDate: PropTypes.string.isRequired,
  formattedEndDate: PropTypes.string.isRequired,
});
