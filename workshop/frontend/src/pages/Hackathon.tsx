import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Clock } from 'lucide-react';
import { challengeCards } from '../data/modules';
import ChallengeCard from '../components/ChallengeCard';
import Leaderboard from '../components/Leaderboard';
import Timer from '../components/Timer';

const mockLeaderboard = [
  { name: 'Alice Chen', team: 'Team Async', score: 0 },
  { name: 'Bob Martinez', team: 'Team DI', score: 0 },
  { name: 'Carol Smith', team: 'Team SOLID', score: 0 },
];

export default function Hackathon() {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-github-muted">
        <Link to="/" className="hover:text-github-accent transition-colors">Home</Link>
        <span>/</span>
        <span className="text-github-text">Hackathon</span>
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">🏆</span>
          <div>
            <p className="text-sm text-github-muted">Module 6 · 60+ min</p>
            <h1 className="text-2xl md:text-3xl font-bold text-github-text">Hackathon Challenge</h1>
          </div>
        </div>
        <p className="text-github-muted max-w-3xl">
          Form teams of 3-5, pick a challenge card, and build something amazing using Copilot!
          All challenges <strong className="text-github-text">must start with Plan Mode</strong>.
        </p>
      </div>

      {/* Global Timer */}
      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-github-accent" />
          <h3 className="text-sm font-semibold text-github-text">Hackathon Timer</h3>
        </div>
        <Timer minutes={60} />
      </div>

      {/* Rules */}
      <div className="card bg-github-accent/5 border-github-accent/20">
        <h3 className="text-base font-semibold text-github-text mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-github-accent" />
          Rules
        </h3>
        <ul className="space-y-2 text-sm text-github-muted">
          <li className="flex gap-2"><span>1.</span> Teams of 3-5 people</li>
          <li className="flex gap-2"><span>2.</span> <strong className="text-github-text">Start with Plan Mode</strong> — describe your app, review the plan, then build</li>
          <li className="flex gap-2"><span>3.</span> Use custom instructions and agents from earlier modules</li>
          <li className="flex gap-2"><span>4.</span> Focus on a working demo over perfect code</li>
          <li className="flex gap-2"><span>5.</span> Prepare a 3-minute demo for peer voting</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Challenge Cards */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-github-text mb-4">Pick Your Challenge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challengeCards.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                onSelect={() => setSelectedChallenge(challenge.id)}
              />
            ))}
          </div>

          {selectedChallenge && (
            <div className="mt-4 p-4 rounded-lg bg-github-green/10 border border-github-green/30">
              <p className="text-sm text-github-green font-medium">
                ✅ Challenge selected: {challengeCards.find((c) => c.id === selectedChallenge)?.title}
              </p>
              <p className="text-xs text-github-muted mt-1">
                Open Copilot CLI, enter plan mode, and paste the suggested prompt to get started!
              </p>
            </div>
          )}
        </div>

        {/* Leaderboard */}
        <div>
          <Leaderboard entries={mockLeaderboard} />
        </div>
      </div>
    </div>
  );
}
