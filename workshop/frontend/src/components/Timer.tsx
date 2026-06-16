import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

interface Props {
  minutes: number;
}

export default function Timer({ minutes }: Props) {
  const totalSeconds = minutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;
    const interval = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setSecondsLeft(totalSeconds);
  }, [totalSeconds]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;
  const isLow = secondsLeft <= 60 && secondsLeft > 0;
  const isDone = secondsLeft <= 0;

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-github-bg border border-github-border">
      <Clock className={`w-4 h-4 flex-shrink-0 ${isDone ? 'text-github-red' : isLow ? 'text-github-orange animate-pulse' : 'text-github-muted'}`} />

      {/* Progress bar */}
      <div className="flex-1">
        <div className="h-1.5 bg-github-border rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              isDone ? 'bg-github-red' : isLow ? 'bg-github-orange' : 'bg-github-accent'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Time display */}
      <span
        className={`font-mono text-sm tabular-nums min-w-[3.5rem] text-right ${
          isDone ? 'text-github-red' : isLow ? 'text-github-orange' : 'text-github-text'
        }`}
      >
        {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </span>

      {/* Controls */}
      <div className="flex gap-1">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="p-1.5 rounded hover:bg-github-surface transition-colors"
          title={isRunning ? 'Pause' : 'Start'}
        >
          {isRunning ? (
            <Pause className="w-3.5 h-3.5 text-github-muted" />
          ) : (
            <Play className="w-3.5 h-3.5 text-github-accent" />
          )}
        </button>
        <button
          onClick={reset}
          className="p-1.5 rounded hover:bg-github-surface transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-3.5 h-3.5 text-github-muted" />
        </button>
      </div>
    </div>
  );
}
