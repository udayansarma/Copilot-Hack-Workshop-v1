import { useState } from 'react';
import { User, Users } from 'lucide-react';

interface Props {
  onLogin: (name: string, team: string) => void;
}

export default function ParticipantLogin({ onLogin }: Props) {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && team.trim()) {
      onLogin(name.trim(), team.trim());
    }
  };

  return (
    <div className="card max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-github-text mb-1">Join the Workshop</h3>
      <p className="text-sm text-github-muted mb-5">Enter your name and team to track your progress.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-github-text mb-1.5">
            <User className="w-3.5 h-3.5 inline mr-1.5" />
            Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Developer"
            className="w-full px-3 py-2 rounded-lg bg-github-bg border border-github-border text-github-text
                       placeholder:text-github-muted/50 focus:outline-none focus:ring-2 focus:ring-github-accent focus:border-transparent text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-github-text mb-1.5">
            <Users className="w-3.5 h-3.5 inline mr-1.5" />
            Team Name
          </label>
          <input
            type="text"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            placeholder="Team Copilot"
            className="w-full px-3 py-2 rounded-lg bg-github-bg border border-github-border text-github-text
                       placeholder:text-github-muted/50 focus:outline-none focus:ring-2 focus:ring-github-accent focus:border-transparent text-sm"
            required
          />
        </div>

        <button type="submit" className="btn-primary w-full justify-center">
          Join Workshop
        </button>
      </form>
    </div>
  );
}
