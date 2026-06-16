import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { capabilitySections } from '../data/awesomeCopilot';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="p-1 rounded hover:bg-github-surface transition-colors" title="Copy">
      {copied ? <Check className="w-3.5 h-3.5 text-github-green" /> : <Copy className="w-3.5 h-3.5 text-github-muted" />}
    </button>
  );
}

const typeColors: Record<string, string> = {
  agent: 'badge-blue',
  instruction: 'badge-purple',
  skill: 'badge-green',
  plugin: 'badge-orange',
  hook: 'bg-red-500/15 text-github-red border border-red-500/30',
  workflow: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30',
};

export default function Guide() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    Object.fromEntries(capabilitySections.map((s) => [s.id, true]))
  );

  const toggle = (id: string) =>
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-github-muted">
        <Link to="/" className="hover:text-github-accent transition-colors">Home</Link>
        <span>/</span>
        <span className="text-github-text">Awesome Copilot Guide</span>
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">🚀</span>
          <div>
            <p className="text-sm text-github-muted">Reference Guide</p>
            <h1 className="text-2xl md:text-3xl font-bold text-github-text">
              Awesome Copilot Integration
            </h1>
          </div>
        </div>
        <p className="text-github-muted max-w-3xl">
          Step-by-step guide to incorporating all{' '}
          <a
            href="https://github.com/github/awesome-copilot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-github-accent hover:underline inline-flex items-center gap-1"
          >
            github/awesome-copilot
            <ExternalLink className="w-3 h-3" />
          </a>{' '}
          capabilities into your C#/.NET projects — agents, instructions, skills, plugins, hooks,
          and workflows.
        </p>
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap gap-2">
        {capabilitySections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="btn-secondary text-xs"
          >
            {section.icon} {section.title.split('—')[0].trim()}
          </a>
        ))}
      </div>

      {/* Sections */}
      {capabilitySections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-20">
          <div className="card">
            {/* Section Header */}
            <button
              onClick={() => toggle(section.id)}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{section.icon}</span>
                <h2 className="text-lg font-bold text-github-text">{section.title}</h2>
              </div>
              {expandedSections[section.id] ? (
                <ChevronUp className="w-5 h-5 text-github-muted" />
              ) : (
                <ChevronDown className="w-5 h-5 text-github-muted" />
              )}
            </button>

            {expandedSections[section.id] && (
              <div className="mt-5 space-y-6">
                <p className="text-sm text-github-muted">{section.description}</p>

                {/* How it works */}
                <div className="p-4 rounded-lg bg-github-bg border border-github-border">
                  <h4 className="text-sm font-semibold text-github-text mb-2 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-github-accent" />
                    How It Works
                  </h4>
                  <ul className="space-y-1">
                    {section.howItWorks.map((item, i) => (
                      <li key={i} className="text-xs text-github-muted flex gap-2">
                        <span className="text-github-green">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h4 className="text-sm font-semibold text-github-text mb-3">
                    C#/.NET Resources to Install
                  </h4>
                  <div className="space-y-3">
                    {section.resources.map((resource) => (
                      <div
                        key={resource.name}
                        className="p-4 rounded-lg bg-github-bg border border-github-border"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="text-sm font-medium text-github-text">
                                {resource.name}
                              </h5>
                              <span className={`badge text-[10px] ${typeColors[resource.type]}`}>
                                {resource.type}
                              </span>
                            </div>
                            <p className="text-xs text-github-muted">{resource.description}</p>
                          </div>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 p-1.5 rounded hover:bg-github-surface transition-colors"
                            title="View on GitHub"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-github-muted" />
                          </a>
                        </div>
                        {/* Install command */}
                        <div className="flex items-center gap-2 mt-2 p-2 rounded bg-github-surface border border-github-border">
                          <code className="text-xs text-github-accent font-mono flex-1 overflow-x-auto whitespace-nowrap">
                            {resource.installCommand}
                          </code>
                          <CopyButton text={resource.installCommand} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exercise */}
                <div className="p-4 rounded-lg bg-github-accent/5 border border-github-accent/20">
                  <h4 className="text-sm font-semibold text-github-text mb-2 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-github-accent" />
                    Exercise: {section.exercise.title}
                  </h4>
                  <ol className="space-y-1.5">
                    {section.exercise.steps.map((step, i) => (
                      <li key={i} className="flex gap-2 text-xs text-github-muted">
                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-github-accent/15 text-github-accent text-[10px] flex items-center justify-center font-medium">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Recommended Stack */}
      <section className="card bg-gradient-to-r from-github-accent/10 to-github-purple/10 border-github-accent/30">
        <h3 className="text-lg font-semibold text-github-text mb-3 flex items-center gap-2">
          ⚡ Recommended Stack for C#/.NET Teams
        </h3>
        <pre className="text-xs text-github-muted font-mono bg-github-bg p-4 rounded-lg border border-github-border overflow-x-auto">
{`your-repo/
├── .github/
│   ├── copilot-instructions.md          # Team-wide C# standards
│   ├── agents/
│   │   ├── CSharpExpert.agent.md        # C# development expert
│   │   ├── dotnet-upgrade.agent.md      # Legacy modernization
│   │   └── api-architect.agent.md       # API design mentor
│   ├── hooks/
│   │   ├── secrets-scanner/             # Scan for leaked secrets
│   │   ├── tool-guardian/               # Block dangerous ops
│   │   └── session-auto-commit/         # Auto-commit on session end
│   ├── instructions/
│   │   ├── aspnet-rest-apis.instructions.md
│   │   └── azure-functions-csharp.instructions.md
│   └── workflows/
│       ├── daily-issues-report.md
│       └── relevance-check.md
└── src/ ...`}</pre>
      </section>

      {/* Resources footer */}
      <section className="card">
        <h3 className="text-base font-semibold text-github-text mb-3">📚 Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: 'Awesome Copilot Website', url: 'https://awesome-copilot.github.com' },
            { label: 'Learning Hub', url: 'https://awesome-copilot.github.com/learning-hub' },
            { label: 'Tools & MCP Servers', url: 'https://awesome-copilot.github.com/tools' },
            { label: 'GitHub Copilot Docs', url: 'https://docs.github.com/copilot' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg bg-github-bg border border-github-border hover:border-github-accent transition-colors text-sm text-github-muted hover:text-github-accent"
            >
              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
