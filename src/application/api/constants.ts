/**
 * API constants and configuration
 * Centralized place for API-related constants
 */

// Cache time constants (in milliseconds)
export const CACHE_TIME = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 10 * 60 * 1000, // 10 minutes
  LONG: 30 * 60 * 1000 // 30 minutes
} as const

// Stale time constants (in milliseconds)
export const STALE_TIME = {
  SHORT: 2 * 60 * 1000, // 2 minutes
  MEDIUM: 5 * 60 * 1000, // 5 minutes
  LONG: 15 * 60 * 1000 // 15 minutes
} as const

// Retry configuration
export const RETRY_CONFIG = {
  DEFAULT: 3,
  MUTATIONS: 1,
  DELAY: 1000
} as const

// Query key prefixes for consistent caching
export const QUERY_KEY_PREFIXES = {
  POSTS: 'posts',
  USERS: 'users',
  COMMENTS: 'comments'
} as const

// API endpoints
export const API_ENDPOINTS = {
  BASE_URL: 'https://jsonplaceholder.typicode.com',
  POSTS: '/posts',
  USERS: '/users',
  COMMENTS: '/comments'
} as const

// Pagination defaults
export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
} as const
