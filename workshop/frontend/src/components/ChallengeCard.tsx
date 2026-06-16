import { Sparkles } from 'lucide-react';
import type { ChallengeCard as ChallengeCardData } from '../data/modules';

interface Props {
  challenge: ChallengeCardData;
  onSelect?: () => void;
}

const difficultyColors = {
  Standard: 'badge-green',
  Advanced: 'badge-orange',
  Expert: 'badge-purple',
};

export default function ChallengeCard({ challenge, onSelect }: Props) {
  return (
    <div className="card-hover flex flex-col h-full" onClick={onSelect}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-semibold text-github-text">{challenge.title}</h3>
        <span className={difficultyColors[challenge.difficulty]}>{challenge.difficulty}</span>
      </div>

      {/* Description */}
      <p className="text-sm text-github-muted mb-4 flex-1">{challenge.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {challenge.tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 text-xs rounded bg-github-bg text-github-muted border border-github-border">
            {tag}
          </span>
        ))}
      </div>

      {/* Suggested prompt */}
      <div className="p-3 rounded-lg bg-github-bg border border-github-border">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-github-purple" />
          <span className="text-xs font-medium text-github-purple">Suggested Plan Mode Prompt</span>
        </div>
        <p className="text-xs text-github-muted leading-relaxed">{challenge.suggestedPrompt}</p>
      </div>
    </div>
  );
}
