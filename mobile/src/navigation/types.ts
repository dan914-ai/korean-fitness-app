import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

// Root Stack
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  홈: NavigatorScreenParams<HomeStackParamList>; // Home
  기록: NavigatorScreenParams<RecordStackParamList>; // Records
  통계: undefined; // Statistics
  소셜: undefined; // Social
  메뉴: undefined; // Menu
};

// Home Stack
export type HomeStackParamList = {
  HomeScreen: undefined;
  WorkoutStart: undefined;
  WorkoutActive: { workoutId: string };
  ExerciseSelect: undefined;
  ExerciseDetail: { exerciseId: string };
};

// Record Stack
export type RecordStackParamList = {
  RecordMain: undefined;
  WorkoutHistory: undefined;
  WorkoutDetail: { workoutId: string };
  ProgressPhotos: undefined;
  BodyMeasurements: undefined;
};

// Screen Props Types
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  CompositeScreenProps<
    StackScreenProps<AuthStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    StackScreenProps<HomeStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;