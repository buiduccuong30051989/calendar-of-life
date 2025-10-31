# Calendar of Life - Scaling Plan

## 🎯 Vision

Transform from single-user calendar to multi-user platform with:
- User authentication (Google, Facebook, etc.)
- Multiple calendars per user
- Calendar sharing & comparison
- Public/Private calendars
- Linked calendars to see overlapping life periods

---

## 📊 Current Architecture Assessment

### ✅ What's Ready for Scaling

1. **Component Architecture**
   - Well-structured, modular components
   - Clear separation of concerns
   - Reusable utilities and hooks
   - **Verdict**: ✅ Ready to scale

2. **Calculation Logic**
   - Pure functions in `utils/`
   - Can handle multiple date ranges
   - Easy to compare calendars
   - **Verdict**: ✅ Ready to scale

3. **UI Components**
   - `WeekItem`, `WeeksCalendar` are generic
   - Can be reused for different calendars
   - **Verdict**: ✅ Ready to scale

### ⚠️ What Needs Refactoring

1. **State Management** 🔴 CRITICAL
   - Current: Single calendar in Context
   - Need: Multi-calendar, multi-user state
   - **Solution**: Migrate to Zustand or TanStack Query

2. **Data Structure** 🔴 CRITICAL
   - Current: Simple `{ dateOfBirth, dateOfDie }`
   - Need: Complex user/calendar/settings structure
   - **Solution**: Define proper data models

3. **Routing** 🟡 MEDIUM
   - Current: Single page
   - Need: Multiple routes for users/calendars
   - **Solution**: Add React Router

4. **Authentication** 🟡 MEDIUM
   - Current: None
   - Need: OAuth integration
   - **Solution**: Firebase Auth or Supabase Auth

5. **Backend Integration** 🟡 MEDIUM
   - Current: Local state only
   - Need: API calls, data persistence
   - **Solution**: TanStack Query + REST/GraphQL API

---

## 🏗️ Proposed New Architecture

### Tech Stack Additions

```
Current:
React + Context API + Custom Hooks + Vite

Proposed:
React + React Router + Zustand/TanStack Query + Firebase/Supabase + Vite
```

#### Recommended Additions:

1. **State Management**: Zustand (lightweight) or TanStack Query (if heavy backend)
2. **Routing**: React Router v6
3. **Auth**: Firebase Auth (easy OAuth) or Supabase Auth
4. **Backend**: Firebase/Supabase (BaaS) or custom Node.js API
5. **Data Fetching**: TanStack Query (React Query)
6. **Form Handling**: React Hook Form (for user settings)

### Why These Choices?

**Zustand vs Redux Toolkit vs TanStack Query:**
- Zustand: Simplest, good for client state
- Redux Toolkit: More boilerplate, but industry standard
- TanStack Query: Best for server state, built-in caching

**Recommendation**: Start with **TanStack Query** for server data + **Zustand** for UI state

**Firebase vs Supabase:**
- Firebase: Easier OAuth, better docs, Google integration
- Supabase: Open source, PostgreSQL, better for complex queries

**Recommendation**: **Firebase** for faster MVP

---

## 📐 New Data Models

### User Model
```typescript
interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  provider: 'google' | 'facebook' | 'email';
  createdAt: Date;
  updatedAt: Date;
}
```

### Calendar Model
```typescript
interface Calendar {
  id: string;
  userId: string;
  name: string;
  description?: string;
  visibility: 'public' | 'private' | 'unlisted';

  // Date range
  dateOfBirth: Date;
  dateOfDie: Date;

  // Display settings
  settings: {
    viewMode: 'yearEnd' | 'birthday' | 'strippedMonth' | 'strippedYear';
    showPastWeeks: boolean;
    theme?: string;
  };

  // Linked calendars for comparison
  linkedCalendars: string[]; // Array of calendar IDs

  createdAt: Date;
  updatedAt: Date;
}
```

### Calendar Comparison Model
```typescript
interface CalendarComparison {
  calendars: Calendar[];
  overlappingPeriods: {
    startDate: Date;
    endDate: Date;
    weeks: number;
    days: number;
    months: number;
    years: number;
  }[];
}
```

---

## 🗺️ Migration Roadmap

### Phase 1: Foundation (Week 1-2)

