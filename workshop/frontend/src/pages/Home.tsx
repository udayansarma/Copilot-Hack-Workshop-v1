import { useState, useEffect } from 'react';
import { Github, Clock, Users, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { modules } from '../data/modules';
import ModuleCard from '../components/ModuleCard';
import ParticipantLogin from '../components/ParticipantLogin';
import ProgressBar from '../components/ProgressBar';

export default function Home() {
  const [participant, setParticipant] = useState<{ name: string; team: string } | null>(null);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('workshop-participant');
    if (saved) setParticipant(JSON.parse(saved));
    const progress = JSON.parse(localStorage.getItem('workshop-progress') || '{}');
    setCompletedCount(Object.keys(progress).length);
  }, []);

  const totalExercises = modules.reduce((sum, m) => sum + m.exercises.length, 0);

  const handleLogin = (name: string, team: string) => {
    const p = { name, team };
    setParticipant(p);
    localStorage.setItem('workshop-participant', JSON.stringify(p));
  };

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-github-surface via-github-bg to-github-surface border border-github-border p-8 md:p-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-github-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-github-purple/5 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Github className="w-8 h-8 text-github-accent" />
            <Sparkles className="w-5 h-5 text-github-purple" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-github-text mb-3">
            GitHub Copilot <span className="text-github-accent">Hackathon</span>
          </h1>
          <p className="text-lg text-github-muted max-w-2xl mb-6">
            Hack the capabilities of GitHub Copilot! Build full-stack apps from scratch using Plan Mode,
            modernize legacy C# code, create custom agents, and compete in the hackathon challenge.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2 text-github-muted">
              <Clock className="w-4 h-4" />
              <span>4+ hours of hands-on content</span>
            </div>
            <div className="flex items-center gap-2 text-github-muted">
              <BookOpen className="w-4 h-4" />
              <span>{modules.length} modules, {totalExercises} exercises</span>
            </div>
            <div className="flex items-center gap-2 text-github-muted">
              <Users className="w-4 h-4" />
              <span>Designed for ~70 participants</span>
            </div>
          </div>
        </div>
      </section>

      {/* Login / Progress */}
      {!participant ? (
        <ParticipantLogin onLogin={handleLogin} />
      ) : (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-github-muted">
                Welcome back, <span className="text-github-text font-medium">{participant.name}</span>!
              </p>
              <p className="text-xs text-github-muted">Team: {participant.team}</p>
            </div>
            <Link to="/hackathon" className="btn-secondary text-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Hackathon
            </Link>
          </div>
          <ProgressBar completed={completedCount} total={totalExercises} label="Workshop Progress" />
        </div>
      )}

      {/* Module Grid */}
      <section>
        <h2 className="text-xl font-bold text-github-text mb-5">Workshop Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod) => (
            <ModuleCard key={mod.id} module={mod} />
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section className="card bg-gradient-to-r from-github-accent/10 to-github-purple/10 border-github-accent/30">
        <h3 className="text-lg font-semibold text-github-text mb-2">⚡ Quick Start</h3>
        <p className="text-sm text-github-muted mb-4">
          New to Copilot? Start with Module 1 to get set up. Already familiar? Jump straight to
          Module 2 and build a full-stack app from scratch using Plan Mode!
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/module/welcome-setup" className="btn-primary text-sm">
            Start Module 1
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link to="/module/plan-mode-webapp" className="btn-secondary text-sm">
            ⭐ Jump to Plan Mode
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link to="/guide" className="btn-secondary text-sm">
            🚀 Awesome Copilot Guide
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
