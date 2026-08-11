// Use the same Vercel deployment for the frontend and backend API.
// VITE_API_URL can be set for local development or a separate backend.
export const SERVER_URL = import.meta.env.VITE_API_URL || "";

// Base URL for API calls
export const API_URL = `${SERVER_URL}/api`;

// Turns a relative path like "/uploads/xyz.jpg" returned by the backend
// into a URL that works both locally and on Vercel.
export function resolveImage(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SERVER_URL}${path}`;
}
