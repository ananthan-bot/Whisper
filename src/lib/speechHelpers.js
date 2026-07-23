/**
 * Helper utility for Web Speech API Speech-to-Text transcription.
 * Provides fallback text processing and browser API compatibility.
 */

export function createSpeechRecognizer({ onResult, onError, onEnd, lang = 'en-US' } = {}) {
  const SpeechRecognition = typeof window !== 'undefined' && (
    window.SpeechRecognition || window.webkitSpeechRecognition
  );

  if (!SpeechRecognition) {
    return {
      isSupported: false,
      start: () => {
        if (onError) onError(new Error('Speech recognition is not supported in this environment'));
      },
      stop: () => {},
      abort: () => {},
    };
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = lang;

  recognition.onresult = (event) => {
    let finalTranscript = '';
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }

    if (onResult) {
      onResult({
        finalTranscript: cleanTranscript(finalTranscript),
        interimTranscript: cleanTranscript(interimTranscript),
        raw: finalTranscript || interimTranscript,
      });
    }
  };

  if (onError) recognition.onerror = (e) => onError(e);
  if (onEnd) recognition.onend = () => onEnd();

  return {
    isSupported: true,
    start: () => {
      try {
        recognition.start();
      } catch (err) {
        if (onError) onError(err);
      }
    },
    stop: () => {
      try {
        recognition.stop();
      } catch (err) {
        // Ignore if stopped already
      }
    },
    abort: () => {
      try {
        recognition.abort();
      } catch (err) {
        // Ignore abort errors
      }
    },
  };
}

/**
 * Clean up extra whitespace and capitalize first letter of sentences.
 */
export function cleanTranscript(text) {
  if (!text || typeof text !== 'string') return '';
  const trimmed = text.trim().replace(/\s+/g, ' ');
  if (!trimmed) return '';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

/**
 * Summarize transcription text for preview display.
 */
export function formatSpeechSummary(text, maxWords = 20) {
  if (!text) return 'No voice transcript recorded.';
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
}
