import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardEntry {
  name: string;
  team: string;
  score: number;
}

interface Props {
  entries: LeaderboardEntry[];
}

const rankIcons = [
  <Trophy key="1" className="w-5 h-5 text-yellow-400" />,
  <Medal key="2" className="w-5 h-5 text-gray-300" />,
  <Award key="3" className="w-5 h-5 text-amber-600" />,
];

export default function Leaderboard({ entries }: Props) {
  const sorted = [...entries].sort((a, b) => b.score - a.score);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-github-text mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-github-orange" />
        Leaderboard
      </h3>

      {sorted.length === 0 ? (
        <p className="text-sm text-github-muted text-center py-8">
          No scores yet — complete exercises to earn points!
        </p>
      ) : (
        <div className="space-y-2">
          {sorted.map((entry, i) => (
            <div
              key={`${entry.name}-${entry.team}`}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                i < 3 ? 'bg-github-bg' : ''
              }`}
            >
              {/* Rank */}
              <div className="w-8 flex items-center justify-center flex-shrink-0">
                {i < 3 ? rankIcons[i] : <span className="text-sm text-github-muted font-mono">{i + 1}</span>}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-github-text truncate">{entry.name}</p>
                <p className="text-xs text-github-muted">{entry.team}</p>
              </div>

              {/* Score */}
              <span className="text-sm font-bold text-github-accent tabular-nums">{entry.score} pts</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