**Goal**: Add routing and authentication WITHOUT breaking current functionality

#### Tasks:
1. **Install Dependencies**
   ```bash
   npm install react-router-dom firebase zustand @tanstack/react-query
   ```

2. **Add React Router**
   - Create routes structure:
     ```
     / → Landing/Home
     /calendars → Public calendars list
     /user/:userId → User profile
     /user/:userId/calendar/:calendarId → Calendar view (current app)
     /login → Auth page
     /settings → User settings
     ```

3. **Create Route Components**
   ```
   src/pages/
   ├── LandingPage.jsx
   ├── CalendarsListPage.jsx
   ├── UserProfilePage.jsx
   ├── CalendarViewPage.jsx  ← Move current App.jsx logic here
   ├── LoginPage.jsx
   └── SettingsPage.jsx
   ```

4. **Setup Firebase Auth**
   - Create Firebase project
   - Enable Google & Facebook OAuth
   - Create auth context/hooks

5. **Migrate Current App**
   - Move current App.jsx → CalendarViewPage.jsx
   - Keep all existing functionality
   - Just wrap with routing

**Result**: App still works exactly the same, but now has routing foundation

---

### Phase 2: Multi-Calendar Support (Week 3-4)

**Goal**: Support multiple calendars per user

#### Tasks:

1. **Create Calendar Store (Zustand)**
   ```javascript
   // src/stores/calendarStore.js
   const useCalendarStore = create((set, get) => ({
     calendars: [],
     activeCalendarId: null,

     addCalendar: (calendar) => set((state) => ({
       calendars: [...state.calendars, calendar]
     })),

     updateCalendar: (id, updates) => set((state) => ({
       calendars: state.calendars.map(cal =>
         cal.id === id ? { ...cal, ...updates } : cal
       )
     })),

     deleteCalendar: (id) => set((state) => ({
       calendars: state.calendars.filter(cal => cal.id !== id)
     })),

     setActiveCalendar: (id) => set({ activeCalendarId: id })
   }));
   ```

2. **Refactor AppContext**
   - Remove calendar-specific state
   - Focus on UI state only
   - Calendar data from Zustand store

3. **Create Calendar Manager Component**
   ```jsx
   <CalendarManager>
     <CalendarList /> {/* List user's calendars */}
     <CreateCalendarButton />
   </CalendarManager>
   ```

4. **Update CalendarViewPage**
   - Accept `calendarId` from route params
   - Load calendar from store
   - Reuse existing WeeksCalendar component

**Result**: Users can have multiple calendars

---

### Phase 3: Backend Integration (Week 5-6)

**Goal**: Persist data to Firebase/Supabase

#### Tasks:

1. **Setup Firebase Firestore**
   ```
   Collections:
   - users/{userId}
   - calendars/{calendarId}
     - userId (index)
     - visibility (index)
   ```

2. **Create API Hooks with TanStack Query**
   ```javascript
   // src/hooks/api/useCalendars.js
   export const useCalendars = (userId) => {
     return useQuery({
       queryKey: ['calendars', userId],
       queryFn: () => fetchUserCalendars(userId)
     });
   };

   export const useCreateCalendar = () => {
     const queryClient = useQueryClient();

     return useMutation({
       mutationFn: createCalendar,
       onSuccess: () => {
         queryClient.invalidateQueries(['calendars']);
       }
     });
   };
   ```

3. **Create API Service Layer**
   ```javascript
   // src/services/firebase.js
   export const calendarService = {
     getAll: (userId) => { /* Firestore query */ },
     getById: (id) => { /* ... */ },
     create: (data) => { /* ... */ },
     update: (id, data) => { /* ... */ },
     delete: (id) => { /* ... */ }
   };
   ```

4. **Add Loading & Error States**
   - Create skeleton components
   - Error boundaries
   - Retry logic

**Result**: Data persisted, multi-device sync

---

### Phase 4: Calendar Comparison Feature (Week 7-8)

**Goal**: Compare multiple calendars, show overlapping periods

#### Tasks:

