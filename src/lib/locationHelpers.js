/**
 * Task Geolocation and Distance Calculation Helper
 * Calculates distance between coordinates (Haversine formula) and formats display text.
 */

export const PRESET_LOCATIONS = [
  { name: 'Downtown', lat: 37.7749, lng: -122.4194 },
  { name: 'Midtown', lat: 37.7833, lng: -122.4167 },
  { name: 'Financial District', lat: 37.7946, lng: -122.3999 },
  { name: 'Westside', lat: 37.7600, lng: -122.4400 },
];

/**
 * Calculates distance in miles between two coordinates using Haversine formula
 */
export function calculateDistanceMiles(lat1, lon1, lat2, lon2) {
  if (
    typeof lat1 !== 'number' ||
    typeof lon1 !== 'number' ||
    typeof lat2 !== 'number' ||
    typeof lon2 !== 'number'
  ) {
    return null;
  }

  const R = 3958.8; // Radius of the Earth in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10;
}

/**
 * Formats distance display string
 */
export function formatDistanceString(distanceMiles) {
  if (distanceMiles === null || distanceMiles === undefined) return 'Remote Task';
  if (distanceMiles < 0.5) return 'Within 0.5 mi';
  return `${distanceMiles} mi away`;
}
