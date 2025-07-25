# Korean Fitness App - Mobile

React Native + Expo mobile application for the Korean Fitness Tracking App.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (Mac only) or Android Studio
- Expo Go app on your phone

### Installation

1. **Install dependencies**
   ```bash
   cd mobile
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Run on device/simulator**
   - iOS: `npm run ios` (Mac only)
   - Android: `npm run android`
   - Web: `npm run web`
   - Or scan QR code with Expo Go app

## 📱 Features

### Authentication
- ✅ User login/register
- ✅ JWT token management
- ✅ Auto-logout on token expiry

### Navigation
- ✅ Bottom tab navigation with Korean labels
- ✅ Stack navigation for screens
- ✅ Auth flow navigation

### Screens
- **홈 (Home)**: Quick workout start, stats overview
- **기록 (Records)**: Workout history and progress
- **통계 (Statistics)**: Analytics and charts
- **소셜 (Social)**: Community features
- **메뉴 (Menu)**: Settings and profile

## 🛠️ Tech Stack

- **Framework**: React Native + Expo
- **Navigation**: React Navigation v7
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Icons**: React Native Vector Icons
- **Storage**: AsyncStorage
- **Language**: TypeScript

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
├── constants/         # Colors, API endpoints
├── hooks/            # Custom React hooks
├── navigation/       # Navigation configuration
├── screens/          # Screen components
│   ├── auth/        # Login, Register
│   ├── home/        # Home screen
│   ├── record/      # Records screen
│   ├── stats/       # Statistics screen
│   ├── social/      # Social screen
│   └── menu/        # Menu screen
├── services/         # API services
├── store/           # State management
├── types/           # TypeScript types
└── utils/           # Helper functions
```

## 🎨 Design System

### Colors
- Primary: `#FF6B6B` (Korean fitness app inspired)
- Secondary: `#4ECDC4`
- Background: `#F5F5F5`
- Text: `#2D3436`

### Tier Colors
- 브론즈: `#CD7F32`
- 실버: `#C0C0C0`
- 골드: `#FFD700`
- 플래티넘: `#E5E4E2`
- 다이아몬드: `#B9F2FF`
- 챌린저: `#FF1744`

## 🌐 API Integration

The app connects to the Express.js backend:
- Development: `http://localhost:3000/api`
- Production: Configure in `src/constants/api.ts`

### Authentication Flow
1. User logs in → JWT token stored in AsyncStorage
2. API requests include Bearer token
3. Token refresh on expiry
4. Auto-logout on invalid token

## 📱 Development

### Running on Physical Device
1. Install Expo Go from App Store/Play Store
2. Run `npm start`
3. Scan QR code with Expo Go

### Building for Production
```bash
# Build for Android
expo build:android

# Build for iOS (requires Apple Developer account)
expo build:ios
```

## 🚧 Todo

- [ ] Complete workout tracking screens
- [ ] Exercise selection and tracking
- [ ] Social features implementation
- [ ] Push notifications
- [ ] Offline support
- [ ] Performance optimization

## 🔧 Configuration

Update backend URL in `src/constants/api.ts`:
```typescript
export const API_BASE_URL = 'https://your-backend-url.com/api';
```