1. **Create Comparison Utility**
   ```javascript
   // src/utils/calendarComparison.js

   export const calculateOverlap = (calendar1, calendar2) => {
     const start1 = new Date(calendar1.dateOfBirth);
     const end1 = new Date(calendar1.dateOfDie);
     const start2 = new Date(calendar2.dateOfBirth);
     const end2 = new Date(calendar2.dateOfDie);

     // Find overlapping period
     const overlapStart = isAfter(start1, start2) ? start1 : start2;
     const overlapEnd = isBefore(end1, end2) ? end1 : end2;

     if (isBefore(overlapEnd, overlapStart)) {
       return null; // No overlap
     }

     return {
       startDate: overlapStart,
       endDate: overlapEnd,
       ...calculateDateDifferences(overlapStart, overlapEnd)
     };
   };

   export const mergeCalendarsForDisplay = (calendars) => {
     // Merge multiple calendars into single visualization
     // Each week can have multiple states (person A past, person B future, etc.)
   };
   ```

2. **Create Comparison UI**
   ```jsx
   <CalendarComparison calendars={[cal1, cal2]}>
     <ComparisonHeader
       overlap={overlapData}
       showStats={true}
     />
     <MergedWeeksCalendar
       calendars={calendars}
       highlightOverlap={true}
     />
     <ComparisonLegend calendars={calendars} />
   </CalendarComparison>
   ```

3. **Update WeekItem for Multi-Calendar**
   ```javascript
   // WeekItem now can show multiple states
   const WeekItemComparison = ({ week, calendars }) => {
     // week can be:
     // - Both calendars past (gray)
     // - Both calendars future (white)
     // - One past, one future (half/half or pattern)
     // - Overlapping special weeks (birthdays, etc.)
   };
   ```

4. **Add Linking Feature**
   ```jsx
   <CalendarLinkManager calendarId={currentCalendar.id}>
     <SearchUsers />
     <LinkedCalendarsList />
     <ComparisonToggle />
   </CalendarLinkManager>
   ```

**Result**: Users can compare calendars and see overlapping life periods

---

### Phase 5: Social Features (Week 9-10)

**Goal**: Public calendars, user discovery

#### Tasks:

1. **Public Calendar Gallery**
   ```jsx
   <PublicCalendarsPage>
     <CalendarFilters />
     <CalendarGrid>
       {calendars.map(cal => (
         <CalendarCard calendar={cal} />
       ))}
     </CalendarGrid>
   </PublicCalendarsPage>
   ```

2. **User Profile Page**
   ```jsx
   <UserProfile userId={userId}>
     <ProfileHeader user={user} />
     <PublicCalendarsList userId={userId} />
     <Stats totalCalendars={x} totalLinks={y} />
   </UserProfile>
   ```

3. **Privacy Controls**
   - Public/Private/Unlisted settings
   - Link permissions
   - Block users

4. **Search & Discovery**
   - Search users
   - Search public calendars
   - Suggested connections (optional)

**Result**: Social platform ready

---

## 🏗️ Proposed File Structure After Migration

```
src/
├── app/
│   └── Router.jsx                  # Main router
│
├── pages/
│   ├── LandingPage.jsx
│   ├── CalendarsListPage.jsx
│   ├── UserProfilePage.jsx
│   ├── CalendarViewPage.jsx       # Current App.jsx logic
│   ├── CalendarComparePage.jsx
│   ├── LoginPage.jsx
│   └── SettingsPage.jsx
│
├── components/
│   ├── calendar/                   # Calendar-specific components
│   │   ├── WeeksCalendar.jsx
│   │   ├── WeekItem.jsx
│   │   ├── DatesCalendar.jsx
│   │   ├── CalendarHeader.jsx
│   │   └── CalendarComparison.jsx
│   │
│   ├── user/                       # User-related components
│   │   ├── UserCard.jsx
│   │   ├── UserList.jsx
│   │   └── UserProfile.jsx
│   │
│   ├── auth/                       # Auth components
│   │   ├── LoginForm.jsx
│   │   ├── OAuthButtons.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── common/                     # Shared components
│   │   ├── Tooltip.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── ErrorBoundary.jsx
│   │   └── ConfirmDialog.jsx
│   │
│   └── ui/                         # shadcn components
│       └── ...
│
├── contexts/
│   ├── AppContext.jsx              # UI state (existing)
│   └── AuthContext.jsx             # Auth state (new)
│
├── stores/
│   ├── calendarStore.js            # Zustand: Calendar state
│   └── uiStore.js                  # Zustand: UI state
│
├── hooks/
│   ├── api/                        # TanStack Query hooks
│   │   ├── useCalendars.js
│   │   ├── useUsers.js
│   │   └── useCalendarLinks.js
│   │
│   ├── useDates.js                 # Existing
│   ├── useDateCalculations.js     # Existing
│   └── useSettings.js              # Existing
│
├── services/
│   ├── firebase.js                 # Firebase config
│   ├── auth.service.js             # Auth API calls
│   ├── calendar.service.js         # Calendar API calls
│   └── user.service.js             # User API calls
│
├── utils/
│   ├── index.js
│   ├── weekCalculations.js         # Existing
│   ├── calendarComparison.js       # NEW: Comparison logic
│   └── helpers.js
│
├── constants/
│   ├── index.js                    # Existing
│   ├── routes.js                   # NEW: Route constants
│   └── permissions.js              # NEW: Permission constants
│
└── types/                          # TypeScript (optional)
    ├── user.types.ts
    ├── calendar.types.ts
    └── api.types.ts
```

