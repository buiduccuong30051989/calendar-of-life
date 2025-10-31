# Calendar of Life - Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Business Logic](#business-logic)
3. [Technology Stack](#technology-stack)
4. [Build Configuration](#build-configuration)
5. [Project Structure](#project-structure)
6. [Core Components](#core-components)
7. [State Management](#state-management)
8. [Utilities & Helpers](#utilities--helpers)
9. [Constants & Configuration](#constants--configuration)
10. [Edge Cases & Special Considerations](#edge-cases--special-considerations)
11. [Development Guidelines](#development-guidelines)
12. [Data Flow Diagram](#data-flow-diagram)

---

## 🎯 Project Overview

**Calendar of Life** is a web application that visualizes a person's life in weeks or days, inspired by the concept of "memento mori" (remember that you will die). The app helps users gain perspective on their mortality by showing how much time they've lived and how much potentially remains.

### Main Features
- Select date of birth and expected date of death
- Visualize life as a grid of weeks
- Different viewing modes (by year-end, birthday, months, years)
- Show/hide past weeks
- Statistics showing remaining days, weeks, months, years
- Print functionality
- Motivational quotes with animated backgrounds

---

## 💼 Business Logic

### Core Concept
The application calculates and displays time in two ways:
1. **Total Life Span**: From date of birth to expected date of death
2. **Remaining Time**: From today to expected date of death

### Visualization Modes
1. **Year End Mode** (`yearEnd`): Highlights weeks containing New Year's Day (Jan 1) in red
2. **Birthday Mode** (`birthday`): Highlights weeks containing the user's birthday in red
3. **Stripped Month Mode** (`strippedMonth`): Alternating gray background for even months
4. **Stripped Year Mode** (`strippedYear`): Alternating gray background for even years

### Week Calculation Logic
- Each week starts on Sunday (configurable via `APP_CONFIG.WEEK_STARTS_ON`)
- Weeks are displayed in a grid with 56 weeks per row (representing roughly one year)
- Past weeks are shown in grayscale by default
- Users can toggle to show/hide past weeks

### Date Calculations
The app calculates:
- **Days**: Total/remaining days between dates
- **Weeks**: Total/remaining weeks
- **Months**: Exact months (accounting for partial months)
- **Years**: Exact years (accounting for birthday passage)
- **Birthdays**: Number of birthdays (equals years)
- **Holidays**: Assumed one per year (equals years)

---

## 🛠 Technology Stack

### Core Technologies
- **React 18.3.1**: UI library
- **Vite 5.3.4**: Build tool and dev server
- **SCSS/Sass**: Styling with Tailwind CSS
- **date-fns 4.1.0**: Date manipulation library

### UI Libraries
- **Radix UI**: Headless UI components
  - `@radix-ui/react-checkbox`
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-dropdown-menu`
  - `@radix-ui/react-label`
  - `@radix-ui/react-popover`
  - `@radix-ui/react-radio-group`
  - `@radix-ui/react-scroll-area`
  - `@radix-ui/react-select`
  - `@radix-ui/react-separator`
  - `@radix-ui/react-slot`
  - `@radix-ui/react-tooltip`

### Additional Libraries
- **react-day-picker 8.10.1**: Calendar component
- **framer-motion 11.11.17**: Animations
- **lucide-react**: Icon library
- **tailwind-merge**: Tailwind class merging utility
- **class-variance-authority**: Variant-based styling
- **prop-types**: Runtime type checking

### Development Tools
- **Biome 1.8.3**: Linter and formatter
- **ESLint**: Code linting
- **PostCSS + Autoprefixer**: CSS processing
- **Tailwind CSS 3.4.13**: Utility-first CSS framework

---

## ⚙️ Build Configuration

### Vite Configuration (`vite.config.js`)

```javascript
{
  base: "/calendar-of-life",      // Important for GitHub Pages deployment
  plugins: [
    react(),                       // React plugin
    svgr()                        // SVG as React components
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")  // @ alias for imports
    }
  }
}
```

**Key Points**:
- `base: "/calendar-of-life"` is REQUIRED for GitHub Pages
- `@` alias allows imports like `import { Button } from '@/components/ui/button'`
- SVGR plugin allows importing SVGs as React components

### Path Alias Configuration

**Files**: `vite.config.js` + `jsconfig.json`

Both must be configured for @ alias to work:
```javascript
// jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Usage in code**:
```javascript
// ✅ With alias
import { Button } from '@/components/ui/button';
import { APP_CONFIG } from '@/constants';

// ❌ Without alias (don't do this)
import { Button } from '../../components/ui/button';
```

### Tailwind Configuration (`tailwind.config.js`)

**Custom Extensions**:
```javascript
{
  gridTemplateColumns: {
    '24': 'repeat(24, minmax(0, 1fr))',
    '48': 'repeat(48, minmax(0, 1fr))',
    '56': 'repeat(56, minmax(0, 1fr))'    // Used for weeks grid (56 weeks/year)
  },
  animation: {
    grid: 'grid 15s linear infinite'       // For AnimatedGridPattern
  }
}
```

**CSS Variables**: All colors use HSL variables defined in `src/styles/index.scss`
- Supports dark mode via `darkMode: ["class"]`
- Uses shadcn/ui theme system

**Important**: The `grid-cols-56` class is custom-defined for the weeks calendar layout

---

## 📁 Project Structure

```
calendar-of-life/
├── src/
│   ├── app/
│   │   └── dashboard/
│   │       └── page.jsx              # (Unused - legacy file)
│   │
│   ├── assets/
│   │   └── icons/                    # SVG icons
│   │
│   ├── components/
│   │   ├── common/
│   │   │   └── tooltip.jsx           # Custom tooltip wrapper
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── animated-grid-pattern.jsx
│   │   │   ├── blur-in.jsx          # Text animation component
│   │   │   ├── breadcrumb.jsx
│   │   │   ├── button.jsx
│   │   │   ├── calendar.jsx
│   │   │   ├── checkbox.jsx
│   │   │   ├── dropdown-menu.jsx
│   │   │   ├── input.jsx
│   │   │   ├── label.jsx
│   │   │   ├── popover.jsx
│   │   │   ├── radio-group.jsx
│   │   │   ├── retro-grid.jsx       # Retro grid background
│   │   │   ├── scroll-area.jsx
│   │   │   ├── select.jsx
│   │   │   ├── separator.jsx
│   │   │   ├── sheet.jsx
│   │   │   ├── sidebar.jsx          # shadcn sidebar component
│   │   │   ├── skeleton.jsx
│   │   │   └── tooltip.jsx
│   │   │
│   │   ├── app-sidebar.jsx          # App-specific sidebar wrapper
│   │   ├── datesCalendar.jsx        # Days grid view (currently unused)
│   │   ├── formDate.jsx             # Date selection form
│   │   ├── propTypes.js             # Reusable PropTypes shapes
│   │   ├── sidebar.jsx              # Settings sidebar content
│   │   ├── weekItem.jsx             # Individual week cell
│   │   └── weeksCalendar.jsx        # Main weeks grid
│   │
│   ├── constants/
│   │   └── index.js                 # All app constants
│   │
│   ├── contexts/
│   │   └── AppContext.jsx           # Global state context
│   │
│   ├── hooks/
│   │   ├── index.js                 # Hook exports
│   │   ├── use-mobile.jsx           # Mobile detection hook
│   │   ├── useDateCalculations.js   # Date calculation hook
│   │   ├── useDates.js              # Date state hook
│   │   └── useSettings.js           # Settings state hook
│   │
│   ├── lib/
│   │   └── utils.js                 # Utility functions (cn, etc.)
│   │
│   ├── styles/
│   │   └── index.scss               # Global styles
│   │
│   ├── utils/
│   │   ├── helpers.js               # Helper functions
│   │   ├── index.js                 # Main utility exports
│   │   └── weekCalculations.js     # Week calculation logic
│   │
│   ├── App.jsx                      # Root component
│   └── main.jsx                     # Entry point
│
├── public/                          # Static assets
├── dist/                            # Build output
│
├── tailwind.config.js               # Tailwind configuration
├── vite.config.js                   # Vite configuration
├── package.json                     # Dependencies
├── REFACTORING.md                   # Refactoring documentation
└── PROJECT_DOCUMENTATION.md         # This file
```

---

## 🧩 Core Components

### 1. App.jsx
**Location**: `src/App.jsx`

**Purpose**: Root component that wraps the entire application

**Structure**:
```jsx
<AppProvider>
  <AppContent>
    {!areDatesValid ? (
      <FormDate />
    ) : (
      <SidebarProvider>
        <AppSidebar>
          <Sidebar />
        </AppSidebar>
        <SidebarInset>
          <Header />
          <WeeksCalendar />
          <DatesCalendar /> {/* if showDateCalendar */}
        </SidebarInset>
      </SidebarProvider>
    )}
  </AppContent>
</AppProvider>
```

**Props**: None (uses Context)

**State**: Managed by AppContext

**Key Features**:
- Conditional rendering based on date validity
- Print functionality
- Reset functionality

---

### 2. FormDate.jsx
**Location**: `src/components/formDate.jsx`

**Purpose**: Initial form for selecting birth and death dates

**Props**:
```javascript
{
  handleChange: func.isRequired,  // Date change handler
  dates: {
    dateOfBirth: string|Date,
    dateOfDie: string|Date
  }.isRequired
}
```

**Key Features**:
- Two date pickers (birth and death)
- Random heading that rotates every 60 seconds
- Random background (RetroGrid or AnimatedGridPattern)
- Uses shadcn Calendar component with dropdown year/month selection
- Year range: 1960-2030 (configurable)

**Special Logic**:
- Background is selected once on mount (useMemo)
- Heading rotates on interval (60000ms)
- BlurIn animation for heading text

**Dependencies**:
- `@/constants`: APP_CONFIG, TEXTS, DATE_FIELDS, HEADING_QUOTES
- `@/utils/helpers`: getRandomItem
- `date-fns`: format
- UI components: Button, Calendar, Popover, BlurIn, RetroGrid, AnimatedGridPattern

---

### 3. WeeksCalendar.jsx
**Location**: `src/components/weeksCalendar.jsx`

**Purpose**: Main visualization - displays life as a grid of weeks

**Props**:
```javascript
{
  dates: datesShape.isRequired,
  dateDifferences: dateDifferencesShape,
  settings: string.isRequired,        // View mode
  showPastWeeks: bool.isRequired
}
```

**Key Features**:
- Generates all weeks from birth to death
- Filters based on showPastWeeks setting
- Splits into rows of 56 weeks each
- Memoized for performance

**Rendering Logic**:
```
1. Generate all weeks data (generateWeeksData)
2. Filter weeks (filterWeeks)
3. Split into rows (splitWeeksIntoRows)
4. Render as HTML table
```

**Performance**:
- Uses useMemo with dependencies: [dateOfBirth, weeks, settings, showPastWeeks]
- Only recalculates when these values change

**Edge Cases**:
- Returns null if no weeks data
- Handles empty filtered weeks array

---

### 4. WeekItem.jsx
**Location**: `src/components/weekItem.jsx`

**Purpose**: Individual week cell in the grid

**Props**:
```javascript
{
  title: string.isRequired,
  settings: string.isRequired,
  isPast: bool.isRequired,
  isBirthdayWeek: bool.isRequired,
  monthClasses: string.isRequired,
  yearClasses: string.isRequired,
  formattedStartDate: string.isRequired,
  formattedEndDate: string.isRequired,
  isNewYearWeek: bool.isRequired
}
```

**Visual States**:
1. **Past weeks**: Grayscale filter
2. **Birthday week** (in birthday mode): Red background (#FCA5A5)
3. **New Year week** (in yearEnd mode): Darker red background (#EF4444)
4. **Even months** (in strippedMonth mode): Gray background (#D1D5DB)
5. **Even years** (in strippedYear mode): Darker gray background (#9CA3AF)

**CSS Classes Applied**:
- Base: `w-4 h-4 border border-gray-300 flex items-center justify-center`
- Conditional classes based on settings and state

**Performance**:
- Wrapped in React.memo to prevent unnecessary re-renders

---

### 5. Sidebar.jsx
**Location**: `src/components/sidebar.jsx`

**Purpose**: Settings panel and statistics display

**Props**:
```javascript
{
  handleChange: func.isRequired,
  remainingDifferences: dateDifferencesShape,
  settings: string.isRequired,
  setShowPastWeeks: func.isRequired,
  showPastWeeks: bool.isRequired
}
```

**Sections**:
1. **View Settings** (Radio Group):
   - Year End
   - Birthday
   - Stripped Month
   - Stripped Year

2. **Display Options** (Checkbox):
   - Show Past Weeks

3. **Statistics** (Read-only display):
   - Days remaining
   - Weeks remaining
   - Months remaining
   - Years remaining
   - Birthdays remaining
   - Holidays remaining

**Internationalization**:
- Currently uses TEXTS.EN
- Ready for i18n implementation (TEXTS.VI available)

---

### 6. DatesCalendar.jsx
**Location**: `src/components/datesCalendar.jsx`

**Purpose**: Alternative view showing life as individual days (currently not used in UI)

**Props**:
```javascript
{
  dates: datesShape.isRequired,
  dateDifferences: dateDifferencesShape
}
```

**Key Features**:
- Displays days in 7-column grid
- Shows past days with gray background
- Memoized for performance

**Status**: Built but not actively used in the current UI (showDateCalendar is always false)

---

## 🗂 State Management

### AppContext (src/contexts/AppContext.jsx)

**Purpose**: Centralized state management for the entire application

**Provider Structure**:
```jsx
<AppProvider initialDates={{ dateOfBirth, dateOfDie }}>
  {children}
</AppProvider>
```

**Exposed Values**:
```javascript
{
  // From useDates
  dates: { dateOfBirth, dateOfDie },
  handleDateChange: (({ id, value }) => void),
  resetDates: (() => void),
  areDatesValid: boolean,

  // From useDateCalculations
  dateDifferences: {
    days: number,
    weeks: number,
    months: number,
    years: number,
    birthdays: number,
    holidays: number
  },
  remainingDifferences: { /* same shape */ },

  // From useSettings
  viewSetting: string,
  showPastWeeks: boolean,
  showDateCalendar: boolean,
  handleViewSettingChange: ((value) => void),
  togglePastWeeks: ((checked) => void),
  toggleDateCalendar: ((checked) => void)
}
```

**Usage**:
```javascript
const { dates, handleDateChange, dateDifferences } = useAppContext();
```

**Error Handling**: Throws error if used outside AppProvider

---

## 🔧 Utilities & Helpers

### 1. weekCalculations.js
**Location**: `src/utils/weekCalculations.js`

**Functions**:

#### `isDateInWeek(startDate, endDate, targetDate)`
Checks if a specific date (e.g., birthday) falls within a week
```javascript
// Used to determine if a week contains the user's birthday
const isBirthdayWeek = isDateInWeek(startDate, endDate, birthDate);
```

#### `isNewYearInWeek(startDate, endDate)`
Checks if a week contains January 1st
```javascript
// Used to highlight New Year weeks
const isNewYearWeek = isNewYearInWeek(startDate, endDate);
```

#### `getMonthClasses(startDate, endDate, settings)`
Generates CSS classes for month-based styling
```javascript
// Returns: "month-5 month-even bg-gray-300" or "month-5 month-6"
```

#### `getYearClasses(startDate, endDate, settings)`
Generates CSS classes for year-based styling
```javascript
// Returns: "year-2024 year-even bg-gray-400"
```

#### `calculateWeekData(birthDate, weekIndex, settings)`
Calculates all data for a single week
```javascript
// Returns object with:
{
  index, title, settings, isPast,
  isBirthdayWeek, isNewYearWeek,
  monthClasses, yearClasses,
  formattedStartDate, formattedEndDate
}
```

#### `generateWeeksData(birthDate, totalWeeks, settings)`
Generates array of all weeks
```javascript
// Returns array of week data objects
const weeks = generateWeeksData(dateOfBirth, 4000, 'yearEnd');
```

#### `filterWeeks(weeks, showPastWeeks)`
Filters weeks based on past/future
```javascript
// Returns filtered array
const filtered = filterWeeks(weeks, false); // Only future weeks
```

#### `splitWeeksIntoRows(weeks, weeksPerRow = 56)`
Splits weeks into rows for table display
```javascript
// Returns 2D array: [[week1...week56], [week57...week112], ...]
const rows = splitWeeksIntoRows(filteredWeeks, 56);
```

---

### 2. Date Calculations (utils/index.js)

#### `calculateDateDifferences(startDate, endDate)`
Calculates total time between two dates

**Algorithm**:
1. Calculate raw differences (days, weeks, months, years)
2. Determine if birthday has passed in the final year
3. Adjust months and years accordingly
4. Calculate birthdays and holidays (assumed 1 per year)

**Returns**:
```javascript
{
  days: number,      // Total days
  weeks: number,     // Total weeks
  months: number,    // Exact months
  years: number,     // Exact years
  birthdays: number, // Number of birthdays
  holidays: number   // Number of holidays
}
```

#### `calculateRemainingDifferences(endDate)`
Same as above but from today to endDate

---

### 3. Helpers (utils/helpers.js)

#### `getRandomItem(data)`
Returns random item from array or object
```javascript
const quote = getRandomItem(HEADING_QUOTES);
const bg = getRandomItem(BACKGROUNDS);
```

**Supports**:
- Arrays: Returns random element
- Objects: Returns random value from random key
- Throws error for invalid input

#### `formatDisplayDate(date)`
Formats date for display
```javascript
// Returns: "10/31/2025" or ""
const formatted = formatDisplayDate(new Date());
```

---

## ⚙️ Constants & Configuration

### APP_CONFIG
```javascript
{
  WEEKS_PER_ROW: 56,              // Weeks per table row
  DAYS_PER_WEEK: 7,               // Days in a week
  WEEK_STARTS_ON: 0,              // 0 = Sunday
  DEFAULT_FROM_YEAR: 1960,        // Calendar min year
  DEFAULT_TO_YEAR: 2030,          // Calendar max year
  HEADING_ROTATION_INTERVAL: 60000 // 1 minute
}
```

### VIEW_SETTINGS
```javascript
{
  YEAR_END: 'yearEnd',
  BIRTHDAY: 'birthday',
  STRIPPED_MONTH: 'strippedMonth',
  STRIPPED_YEAR: 'strippedYear'
}
```

### DATE_FIELDS
```javascript
{
  DATE_OF_BIRTH: 'dateOfBirth',
  DATE_OF_DIE: 'dateOfDie'
}
```

### CSS_CLASSES
```javascript
{
  PAST_WEEK: 'isPast filter grayscale',
  BIRTHDAY_WEEK: 'bg-red-300',
  NEW_YEAR_WEEK: 'bg-red-500',
  MONTH_EVEN: 'month-even bg-gray-300',
  YEAR_EVEN: 'year-even bg-gray-400'
}
```

### TEXTS
Two language objects available:
- `TEXTS.EN`: English translations
- `TEXTS.VI`: Vietnamese translations

**Fields**:
```javascript
{
  DATE_OF_BIRTH, DATE_OF_DEATH,
  YEAR_END, BIRTHDAY, STRIPPED_MONTH, STRIPPED_YEAR,
  SHOW_PAST_WEEKS,
  DAYS_REMAINING, WEEKS_REMAINING, MONTHS_REMAINING,
  YEARS_REMAINING, BIRTHDAYS_REMAINING, HOLIDAYS_REMAINING,
  MEMENTO_MORI
}
```

### HEADING_QUOTES
```javascript
{
  QUOTE_1: { text: "By acknowledging...", multiline: true },
  QUOTE_2: { text: "We have two lives...", multiline: true },
  QUOTE_3: { text: "This is your life...", multiline: true }
}
```

---

## ⚠️ Edge Cases & Special Considerations

### 1. Date Handling

#### Birthday Calculation Edge Case
When calculating years, must check if birthday has passed in the current year:
```javascript
// If death date is before birthday in final year:
// dateOfBirth: 1989-05-30
// dateOfDie: 2062-03-15
// They won't reach their 73rd birthday
const isBirthdayPassedThisYear = isAfter(end, addYears(start, diffYears)) ||
                                 isSameDay(end, addYears(start, diffYears));
```

**Why**: Affects accurate calculation of years, months, and birthday count

#### Week Spanning Multiple Months/Years
A single week can span two months or two years:
```javascript
// Example: Dec 30, 2024 - Jan 5, 2025
// Both month and year classes applied: "month-12 month-1 year-2024 year-2025"
```

**Why**: Visual styling needs to account for transitions

### 2. Performance Considerations

#### Memoization Critical Points
1. **WeeksCalendar**: Can generate 4000+ week objects
   - MUST use useMemo with correct dependencies
   - Recalculation only when dates/settings change

2. **DatesCalendar**: Can generate 30,000+ day objects
   - Even more critical for performance
   - Why it's currently disabled in UI

#### Large Data Sets
A 90-year lifespan = ~4,680 weeks = 4,680 DOM elements
- Each WeekItem is memoized
- React.memo prevents re-renders
- Keep WeekItem component simple

### 3. UI/UX Edge Cases

#### Empty States
```javascript
// WeeksCalendar returns null if no data
if (rows.length === 0) return null;

// Sidebar shows nothing if no remainingDifferences
{remainingDifferences && <Statistics />}
```

#### Past Weeks Filter
When `showPastWeeks = false`:
- Filter happens AFTER week generation
- Filtered weeks may be empty
- Table still renders (empty tbody)

#### Print Functionality
- Uses native `window.print()`
- No special print styles defined
- All UI elements print as-is

### 4. Date-fns Version Compatibility

**IMPORTANT**: Current setup has peer dependency conflict:
- Project uses `date-fns@4.1.0`
- `react-day-picker@8.10.1` expects `date-fns@^2.28.0 || ^3.0.0`
- Currently resolved with `--legacy-peer-deps`

**Impact**:
- May have compatibility issues
- Consider downgrading date-fns or upgrading react-day-picker in future

### 5. State Initialization

#### Default Dates in App.jsx
```javascript
const initialDates = {
  dateOfBirth: '1989-05-30',  // Pre-filled for testing
  dateOfDie: '2062-05-30',
  // dateOfBirth: '',           // Production: start empty
  // dateOfDie: '',
};
```

**Why**: Easier for development but should be empty in production

### 6. Context Usage

#### Must Use Inside Provider
```javascript
const { dates } = useAppContext(); // ✅ Inside AppProvider

// ❌ Outside AppProvider - THROWS ERROR
// Error: "useAppContext must be used within AppProvider"
```

### 7. PropTypes vs Runtime

PropTypes only validate in development:
- Production builds strip PropTypes
- Not a replacement for TypeScript
- Runtime errors possible in production

---

## 📐 Development Guidelines

### When Adding New Features

1. **Check Constants First**
   - Add configuration to `constants/index.js`
   - Don't hardcode values in components

2. **Use Existing Hooks**
   - Date logic → `useDateCalculations`
   - Settings → `useSettings`
   - New state → Consider adding to context

3. **Create Utility Functions**
   - Pure logic → `utils/`
   - Keep components focused on rendering

4. **Add PropTypes**
   - Define in `components/propTypes.js` if reusable
   - Add to component immediately

### When Modifying Date Logic

**ALWAYS** consider:
- [ ] Birthday passage in calculations
- [ ] Week spanning multiple months/years
- [ ] Date format consistency (Date object vs string)
- [ ] Null/undefined date handling
- [ ] Performance with large date ranges

### When Modifying WeeksCalendar

**ALWAYS** check:
- [ ] Memoization dependencies are correct
- [ ] Filter logic doesn't break with edge cases
- [ ] Row splitting handles empty arrays
- [ ] CSS classes are applied correctly
- [ ] Tooltip shows correct date range

### When Adding New View Modes

1. Add constant to `VIEW_SETTINGS`
2. Update `weekCalculations.js` logic
3. Add styling classes to `CSS_CLASSES`
4. Update `Sidebar.jsx` radio options
5. Update `WeekItem.jsx` conditional rendering
6. Add to `TEXTS` for i18n

### Testing Checklist

Before committing changes:
- [ ] `npm run build` succeeds
- [ ] No console errors in browser
- [ ] Test with empty dates
- [ ] Test with very old/future dates
- [ ] Test all view modes
- [ ] Test show/hide past weeks
- [ ] Test print functionality
- [ ] Test date reset

### Code Style

1. **Imports Order**:
   ```javascript
   // 1. React & external libraries
   import { useState } from 'react';
   import { format } from 'date-fns';

   // 2. UI components
   import { Button } from '@/components/ui/button';

   // 3. Custom components
   import { WeekItem } from './weekItem';

   // 4. Hooks, utils, constants
   import { useAppContext } from '@/contexts/AppContext';
   import { generateWeeksData } from '@/utils';
   import { APP_CONFIG } from '@/constants';

   // 5. Types
   import { datesShape } from './propTypes';
   ```

2. **Component Structure**:
   ```javascript
   // 1. Imports
   // 2. Constants (component-specific)
   // 3. Component function with JSDoc
   // 4. PropTypes
   // 5. Export
   ```

3. **Function Naming**:
   - Handlers: `handle[Action]` (e.g., `handleDateChange`)
   - Toggles: `toggle[Thing]` (e.g., `togglePastWeeks`)
   - Getters: `get[Thing]` (e.g., `getMonthClasses`)
   - Checkers: `is[Condition]` (e.g., `isDateInWeek`)

### Common Pitfalls

1. **Don't** mutate dates directly:
   ```javascript
   // ❌ Bad
   const date = new Date(birthDate);
   date.setFullYear(2025);

   // ✅ Good
   const date = addYears(new Date(birthDate), years);
   ```

2. **Don't** forget memoization for expensive calculations:
   ```javascript
   // ❌ Bad - recalculates every render
   const weeks = generateWeeksData(dates.dateOfBirth, 4000, settings);

   // ✅ Good - only recalculates when deps change
   const weeks = useMemo(() =>
     generateWeeksData(dates.dateOfBirth, 4000, settings),
     [dates.dateOfBirth, settings]
   );
   ```

3. **Don't** use console.log in production code:
   ```javascript
   // ❌ Remove before commit
   console.log({ weeks });
   ```

4. **Don't** hardcode text:
   ```javascript
   // ❌ Bad
   <span>Date of birth</span>

   // ✅ Good
   <span>{TEXTS.EN.DATE_OF_BIRTH}</span>
   ```

---

## 🔄 Build & Deploy

### Development
```bash
npm run dev          # Start dev server (port 5173)
```

### Production
```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

### Deployment
```bash
npm run deploy       # Deploy to GitHub Pages
```

**Note**: Configured to deploy to `https://buiduccuong30051989.github.io/calendar-of-life`

---

## 📝 Future Improvements

### High Priority
1. **TypeScript Migration**: Replace PropTypes with TypeScript
2. **Fix date-fns Dependency**: Resolve peer dependency warning
3. **Internationalization**: Implement proper i18n (react-i18next)
4. **Testing**: Add unit tests for utilities and hooks

### Medium Priority
1. **Accessibility**: Add ARIA labels, keyboard navigation
2. **Error Boundaries**: Add error handling
3. **Loading States**: Add skeletons/spinners
4. **Local Storage**: Persist dates between sessions
5. **Export/Share**: Add share functionality

### Low Priority
1. **Themes**: Dark mode support
2. **More View Modes**: Custom highlighting rules
3. **Mobile Optimizations**: Better mobile UX
4. **PWA**: Make it installable

---

## 🆘 Troubleshooting

### Build Fails
1. Check Node version (should be 20.18.0 per volta config)
2. Clear `node_modules` and reinstall: `rm -rf node_modules && npm install --legacy-peer-deps`
3. Clear dist: `rm -rf dist`

### Date Calculations Wrong
1. Check if birthday passage is considered
2. Verify date format (Date object vs string)
3. Check timezone issues (date-fns uses local timezone)

### Weeks Not Displaying
1. Check `dateDifferences.weeks` is calculated
2. Check filter isn't removing all weeks
3. Check memoization dependencies

### Context Error
1. Ensure component is inside `<AppProvider>`
2. Check context import path

---

## 📞 Key Files Quick Reference

| Need to... | Check this file |
|-----------|-----------------|
| Change app config | `src/constants/index.js` |
| Modify date calculations | `src/utils/index.js` |
| Update week logic | `src/utils/weekCalculations.js` |
| Add new view mode | `src/constants/index.js` → `src/components/weekItem.jsx` |
| Change text labels | `src/constants/index.js` (TEXTS) |
| Modify state management | `src/contexts/AppContext.jsx` |
| Update UI components | `src/components/ui/` |
| Fix styling | `src/styles/index.scss` + Tailwind classes |
| Change build config | `vite.config.js` |

---

## 📊 Data Flow Diagram

### Application Flow

```
User Opens App
     ↓
AppProvider (initializes state)
     ↓
     ├─→ useDates
     │   ├─→ dates: { dateOfBirth, dateOfDie }
     │   ├─→ handleDateChange
     │   ├─→ resetDates
     │   └─→ areDatesValid
     │
     ├─→ useDateCalculations(dates)
     │   ├─→ calculateDateDifferences(birth, death) → dateDifferences
     │   └─→ calculateRemainingDifferences(death) → remainingDifferences
     │
     └─→ useSettings
         ├─→ viewSetting ('yearEnd' | 'birthday' | 'strippedMonth' | 'strippedYear')
         ├─→ showPastWeeks (boolean)
         └─→ showDateCalendar (boolean)
     ↓
AppContent (useAppContext)
     ↓
     ┌────────────────────────────────────────┐
     │   areDatesValid?                       │
     ├────────────────────────────────────────┤
     │ NO  → FormDate                         │
     │        ├─ User selects dates           │
     │        ├─ handleDateChange called      │
     │        └─ Re-render with valid dates   │
     │                                        │
     │ YES → Main App Layout                  │
     │        ├─ SidebarProvider              │
     │        │   ├─ AppSidebar                │
     │        │   │   └─ Sidebar               │
     │        │   │       ├─ View Settings     │
     │        │   │       ├─ Show Past Weeks   │
     │        │   │       └─ Statistics        │
     │        │   │                            │
     │        │   └─ SidebarInset              │
     │        │       ├─ Header                │
     │        │       └─ WeeksCalendar         │
     │        │           ↓                    │
     │        │       generateWeeksData()      │
     │        │           ↓                    │
     │        │       filterWeeks()            │
     │        │           ↓                    │
     │        │       splitWeeksIntoRows()    │
     │        │           ↓                    │
     │        │       Map → WeekItem[]         │
     └────────────────────────────────────────┘
```

### Week Calculation Flow

```
User Birth Date + Total Weeks + Settings
     ↓
generateWeeksData()
     ↓
For each week (index):
     ├─→ calculateWeekData(birthDate, index, settings)
     │   ├─→ startDate = addWeeks(birthDate, index)
     │   ├─→ endDate = endOfWeek(startDate)
     │   ├─→ isPast = isBefore(endDate, today)
     │   ├─→ isBirthdayWeek = isDateInWeek(start, end, birthday)
     │   ├─→ isNewYearWeek = isNewYearInWeek(start, end)
     │   ├─→ monthClasses = getMonthClasses(start, end, settings)
     │   └─→ yearClasses = getYearClasses(start, end, settings)
     │
     └─→ Return week object {
           index, title, settings, isPast,
           isBirthdayWeek, isNewYearWeek,
           monthClasses, yearClasses,
           formattedStartDate, formattedEndDate
         }
     ↓
Array of all weeks
     ↓
filterWeeks(weeks, showPastWeeks)
     ↓
Filtered weeks array
     ↓
splitWeeksIntoRows(weeks, 56)
     ↓
2D array: [[week1...week56], [week57...week112], ...]
     ↓
Render as HTML table
```

### State Update Flow

```
User Action → Handler → State Update → Re-render
```

**Example 1: Change Date**
```
User selects date in Calendar
     ↓
onSelect={(date) => handleDateChange({ id: 'dateOfBirth', value: date })}
     ↓
handleDateChange updates context state
     ↓
useDateCalculations detects date change
     ↓
Recalculates dateDifferences & remainingDifferences (memoized)
     ↓
Components using these values re-render
     ↓
WeeksCalendar regenerates weeks (memoized)
```

**Example 2: Change View Setting**
```
User clicks radio button in Sidebar
     ↓
onValueChange={handleViewSettingChange}
     ↓
handleViewSettingChange updates viewSetting
     ↓
WeeksCalendar detects settings change
     ↓
useMemo recalculates weeks with new settings
     ↓
WeekItems re-render with new CSS classes
```

**Example 3: Toggle Past Weeks**
```
User clicks "Show Past Weeks" checkbox
     ↓
onCheckedChange={togglePastWeeks}
     ↓
togglePastWeeks updates showPastWeeks state
     ↓
WeeksCalendar detects showPastWeeks change
     ↓
filterWeeks() includes/excludes past weeks
     ↓
Table re-renders with filtered weeks
```

### Component Communication

```
AppContext (Global State)
     ↓
     ├──────────────┬──────────────┬──────────────┐
     │              │              │              │
  FormDate    WeeksCalendar   Sidebar      DatesCalendar
     │              │              │              │
     ↓              ↓              ↓              ↓
Updates dates   Displays      Changes       Displays
via context     weeks using   settings      days using
                context data  via context   context data
```

**No prop drilling**: All components access state via `useAppContext()`

### Memoization Strategy

```
dates change
     ↓
useDateCalculations (useMemo)
     ├─→ Only recalculates if dates change
     └─→ Prevents expensive date-fns calls
     ↓
dateDifferences / remainingDifferences
     ↓
WeeksCalendar (useMemo)
     ├─→ Only recalculates if [dates, weeks, settings, showPastWeeks] change
     └─→ Prevents regenerating 4000+ week objects
     ↓
WeekItem (React.memo)
     └─→ Only re-renders if props change
```

---

## 🎓 Learning Resources

### Understanding the Codebase
1. Start with `src/App.jsx` - see the component hierarchy
2. Read `src/contexts/AppContext.jsx` - understand state management
3. Check `src/constants/index.js` - see all configuration
4. Explore `src/utils/weekCalculations.js` - understand the math
5. Look at `src/components/weeksCalendar.jsx` - see how it all comes together

### Key Concepts to Understand
- **React Context API**: How global state works
- **Custom Hooks**: How business logic is extracted
- **useMemo & React.memo**: Performance optimization
- **date-fns**: Date manipulation library
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Component library pattern

### External Documentation
- [React Context](https://react.dev/reference/react/useContext)
- [date-fns](https://date-fns.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

---

## 🔍 Quick Answers to Common Questions

### "Where does the app get the dates from?"
- Initial: `App.jsx` sets `initialDates` (hardcoded for testing)
- User Input: `FormDate.jsx` component
- Storage: Context API via `AppProvider`

### "How are weeks calculated?"
- Core logic: `src/utils/weekCalculations.js`
- Function: `generateWeeksData()` creates all week objects
- Each week knows its state (past/future, birthday, new year, etc.)

### "Why 56 weeks per row?"
- Represents roughly one year (52 weeks)
- Extra weeks handle year boundaries
- Configurable via `APP_CONFIG.WEEKS_PER_ROW`

### "How does the app know if it's a past week?"
- Compares week's end date with `new Date()` (today)
- Function: `isBefore(endDate, new Date())`
- Happens during `calculateWeekData()`

### "What happens when user changes view mode?"
- `Sidebar` → `handleViewSettingChange()`
- Context updates `viewSetting`
- `WeeksCalendar` useMemo recalculates
- `WeekItem` applies different CSS classes

### "Why is performance important here?"
- A 90-year life = ~4,680 weeks = 4,680 DOM elements
- Without memoization, recalculates on every render
- With memoization, only recalculates when necessary

### "Can I add a new view mode?"
Yes! Follow these steps:
1. Add to `VIEW_SETTINGS` in constants
2. Update `weekCalculations.js` if needed
3. Add CSS classes to `CSS_CLASSES`
4. Update `Sidebar.jsx` radio options
5. Update `WeekItem.jsx` styling logic

### "Where are the colors defined?"
- Tailwind classes: Inline in components
- Custom colors: `tailwind.config.js`
- CSS variables: `src/styles/index.scss`
- Constants: `CSS_CLASSES` in `src/constants/index.js`

---

## 📝 Changelog

### Version 2.0.0 (2025-10-31) - Major Refactoring
- ✅ Extracted constants to separate file
- ✅ Created custom hooks (useDates, useDateCalculations, useSettings)
- ✅ Implemented Context API for state management
- ✅ Refactored all components to use hooks/context
- ✅ Added PropTypes for runtime type checking
- ✅ Extracted utility functions to utils/
- ✅ Removed console.logs
- ✅ Added JSDoc comments
- ✅ Improved code organization
- ✅ Added memoization for performance

### Version 1.0.0 (Before 2025-10-31) - Initial Version
- Basic functionality
- All state in App.jsx
- Business logic in components
- No type checking
- Magic numbers throughout code

---

**Last Updated**: 2025-10-31
**Version**: 2.0.0 (Post-Refactoring)
**Maintainer**: Calendar of Life Team

---

## 💡 For AI Assistants Reading This

When you read this document in a new conversation, you should understand:

✅ **Architecture**: React + Context API + Custom Hooks + Utility Functions
✅ **Main Purpose**: Visualize life in weeks with different view modes
✅ **Key Files**: App.jsx, AppContext.jsx, weeksCalendar.jsx, weekCalculations.js
✅ **Critical Logic**: Birthday calculation edge case, week spanning months/years
✅ **Performance**: Memoization is crucial (4000+ week objects)
✅ **Configuration**: Everything in constants/index.js
✅ **State Flow**: Context → Components (no prop drilling)
✅ **Build**: Vite with @ alias, GitHub Pages deployment

**When helping with this project**:
1. Check constants first before adding hardcoded values
2. Use existing hooks and utilities
3. Consider performance implications (memoization)
4. Follow the established patterns
5. Check edge cases in date calculations
6. Maintain PropTypes for all components
7. Keep business logic out of components

**Red Flags to Watch For**:
- 🚫 Direct date mutations (use date-fns immutable functions)
- 🚫 Hardcoded numbers/strings (use constants)
- 🚫 Missing memoization in expensive calculations
- 🚫 Prop drilling (use context instead)
- 🚫 Console.logs in production code
- 🚫 Forgetting birthday edge case in date calculations
