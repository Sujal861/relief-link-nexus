export const config = {
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
} as const;

// Validate required environment variables
if (!config.googleMapsApiKey) {
  throw new Error('Missing VITE_GOOGLE_MAPS_API_KEY environment variable');
} 