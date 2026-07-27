/**
 * Audio Player & Playback Helper Utilities
 */

export const SPEED_OPTIONS = [1, 1.25, 1.5, 2];

/**
 * Formats seconds into MM:SS display string
 */
export function formatAudioTime(seconds = 0) {
  if (!seconds || isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * Returns next speed multiplier index in sequence
 */
export function getNextPlaybackSpeed(currentSpeed = 1) {
  const currentIndex = SPEED_OPTIONS.indexOf(currentSpeed);
  if (currentIndex === -1 || currentIndex === SPEED_OPTIONS.length - 1) {
    return SPEED_OPTIONS[0];
  }
  return SPEED_OPTIONS[currentIndex + 1];
}
