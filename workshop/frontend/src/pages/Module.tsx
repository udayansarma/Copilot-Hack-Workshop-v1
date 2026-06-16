import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Target, BookOpen } from 'lucide-react';
import { modules } from '../data/modules';
import ExercisePanel from '../components/ExercisePanel';
import ProgressBar from '../components/ProgressBar';

export default function Module() {
  const { id } = useParams<{ id: string }>();
  const module = modules.find((m) => m.id === id);
  const moduleIndex = modules.findIndex((m) => m.id === id);
  const prevModule = moduleIndex > 0 ? modules[moduleIndex - 1] : null;
  const nextModule = moduleIndex < modules.length - 1 ? modules[moduleIndex + 1] : null;

  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const progress = JSON.parse(localStorage.getItem('workshop-progress') || '{}');
    setCompleted(progress);
  }, [id]);

  if (!module) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-github-text mb-2">Module not found</h2>
        <Link to="/" className="text-github-accent hover:underline">← Back to home</Link>
      </div>
    );
  }

  const handleComplete = (exerciseIndex: number) => {
    const key = `${module.id}-${exerciseIndex}`;
    const newCompleted = { ...completed, [key]: true };
    setCompleted(newCompleted);
    localStorage.setItem('workshop-progress', JSON.stringify(newCompleted));
  };

  const completedCount = module.exercises.filter((_, i) => completed[`${module.id}-${i}`]).length;

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-github-muted">
        <Link to="/" className="hover:text-github-accent transition-colors">Home</Link>
        <span>/</span>
        <span className="text-github-text">Module {module.number}</span>
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{module.icon}</span>
          <div>
            <p className="text-sm text-github-muted">Module {module.number} · {module.duration}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-github-text">{module.title}</h1>
          </div>
        </div>
        <p className="text-github-muted max-w-3xl">{module.description}</p>
      </div>

      {/* Progress */}
      <ProgressBar completed={completedCount} total={module.exercises.length} label="Module Progress" />

      {/* Learning Objectives */}
      <div className="card">
        <h3 className="text-base font-semibold text-github-text mb-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-github-accent" />
          Learning Objectives
        </h3>
        <ul className="space-y-2">
          {module.learningObjectives.map((obj, i) => (
            <li key={i} className="flex gap-2 text-sm text-github-muted">
              <span className="text-github-green mt-0.5">✓</span>
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Concepts */}
      <div className="flex flex-wrap gap-2">
        <BookOpen className="w-4 h-4 text-github-muted mt-0.5" />
        {module.concepts.map((concept) => (
          <span key={concept} className="badge-blue">{concept}</span>
        ))}
      </div>

      {/* Exercises */}
      <div>
        <h2 className="text-lg font-semibold text-github-text mb-4">Exercises</h2>
        <div className="space-y-4">
          {module.exercises.map((exercise, i) => (
            <ExercisePanel
              key={i}
              exercise={exercise}
              index={i}
              isCompleted={!!completed[`${module.id}-${i}`]}
              onComplete={() => handleComplete(i)}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-github-border">
        {prevModule ? (
          <Link to={`/module/${prevModule.id}`} className="btn-secondary text-sm">
            <ArrowLeft className="w-3.5 h-3.5" />
            Module {prevModule.number}: {prevModule.title}
          </Link>
        ) : (
          <div />
        )}
        {nextModule ? (
          <Link to={`/module/${nextModule.id}`} className="btn-primary text-sm">
            Module {nextModule.number}: {nextModule.title}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <Link to="/hackathon" className="btn-primary text-sm">
            🏆 Go to Hackathon
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
