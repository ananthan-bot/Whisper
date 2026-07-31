/**
 * Audio Volume Helper Utilities
 */

export function clampVolume(volume, min = 0, max = 1) {
  if (typeof volume !== 'number' || isNaN(volume)) return 0.8;
  return Math.min(Math.max(volume, min), max);
}

export function formatVolumePercentage(volume) {
  const clamped = clampVolume(volume);
  return `${Math.round(clamped * 100)}%`;
}

export function isMuted(volume) {
  return clampVolume(volume) === 0;
}
