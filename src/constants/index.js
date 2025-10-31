// App configuration constants
export const APP_CONFIG = {
  WEEKS_PER_ROW: 56,
  DAYS_PER_WEEK: 7,
  WEEK_STARTS_ON: 0, // Sunday
  DEFAULT_FROM_YEAR: 1960,
  DEFAULT_TO_YEAR: 2030,
  HEADING_ROTATION_INTERVAL: 60000, // 1 minute
};

// View settings
export const VIEW_SETTINGS = {
  YEAR_END: 'yearEnd',
  BIRTHDAY: 'birthday',
  STRIPPED_MONTH: 'strippedMonth',
  STRIPPED_YEAR: 'strippedYear',
};

// Date field IDs
export const DATE_FIELDS = {
  DATE_OF_BIRTH: 'dateOfBirth',
  DATE_OF_DIE: 'dateOfDie',
};

// Text content
export const TEXTS = {
  EN: {
    DATE_OF_BIRTH: 'Date of birth',
    DATE_OF_DEATH: 'Date of Death',
    YEAR_END: 'Year End',
    BIRTHDAY: 'Birthday',
    STRIPPED_MONTH: 'Stripped Month',
    STRIPPED_YEAR: 'Stripped Year',
    SHOW_PAST_WEEKS: 'Show Past Weeks',
    DAYS_REMAINING: 'Days remaining',
    WEEKS_REMAINING: 'Weeks remaining',
    MONTHS_REMAINING: 'Months remaining',
    YEARS_REMAINING: 'Years remaining',
    BIRTHDAYS_REMAINING: 'Birthdays remaining',
    HOLIDAYS_REMAINING: 'Holidays remaining',
    MEMENTO_MORI: '~ Memento mori ~',
  },
  VI: {
    DATE_OF_BIRTH: 'Ngày sinh',
    DATE_OF_DEATH: 'Ngày mất',
    YEAR_END: 'Cuối năm',
    BIRTHDAY: 'Sinh nhật',
    STRIPPED_MONTH: 'Theo tháng',
    STRIPPED_YEAR: 'Theo năm',
    SHOW_PAST_WEEKS: 'Hiển thị tuần đã qua',
    DAYS_REMAINING: 'Số ngày còn lại',
    WEEKS_REMAINING: 'Số tuần còn lại',
    MONTHS_REMAINING: 'Số tháng còn lại',
    YEARS_REMAINING: 'Số năm còn lại',
    BIRTHDAYS_REMAINING: 'Số lần sinh nhật còn lại',
    HOLIDAYS_REMAINING: 'Số lần tết còn lại',
    MEMENTO_MORI: '~ Memento mori ~',
  },
};

// Heading quotes
export const HEADING_QUOTES = {
  QUOTE_1: {
    text: 'By acknowledging the inevitability of death, become obsessed with life.',
    multiline: true,
  },
  QUOTE_2: {
    text: 'We have two lives, and the second begins when we realize we only have one.',
    multiline: true,
  },
  QUOTE_3: {
    text: 'This is your life, and its ending one minute at a time.',
    multiline: true,
  },
};

// CSS classes
export const CSS_CLASSES = {
  PAST_WEEK: 'isPast filter grayscale',
  BIRTHDAY_WEEK: 'bg-red-300',
  NEW_YEAR_WEEK: 'bg-red-500',
  MONTH_EVEN: 'month-even bg-gray-300',
  YEAR_EVEN: 'year-even bg-gray-400',
};
