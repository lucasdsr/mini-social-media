# Mini Social Media Dashboard

A modern social media dashboard built with React, TypeScript, and Redux that provides an interactive feed experience with advanced engagement tracking and comment management features.

## Technologies

- **React 18** with TypeScript for type-safe component development
- **Redux Toolkit** for centralized state management
- **TanStack Query (React Query)** for server state management and caching
- **Material-UI (MUI)** for modern, responsive UI components
- **Emotion** for styled components
- **Axios** for HTTP requests
- **Vite** for fast development and optimized builds
- **Vitest** & **React Testing Library** for unit testing

## Installation and Execution

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd mini-social-media

# Install dependencies
npm install
```

### Running the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Lint code
npm run lint
```

The application will be available at `http://localhost:5173` in development mode.

## Architecture

The project follows a **Clean Architecture** approach with clear separation of concerns:

### Folder Structure

```
src/
├── application/          # Application layer (business logic)
│   ├── api/             # API configuration and constants
│   ├── comments/        # Comment-related queries and mutations
│   ├── contexts/        # React contexts (User context)
│   ├── engagement/      # Engagement score calculation logic
│   ├── posts/           # Post-related queries and hooks
│   ├── slices/          # Redux slices (posts, comments, UI state)
│   ├── store/           # Redux store configuration
│   └── users/           # User-related queries
│
├── components/          # Presentation components (Atomic Design)
│   ├── atoms/          # Basic building blocks (Input, Button, Avatar)
│   ├── molecules/      # Component compositions (Post, CommentsList)
│   ├── organisms/      # Complex components (Header, PostList)
│   └── templates/      # Page layouts
│
├── infrastructure/      # External integrations
│   ├── services/       # API service layers
│   ├── apiClient.ts    # HTTP client configuration
│   ├── localStorage.ts # Local storage utilities
│   └── queryClient.ts  # React Query configuration
│
├── models/             # Domain models and interfaces
│   ├── Post.ts
│   ├── Comment.ts
│   ├── User.ts
│   └── EngagementScore.ts
│
└── presentation/       # Page components and routing
    └── pages/
        └── Feed/       # Feed page with content and logic
```

### Design Patterns

- **Atomic Design**: Components organized by complexity level
- **Container/Presenter Pattern**: Separation of logic and presentation
- **Custom Hooks**: Reusable logic encapsulation
- **Service Layer**: Abstraction of API calls
- **Redux Toolkit**: Predictable state management with slices

### State Management

- **Redux**: Global state for posts, comments, and UI state
- **React Query**: Server state caching, synchronization, and background updates
- **React Context**: User authentication and session management

## Features

### 1. Feed View

- **Post Display**: Shows posts with title, body, and user information
- **Engagement Score**: Visual representation of post engagement through a color-coded badge system
  - Score calculation based on likes, comments, and user interactions
  - Dynamic color coding (Low: gray, Medium: blue, High: gold, Very High: gradient)
- **User Avatars**: Colorful avatars generated from usernames
- **Infinite Scroll**: Automatic loading of more posts as user scrolls
- **Skeleton Loading**: Smooth loading states for better UX

### 2. Post Details & Comments

- **Expandable Comments**: Click to view/hide comments for each post
- **Reply Functionality**: Reply to individual comments with threaded display
- **Tag System**:
  - Autocomplete suggestions while typing tags
  - Custom tag creation when no suggestions match
  - Multiple tags per comment
  - Visual tag display with color-coded badges
- **Comment Author Info**: Display username and email for each comment

### 3. Filters & Search

- **Text Search**: Search posts by title or body content
- **Username Filter**: Filter posts by specific user
- **Real-time Filtering**: Instant results as you type
- **Clear Filters**: Easy reset to view all posts

### 4. User Experience Enhancements

#### Implemented UX/UI Improvements:

1. **Engagement Score Visualization**
   - Dynamic color-coded badges showing post popularity
   - Intuitive visual feedback for user engagement
   - Tooltip with detailed score breakdown

2. **Optimistic Updates**
   - Instant UI feedback when creating posts or comments
   - Seamless experience with background synchronization

3. **Smart Caching**
   - Intelligent data caching with React Query
   - Reduced API calls and faster navigation
   - Background data revalidation

4. **Loading States**
   - Skeleton screens for smooth loading experience
   - Progressive content rendering
   - Loading overlays for actions

5. **Responsive Design**
   - Mobile-first approach
   - Adaptive layouts for all screen sizes
   - Touch-friendly interactions

6. **Local Post Creation**
   - Create posts directly in the interface
   - Immediate visual feedback
   - Persistent storage with localStorage backup

### 5. Testing

- **Unit Tests**: Component testing with Vitest and React Testing Library
- **Test Coverage**: Critical components and business logic
- **Test Files**:
  - `Input.test.tsx`
  - `PostBody.test.tsx`
  - `PostTitle.test.tsx`
  - `UserAvatar.test.tsx`
  - `UserInfo.test.tsx`
  - `Post.test.tsx`
  - `PostList.test.tsx`
  - `Feed.test.tsx`

## API Reference

The application uses **JSONPlaceholder** as the backend API:

### Base URL
```
https://jsonplaceholder.typicode.com
```

### Caching Strategy

- **Posts**: 10-minute cache with 5-minute stale time
- **Users**: 30-minute cache with 15-minute stale time
- **Comments**: 10-minute cache with 5-minute stale time
- **Background Refetch**: Automatic data revalidation on window focus

---

## License

MIT

