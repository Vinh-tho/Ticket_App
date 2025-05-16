import { BASE_URL } from './config';

export const API_URL = BASE_URL;

// Endpoints
export const ENDPOINTS = {
  LOGIN: `${API_URL}/auth/login`,
  REGISTER: `${API_URL}/auth/register`,
  USER_PROFILE: `${API_URL}/users/profile`,
  UPDATE_PROFILE: `${API_URL}/users/profile`,
  TICKETS: `${API_URL}/tickets`,
  SEATS: `${API_URL}/seats`,
  EVENTS: `${API_URL}/events`,
  EVENT_DETAIL: `${API_URL}/events-detail`,
}; 