# Refactoring Documentation

## Overview
This document describes the refactoring work done to improve code structure, maintainability, and scalability of the Calendar of Life application.

## Changes Made

### 1. **Constants Extraction** (`src/constants/index.js`)
- Created centralized constants file for magic numbers and strings
- Extracted configuration values (weeks per row, date ranges, intervals)
- Moved all text content to support future internationalization
- Added view settings and CSS class constants

**Benefits:**
- Single source of truth for configuration
- Easy to modify settings without touching component code
- Prepared for i18n implementation

### 2. **Custom Hooks** (`src/hooks/`)
Created three specialized hooks to separate business logic from UI:

#### `useDates.js`
- Manages date state (birth and death dates)
- Provides validation helper `areDatesValid`
- Encapsulates date change and reset logic

#### `useDateCalculations.js`
- Memoizes date calculation results
- Automatically recalculates when dates change
- Returns both total and remaining differences

#### `useSettings.js`
- Manages view settings state
- Handles show/hide toggles
- Provides callbacks for all setting changes

**Benefits:**
- Reusable logic across components
- Better testability
- Automatic memoization for performance

### 3. **Context API** (`src/contexts/AppContext.jsx`)
- Created application-wide state management
- Combines all custom hooks into single provider
- Eliminates prop drilling

**Benefits:**
- Cleaner component props
- Easier state access from any component
- Single source of truth for app state

### 4. **Utility Functions** (`src/utils/`)

#### `weekCalculations.js`
Extracted complex week calculation logic:
- `calculateWeekData()` - Single week calculations
- `generateWeeksData()` - All weeks generation
- `filterWeeks()` - Filter by past/future
- `splitWeeksIntoRows()` - Table layout logic
- `isDateInWeek()` - Birthday detection
- `isNewYearInWeek()` - Holiday detection
- `getMonthClasses()` - Month styling
- `getYearClasses()` - Year styling

#### `helpers.js`
- `getRandomItem()` - Generic random selection
- `formatDisplayDate()` - Consistent date formatting

**Benefits:**
- Pure functions, easy to test
- Reusable across components
- Better code organization

### 5. **Component Refactoring**

#### `App.jsx`
- Split into `App` (provider) and `AppContent` (consumer)
- Uses Context API instead of local state
- Cleaner prop passing

#### `WeeksCalendar.jsx`
- **Before:** 80+ lines with complex logic
- **After:** 30 lines, pure presentation
- Uses utility functions for calculations
- Added useMemo for performance

#### `FormDate.jsx`
- Extracted constants to constants file
- Uses configuration for date ranges
- Cleaner random selection logic

#### `Sidebar.jsx`
- Internationalized text labels
- Uses VIEW_SETTINGS constants
- Improved prop naming

#### `DatesCalendar.jsx`
- Added memoization
- Uses helper functions
- Improved performance

#### `WeekItem.jsx`
- Uses constants instead of magic strings
- Better prop typing
- Cleaner class construction

### 6. **Type Safety** (PropTypes)
Added PropTypes to all components:
- Created reusable prop shapes (`src/components/propTypes.js`)
- Runtime type validation
- Better developer experience

### 7. **Code Quality Improvements**
- Removed console.logs
- Added JSDoc comments
- Consistent code formatting
- Better variable naming
- Removed unused imports
- Fixed breadcrumb labels

## Project Structure

```
src/
├── constants/
│   └── index.js              # All constants
├── contexts/
│   └── AppContext.jsx        # Global state management
├── hooks/
│   ├── index.js             # Exports all hooks
│   ├── useDates.js          # Date state management
│   ├── useDateCalculations.js # Date calculations
│   └── useSettings.js       # Settings management
├── utils/
│   ├── index.js             # Main exports
│   ├── weekCalculations.js # Week logic
│   └── helpers.js           # Helper functions
├── components/
│   ├── propTypes.js         # Reusable prop types
│   ├── weeksCalendar.jsx   # Week grid display
│   ├── datesCalendar.jsx   # Date grid display
│   ├── formDate.jsx         # Date selection form
│   ├── sidebar.jsx          # Settings sidebar
│   └── weekItem.jsx         # Individual week cell
└── App.jsx                  # Root component
```

## Migration Guide

### Before
```javascript
// Direct state in App.jsx
const [dates, setDates] = useState({ ... });
const handleChange = ({ id, value }) => { ... };
```

### After
```javascript
// Using Context
const { dates, handleDateChange } = useAppContext();
```

### Before
```javascript
// Magic numbers in components
for (let i = 0; i < filteredWeeks.length; i += 56) { ... }
```

### After
```javascript
// Constants
import { APP_CONFIG } from '@/constants';
splitWeeksIntoRows(weeks, APP_CONFIG.WEEKS_PER_ROW);
```

## Performance Improvements
1. **Memoization** - Added useMemo to expensive calculations
2. **Pure Functions** - Utility functions are easily optimizable
3. **Context API** - Prevents unnecessary re-renders
4. **Constants** - No runtime calculations for static values

## Future Improvements
1. **TypeScript** - Migrate from PropTypes to TypeScript
2. **i18n** - Implement proper internationalization
3. **Testing** - Add unit tests for hooks and utilities
4. **Error Boundaries** - Add error handling
5. **Loading States** - Add loading indicators
6. **Accessibility** - Improve ARIA labels and keyboard navigation

## Testing the Refactored Code

Build the project:
```bash
npm run build
```

Run development server:
```bash
npm run dev
```

All functionality remains the same, with improved code structure.
