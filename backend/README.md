# Korean Fitness App Backend

## Overview
Express.js + TypeScript backend API for the Korean Fitness Tracking App.

## Tech Stack
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **Password Hashing**: bcrypt

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup
```bash
# Update DATABASE_URL in .env file
# postgresql://username:password@localhost:5432/korean_fitness_db

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

### 3. Environment Variables
Create `.env` file with:
```
DATABASE_URL="postgresql://username:password@localhost:5432/korean_fitness_db"
PORT=3000
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

### 4. Run Development Server
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token

### User
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/stats` - Get user statistics

### Workouts
- `POST /api/workouts` - Create workout
- `GET /api/workouts` - Get user's workouts
- `GET /api/workouts/:id` - Get workout details
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

### Exercises
- `GET /api/exercises` - Get exercises (with filters)
- `GET /api/exercises/search` - Search exercises
- `GET /api/exercises/:id` - Get exercise details

## Database Schema
The app uses 20 interconnected tables including:
- Users (with tier system: 브론즈 to 챌린저)
- Workouts & Exercise tracking
- Social features (posts, likes, comments)
- Challenges & Achievements
- Progress tracking (photos, measurements)
- Diet logging

## Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:studio` - Open Prisma Studio GUI
- `npm run prisma:seed` - Seed database with sample data