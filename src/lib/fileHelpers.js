/**
 * Utility functions for validating and reading files (images and audio) as Data URLs (Base64).
 */

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export function validateFile(file, allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'audio/webm', 'audio/mp3', 'audio/wav', 'audio/ogg']) {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { valid: false, error: 'File size exceeds the maximum limit of 5MB.' };
  }
  const isTypeAllowed = allowedTypes.some((type) => file.type.startsWith(type.split('/')[0]) || file.type === type);
  if (!isTypeAllowed) {
    return { valid: false, error: `Invalid file type: ${file.type || 'unknown'}.` };
  }
  return { valid: true };
}

export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
