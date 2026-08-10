// Base URL of the backend server (no trailing slash), e.g. http://localhost:5000
export const SERVER_URL =
  import.meta.env.VITE_API_URL || "https://codes-minds-jc3v-sepia.vercel.app";

// Base URL for API calls
export const API_URL = `${SERVER_URL}/api`;

// Turns a relative path like "/uploads/xyz.jpg" returned by the backend
// into a full URL that can be used directly in an <img src>.
export function resolveImage(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SERVER_URL}${path}`;
}
