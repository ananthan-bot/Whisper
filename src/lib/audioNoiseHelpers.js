/**
 * Gets browser MediaStream constraints with noise suppression enabled or disabled.
 * @param {boolean} enableNoiseSuppression
 * @returns {MediaStreamConstraints}
 */
export function getAudioConstraints(enableNoiseSuppression = true) {
  return {
    audio: {
      echoCancellation: true,
      noiseSuppression: Boolean(enableNoiseSuppression),
      autoGainControl: true
    }
  };
}

/**
 * Returns user-friendly status description for noise reduction setting.
 * @param {boolean} enabled
 * @returns {string}
 */
export function getNoiseFilterLabel(enabled) {
  return enabled ? 'Noise Suppression: Active' : 'Noise Suppression: Disabled';
}