---

## 🎨 UI/UX Considerations

### New Pages Needed

1. **Landing Page** (`/`)
   - Hero section explaining the concept
   - Login/Signup CTA
   - Public calendars preview
   - How it works section

2. **Dashboard** (`/dashboard`)
   - User's calendars grid
   - Quick stats
   - Recent activity
   - Create new calendar button

3. **Calendar View** (`/calendar/:id`)
   - Current app functionality
   - Add: Share button, Link button
   - Add: Privacy toggle
   - Add: Export button

4. **Comparison View** (`/compare?ids=cal1,cal2`)
   - Side-by-side or merged view
   - Overlap statistics
   - Highlight overlapping periods
   - Toggle between calendars

5. **User Profile** (`/user/:id`)
   - User info
   - Public calendars
   - Follow button (optional)

6. **Settings** (`/settings`)
   - Profile settings
   - Privacy settings
   - Notification settings
   - Account management

---

## 🔐 Authentication Flow

```
User visits app
     ↓
Check auth state (Firebase Auth)
     ↓
     ├─→ Not logged in → Show Landing Page → Login Page
     │                      ↓
     │                  OAuth Provider (Google/Facebook)
     │                      ↓
     │                  Create user in Firestore
     │                      ↓
     └─→ Logged in → Dashboard
                        ↓
                   List user's calendars
```

