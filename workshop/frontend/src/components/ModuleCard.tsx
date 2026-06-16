import { Link } from 'react-router-dom';
import { Clock, ChevronRight, Zap } from 'lucide-react';
import type { ModuleData } from '../data/modules';

interface Props {
  module: ModuleData;
}

const colorMap = {
  green: 'badge-green',
  blue: 'badge-blue',
  orange: 'badge-orange',
  purple: 'badge-purple',
};

const borderColorMap = {
  green: 'hover:border-green-500/50',
  blue: 'hover:border-blue-500/50',
  orange: 'hover:border-orange-500/50',
  purple: 'hover:border-purple-500/50',
};

export default function ModuleCard({ module }: Props) {
  return (
    <Link to={`/module/${module.id}`} className="block group">
      <div
        className={`card-hover ${borderColorMap[module.color]} flex flex-col h-full`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-3xl">{module.icon}</span>
          <div className="flex items-center gap-2">
            <span className={colorMap[module.color]}>{module.difficulty}</span>
            {module.number === 2 && (
              <span className="badge bg-yellow-500/15 text-yellow-400 border border-yellow-500/30">
                <Zap className="w-3 h-3 mr-1" />
                Key
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-github-text mb-1 group-hover:text-github-accent transition-colors">
          Module {module.number}: {module.title}
        </h3>
        <p className="text-sm text-github-muted mb-4 flex-1">{module.subtitle}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-github-border">
          <div className="flex items-center gap-1.5 text-xs text-github-muted">
            <Clock className="w-3.5 h-3.5" />
            <span>{module.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-github-accent opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Start</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
