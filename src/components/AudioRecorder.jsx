import { useState, useRef } from 'react';
import { Mic, Square, Trash2, CheckCircle2, FileText } from 'lucide-react';
import { fileToDataUrl } from '../lib/fileHelpers';
import { createSpeechRecognizer, formatSpeechSummary } from '../lib/speechHelpers';
import AudioWaveform from './AudioWaveform';

export default function AudioRecorder({ onAudioCaptured, onClear, onTranscriptCaptured }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const speechRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      // Initialize real-time speech recognition
      speechRef.current = createSpeechRecognizer({
        onResult: ({ finalTranscript, interimTranscript }) => {
          const liveText = finalTranscript || interimTranscript;
          setTranscript(liveText);
          if (onTranscriptCaptured) onTranscriptCaptured(liveText);
        },
      });
      if (speechRef.current.isSupported) {
        speechRef.current.start();
      }

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        const dataUrl = await fileToDataUrl(audioBlob);
        if (onAudioCaptured) {
          onAudioCaptured(dataUrl);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch {
      alert('Microphone access is required to record audio voice notes.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      if (speechRef.current) speechRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const handleClear = () => {
    setAudioUrl(null);
    setRecordingTime(0);
    setTranscript('');
    setIsPlaying(false);
    if (onClear) onClear();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center gap-3 w-full">
      {!audioUrl && !isRecording && (
        <button
          type="button"
          onClick={startRecording}
          className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium rounded-full shadow-sm transition-colors cursor-pointer"
        >
          <Mic className="w-4 h-4" /> Record Voice Note
        </button>
      )}

      {isRecording && (
        <div className="w-full flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-rose-600 font-medium animate-pulse text-sm">
              <div className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
              Recording... ({formatTime(recordingTime)})
            </div>
            <button
              type="button"
              onClick={stopRecording}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              <Square className="w-3.5 h-3.5 fill-current" /> Stop
            </button>
          </div>

          {/* Animated Waveform during recording */}
          <AudioWaveform isRecording={true} color="#E11D48" height={36} />

          {transcript && (
            <div className="w-full text-xs text-slate-600 bg-white/80 p-2 rounded-lg border border-slate-200 shadow-inner flex items-start gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
              <p><span className="font-semibold text-slate-700">Live Transcript:</span> {transcript}</p>
            </div>
          )}
        </div>
      )}

      {audioUrl && (
        <div className="w-full flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" /> Voice Note Captured
          </div>

          <AudioWaveform isPlaying={isPlaying} color="#1D9E75" height={36} />

          <audio
            src={audioUrl}
            controls
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            className="w-full max-w-md h-10"
          />

          {transcript && (
            <div className="w-full text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs flex items-start gap-2">
              <FileText className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-slate-900">Recorded Transcript:</span>
                <p className="mt-0.5 text-slate-600">{formatSpeechSummary(transcript, 30)}</p>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1 text-slate-500 hover:text-rose-500 text-xs mt-1 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" /> Re-record / Remove
          </button>
        </div>
      )}
    </div>
  );
}
