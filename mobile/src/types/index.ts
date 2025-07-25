export interface User {
  userId: string;
  username: string;
  email: string;
  profileImageUrl?: string;
  bio?: string;
  height?: number;
  weight?: number;
  birthDate?: string;
  gender?: string;
  userTier: string;
  totalPoints: number;
  workoutCount?: number;
  followersCount?: number;
  followingCount?: number;
}

export interface Exercise {
  exerciseId: string;
  exerciseName: string;
  category: string;
  muscleGroup: string;
  equipment?: string;
  difficulty: string;
  imageUrl?: string;
}

export interface Workout {
  workoutId: string;
  workoutDate: string;
  startTime: string;
  endTime?: string;
  totalDuration?: number;
  totalCalories?: number;
  workoutRating?: number;
  notes?: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutExercise {
  workoutExerciseId: string;
  exercise: Exercise;
  sets: ExerciseSet[];
}

export interface ExerciseSet {
  setId: string;
  setNumber: number;
  reps?: number;
  weight?: number;
  duration?: number;
  restTime?: number;
  isWarmup: boolean;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface ApiError {
  error: string;
  status: string;
}