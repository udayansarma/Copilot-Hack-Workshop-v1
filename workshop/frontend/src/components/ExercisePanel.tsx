import { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, CheckCircle2, Circle } from 'lucide-react';
import type { Exercise } from '../data/modules';
import CodeBlock from './CodeBlock';
import Timer from './Timer';

interface Props {
  exercise: Exercise;
  index: number;
  isCompleted: boolean;
  onComplete: () => void;
}

export default function ExercisePanel({ exercise, index, isCompleted, onComplete }: Props) {
  const [expanded, setExpanded] = useState(index === 0);
  const [showHints, setShowHints] = useState(false);

  return (
    <div
      className={`card transition-all ${
        isCompleted ? 'border-github-green/40 bg-green-500/5' : ''
      }`}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 text-left"
      >
        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-github-green flex-shrink-0" />
        ) : (
          <Circle className="w-5 h-5 text-github-muted flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-github-text">
            Exercise {index + 1}: {exercise.title}
          </h4>
          <p className="text-sm text-github-muted mt-0.5 truncate">{exercise.description}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-github-muted">{exercise.estimatedMinutes} min</span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-github-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-github-muted" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="mt-5 space-y-5">
          {/* Timer */}
          <Timer minutes={exercise.estimatedMinutes} />

          {/* Steps */}
          <div>
            <h5 className="text-sm font-semibold text-github-text mb-3">Steps</h5>
            <ol className="space-y-2">
              {exercise.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-github-accent/15 text-github-accent text-xs flex items-center justify-center font-medium">
                    {i + 1}
                  </span>
                  <span className="text-github-text pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Code snippet */}
          {exercise.codeSnippet && (
            <CodeBlock code={exercise.codeSnippet} language={exercise.language || 'csharp'} />
          )}

          {/* Hints */}
          {exercise.hints.length > 0 && (
            <div>
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center gap-2 text-sm text-github-orange hover:text-orange-400 transition-colors"
              >
                <Lightbulb className="w-4 h-4" />
                <span>{showHints ? 'Hide hints' : 'Show hints'}</span>
              </button>
              {showHints && (
                <ul className="mt-3 space-y-2 pl-6">
                  {exercise.hints.map((hint, i) => (
                    <li key={i} className="text-sm text-github-muted list-disc">
                      {hint}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Complete button */}
          {!isCompleted && (
            <button onClick={onComplete} className="btn-primary text-sm">
              <CheckCircle2 className="w-4 h-4" />
              Mark as Complete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
