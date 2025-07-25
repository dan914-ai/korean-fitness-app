export const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api'
  : 'https://your-production-api.com/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
  },
  USER: {
    PROFILE: '/users/profile',
    STATS: '/users/stats',
  },
  WORKOUTS: {
    BASE: '/workouts',
    BY_ID: (id: string) => `/workouts/${id}`,
  },
  EXERCISES: {
    BASE: '/exercises',
    SEARCH: '/exercises/search',
    BY_ID: (id: string) => `/exercises/${id}`,
  },
};