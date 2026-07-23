import React, { useEffect, useRef } from 'react';

/**
 * Animated HTML5 Canvas Waveform Visualizer
 * @param {boolean} isRecording - Whether audio is actively recording
 * @param {boolean} isPlaying - Whether audio is currently playing back
 * @param {string} color - Primary waveform color (hex/hsl/rgb)
 * @param {number} height - Canvas height in pixels
 */
export default function AudioWaveform({
  isRecording = false,
  isPlaying = false,
  color = '#1D9E75',
  height = 40,
  barCount = 32,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let phase = 0;

    const render = () => {
      const width = canvas.clientWidth || 300;
      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);

      const gap = 3;
      const barWidth = Math.max(2, (width - barCount * gap) / barCount);
      phase += isRecording ? 0.15 : isPlaying ? 0.08 : 0.02;

      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + gap);
        let amplitude = 0.15; // idle default height

        if (isRecording) {
          // Dynamic sine + random noise visualizer for live recording
          const sine = Math.sin(phase + i * 0.4);
          const noise = Math.random() * 0.3;
          amplitude = Math.min(1, Math.max(0.2, (sine + 1) / 2 * 0.7 + noise));
        } else if (isPlaying) {
          // Smooth sine wave visualizer for playback
          const sine = Math.sin(phase + i * 0.25);
          amplitude = Math.min(1, Math.max(0.25, (sine + 1) / 2 * 0.8));
        }

        const barHeight = Math.max(4, amplitude * (height - 8));
        const y = (height - barHeight) / 2;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isRecording, isPlaying, color, height, barCount]);

  return (
    <div className="w-full overflow-hidden flex items-center justify-center my-2">
      <canvas
        ref={canvasRef}
        aria-label="Audio waveform visualization"
        className="w-full block transition-opacity duration-300"
        style={{ height: `${height}px` }}
      />
    </div>
  );
}
