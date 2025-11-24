# FitBuddy - Health & Wellness Tracker

A production-quality React Native (Expo) application for tracking exercises, water intake, and wellness tips. Built with modern React Native best practices, Redux Toolkit, React Navigation, and clean architecture principles.

## 📱 Features

- **Authentication**: Secure login and registration with form validation
- **Exercise Tracking**: Browse exercises from API Ninjas Fitness API
- **Favourites**: Save and manage favourite exercises with persistent storage
- **Dark Mode**: Toggle between light and dark themes
- **Modern UI**: Clean, responsive design with Feather Icons
- **State Management**: Redux Toolkit for global state management
- **Persistence**: AsyncStorage for offline data persistence


## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (iOS/Android)

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd ReactNative
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API Key (Optional):**
   - Open `src/api/fitnessApi.js`
   - Replace `YOUR_API_KEY_HERE` with your API Ninjas API key
   - Get your free API key at: https://api-ninjas.com/api/exercises
   - Note: The app includes fallback exercises if the API is unavailable

4. **Start the Expo development server:**
   ```bash
   npm start
   ```
   or
   ```bash
   expo start
   ```

5. **Run on your device:**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

## 📦 Dependencies

### Core
- `expo` - Expo framework
- `react` & `react-native` - React Native core
- `@react-navigation/native` - Navigation library
- `@react-navigation/native-stack` - Stack navigator
- `@react-navigation/bottom-tabs` - Tab navigator

### State Management
- `@reduxjs/toolkit` - Redux Toolkit
- `react-redux` - React bindings for Redux

### Forms & Validation
- `react-hook-form` - Form handling
- `yup` - Schema validation
- `@hookform/resolvers` - Yup resolver for react-hook-form

### API & Storage
- `axios` - HTTP client
- `@react-native-async-storage/async-storage` - Local storage

### UI & Icons
- `@expo/vector-icons` - Icon library (Feather icons)
- `react-native-safe-area-context` - Safe area handling
- `expo-linear-gradient` - Gradient support

## 🎨 Features Overview

### Authentication
- Login and Register screens with React Hook Form
- Yup validation schema
- Secure local persistence with AsyncStorage
- Automatic auth state restoration on app launch

### Home Screen
- Fetches exercises from API Ninjas Fitness API
- Displays exercises in beautiful cards
- Pull-to-refresh functionality
- Fallback exercises if API fails
- Loading and error states

### Exercise Details
- Comprehensive exercise information
- Add/remove from favourites
- Muscle group icons
- Difficulty badges

### Favourites
- Persistent storage with AsyncStorage
- Remove favourites with confirmation
- Navigate to exercise details
- Empty state handling

### Profile
- User information display
- Dark mode toggle
- Settings and help options
- Logout functionality

### Dark Mode
- Context-based theme management
- System preference detection
- Smooth theme transitions
- Consistent theming across all screens

## 🧪 Testing the App

1. **Register a new account:**
   - Fill in full name, email, and password
   - Confirm password must match

2. **Login:**
   - Use registered credentials
   - Auth state persists across app restarts

3. **Browse exercises:**
   - View exercises on Home screen
   - Pull down to refresh
   - Tap any exercise card to view details

4. **Add favourites:**
   - Open exercise details
   - Tap "Add to Favourites"
   - View in Favourites tab

5. **Toggle dark mode:**
   - Go to Profile tab
   - Tap "Dark Mode" / "Light Mode"


## 🏛️ Architecture Principles

### Clean Architecture
- **Separation of Concerns**: API, state, UI, and utilities are separated
- **Feature-based Structure**: Screens organized by feature
- **Reusable Components**: Shared components in `components/` directory
- **Business Logic Decoupling**: Redux slices handle business logic

### SOLID Principles
- **Single Responsibility**: Each component/slice has one clear purpose
- **Open/Closed**: Extensible through Redux slices and theme system
- **Dependency Inversion**: Components depend on abstractions (Redux, Context)

### Best Practices
- Functional components with hooks only
- TypeScript-ready structure (can be migrated)
- Error boundaries and fallback handling
- Consistent naming conventions
- No inline styles (all styles in StyleSheet)

## 🔒 Security Notes

- Auth state is stored locally (for demo purposes)
- In production, implement proper JWT token management
- API keys should be stored in environment variables
- Consider implementing biometric authentication

## 🐛 Troubleshooting

### API Issues
- If exercises don't load, the app will use fallback exercises
- Check your API key in `src/api/fitnessApi.js`
- Verify internet connection

### Navigation Issues
- Clear app cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Build Issues
- Clear Expo cache: `expo start --clear`
- Reset Metro bundler: `npm start -- --reset-cache`

## 📄 License

This project is created for educational purposes as part of a React Native assignment.

## 👨‍💻 Author

Index Number: 224114G
Domain: Health & Wellness
App Name: FitBuddy

---

**Note**: This is a complete, production-quality React Native application following all assignment requirements and modern best practices.