### Protected Routes
```jsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

---

## 📊 Database Schema (Firestore)

### Collections

#### `users`
```javascript
{
  uid: "user123",
  email: "user@example.com",
  displayName: "John Doe",
  photoURL: "https://...",
  provider: "google",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### `calendars`
```javascript
{
  id: "cal123",
  userId: "user123",
  name: "My Life Calendar",
  description: "...",
  visibility: "public", // public | private | unlisted

  dateOfBirth: timestamp,
  dateOfDie: timestamp,

  settings: {
    viewMode: "yearEnd",
    showPastWeeks: false,
    theme: "default"
  },

  linkedCalendars: ["cal456", "cal789"],

  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### `calendar_links` (optional separate collection)
```javascript
{
  id: "link123",
  fromCalendarId: "cal123",
  toCalendarId: "cal456",
  status: "accepted", // pending | accepted | rejected
  createdAt: timestamp
}
```

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can read their own data
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }

    // Calendars
    match /calendars/{calendarId} {
      allow read: if resource.data.visibility == 'public'
                  || resource.data.userId == request.auth.uid;
      allow create: if request.auth.uid != null
                    && request.resource.data.userId == request.auth.uid;
      allow update, delete: if resource.data.userId == request.auth.uid;
    }
  }
}
```

---

## 🚀 Migration Strategy: Minimal Breaking Changes

### Strategy: Feature Flags

Use feature flags to gradually roll out new features without breaking existing functionality.

```javascript
// src/config/features.js
export const FEATURES = {
  MULTI_CALENDAR: import.meta.env.VITE_FEATURE_MULTI_CALENDAR === 'true',
  AUTH: import.meta.env.VITE_FEATURE_AUTH === 'true',
  COMPARISON: import.meta.env.VITE_FEATURE_COMPARISON === 'true',
};

// Usage
{FEATURES.MULTI_CALENDAR && <CreateCalendarButton />}
```

### Migration Steps:

1. **Week 1**: Add routing WITHOUT changing current functionality
   - `/` redirects to `/calendar/default`
   - Everything works as before

2. **Week 2**: Add auth as OPTIONAL
   - Can use without login (local storage)
   - Or login for cloud sync

3. **Week 3**: Add multi-calendar as OPTIONAL
   - Default calendar still exists
   - Can create more if wanted

4. **Week 4**: Backend integration behind feature flag
   - Local mode still works
   - Cloud mode optional

5. **Week 5+**: Polish and new features

---

## 📈 Performance Considerations

### Challenges with Scaling

1. **Loading Multiple Calendars**
   - Problem: Generating 4000+ weeks for EACH calendar
   - Solution:
     - Lazy load calendars
     - Virtualize week grid (react-window)
     - Only generate visible calendars

2. **Comparison View**
   - Problem: Merging 2+ calendars = even more DOM elements
   - Solution:
     - Limit to 2-3 calendars max
     - Use canvas for rendering instead of DOM
     - Or: Pre-calculate comparison, store as image

3. **Real-time Updates**
   - Problem: Multiple users linked to same calendar
   - Solution:
     - Firestore real-time listeners
     - Debounce updates
     - Optimistic UI updates

### Optimization Techniques

1. **Code Splitting**
   ```javascript
   const CalendarViewPage = lazy(() => import('./pages/CalendarViewPage'));
   const ComparisonPage = lazy(() => import('./pages/ComparisonPage'));
   ```

2. **Memoization** (already doing)
   - Keep all existing useMemo
   - Add more for comparison logic

3. **Virtualization**
   ```bash
   npm install react-window
   ```
   - Render only visible weeks
   - Huge performance boost for large calendars

4. **Image Caching**
   - Cache generated calendar as image
   - Only regenerate on data change
   - Use for thumbnails in lists

---

## 🧪 Testing Strategy

### What to Test

1. **Unit Tests**
   - Existing: `calculateDateDifferences`, `weekCalculations`
   - New: `calculateOverlap`, `mergeCalendarsForDisplay`

2. **Integration Tests**
   - Calendar creation flow
   - Calendar linking flow
   - Comparison view

3. **E2E Tests** (Playwright)
   - User signup → Create calendar → View calendar
   - User A links calendar to User B
   - Comparison view shows correct overlap

---

## 💰 Cost Estimation (Firebase)

### Free Tier (Spark Plan)
- 50,000 reads/day
- 20,000 writes/day
- 10GB storage
- **Cost**: $0

Good for: Up to ~1000 active users

### Paid Tier (Blaze Plan)
- Pay as you go
- Estimated for 10,000 users:
  - Firestore: ~$50-100/month
  - Auth: Free
  - Hosting: Free
  - Storage: ~$10/month

---

## ✅ Answer to Your Question

> Vậy code của tôi ở phía frontend này có thể scale được như thế một cách đơn giản không?

### ✅ **CÓ - Nhưng có điều kiện**

**Điểm mạnh**:
- ✅ Component architecture sẵn sàng
- ✅ Logic calculations có thể reuse
- ✅ Constants/utilities đã modular
- ✅ Performance patterns (memoization) đã có

**Điểm cần refactor** (KHÔNG phá vỡ code hiện tại):
- 🔧 State management: Context → Zustand + TanStack Query
- 🔧 Add routing: React Router (wrap existing app)
- 🔧 Data structure: Single calendar → Multi-calendar model
- 🔧 Add auth layer: Firebase Auth (optional at first)

**Kết luận**:
- ✅ Code hiện tại scale được 70%
- ⚠️ Cần refactor 30% (state, routing, backend)
- ✅ Có thể migration INCREMENTAL (không rewrite)
- ✅ Thời gian ước tính: 8-10 tuần cho MVP đầy đủ tính năng

**Best Part**: Bạn có thể migration từng phase mà KHÔNG phá vỡ app hiện tại!

---

## 🎯 Recommended Next Steps

1. **This Week**: Read this plan, ask questions
2. **Next Week**: Phase 1 (Routing + Auth foundation)
3. **Week 3-4**: Phase 2 (Multi-calendar)
4. **Week 5+**: Backend + Advanced features

Want me to start implementing Phase 1?
